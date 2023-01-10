<template>
  <div class="orderTableBox">
    <el-table :data="tableData" class="orderTable">
      <el-table-column prop="symbol" label="Type/Financial tool">
        <template #default="scope">
          <div>
            <span class="orderType">{{ scope.row.actionType }}</span>
            <br />
            <span class="symbolName">{{ scope.row.symbol }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="profit" label="Net contribution">
        <template #default="scope">
          <span :class="`${scope.row.color} bold`">{{ scope.row.profit }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="currentPrice" label="Present value">
        <template #default="scope">
          <span :class="`${scope.row.color} bold`">
            {{ scope.row.currentPrice }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="change" label="Variety">
        <template #default="scope">
          <div class="varietyBox">
            <span :class="`${scope.row.color} bold`">
              {{ scope.row.change }}
            </span>
            <div class="closeBox" @click="openInfoDrawer(scope.row)">
              <el-icon><Close /></el-icon>
              <span>close</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="lot" label="Quantity">
        <template #default="scope">
          <span class="bold">{{ scope.row.lot }}</span>
        </template>
      </el-table-column>
      <!--    <el-table-column prop="symbol" label="Quota Stop" />-->
      <!--    <el-table-column prop="symbol" label="Adjustment" />-->
      <el-table-column prop="storage" label="Overnight Fee">
        <template #default="scope">
          <span class="bold">{{ scope.row.storage }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="Opening time" />
      <el-table-column width="100">
        <template #default="scope">
          <el-icon
            class="infoIcon"
            @click="openInfoDrawer({ ...scope.row, isInfo: true })"
          >
            <InfoFilled />
          </el-icon>
        </template>
      </el-table-column>
    </el-table>
    <OrderDrawer ref="orderDrawerRef" :drawer-data="drawerData" />
  </div>
</template>
<script setup>
import { useSocketStore } from '@/store/index.js';
import { computed, reactive, ref } from 'vue';
// import dayjs from 'dayjs';
import OrderDrawer from './orederInfoDrawer.vue';
// import { tools } from '@/utils/index.js';
const socketStore = useSocketStore();

const orderDrawerRef = ref(null);
let drawerData = reactive({});
const tableData = computed(() => socketStore.holdingOrders.map((item) => item));
const openInfoDrawer = (row) => {
  drawerData = row;
  orderDrawerRef.value.show();
};
</script>
<style lang="less" scoped>
.orderTableBox {
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
.orderTable {
  .orderType {
    font-size: 12px;
  }
  .symbolName {
    font-size: 16px;
    font-weight: bold;
  }
  .infoIcon {
    cursor: pointer;
    font-size: 18px;
  }
  .down {
    color: #e34d59;
  }
  .up {
    color: #078d5c;
  }
  .varietyBox {
    display: flex;
    align-items: center;
  }
  .closeBox {
    margin-left: 15px;
    display: flex;
    justify-content: space-between;
    width: 60px;
    border: 1px solid #0c3d93;
    padding: 1px 4px;
    align-items: center;
    border-radius: 20px;
    box-sizing: border-box;
    color: #0c3d93;
    cursor: pointer;
  }
}
</style>
