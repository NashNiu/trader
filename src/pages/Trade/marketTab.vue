<template>
  <div>
    <h3 class="symbolName">{{ symbol }}</h3>
    <DeepPrice :symbol="symbol" />
    <el-row
      :gutter="20"
      align="middle"
      justify="space-between"
      class="rowItemBox"
    >
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
      <el-col :span="8">
        <span>{{ t('trade.depositRequired') }}</span>
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
        <span>{{ t('trade.stopSurplus') }}</span>
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
                {{ type === 'buy' ? '≥' : '≤' }}
                {{ spScope }}
              </span>
              <span>{{ t('common.profit') }} {{ spProfit }}</span>
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
        <span>{{ t('trade.stopLoss') }}</span>
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
                {{ type === 'buy' ? '≤' : '≥' }}
                {{ slScope }}
              </span>
              <span>{{ t('common.profit') }} {{ slProfit }}</span>
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
import { calcMargin } from '@/utils/tools.js';
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

// 产品基本信息
const currentSblBasicData = computed(
  () => socketStore.sblBasicData[props.symbol] || {}
);
// 基础货币
const baseSymbol = computed(() => currentSblBasicData.value.cur_base);
// 市价手数
const count = ref(0.01);
// 市价是否止盈
const spShow = ref(false);
// 市价是否止损
const slShow = ref(false);
// 市价止盈价格
const spPrice = ref(0);
// 市价止损价格
const slPrice = ref(0);
// 产品实时报价
const currentSblData = computed(
  () => socketStore.liveData[props?.symbol] || {}
);
// 实时ask
const ask = computed(() => currentSblData.value.ask);
// 实时bid
const bid = computed(() => currentSblData.value.bid);
// 市价参考保证金
const marginRequired = computed(() => {
  const type = getSymbolType(props.symbol);
  const ifCrossForex =
    type === 3 &&
    !props.symbol.startsWith('USD') &&
    !props.symbol.endsWith('USD');
  if (props.type === 'buy') {
    const price = ifCrossForex
      ? socketStore.liveData[baseSymbol.value + 'USD'].bid
      : bid.value;
    return calcMargin({
      symbol: props.symbol,
      consize: props.conSize,
      count: count.value,
      marginInt: props.marginInit,
      price,
      type,
    });
    // return ((props.conSize * count.value) / 100).toFixed(2);
  } else {
    const price = ifCrossForex
      ? socketStore.liveData[baseSymbol.value + 'USD'].ask
      : bid.value;
    return calcMargin({
      symbol: props.symbol,
      consize: props.conSize,
      count: count.value,
      marginInt: props.marginInit,
      price,
      type,
    });
    // return ((props.conSize * count.value) / 100).toFixed(2);
  }
});
// 市价止盈范围
const spScope = computed(() => {
  if (props.type === 'buy') {
    return bid.value ? (bid.value + props.stopL).toFixed(props.digit) : 0;
  } else {
    return ask.value ? (ask.value - props.stopL).toFixed(props.digit) : 0;
  }
});
// 市价止损范围
const slScope = computed(() => {
  if (props.type === 'buy') {
    return bid.value ? (bid.value - props.stopL).toFixed(props.digit) : 0;
  } else {
    return ask.value ? (ask.value + props.stopL).toFixed(props.digit) : 0;
  }
});
// 市价止盈预计
const spProfit = computed(() => {
  if (props.type === 'buy') {
    return spPrice.value && bid.value
      ? ((spPrice.value - bid.value) * count.value * props.conSize).toFixed(
          props.digit
        )
      : 0;
  } else {
    return spPrice.value && ask.value
      ? ((ask.value - spPrice.value) * count.value * props.conSize).toFixed(
          props.digit
        )
      : 0;
  }
});
// 市价止损预计
const slProfit = computed(() => {
  if (props.type === 'buy') {
    return slPrice.value && bid.value
      ? ((slPrice.value - bid.value) * count.value * props.conSize).toFixed(
          props.digit
        )
      : 0;
  } else {
    return slPrice.value && ask.value
      ? ((ask.value - slPrice.value) * count.value * props.conSize).toFixed(
          props.digit
        )
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
  if (props.type === 'buy') {
    return spPrice.value >= spScope.value;
  } else {
    return spPrice.value <= spScope.value;
  }
});
// 市价止损是否有效
const slPriceValid = computed(() => {
  if (props.type === 'buy') {
    return slPrice.value <= slScope.value;
  } else {
    return slPrice.value >= slScope.value;
  }
});
// 手数是否有效
const countValid = computed(() => count.value >= 0.01 && count.value <= 5);
// 重置数据
const resetValue = () => {
  count.value = 0.01;
  spShow.value = false;
  slShow.value = false;
  spPrice.value = 0;
  slPrice.value = 0;
};
// 市价下单
const createOrder = () => {
  if (!countValid.value) {
    ElMessage.error('INVALID Quantity');
    return;
  }
  if (slShow.value && !slPriceValid.value) {
    ElMessage.error('INVALID STOP LOSS PRICE');
    return;
  }
  if (spShow.value && !spPriceValid.value) {
    ElMessage.error('INVALID STOP PROFIT PRICE');
    return;
  }
  const params = {
    sbl: props?.symbol,
    vol: count.value,
    type: props?.type === 'buy' ? 0 : 1,
    sl: slShow.value ? slPrice.value : undefined,
    tp: spShow.value ? spPrice.value : undefined,
  };
  socketStore.marketCreate(params);
  emit('close');
  const instance = ElLoading.service({ lock: true, text: 'wait a minute' });
  commonStore.setLoadingInstance(instance);
};
defineExpose({
  resetValue,
});
</script>
<style scoped lang="less">
@import '@/assets/css/component/trade/tradeDrawer.less';
</style>
