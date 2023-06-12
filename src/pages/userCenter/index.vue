<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">邮箱地址:</el-col>
      <el-col :span="12">{{ userInfo?.email }}</el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">登录密码:</el-col>
      <el-col :span="12">
        <span @click="openChangePass">修改登录密码</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">支付密码43223:</el-col>
      <el-col :span="12">
        <span @click="openPayPass">未设置</span>
        <span>设置</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">身份认证:</el-col>
      <el-col :span="12">
        <span @click="openVerifyDialog">未认证</span>
        <span>认证</span>
      </el-col>
    </el-row>
    <ChangePass ref="changePassRef" />
    <PayPassDialog ref="payPassDialogRef" />
    <Verification ref="verifyDialogRef" />
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useUserStore } from '@/store/index.js';
import ChangePass from './components/changePass.vue';
import PayPassDialog from '@/components/common/payPassDialog.vue';
import Verification from './components/verifyDialog.vue';
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const changePassRef = ref(null);
const payPassDialogRef = ref(null);
const verifyDialogRef = ref(null);
const openPayPass = () => {
  payPassDialogRef.value.show();
};
const openChangePass = () => {
  changePassRef.value?.show();
};
const openVerifyDialog = () => {
  verifyDialogRef.value.show();
};
</script>
<style scoped lang="less"></style>
