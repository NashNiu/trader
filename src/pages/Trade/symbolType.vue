<template>
  <el-card
    class="container"
    :body-style="{ paddingLeft: '0px', paddingRight: '0px' }"
  >
    <div class="typeBox">
      <div
        :class="{ item: true, active: activeType === 'popular' }"
        @click="setType('popular')"
      >
        {{ t('trade.popular') }}
      </div>
      <div
        :class="{ item: true, active: activeType === 'favorite' }"
        @click="setType('favorite')"
      >
        {{ t('trade.favorite') }}
      </div>
      <div
        :class="{ item: true, active: activeType === 'cryptocurrency' }"
        @click="setType('cryptocurrency')"
      >
        {{ t('trade.cryptocurrency') }}
      </div>
      <div
        :class="{ item: true, active: activeType === 'forex' }"
        @click="setType('forex')"
      >
        {{ t('trade.forex') }}
      </div>
      <div
        :class="{ item: true, active: activeType === 'commodity' }"
        @click="setType('commodity')"
      >
        {{ t('trade.commodity') }}
      </div>
      <div
        :class="{ item: true, active: activeType === 'index' }"
        @click="setType('index')"
      >
        {{ t('trade.index') }}
      </div>
      <!--      <div-->
      <!--        :class="{ item: true, active: activeType === 'stock' }"-->
      <!--        @click="setType('stock')"-->
      <!--      >-->
      <!--        {{ t('trade.stock') }}-->
      <!--      </div>-->
    </div>
  </el-card>
</template>
<script setup>
import { useTradeStore } from '@/store/index.js';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const tradeStore = useTradeStore();
const setType = tradeStore.setSymbolType;
const activeType = computed(() => tradeStore.activeType);
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }
  /* 滚动槽 */
  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  /* 滚动条滑块 */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
  &::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0, 0, 0, 0.1);
  }
  .typeBox {
    .item {
      padding-left: 10px;
      display: flex;
      align-items: center;
      height: 48px;
      color: #0c3d93;
      cursor: pointer;
      transition: 0.3s;
      font-size: 16px;
      margin-top: 3px;
      &:hover,
      &.active {
        background-color: #266fe8;
        color: #ffffff;
      }
    }
  }
}
</style>
