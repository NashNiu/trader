<template>
  <Layout>
    <el-row :gutter="10" class="rowContainer">
      <el-col :span="3" class="symbolTypeContainer">
        <SymbolType />
      </el-col>
      <el-col :span="21" class="quoteListBox">
        <QuotesList />
      </el-col>
    </el-row>
    <el-card class="chatBox" :body-style="{ height: '100%' }">
      <Chart />
    </el-card>
  </Layout>
</template>
<script setup>
import Layout from '@/components/layout/layout.vue';
import QuotesList from '@/pages/Trade/quotesList.vue';
import SymbolType from '@/pages/Trade/symbolType.vue';
import Chart from '@/components/common/tradeViewChart.vue';
</script>
<style scoped lang="less">
.rowContainer {
  height: 450px;
  overflow: hidden;
  .symbolTypeContainer {
    height: 100%;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
  .quoteListBox {
    height: 100%;
    overflow: hidden;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
}
.chatBox {
  width: 100%;
  height: calc(100% - 450px);
}
</style>
