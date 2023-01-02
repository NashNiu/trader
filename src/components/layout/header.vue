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
          <span class="itemValue">${{ userFunds.balance }}</span>
          <span class="itemKey">Balance avaliable</span>
        </div>
        <div class="itemBox">
          <span class="itemValue">${{ netWorth.toFixed(2) }}</span>
          <span class="itemKey">Net worth</span>
        </div>
        <div class="itemBox">
          <span class="itemValue">${{ userFunds.marginfree }}</span>
          <span class="itemKey">Deposit for maintenance</span>
        </div>
        <div class="itemBox">
          <span class="itemValue">${{ userFunds.margin }}</span>
          <span class="itemKey">Give good</span>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue';
import { useSocketStore } from '@/store/index.js';
import { computed } from 'vue';
const socketStore = useSocketStore();
const userFunds = computed(() => socketStore.userFunds);
const netWorth = computed(() => socketStore.userNetWorth);
</script>

<style scoped lang="less">
header {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background: white;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.header-content {
  display: flex;
  justify-content: normal;
  /*width: 1500px;*/
}
.content-logo {
  width: 160px;
  height: 55px;
  margin: 10px 0;
  cursor: pointer;
  margin-right: 100px;
  margin-left: 100px;
}
.content-logo img {
  height: 100%;
}
.content-nav {
  /*width: 800px;*/
  height: 75px;
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
      margin-bottom: 10px;
    }
    .itemKey {
      font-size: 16px;
      color: #666666;
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
