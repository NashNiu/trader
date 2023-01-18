<template>
  <div class="limitTableBox">
    <el-table
      class="limitTable"
      :data="tableData"
      header-row-class-name="headerRow"
      :row-class-name="rowClassName"
      @row-dblclick="rowDblClick"
    >
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
      <el-table-column>
        <template #default="scope">
          <el-space>
            <!--            <el-icon class="pointer" :size="20"><Edit /></el-icon>-->
            <el-popconfirm
              width="220"
              title="Are you sure to delete this?"
              confirm-button-text="OK"
              cancel-button-text="No, Thanks"
              @confirm="deleteOrder(scope.row)"
            >
              <template #reference>
                <el-icon class="pointer" color="red" :size="20">
                  <Delete />
                </el-icon>
              </template>
            </el-popconfirm>
          </el-space>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { computed, onMounted, watch } from 'vue';
import { useCommonStore, useSocketStore } from '@/store/index.js';
import { ElLoading } from 'element-plus';
import { tools } from '@/utils';
const socketStore = useSocketStore();
const commonStore = useCommonStore();
const tableData = computed(() => socketStore.hangingOrders);
const chartData = computed(() => commonStore.chartData);
const deleteOrder = (row) => {
  socketStore.deleteHangingOrder(row.order);
  const instance = ElLoading.service({ lock: true, text: 'wait a minute' });
  commonStore.setLoadingInstance(instance);
};
const rowClassName = ({ row }) => {
  if (row.order === chartData.value.id) {
    return 'active tableRow';
  } else {
    return 'tableRow';
  }
};
const rowDblClick = (row) => {
  commonStore.changeChartData({ symbol: row.symbol, id: row.order });
};
watch(tableData, (nv) => {
  tools.updateChartByList(nv, 'order', 'symbol');
});
const initChart = () => {
  tools.updateChartByList(tableData.value, 'order', 'symbol');
};
onMounted(() => {
  initChart();
});
</script>
<style scoped lang="less">
.limitTableBox {
  height: 100%;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }
  /* 滚动槽 */
  &::-webkit-scrollbar-track {
    //-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
  }
  /* 滚动条滑块 */
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
  &::-webkit-scrollbar-thumb:window-inactive {
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
<style lang="less">
.limitTableBox {
  .tableRow {
    height: 60px;
    &.active {
      background-color: #d1d8e0;
    }
  }
}
</style>
