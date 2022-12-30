<template>
  <el-drawer v-model="visible" direction="ltr" size="400">
    <div class="titleBox">
      <img :src="userImg" alt="" />
      <div class="userBox">
        <p>15291184453@163.com</p>
      </div>
    </div>
    <div class="mainBox">
      <p class="item" @click="logOut">登出</p>
    </div>
  </el-drawer>
</template>
<script setup>
import { defineExpose, ref } from 'vue';
import { useRouter } from 'vue-router';
import userImg from '@/assets/img/sidebar/user.png';
const visible = ref(false);
const router = useRouter();
const show = () => {
  visible.value = true;
};
const logOut = () => {
  sessionStorage.clear();
  router.push('/');
};
defineExpose({
  show,
});
</script>
<style lang="less" scoped>
.titleBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  img {
    margin-right: 15px;
  }
  .userBox {
    font-size: 20px;
    color: #0c3d93;
  }
}
.mainBox {
  padding-left: 20px;
  margin-top: 30px;
  .item {
    color: #0c3d93;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
  }
}
</style>
