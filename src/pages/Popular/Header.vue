<template>
  <header>
    <div class="header-content">
      <h1 class="content-logo">
        <img src="/logo.png" />
      </h1>

      <div class="search-buy-login">
        <div class="content-search">
          <input type="" placeholder="请输入要搜索的品种" />
          <el-icon><Search /></el-icon>
        </div>
      </div>
      <div class="content-nav">
        <el-row :gutter="24">
          <el-col :span="6"
            ><div class="grid-content ep-bg-purple">
              <span class="sp"
                >HK<b>${{ userFunds.balance }}</b></span
              >
              <br />
              <span>Balance avaliable</span>
            </div>
          </el-col>
          <el-col :span="6"
            ><div class="grid-content ep-bg-purple">
              <span class="sp"
                >HK<b>${{ userFunds.equity }}</b></span
              >
              <br />
              <span>Net worth</span>
            </div>
          </el-col>
          <el-col :span="6"
            ><div class="grid-content ep-bg-purple">
              <span class="sp"
                >HK<b>${{ userFunds.marginfree }}</b></span
              >
              <br />
              <span>Deposit for maintenance</span>
            </div>
          </el-col>
          <el-col :span="6"
            ><div class="grid-content ep-bg-purple">
              <span class="sp"
                >HK<b>${{ userFunds.margin }}</b></span
              >
              <br />
              <span>Give good</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </header>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue';
import { getUserInfo } from '../../utils/storage';
import { socketStore } from '@/store/index.js';
import { computed } from 'vue';
const useSocketStore = socketStore();
const userFunds = computed(() => useSocketStore.userFunds);
const userInfo = getUserInfo();
console.log(userInfo);
</script>

<style scoped>
header {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  background: white;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.header-content {
  display: flex;
  justify-content: normal;
  width: 1500px;
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
  width: 800px;
  height: 75px;
}
.grid-content {
  padding-top: 12px;
}
.grid-content .sp {
  font-weight: bold;
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
