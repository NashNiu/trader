<template>
  <div>
    <el-table :data="tableData" class="orderTable">
      <el-table-column prop="symbol" label="Type/Financial tool">
        <template #default="scope">
          <div>
            <span>{{ scope.row.actionType }}</span>
            <br />
            <span>{{ scope.row.symbol }}</span>
          </div>
        </template>
      </el-table-column>
      <!--    <el-table-column prop="symbol" label="Net contribution" />-->
      <el-table-column prop="currentPrice" label="Present value">
      </el-table-column>
      <el-table-column prop="vol" label="Variety" />
      <!--    <el-table-column prop="symbol" label="Quota Stop" />-->
      <!--    <el-table-column prop="symbol" label="Adjustment" />-->
      <el-table-column prop="storage" label="Overnight Fee" />
      <el-table-column prop="createTime" label="Opening time" />
      <el-table-column width="100">
        <template #default="scope">
          <el-icon class="infoIcon" @click="openInfoDrawer(scope.row)"
            ><InfoFilled
          /></el-icon>
        </template>
      </el-table-column>
    </el-table>
    <OrderDrawer ref="orderDrawerRef" :drawer-data="drawerData" />
  </div>
</template>
<script setup>
import { useSocketStore } from '@/store/index.js';
import { computed, reactive, ref } from 'vue';
import dayjs from 'dayjs';
import OrderDrawer from './orederInfoDrawer.vue';
const socketStore = useSocketStore();
if (
  !socketStore.socket &&
  sessionStorage.getItem('account') &&
  sessionStorage.getItem('password')
) {
  socketStore.initSocket({
    account: sessionStorage.getItem('account'),
    password: sessionStorage.getItem('password'),
  });
}
const liveData = computed(() => socketStore.liveData);
const orderDrawerRef = ref(null);
let drawerData = reactive({});
// const statisticData = computed(() => socketStore.statisticData);
const tableData = computed(() =>
  socketStore.holdingOrders.map((item) => {
    const symbolLiveData = liveData.value[item.symbol];
    const actionType = item.action === 0 ? 'Buy' : 'Sell';
    const createTime = dayjs(item.utime).format('YYYY/MM/DD HH:mm:ss');
    const currentPrice =
      item.action === 0 ? symbolLiveData?.ask : symbolLiveData?.bid;
    return {
      ...item,
      actionType,
      createTime,
      currentPrice,
      vol: item.vol / 10000,
    };
  })
);
const openInfoDrawer = (row) => {
  drawerData = row;
  orderDrawerRef.value.show();
};
</script>
<style lang="less" scoped>
.orderTable {
  .infoIcon {
    cursor: pointer;
    font-size: 16px;
  }
}
</style>
