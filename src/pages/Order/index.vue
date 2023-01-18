<template>
  <el-card body-style="height:100%;padding:0px" class="orderListContainer">
    <OrderList />
  </el-card>
</template>
<script setup>
import OrderList from './orderList.vue';
</script>
<style lang="less" scoped>
.orderListContainer {
  height: 100%;
}
</style>
