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
      <el-table-column label="Quantity">
        <template #default="scope">
          <span class="bold">{{ scope.row.lot }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Price">
        <template #default="scope">
          <span class="bold">{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Stop loss">
        <template #default="scope">
          <span class="bold">{{ scope.row.sl }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Stop profit">
        <template #default="scope">
          <span class="bold">{{ scope.row.tp }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="Opening time" />
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
