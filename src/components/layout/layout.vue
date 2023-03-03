<template>
  <div v-loading="checkingToken" class="container">
    <template v-if="!checkingToken">
      <SideBar />
      <div class="main">
        <Header />
        <div class="contentBox">
          <div v-if="showShadow" ref="shadowRef" class="shadow"></div>
          <el-card
            id="contentContainer"
            :class="`contentContainer ${showChart ? '' : 'full'}`"
            :body-style="{
              height: '100%',
              boxSizing: 'border-box',
              padding: '0px',
            }"
          >
            <router-view />
          </el-card>
          <div v-if="showChart" ref="resizeRef" class="resize"></div>
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
    </template>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { computed, ref, onBeforeMount } from 'vue';
import SideBar from './sideBar.vue';
import Header from './header.vue';
import Chart from '@/components/common/tradeViewChart/index.vue';
import { getUserInfoByToken, createUserWallet } from '@/api/user.js';
import { useUserStore, useSocketStore, useCommonStore } from '@/store/index.js';
import { tools } from '@/utils/index.js';
import { useEventListener, useStorage } from '@vueuse/core';
import { configConst } from '@/config/index.js';

const router = useRouter();
const token = localStorage.getItem(configConst.TOKEN);
const userStore = useUserStore();
const socketStore = useSocketStore();
const commonStore = useCommonStore();
const checkingToken = ref(false);
const resizeRef = ref(null);
const rawHeight = ref(0);
const contentHeight = useStorage(configConst.LCH, '400px');
const startY = ref(0);
const shadowRef = ref();
const showShadow = ref(false);
const createWallet = async () => {
  const res = await createUserWallet();
  if (res?.data?.status === 0) {
    await checkToken();
  }
};
const showChart = computed(
  () =>
    !router.currentRoute.value.meta.hideChart && commonStore.chartDataAvailable
);
const checkToken = async () => {
  // 如果没有token和密码 退到首页登录
  checkingToken.value = true;
  if (!token) {
    // checkingToken.value = false;
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
      checkingToken.value = false;
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
        checkingToken.value = false;
      } else {
        // checkingToken.value = false;
        tools.clearAndLogout();
      }
    }
  }
};
onBeforeMount(async () => {
  await checkToken();
});
useEventListener(resizeRef, 'mousedown', (e) => {
  showShadow.value = true;
  startY.value = e.clientY;
  rawHeight.value = document.getElementById('contentContainer').offsetHeight;
});
useEventListener(shadowRef, 'mousemove', (e) => {
  const endY = e?.clientY;
  contentHeight.value = rawHeight.value + endY - startY.value + 'px';
});
useEventListener(shadowRef, 'mouseup', () => {
  showShadow.value = false;
});
useEventListener(shadowRef, 'mouseleave', () => {
  showShadow.value = false;
});
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
      position: relative;
      .shadow {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 100;
        cursor: ns-resize;
      }
      .contentContainer {
        height: v-bind(contentHeight);
        min-height: 200px;
        //margin-bottom: 10px;
        overflow: hidden;
        &.full {
          height: 100%;
        }
      }
      .resize {
        //position: absolute;
        //bottom: -5px;
        width: 100%;
        height: 10px;
        align-self: center;
        background-color: transparent;
        //background-color: #0a8415;
        cursor: ns-resize;
      }
      .chatBox {
        flex: 1;
        position: relative;
      }
    }
  }
}
</style>
