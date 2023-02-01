<template>
  <div class="deepPriceBox">
    <div class="deepPriceTitle">
      <el-row :gutter="20">
        <el-col :span="12">
          <span>{{ t('trade.bid') }}</span>
        </el-col>
        <el-col :span="12">
          <span>{{ t('trade.ask') }}</span>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div
          v-for="(item, index) in symbolDeepBid"
          :key="index"
          :class="`deepPriceItemBox ${item.change}`"
        >
          <span>
            <span class="index">{{ index + 1 }}</span>
            <span class="deepPrice">
              {{ item.price.toFixed(symbolBasicData?.digits ?? 2) }}
            </span>
          </span>
          <span class="vol">{{ item.vol }}</span>
        </div>
      </el-col>
      <el-col :span="12">
        <div
          v-for="(item, index) in symbolDeepAsk"
          :key="index"
          :class="`deepPriceItemBox ${item.change}`"
        >
          <span>
            <span class="index ask">{{ index + 1 }}</span>
            <span class="deepPrice">
              {{ item.price.toFixed(symbolBasicData?.digits ?? 2) }}
            </span>
          </span>
          <span class="vol">{{ item.vol }}</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useSocketStore } from '@/store/index.js';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const props = defineProps({
  symbol: {
    type: String,
    default: '',
  },
});
const socketStore = useSocketStore();
const symbolBasicData = computed(() => {
  return socketStore.sblBasicData?.[props.drawerData?.symbol];
});
const symbolDeepAsk = computed(() => {
  return (
    socketStore.deepQuotation?.[props.symbol]?.filter(
      (item) => item.type === 1
    ) ?? []
  );
});
const symbolDeepBid = computed(() => {
  return (
    socketStore.deepQuotation?.[props.symbol]?.filter(
      (item) => item.type === 2
    ) ?? []
  );
});
</script>
<style lang="less" scoped>
.deepPriceBox {
  margin-top: 20px;
  .deepPriceTitle {
    font-size: 20px;
  }
  .deepPriceItemBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    font-size: 14px;
    padding: 5px;
    &.up {
      background: #e3fcf3;
    }
    &.down {
      background: #ffebed;
    }
    .index {
      margin-right: 5px;
      display: inline-block;
      padding: 2px 4px;
      background: #e34d59;
      color: #ffffff;
      border-radius: 4px;
      font-size: 12px;
      &.ask {
        background: #078d5c;
      }
    }
    .deepPrice {
    }
    .vol {
    }
  }
}
</style>
