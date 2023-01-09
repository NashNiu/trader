<template>
  <header>
    <div class="header-content">
      <h1 class="content-logo">
        <img src="/logo.png" />
      </h1>

      <div class="search-buy-login">
        <div class="content-search">
          <input type="text" placeholder="search" />
          <el-icon><Search /></el-icon>
        </div>
      </div>
      <div class="content-nav">
        <div class="itemBox">
          <span class="itemValue">
            {{ userFundsVisible ? '$' + availableMargin?.toFixed(2) : ' *** ' }}
          </span>
          <span class="itemKey">Balance avaliable</span>
        </div>
        <div class="itemBox">
          <span class="itemValue">
            {{ userFundsVisible ? '$' + netWorth.toFixed(2) : ' *** ' }}
          </span>
          <span class="itemKey">Net worth</span>
        </div>
        <div class="itemBox">
          <span class="itemValue">
            {{ userFundsVisible ? '$' + userFunds.margin : ' *** ' }}
          </span>
          <span class="itemKey">Deposit for maintenance</span>
        </div>
        <div class="itemBox">
          <span class="itemValue">
            {{ userFundsVisible ? '$' + profit.toFixed(2) : ' *** ' }}
          </span>
          <span class="itemKey">Give good</span>
        </div>
        <div class="itemBox">
          <template v-if="userFundsVisible">
            <el-icon class="view" @click="setFundsVisible(false)">
              <View />
            </el-icon>
          </template>
          <template v-else>
            <el-icon class="view" @click="setFundsVisible(true)">
              <Hide />
            </el-icon>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue';
import { useSocketStore, useUserStore } from '@/store/index.js';
import { computed } from 'vue';
const socketStore = useSocketStore();
const userStore = useUserStore();
const userFunds = computed(() => socketStore.userFunds);
const netWorth = computed(() => socketStore.userNetWorth);
const profit = computed(() => socketStore.userTotalProfit);
const availableMargin = computed(() => socketStore.availableMargin);
const userFundsVisible = computed(() => userStore.userFundsVisible);
const setFundsVisible = (visible) => {
  userStore.setUserFundsVisible(visible);
};
</script>

<style scoped lang="less">
header {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 68px;
  background: white;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.header-content {
  display: flex;
  justify-content: normal;
  height: 100%;
  /*width: 1500px;*/
}
.content-logo {
  width: 160px;
  height: 55px;
  cursor: pointer;
  margin-right: 100px;
  margin-left: 100px;
}
.content-logo img {
  height: 100%;
}
.content-nav {
  /*width: 800px;*/
  height: 100%;
  display: flex;
  align-items: center;
  .itemBox {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-right: 50px;
    .itemValue {
      font-size: 22px;
      color: #000000;
      margin-bottom: 5px;
      font-family: 'roboto-bold';
    }
    .itemKey {
      font-size: 16px;
      color: #666666;
    }
    .view {
      font-size: 24px;
      cursor: pointer;
    }
  }
}

.search-buy-login {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
}
.content-search {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  width: 200px;
  height: 35px;
  border-radius: 8px;
  background: #f0f2f4;
}
.content-search input {
  padding: 0 10px;
  width: 150px;
  height: 40px;
  border: 0;
  border-radius: 8px;
  color: #808080;
  background: #f0f2f4;
  font-size: 16px;
  outline: none;
}
.content-login {
  font-size: 18px;
  color: #808080;
  text-align: center;
  cursor: pointer;
}
</style>
