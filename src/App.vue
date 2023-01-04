<template>
  <Suspense>
    <el-config-provider>
      <router-view></router-view>
    </el-config-provider>
  </Suspense>
</template>
<script setup>
import { ElConfigProvider } from 'element-plus';
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
</script>
<style>
@import './assets/css/reset.css';
</style>
