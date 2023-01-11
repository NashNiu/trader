<template>
  <el-drawer
    v-model="visible"
    direction="rtl"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :with-header="false"
    class="traderDrawerContainer"
    size="500"
    destroy-on-close
  >
    <div class="title">
      <el-icon class="closeIcon" @click="close"><ArrowRightBold /></el-icon>
    </div>
    <div class="contentBox">
      <el-tabs v-model="activeTab" stretch>
        <el-tab-pane name="Market">
          <template #label>
            <span class="tabName">Market</span>
          </template>
          <div>
            <h3 class="symbolName">{{ drawerData?.symbol }}</h3>
            <DeepPrice :symbol="drawerData?.symbol" />
            <el-row
              :gutter="20"
              align="middle"
              justify="space-between"
              class="rowItemBox"
            >
              <el-col :span="8">
                <span>Quantity</span>
              </el-col>
              <el-col :span="16">
                <InputNumber v-model.number="orderCount" size="small" />
              </el-col>
            </el-row>
            <el-row
              :gutter="20"
              align="middle"
              justify="space-between"
              class="rowItemBox"
            >
              <el-col :span="8">
                <span>Deposit required</span>
              </el-col>
              <el-col :span="16">
                <p class="textRight">100000</p>
              </el-col>
            </el-row>
            <el-row
              :gutter="20"
              align="middle"
              justify="space-between"
              class="rowItemBox"
            >
              <el-col :span="8">
                <span>Stop surplus</span>
              </el-col>
              <el-col :span="4">
                <el-switch />
              </el-col>
            </el-row>
            <el-row
              :gutter="20"
              align="middle"
              justify="space-between"
              class="rowItemBox"
            >
              <el-col :span="8">
                <span>Stop loss</span>
              </el-col>
              <el-col :span="4">
                <el-switch />
              </el-col>
            </el-row>
            <div class="btnContainer">
              <div class="btnBox" @click="createOrder">
                {{ drawerData.type === 'buy' ? 'Buy' : 'Sell' }}
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="Limit">
          <template #label>
            <span class="tabName">Limit</span>
          </template>
          <div>
            <h3 class="symbolName">{{ drawerData?.symbol }}</h3>
            <DeepPrice :symbol="drawerData?.symbol" />
            <el-row :gutter="20" align="middle" class="rowItemBox">
              <el-col :span="8">
                <span>Price</span>
              </el-col>
              <el-col :span="16">
                <InputNumber v-model.number="limitPrice" size="small">
                  <template #tips>
                    <el-space>
                      <span :class="{ error: !limitPriceValid }">
                        price{{ drawerData.type === 'buy' ? '≤' : '≥'
                        }}{{ tipPrice }}
                      </span>
                    </el-space>
                  </template>
                </InputNumber>
              </el-col>
            </el-row>
            <el-row :gutter="20" align="middle" class="rowItemBox">
              <el-col :span="8">
                <span>Quantity</span>
              </el-col>
              <el-col :span="16">
                <InputNumber v-model.number="limitCount" size="small" />
              </el-col>
            </el-row>
            <el-row
              :gutter="20"
              align="middle"
              justify="space-between"
              class="rowItemBox"
            >
              <el-col :span="12">
                <span>Deposit required</span>
              </el-col>
              <el-col :span="12">
                <p class="textRight">{{ limitMarginRequired }}</p>
              </el-col>
            </el-row>
            <el-row
              :gutter="25"
              align="middle"
              justify="space-between"
              class="rowItemBox stopRow"
            >
              <el-col :span="6">
                <span>Stop surplus</span>
              </el-col>
              <el-col v-if="limitSpShow" :span="14">
                <InputNumber v-model.number="limitSpPrice" size="small">
                  <template #tips>
                    <el-space>
                      <span>
                        price
                        {{ drawerData.type === 'buy' ? '≥' : '≤' }}
                        {{ limitSpScope }}
                      </span>
                      <span>Profit {{ limitSpProfit }}</span>
                    </el-space>
                  </template>
                </InputNumber>
              </el-col>
              <el-col :span="4">
                <el-switch v-model="limitSpShow" @change="limitSpShowChange" />
              </el-col>
            </el-row>
            <el-row
              :gutter="25"
              align="middle"
              justify="space-between"
              class="rowItemBox stopRow"
            >
              <el-col :span="6">
                <span>Stop loss</span>
              </el-col>
              <el-col v-if="limitSlShow" :span="14">
                <InputNumber v-model.number="limitSlPrice" size="small">
                  <template #tips>
                    <el-space>
                      <span>
                        price
                        {{ drawerData.type === 'buy' ? '≤' : '≥' }}
                        {{ limitSlScope }}
                      </span>
                      <span>Profit {{ limitSlProfit }}</span>
                    </el-space>
                  </template>
                </InputNumber>
              </el-col>
              <el-col :span="4">
                <el-switch v-model="limitSlShow" @change="limitSlShowChange" />
              </el-col>
            </el-row>
            <div class="btnContainer">
              <div class="btnBox" @click="createHangingOrder">
                {{ drawerData.type === 'buy' ? 'Buy' : 'Sell' }}
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref, defineProps, computed } from 'vue';
import { useSocketStore, useCommonStore } from '@/store/index.js';
import InputNumber from '@/components/common/inputNumber.vue';
import DeepPrice from './deepPrice.vue';
import { ElLoading } from 'element-plus';
const props = defineProps({
  drawerData: {
    type: Object,
    default: () => ({
      type: 'buy',
      symbol: '',
    }),
  },
});
const socketStore = useSocketStore();
const commonStore = useCommonStore();
// 弹窗是否可见
const visible = ref(false);
// tab
const activeTab = ref('Market');
// 现价手数
const orderCount = ref(1);
// 挂单价格
const limitPrice = ref(0);
// 挂单手数
const limitCount = ref(1);
// 是否止损
const limitSlShow = ref(false);
// 是否止盈
const limitSpShow = ref(false);
// 止损价
const limitSlPrice = ref(0);
// 止盈价
const limitSpPrice = ref(0);
// 产品基本信息
const currentSblBasicData = computed(
  () => socketStore.sblBasicData[props.drawerData?.symbol] || {}
);
// 产品实时报价
const currentSblData = computed(
  () => socketStore.liveData[props.drawerData?.symbol] || {}
);
// 精度
const digit = computed(() => currentSblBasicData.value.digits);
// 产品挂单距离
const stopl = computed(
  () => currentSblBasicData.value.stopl * Math.pow(10, -digit.value) * 10
);
// 杠杆
const consize = computed(() => currentSblBasicData.value.consize);
// 限价参考保证金
const limitMarginRequired = computed(() =>
  (
    (currentSblBasicData.value.consize * limitCount.value * limitPrice.value) /
    100
  ).toFixed(2)
);
// 挂单价格参考
const tipPrice = computed(() => {
  const a = currentSblData.value.ask;
  const b = currentSblData.value.bid;
  if (props.drawerData.type === 'buy') {
    return b ? (b - stopl.value).toFixed(digit.value) : 0;
  } else {
    return a ? (a + stopl.value).toFixed(digit.value) : 0;
  }
});
// 挂单价格是否有效
const limitPriceValid = computed(() => {
  if (props.drawerData.type === 'buy') {
    return tipPrice.value >= limitPrice.value;
  } else {
    return limitPrice.value >= tipPrice.value;
  }
});
// 挂单止损范围
const limitSlScope = computed(() => {
  if (props.drawerData.type === 'buy') {
    return limitPrice.value
      ? (limitPrice.value - stopl.value).toFixed(digit.value)
      : 0;
  } else {
    return limitPrice.value
      ? (limitPrice.value + stopl.value).toFixed(digit.value)
      : 0;
  }
});
// 挂单预计止损
const limitSlProfit = computed(() => {
  if (props.drawerData.type === 'buy') {
    return limitPrice.value && limitSlPrice.value
      ? (
          (limitSlPrice.value - limitPrice.value) *
          limitCount.value *
          consize.value
        ).toFixed(digit.value)
      : 0;
  } else {
    return limitPrice.value && limitSlPrice.value
      ? (
          (limitPrice.value - limitSlPrice.value) *
          limitCount.value *
          consize.value
        ).toFixed(digit.value)
      : 0;
  }
});
// 挂单止盈范围
const limitSpScope = computed(() => {
  if (props.drawerData.type === 'buy') {
    return limitPrice.value
      ? (limitPrice.value + stopl.value).toFixed(digit.value)
      : 0;
  } else {
    return limitPrice.value
      ? (limitPrice.value - stopl.value).toFixed(digit.value)
      : 0;
  }
});
// 挂单止盈预计盈利
const limitSpProfit = computed(() => {
  if (props.drawerData.type === 'buy') {
    return limitPrice.value && limitSpPrice.value
      ? (
          (limitSpPrice.value - limitPrice.value) *
          limitCount.value *
          consize.value
        ).toFixed(digit.value)
      : 0;
  } else {
    return limitPrice.value && limitSpPrice.value
      ? (
          (limitPrice.value - limitSpPrice.value) *
          limitCount.value *
          consize.value
        ).toFixed(digit.value)
      : 0;
  }
});
// 开启关闭挂单止盈
const limitSpShowChange = (val) => {
  if (val) {
    limitSpPrice.value = limitSpScope.value;
  }
};
// 开启关闭挂单止损
const limitSlShowChange = (val) => {
  if (val) {
    limitSlPrice.value = limitSlScope.value;
  }
};
// 开启弹窗
const show = () => {
  visible.value = true;
  setTimeout(() => {
    limitPrice.value = Number(tipPrice.value);
  }, 500);
};
// 关闭弹窗
const close = () => {
  visible.value = false;
  orderCount.value = 1;
  limitPrice.value = 0;
  activeTab.value = 'Market';
  limitCount.value = 0;
  limitSlShow.value = false;
  limitSpShow.value = false;
  limitSlPrice.value = 0;
  limitSpPrice.value = 0;
};
// 市价下单
const createOrder = () => {
  const params = {
    sbl: props.drawerData?.symbol,
    vol: orderCount.value,
    // price: currentPrice.value,
    type: props.drawerData?.type === 'buy' ? 0 : 1,
  };
  socketStore.marketCreate(params);
  close();
  const instance = ElLoading.service({ lock: true, text: 'wait a minute' });
  commonStore.setLoadingInstance(instance);
};
// 限价挂单
const createHangingOrder = () => {
  const params = {
    sbl: props.drawerData?.symbol,
    vol: limitCount.value,
    price: limitPrice.value,
    type: props.drawerData?.type === 'buy' ? 2 : 3,
    sl: limitSlShow.value ? limitSlPrice.value : undefined,
    tp: limitSpShow.value ? limitSpPrice.value : undefined,
  };
  socketStore.positionCreate(params);
  close();
  const instance = ElLoading.service({ lock: true, text: 'wait a minute' });
  commonStore.setLoadingInstance(instance);
};
defineExpose({
  show,
});
</script>
<style scoped lang="less">
@import '@/assets/css/component/trade/tradeDrawer.less';
</style>
<style lang="less">
.traderDrawerContainer {
  padding: 0;
  --el-drawer-padding-primary: 0;
  --el-color-primary: #0c3d93;
}
</style>
