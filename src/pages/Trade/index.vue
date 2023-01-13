<template>
  <el-row :gutter="10" class="rowContainer">
    <el-col :span="3" class="symbolTypeContainer">
      <SymbolType />
    </el-col>
    <el-col :span="21" class="quoteListBox">
      <QuotesList />
    </el-col>
  </el-row>
</template>
<script setup>
import QuotesList from '@/pages/Trade/quotesList.vue';
import SymbolType from '@/pages/Trade/symbolType.vue';
</script>
<style scoped lang="less">
.rowContainer {
  height: 100%;
  .symbolTypeContainer {
    height: 100%;
    box-sizing: border-box;
  }
  .quoteListBox {
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }
}
</style>
