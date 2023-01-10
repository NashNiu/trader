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
        Most popular
      </div>
      <div
        :class="{ item: true, active: activeType === 'favorite' }"
        @click="setType('favorite')"
      >
        My Favorite
      </div>
      <div
        :class="{ item: true, active: activeType === 'goods' }"
        @click="setType('goods')"
      >
        All commodity futures
      </div>
    </div>
  </el-card>
</template>
<script setup>
import { useTradeStore } from '@/store/index.js';
import { computed } from 'vue';

const tradeStore = useTradeStore();
const setType = tradeStore.setSymbolType;
const activeType = computed(() => tradeStore.activeType);
</script>
<style lang="less" scoped>
.container {
  height: 100%;
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
