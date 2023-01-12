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
                <p class="textRight">{{ marginRequired }}</p>
              </el-col>
            </el-row>
            <el-row
              :gutter="20"
              align="middle"
              justify="space-between"
              class="rowItemBox stopRow"
            >
              <el-col :span="6">
                <span>Stop surplus</span>
              </el-col>
              <el-col v-if="spShow" :span="14">
                <InputNumber v-model.number="spPrice" size="small">
                  <template #tips>
                    <el-space>
                      <span :class="{ error: !spPriceValid }">
                        price
                        {{ drawerData.type === 'buy' ? '≥' : '≤' }}
                        {{ spScope }}
                      </span>
                      <span>Profit {{ spProfit }}</span>
                    </el-space>
                  </template>
                </InputNumber>
              </el-col>
              <el-col :span="4">
                <el-switch v-model="spShow" @change="spShowChange" />
              </el-col>
            </el-row>
            <el-row
              :gutter="20"
              align="middle"
              justify="space-between"
              class="rowItemBox stopRow"
            >
              <el-col :span="6">
                <span>Stop loss</span>
              </el-col>
              <el-col v-if="slShow" :span="14">
                <InputNumber v-model.number="slPrice" size="small">
                  <template #tips>
                    <el-space>
                      <span :class="{ error: !slPriceValid }">
                        price
                        {{ drawerData.type === 'buy' ? '≤' : '≥' }}
                        {{ slScope }}
                      </span>
                      <span>Profit {{ slProfit }}</span>
                    </el-space>
                  </template>
                </InputNumber>
              </el-col>
              <el-col :span="4">
                <el-switch v-model="slShow" @change="slShowChange" />
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
                        }}{{ limitPriceScope }}
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
                      <span :class="{ error: !limitSpPriceValid }">
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
                      <span :class="{ error: !limitSlPriceValid }">
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
import { ElLoading, ElMessage } from 'element-plus';
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
// 市价手数
const orderCount = ref(1);
// 市价是否止盈
const spShow = ref(false);
// 市价是否止损
const slShow = ref(false);
// 市价止盈价格
const spPrice = ref(0);
// 市价止损价格
const slPrice = ref(0);
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
// 实时ask
const ask = computed(() => currentSblData.value.ask);
// 实时bid
const bid = computed(() => currentSblData.value.bid);
// 精度
const digit = computed(() => currentSblBasicData.value.digits);
// 产品挂单距离
const stopl = computed(
  () => currentSblBasicData.value.stopl * Math.pow(10, -digit.value) * 10
);
// 杠杆
const consize = computed(() => currentSblBasicData.value.consize);
// 市价参考保证金
const marginRequired = computed(() => {
  if (props.drawerData.type === 'buy') {
    return (
      (currentSblBasicData.value.consize *
        orderCount.value *
        currentSblData.value.bid) /
      100
    ).toFixed(2);
  } else {
    return (
      (currentSblBasicData.value.consize *
        orderCount.value *
        currentSblData.value.ask) /
      100
    ).toFixed(2);
  }
});
// 市价止盈范围
const spScope = computed(() => {
  if (props.drawerData.type === 'buy') {
    return bid.value ? (bid.value + stopl.value).toFixed(digit.value) : 0;
  } else {
    return ask.value ? (ask.value - stopl.value).toFixed(digit.value) : 0;
  }
});
// 市价止盈预计
const spProfit = computed(() => {
  if (props.drawerData.type === 'buy') {
    return spPrice.value && bid.value
      ? (
          (spPrice.value - bid.value) *
          orderCount.value *
          consize.value
        ).toFixed(digit.value)
      : 0;
  } else {
    return spPrice.value && ask.value
      ? (
          (ask.value - spPrice.value) *
          orderCount.value *
          consize.value
        ).toFixed(digit.value)
      : 0;
  }
});
// 市价止损范围
const slScope = computed(() => {
  if (props.drawerData.type === 'buy') {
    return bid.value ? (bid.value - stopl.value).toFixed(digit.value) : 0;
  } else {
    return ask.value ? (ask.value + stopl.value).toFixed(digit.value) : 0;
  }
});
// 市价止损预计
const slProfit = computed(() => {
  if (props.drawerData.type === 'buy') {
    return slPrice.value && bid.value
      ? (
          (slPrice.value - bid.value) *
          orderCount.value *
          consize.value
        ).toFixed(digit.value)
      : 0;
  } else {
    return slPrice.value && ask.value
      ? (
          (ask.value - slPrice.value) *
          orderCount.value *
          consize.value
        ).toFixed(digit.value)
      : 0;
  }
});
// 市价止盈开启关闭
const spShowChange = (val) => {
  if (val) {
    spPrice.value = Number(spScope.value);
  }
};
// 市价止损开启关闭
const slShowChange = (val) => {
  if (val) {
    slPrice.value = Number(slScope.value);
  }
};
// 市价止盈是否有效
const spPriceValid = computed(() => {
  if (props.drawerData.type === 'buy') {
    return spPrice.value >= spScope.value;
  } else {
    return spPrice.value <= spScope.value;
  }
});
// 市价止损是否有效
const slPriceValid = computed(() => {
  if (props.drawerData.type === 'buy') {
    return slPrice.value <= slScope.value;
  } else {
    return slPrice.value >= slScope.value;
  }
});
// 挂单参考保证金
const limitMarginRequired = computed(() =>
  (
    (currentSblBasicData.value.consize * limitCount.value * limitPrice.value) /
    100
  ).toFixed(2)
);
// 挂单价格参考
const limitPriceScope = computed(() => {
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
    return limitPriceScope.value >= limitPrice.value;
  } else {
    return limitPrice.value >= limitPriceScope.value;
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
// 挂单预计盈利
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
// 挂单止损是否有效
const limitSlPriceValid = computed(() => {
  if (props.drawerData.type === 'buy') {
    return limitSlPrice.value <= limitSlScope.value;
  } else {
    return limitSlPrice.value >= limitSlScope.value;
  }
});
// 挂单止盈是否有效
const limitSpPriceValid = computed(() => {
  if (props.drawerData.type === 'buy') {
    return limitSpPrice.value >= limitSpScope.value;
  } else {
    return limitSpPrice.value <= limitSpScope.value;
  }
});
// 开启关闭挂单止盈
const limitSpShowChange = (val) => {
  if (val) {
    limitSpPrice.value = Number(limitSpScope.value);
  }
};
// 开启关闭挂单止损
const limitSlShowChange = (val) => {
  if (val) {
    limitSlPrice.value = Number(limitSlScope.value);
  }
};
// 开启弹窗
const show = () => {
  visible.value = true;
  setTimeout(() => {
    limitPrice.value = Number(limitPriceScope.value);
  }, 500);
};
// 关闭弹窗
const close = () => {
  visible.value = false;
  activeTab.value = 'Market';
  orderCount.value = 1;
  spShow.value = false;
  slShow.value = false;
  spPrice.value = 0;
  slPrice.value = 0;
  limitPrice.value = 0;
  limitCount.value = 0;
  limitSlShow.value = false;
  limitSpShow.value = false;
  limitSlPrice.value = 0;
  limitSpPrice.value = 0;
};
// 市价下单
const createOrder = () => {
  if (slShow.value && !slPriceValid.value) {
    ElMessage.error('INVALID STOP LOSS PRICE');
    return;
  }
  if (spShow.value && !spPriceValid.value) {
    ElMessage.error('INVALID STOP PROFIT PRICE');
    return;
  }
  const params = {
    sbl: props.drawerData?.symbol,
    vol: orderCount.value,
    type: props.drawerData?.type === 'buy' ? 0 : 1,
    sl: slShow.value ? slPrice.value : undefined,
    tp: spShow.value ? spPrice.value : undefined,
  };
  socketStore.marketCreate(params);
  close();
  const instance = ElLoading.service({ lock: true, text: 'wait a minute' });
  commonStore.setLoadingInstance(instance);
};
// 限价挂单
const createHangingOrder = () => {
  if (!limitPriceValid.value) {
    ElMessage.error('INVALID LIMIT PRICE');
    return;
  }
  if (limitSpShow.value && !limitSpPriceValid.value) {
    ElMessage.error('INVALID STOP PROFIT PRICE');
    return;
  }
  if (limitSlShow.value && !limitSlPriceValid.value) {
    ElMessage.error('INVALID STOP LOSS PRICE');
    return;
  }
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
  //--el-color-primary: #0c3d93;
}
</style>
