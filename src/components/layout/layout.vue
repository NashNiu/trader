<template>
  <div class="container">
    <SideBar />
    <div class="main">
      <Header />
      <div class="contentBox">
        <el-card
          :class="`contentContainer ${showChart ? '' : 'full'}`"
          :body-style="{
            height: '100%',
            boxSizing: 'border-box',
            padding: '0px',
          }"
        >
          <router-view />
        </el-card>
        <el-card
          v-if="showChart"
          class="chatBox"
          :body-style="{
            height: '100%',
            boxSizing: 'border-box',
            padding: '0px',
          }"
        >
          <Chart />
        </el-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import SideBar from './sideBar.vue';
import Header from './header.vue';
import Chart from '@/components/common/tradeViewChart.vue';
import { getUserInfoByToken, createUserWallet } from '@/api/user.js';
import { useUserStore, useSocketStore } from '@/store/index.js';
import { tools } from '@/utils/index.js';
const router = useRouter();
const token = localStorage.getItem('token');
const userStore = useUserStore();
const socketStore = useSocketStore();
const createWallet = async () => {
  const res = await createUserWallet();
  if (res?.data?.status === 0) {
    const userInfoRes = await getUserInfoByToken();
    if (userInfoRes?.data?.status === 0) {
      const password = tools.decrypt(res.data?.data?.password);
      userStore.setUserInfo({ ...res.data.data, password });
    }
  }
};
const showChart = computed(() => !router.currentRoute.value.meta.hideChart);
const checkToken = async () => {
  // 如果没有token和密码 退到首页登录
  if (!token) {
    tools.clearAndLogout();
  } else {
    // 如果userStore 中有用户信息，往下走
    if (userStore.userInfo.status) {
      if (!userStore.userInfo.fb) {
        await createWallet();
      }
      if (!socketStore.socket) {
        socketStore.initSocket();
      }
    } else {
      // 如果没有的话， 先获取用户信息
      const res = await getUserInfoByToken();
      if (res?.data?.status === 0) {
        const password = tools.decrypt(res.data?.data?.password);
        userStore.setUserInfo({ ...res.data.data, password });
        if (!res.data.data.fb) {
          await createWallet();
        }
        if (!socketStore.socket) {
          socketStore.initSocket();
        }
      } else {
        tools.clearAndLogout();
      }
    }
  }
};
await checkToken();
</script>
<style lang="less" scoped>
.container {
  display: flex;
  width: 100vw;
  height: 100vh;
  .main {
    flex: 1;
    .contentBox {
      box-sizing: border-box;
      padding: 15px 20px;
      height: calc(100% - 68px);
      display: flex;
      flex-direction: column;
      .contentContainer {
        height: 440px;
        margin-bottom: 10px;
        overflow: hidden;
        &.full {
          height: 100%;
        }
      }
      .chatBox {
        flex: 1;
      }
    }
  }
}
</style>
