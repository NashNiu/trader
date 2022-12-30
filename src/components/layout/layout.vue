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
