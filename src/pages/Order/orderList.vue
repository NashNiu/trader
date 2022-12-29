<template>
  <div class="orderTableBox">
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
        <template #default="scope">
          <span :class="scope.row.color">{{ scope.row.currentPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="change" label="Variety">
        <template #default="scope">
          <span :class="scope.row.color">{{ scope.row.change }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="vol" label="Quantity" />
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
    const variety = (currentPrice - item.price) / item.price;
    const change = `${(variety * 100).toFixed(4)}%`;
    const color = () => {
      if (item.action === 0) {
        return variety > 0 ? 'green' : variety < 0 ? 'red' : '';
      } else {
        return variety > 0 ? 'red' : variety < 0 ? 'green' : '';
      }
    };
    return {
      ...item,
      actionType,
      createTime,
      currentPrice,
      vol: item.vol / 10000,
      change,
      color: color(),
    };
  })
);
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
  .infoIcon {
    cursor: pointer;
    font-size: 18px;
  }
  .red {
    color: #e34d59;
  }
  .green {
    color: #078d5c;
  }
}
</style>
