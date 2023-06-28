<template>
  <div>
    <h3 class="symbolName">{{ symbol }}</h3>
    <DeepPrice :symbol="symbol" />
    <el-row :gutter="20" align="middle" class="rowItemBox">
      <el-col :span="8">
        <span>{{ t('common.price') }}</span>
      </el-col>
      <el-col :span="16">
        <InputNumber
          v-model.number="limitPrice"
          size="small"
          :step="step"
          :digit="digit"
        >
          <template #tips>
            <el-space>
              <span :class="{ error: !limitPriceValid }">
                {{ t('common.price') }}{{ type === 'buy' ? '≤' : '≥'
                }}{{ limitPriceScope }}
              </span>
            </el-space>
          </template>
        </InputNumber>
      </el-col>
    </el-row>
    <el-row :gutter="20" align="middle" class="rowItemBox">
      <el-col :span="8">
        <span>{{ t('common.quantity') }}</span>
      </el-col>
      <el-col :span="16">
        <InputNumber v-model.number="count" size="small" :step="0.01">
          <template #tips>
            <span :class="{ error: !countValid }">
              {{ t('trade.quantityRange') }} 0.01-5
            </span>
          </template>
        </InputNumber>
      </el-col>
    </el-row>
    <el-row
      :gutter="20"
      align="middle"
      justify="space-between"
      class="rowItemBox"
    >
      <el-col :span="12">
        <span>{{ t('trade.depositRequired') }}</span>
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
        <span>{{ t('trade.stopSurplus') }}</span>
      </el-col>
      <el-col v-if="limitSpShow" :span="14">
        <InputNumber
          v-model.number="limitSpPrice"
          size="small"
          :step="step"
          :digit="digit"
        >
          <template #tips>
            <el-space>
              <span :class="{ error: !limitSpPriceValid }">
                {{ t('common.price') }}
                {{ type === 'buy' ? '≥' : '≤' }}
                {{ limitSpScope }}
              </span>
              <span>{{ t('common.profit') }} {{ limitSpProfit }}</span>
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
        <span>{{ t('trade.stopLoss') }}</span>
      </el-col>
      <el-col v-if="limitSlShow" :span="14">
        <InputNumber
          v-model.number="limitSlPrice"
          size="small"
          :step="step"
          :digit="digit"
        >
          <template #tips>
            <el-space>
              <span :class="{ error: !limitSlPriceValid }">
                {{ t('common.price') }}
                {{ type === 'buy' ? '≤' : '≥' }}
                {{ limitSlScope }}
              </span>
              <span>{{ t('common.profit') }} {{ limitSlProfit }}</span>
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
        {{ type === 'buy' ? t('common.buy') : t('common.sell') }}
      </div>
    </div>
  </div>
</template>
<script setup>
import InputNumber from '@/components/common/inputNumber.vue';
import DeepPrice from './deepPrice.vue';
import { useCommonStore, useSocketStore } from '@/store/index.js';
import { computed, ref } from 'vue';
import { ElLoading, ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { calcMargin, calcProfit, getProfitSymbol } from '@/utils/tools.js';
import { getSymbolType } from '@/config/symbol.js';
const { t } = useI18n();
const props = defineProps({
  type: {
    type: String,
    default: 'buy',
  },
  symbol: {
    type: String,
    default: '',
  },
  digit: {
    type: Number,
    default: 0,
  },
  step: {
    type: Number,
    default: 1,
  },
  stopL: {
    type: Number,
    default: 0,
  },
  conSize: {
    type: Number,
    default: 0,
  },
  marginInit: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(['close']);
const socketStore = useSocketStore();
const commonStore = useCommonStore();

// 挂单价格
const limitPrice = ref(0);
// 挂单手数
const count = ref(0.01);
// 是否止损
const limitSlShow = ref(false);
// 是否止盈
const limitSpShow = ref(false);
// 止损价
const limitSlPrice = ref(0);
// 止盈价
const limitSpPrice = ref(0);
// 产品实时报价
const currentSblData = computed(
  () => socketStore.liveData[props?.symbol] || {}
);
// 产品基本信息
const currentSblBasicData = computed(
  () => socketStore.sblBasicData[props.symbol] || {}
);
// 基础货币
const baseSymbol = computed(() => currentSblBasicData.value.cur_base);
// 结算货币
// const profitSymbol = computed(() => currentSblBasicData.value.cur_profit);
// 实时ask
const ask = computed(() => currentSblData.value.ask);
// 实时bid
const bid = computed(() => currentSblData.value.bid);

// 计算浮动盈亏时的汇率
const profitRate = computed(() => {
  const { rate, symbol, multiply } = getProfitSymbol(
    props.symbol,
    currentSblBasicData.value
  );
  if (rate) {
    return rate;
  } else {
    if (props.type === 'buy') {
      const exchange = socketStore.liveData[symbol]?.bid || 1;
      return multiply ? exchange : 1 / exchange;
    } else {
      const exchange = socketStore.liveData[symbol]?.ask || 1;
      return multiply ? exchange : 1 / exchange;
    }
  }
});
// 挂单参考保证金
const limitMarginRequired = computed(
  () => {
    const type = getSymbolType(props.symbol);
    const ifCrossForex =
      type === 3 &&
      !props.symbol.startsWith('USD') &&
      !props.symbol.endsWith('USD');

    const price = ifCrossForex
      ? props.type === 'buy'
        ? socketStore.liveData[baseSymbol.value + 'USD']?.bid ??
          1 / socketStore.liveData['USD' + baseSymbol.value]?.bid ??
          1
        : socketStore.liveData[baseSymbol.value + 'USD']?.ask ??
          1 / socketStore.liveData['USD' + baseSymbol.value]?.ask ??
          1
      : limitPrice.value;
    return calcMargin({
      symbol: props.symbol,
      consize: props.conSize,
      count: count.value,
      marginInt: props.marginInit,
      price,
      type,
    });
  }
  // ((props.conSize * count.value) / 100).toFixed(2)
);
// 挂单价格范围
const limitPriceScope = computed(() => {
  if (props.type === 'buy') {
    return bid.value ? (bid.value - props.stopL).toFixed(props.digit) : 0;
  } else {
    return ask.value ? (ask.value + props.stopL).toFixed(props.digit) : 0;
  }
});
// 挂单价格是否有效
const limitPriceValid = computed(() => {
  if (props.type === 'buy') {
    return limitPriceScope.value >= limitPrice.value;
  } else {
    return limitPrice.value >= limitPriceScope.value;
  }
});
// 挂单止损范围
const limitSlScope = computed(() => {
  if (props.type === 'buy') {
    return limitPrice.value
      ? (limitPrice.value - props.stopL).toFixed(props.digit)
      : 0;
  } else {
    return limitPrice.value
      ? (limitPrice.value + props.stopL).toFixed(props.digit)
      : 0;
  }
});
// 挂单预计止损
const limitSlProfit = computed(() => {
  let createPrice = limitSlPrice.value;
  let closePrice = limitPrice.value;
  let rate = profitRate.value;
  const consize = props.conSize;
  const lot = count.value;
  if (props.type === 'buy') {
    createPrice = limitPrice.value;
    closePrice = limitSlPrice.value;
  }
  return calcProfit({ consize, closePrice, createPrice, lot, rate });
});
// 挂单止盈范围
const limitSpScope = computed(() => {
  if (props.type === 'buy') {
    return limitPrice.value
      ? (limitPrice.value + props.stopL).toFixed(props.digit)
      : 0;
  } else {
    return limitPrice.value
      ? (limitPrice.value - props.stopL).toFixed(props.digit)
      : 0;
  }
});
// 挂单预计盈利
const limitSpProfit = computed(() => {
  let createPrice = limitSpPrice.value;
  let closePrice = limitPrice.value;
  let rate = profitRate.value;
  const consize = props.conSize;
  const lot = count.value;
  if (props.type === 'buy') {
    createPrice = limitPrice.value;
    closePrice = limitSpPrice.value;
  }
  return calcProfit({ consize, closePrice, createPrice, lot, rate });
});
// 挂单止损是否有效
const limitSlPriceValid = computed(() => {
  if (props.type === 'buy') {
    return limitSlPrice.value <= limitSlScope.value;
  } else {
    return limitSlPrice.value >= limitSlScope.value;
  }
});
// 挂单止盈是否有效
const limitSpPriceValid = computed(() => {
  if (props.type === 'buy') {
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
// 初始化数据
const initValue = () => {
  limitPrice.value = Number(limitPriceScope.value);
};
// 手数是否有效
const countValid = computed(() => count.value >= 0.01 && count.value <= 5);
// 重置数据
const resetValue = () => {
  limitPrice.value = 0;
  count.value = 0.01;
  limitSlShow.value = false;
  limitSpShow.value = false;
  limitSlPrice.value = 0;
  limitSpPrice.value = 0;
};
// 限价挂单
const createHangingOrder = () => {
  if (!countValid.value) {
    ElMessage.error('INVALID Quantity');
    return;
  }
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
    sbl: props.symbol,
    vol: count.value,
    price: limitPrice.value,
    type: props?.type === 'buy' ? 2 : 3,
    sl: limitSlShow.value ? limitSlPrice.value : undefined,
    tp: limitSpShow.value ? limitSpPrice.value : undefined,
  };
  socketStore.positionCreate(params);
  emit('close');
  const instance = ElLoading.service({ lock: true, text: 'wait a minute' });
  commonStore.setLoadingInstance(instance);
};
defineExpose({
  initValue,
  resetValue,
});
</script>
<style scoped lang="less">
@import '@/assets/css/component/trade/tradeDrawer.less';
</style>
