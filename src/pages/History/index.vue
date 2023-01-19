<template>
  <el-card body-style="height:100%;padding:0px" class="historyListContainer">
    <HistoryList />
  </el-card>
</template>
<script setup>
import HistoryList from './historyList.vue';
</script>
<style lang="less" scoped>
.historyListContainer {
  height: 100%;
  overflow: hidden;
}
</style>
