<template>
  <el-card class="myAssetsContainer" :body-style="{ padding: '0px' }">
    <h3 class="title">My Assets</h3>
    <h3 class="estimated">
      Estimated total assets：$ {{ userStore.totalAssets }}
    </h3>
    <div class="contentBox">
      <div class="tradingBox">
        Trading account assets：$ {{ userFunds.balance }}
      </div>
      <div class="itemBox">
        <p class="value">$ {{ netWorth.toFixed(2) }}</p>
        <p class="key">Net worth</p>
      </div>
      <div class="itemBox">
        <p class="value">$ {{ userFunds.margin }}</p>
        <p class="key">Occupancy margin</p>
      </div>
      <div class="itemBox">
        <p class="value">$ {{ availableMargin.toFixed(2) }}</p>
        <p class="key">Balance available</p>
      </div>
      <div class="itemBox">
        <p class="value">$ {{ totalProfit.toFixed(2) }}</p>
        <p class="key">Profit</p>
      </div>
    </div>
  </el-card>
</template>
<script setup>
import { useSocketStore, useUserStore } from '@/store/index.js';
import { computed } from 'vue';
const userStore = useUserStore();
const socketStore = useSocketStore();
const userFunds = computed(() => socketStore.userFunds);
const netWorth = computed(() => socketStore.userNetWorth);
const totalProfit = computed(() => socketStore.userTotalProfit);
const availableMargin = computed(() => socketStore.availableMargin);
</script>
<style scoped lang="less">
.myAssetsContainer {
  color: #0c3d93;
  .title {
    background-color: #f8f8f8;
    font-size: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .estimated {
    margin: 20px;
    background-color: #eef2f7;
    height: 73px;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
  .contentBox {
    height: 100px;
    margin: 0 20px 20px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tradingBox {
      width: 24%;
      font-size: 20px;
      font-weight: bold;
      background-color: #eef2f7;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 15px;
    }
    .itemBox {
      width: 17.8%;
      height: 100%;
      background-color: #eef2f7;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      padding: 25px 20px;
      box-sizing: border-box;
      text-align: center;
    }
  }
}
</style>
