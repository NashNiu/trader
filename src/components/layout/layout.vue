<template>
  <div class="container">
    <SideBar />
    <div class="main">
      <Header />
      <div class="contentBox">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import SideBar from './sideBar.vue';
import Header from './header.vue';
import { useRouter } from 'vue-router';
import { getUserInfoByToken, createUserWallet } from '@/api/user.js';
import { useUserStore } from '@/store/index.js';

const router = useRouter();
const token = localStorage.getItem('token');
const password = localStorage.getItem('password');
const userStore = useUserStore();
const createWallet = async () => {
  const res = await createUserWallet();
  if (res?.data?.status === 0) {
    userStore.updateUserWallets('56');
  }
};
const checkToken = async () => {
  // 如果没有token和密码 退到首页登录
  if (!token || !password) {
    userStore.clearUserInfo();
    await router.push('/');
  } else {
    // 如果userStore 中有用户信息，往下走
    if (userStore.userInfo.status) {
      if (!userStore.userInfo.fb) {
        await createWallet();
      }
    } else {
      // 如果没有的话， 先获取用户信息
      try {
        const res = await getUserInfoByToken();
        if (res.data.status === 0) {
          userStore.setUserInfo(res.data.data);
          if (!res.data.data.fb) {
            await createWallet();
          }
        }
      } catch (err) {
        console.log(err);
        userStore.clearUserInfo();
        await router.push('/');
      }
    }
  }
};
checkToken();
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
      padding: 15px 24px;
      height: calc(100% - 80px);
    }
  }
}
</style>
