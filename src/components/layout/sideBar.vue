<template>
  <div class="sideBarBox">
    <el-menu
      :default-active="activeIndex"
      collapse
      class="sideBar"
      @select="menuOpen"
    >
      <el-menu-item index="/index">
        <el-icon><Grid /></el-icon>
        <template #title><span>Profile</span></template>
      </el-menu-item>
      <el-menu-item index="/trade">
        <el-icon><DataLine /></el-icon>
        <template #title><span>Trade</span></template>
      </el-menu-item>
      <el-menu-item index="/order">
        <el-icon><MessageBox /></el-icon>
        <template #title><span>Order List</span></template>
      </el-menu-item>
      <el-menu-item index="/history">
        <el-icon><Document /></el-icon>
        <template #title><span>History Order</span></template>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const route = useRoute();
const activeIndex = ref(route.path);
const menuOpen = (index) => {
  if (index === '/index') {
    console.log('index');
  } else {
    router.push(index);
  }
};
</script>
<style lang="less">
.sideBarBox {
  height: 100%;
  .sideBar {
    height: 100%;
  }
}
</style>
