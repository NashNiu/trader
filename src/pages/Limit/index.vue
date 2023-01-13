<template>
  <el-card :body-style="{ height: '100%' }" class="orderListContainer">
    <LimitList />
  </el-card>
</template>
<script setup>
import LimitList from './limitList.vue';
</script>
<style lang="less" scoped>
.orderListContainer {
  height: 100%;
  overflow: hidden;
}
</style>
