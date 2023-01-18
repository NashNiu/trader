<template>
  <el-config-provider>
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup>
import { ElConfigProvider } from 'element-plus';
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/theme-chalk/el-message-box.css';
</script>
<style>
@import './assets/css/reset.css';
</style>
