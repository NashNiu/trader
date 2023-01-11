<template>
  <Layout>
    <el-card :body-style="{ height: '100%' }" class="orderListContainer">
      <LimitList />
    </el-card>
    <el-card
      class="chatBox"
      :body-style="{ height: '100%', boxSizing: 'border-box' }"
    >
      <Chart />
    </el-card>
  </Layout>
</template>
<script setup>
import Layout from '@/components/layout/layout.vue';
import Chart from '@/components/common/tradeViewChart.vue';
import LimitList from './limitList.vue';
</script>
<style lang="less" scoped>
.orderListContainer {
  height: 440px;
  overflow: hidden;
}
.chatBox {
  margin-top: 10px;
  width: 100%;
  height: calc(100% - 450px);
}
</style>
