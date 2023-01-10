<template>
  <div class="limitTableBox">
    <el-table class="limitTable" :data="tableData">
      <el-table-column prop="symbol" label="Type/Financial tool">
        <template #default="scope">
          <div>
            <span class="orderType">{{ scope.row.actionType }}</span>
            <br />
            <span class="symbolName">{{ scope.row.symbol }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useSocketStore } from '@/store/index.js';
const socketStore = useSocketStore();
const tableData = computed(() => socketStore.hangingOrders);
</script>
<style scoped lang="less"></style>
