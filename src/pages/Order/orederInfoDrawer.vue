<template>
  <el-drawer
    v-model="visible"
    direction="rtl"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :with-header="false"
    class="orderDrawerContainer"
    size="35%"
  >
    <div class="title">
      <el-icon class="closeIcon" @click="close"><ArrowRightBold /></el-icon>
    </div>
    <div class="contentBox">
      <p class="type">{{ drawerData.actionType }}</p>
      <h3 class="symbolName">{{ drawerData.symbol }}</h3>
      <p class="price">{{ drawerData.price }}</p>
      <p class="time">{{ drawerData.createTime }}</p>
      <div class="orderInfoBox">
        <div class="infoItemBox">
          <span class="key">{{ t('order.orderNumber') }}</span>
          <span class="value">{{ drawerData.position }}</span>
        </div>
        <div class="infoItemBox">
          <span class="key">{{ t('common.profit') }}</span>
          <span class="value">{{ drawerData.profit }}</span>
        </div>
        <div class="infoItemBox">
          <span class="key">{{ t('common.quantity') }}</span>
          <span class="value">{{ drawerData.lot }}</span>
        </div>

        <div class="infoItemBox">
          <span class="key">{{ t('common.currentPrice') }}</span>
          <span class="value">{{ drawerData.currentPrice }}</span>
        </div>
        <template v-if="drawerType === 'close'">
          <div class="infoItemBox">
            <span class="key">{{ t('common.stopLossPrice') }}</span>
            <span class="value">{{ drawerData.sl }}</span>
          </div>
          <div class="infoItemBox">
            <span class="key">{{ t('common.stopSurplusPrice') }}</span>
            <span class="value">{{ drawerData.tp }}</span>
          </div>
        </template>
        <template v-else>
          <el-row
            :gutter="20"
            align="middle"
            justify="space-between"
            class="infoItemBox"
            style="height: 100px"
          >
            <el-col :span="6">
              <span>{{ t('common.stopSurplusPrice') }}</span>
            </el-col>
            <el-col v-if="spShow" :span="14">
              <InputNumber
                v-model.number="spPrice"
                size="small"
                :step="step"
                :digit="digit"
              >
                <template #tips>
                  <el-space>
                    <span :class="{ error: !spPriceValid }">
                      {{ t('common.price') }}
                      {{ drawerData.action === 0 ? '≥' : '≤' }}
                      {{ spScope }}
                    </span>
                    <span>{{ t('common.profit') }} {{ spProfit }}</span>
                  </el-space>
                </template>
              </InputNumber>
            </el-col>
            <el-col :span="3">
              <el-switch v-model="spShow" @change="spShowChange" />
            </el-col>
          </el-row>
          <el-row
            :gutter="20"
            align="middle"
            justify="space-between"
            class="infoItemBox"
            style="height: 100px"
          >
            <el-col :span="6">
              <span>{{ t('common.stopLossPrice') }}</span>
            </el-col>
            <el-col v-if="slShow" :span="14">
              <InputNumber
                v-model.number="slPrice"
                size="small"
                :step="step"
                :digit="digit"
              >
                <template #tips>
                  <el-space>
                    <span :class="{ error: !slPriceValid }">
                      {{ t('common.price') }}
                      {{ drawerData.action === 0 ? '≤' : '≥' }}
                      {{ slScope }}
                    </span>
                    <span>{{ t('common.profit') }} {{ slProfit }}</span>
                  </el-space>
                </template>
              </InputNumber>
            </el-col>
            <el-col :span="3">
              <el-switch v-model="slShow" @change="slShowChange" />
            </el-col>
          </el-row>
        </template>
        <div class="infoItemBox">
          <span class="key">{{ t('common.overnightFee') }}</span>
          <span class="value">{{ drawerData.storage }}</span>
        </div>
      </div>
      <div class="btnContainer">
        <div
          v-if="drawerType === 'close'"
          class="btnBox"
          @click="closePosition"
        >
          {{ t('order.closePosition') }}
        </div>
        <div v-else class="btnBox" @click="editPosition">
          {{ t('common.submit') }}
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useCommonStore, useSocketStore } from '@/store/index.js';
import { ElLoading, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import InputNumber from '@/components/common/inputNumber.vue';
import { calcProfit, getProfitSymbol } from '@/utils/tools.js';

const { t } = useI18n();
const socketStore = useSocketStore();
const commonStore = useCommonStore();
const props = defineProps({
  drawerData: {
    type: Object,
    default: () => ({
      type: 'buy',
      symbol: '',
      action: 0,
      price: 0,
    }),
  },
  drawerType: {
    type: String,
    default: 'close',
  },
});
// 产品基本信息
const currentSblBasicData = computed(
  () => socketStore.sblBasicData[props.drawerData?.symbol] || {}
);
// 计算浮动盈亏时的汇率
const profitRate = computed(() => {
  const { rate, multiply } = getProfitSymbol(
    props.drawerData.symbol,
    currentSblBasicData.value
  );
  if (rate) {
    return rate;
  } else {
    const exchange = props.drawerData.price;
    return multiply ? exchange : 1 / exchange;
  }
});
// 合约
const conSize = computed(() => currentSblBasicData.value.consize);
// 精度
const digit = computed(() => currentSblBasicData.value.digits);
// 每次加减多少
const step = computed(() => Math.pow(10, -digit.value) * 100);
// 产品挂单距离
const stopL = computed(
  () => currentSblBasicData.value.stopl * Math.pow(10, -digit.value) * 10
);
const emit = defineEmits(['close']);
const visible = ref(false);
// 是否止盈
const spShow = ref(false);
// 是否止损
const slShow = ref(false);
// 止盈价格
const spPrice = ref(0);
// 止损价格
const slPrice = ref(0);
// 产品实时报价
const currentSblData = computed(
  () => socketStore.liveData[props.drawerData.symbol] || {}
);
// 实时ask
const ask = computed(() => currentSblData.value.ask);
// 实时bid
const bid = computed(() => currentSblData.value.bid);
const show = () => {
  visible.value = true;
  setTimeout(() => {
    spShow.value = !!props.drawerData.tp;
    slShow.value = !!props.drawerData.sl;
    spPrice.value = props.drawerData.tp;
    slPrice.value = props.drawerData.sl;
  }, 100);
};
const close = () => {
  visible.value = false;
  emit('close');
};
// 市价止损范围
const slScope = computed(() => {
  if (props.drawerData.action === 0) {
    return bid.value ? (bid.value - stopL.value).toFixed(digit.value) : 0;
  } else {
    return ask.value ? (ask.value + stopL.value).toFixed(digit.value) : 0;
  }
});
// 市价止盈范围
const spScope = computed(() => {
  if (props.drawerData.action === 0) {
    return bid.value ? (bid.value + stopL.value).toFixed(digit.value) : 0;
  } else {
    return ask.value ? (ask.value - stopL.value).toFixed(digit.value) : 0;
  }
});
// 市价止盈预计
const spProfit = computed(() => {
  const rate = profitRate.value;
  let createPrice = props.drawerData.price;
  let closePrice = spPrice.value;
  if (props.drawerData.action !== 0) {
    createPrice = spPrice.value;
    closePrice = props.drawerData.price;
  }
  return calcProfit({
    consize: conSize.value,
    closePrice,
    createPrice,
    rate,
    lot: props.drawerData.lot,
  });
});
// 市价止损预计
const slProfit = computed(() => {
  const rate = profitRate.value;
  let createPrice = props.drawerData.price;
  let closePrice = slPrice.value;
  if (props.drawerData.action !== 0) {
    createPrice = slPrice.value;
    closePrice = props.drawerData.price;
  }
  return calcProfit({
    consize: conSize.value,
    closePrice,
    createPrice,
    rate,
    lot: props.drawerData.lot,
  });
});
// 市价止盈是否有效
const spPriceValid = computed(() => {
  if (props.drawerData.action === 0) {
    return spPrice.value >= spScope.value;
  } else {
    return spPrice.value <= spScope.value;
  }
});
// 市价止损是否有效
const slPriceValid = computed(() => {
  if (props.drawerData.action === 0) {
    return slPrice.value <= slScope.value;
  } else {
    return slPrice.value >= slScope.value;
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
const closePosition = () => {
  socketStore.marketClose({ id: props.drawerData.position });
  close();
  const instance = ElLoading.service({ lock: true, text: 'wait a minute' });
  commonStore.setLoadingInstance(instance);
};
const editPosition = () => {
  if (slShow.value && !slPriceValid.value) {
    ElMessage.error('INVALID STOP LOSS PRICE');
    return;
  }
  if (spShow.value && !spPriceValid.value) {
    ElMessage.error('INVALID STOP PROFIT PRICE');
    return;
  }
  const params = {
    id: props.drawerData.position,
    sl: slShow.value ? slPrice.value : 0,
    tp: spShow.value ? spPrice.value : 0,
  };
  socketStore.updateHoldingOrder(params);
  close();
  const instance = ElLoading.service({ lock: true, text: 'wait a minute' });
  commonStore.setLoadingInstance(instance);
};
defineExpose({
  show,
});
</script>
<style scoped lang="less">
@import '@/assets/css/component/order/orderDrawer.less';
</style>
<style lang="less">
.orderDrawerContainer {
  padding: 0;
  --el-drawer-padding-primary: 0;
  --el-color-primary: #0c3d93;
}
</style>
