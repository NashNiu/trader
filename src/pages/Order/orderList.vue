<template>
  <div class="orderTableBox">
    <el-table
      :data="tableData"
      class="orderTable"
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
      <el-table-column prop="profit" label="Net contribution">
        <template #default="scope">
          <span :class="`${scope.row.color} bold`">
            {{ scope.row.netValue }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Profit" width="110">
        <template #default="scope">
          <span :class="`${scope.row.color} bold`">
            {{ scope.row.profit }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Open Price">
        <template #default="scope">
          <span :class="`${scope.row.color} bold`">
            {{ scope.row.price }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="currentPrice" label="Present value">
        <template #default="scope">
          <span :class="`${scope.row.color} bold`">
            {{ scope.row.currentPrice }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="change" label="Variety" width="170">
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
    <el-row class="sumBox" align="middle">
      <el-col :offset="4" :span="6">
        <div>
          <span :class="profitColor">
            Total Profit ${{ totalProfit?.toFixed(2) || '0' }}
          </span>
        </div>
      </el-col>
      <el-col :offset="5" :span="6">
        <div>
          <span :class="feeColor">
            Total Fee ${{ totalFee?.toFixed(2) || '0' }}
          </span>
        </div>
      </el-col>
    </el-row>
    <OrderDrawer
      ref="orderDrawerRef"
      :drawer-data="drawerData"
      @close="closeDrawer"
    />
  </div>
</template>
<script setup>
import { useSocketStore, useCommonStore } from '@/store/index.js';
import { computed, ref, onMounted, watch } from 'vue';
import OrderDrawer from './orederInfoDrawer.vue';
import { tools } from '@/utils';

const socketStore = useSocketStore();
const commonStore = useCommonStore();
const orderDrawerRef = ref(null);
const activeRowOrder = ref(-1);
const chartData = computed(() => commonStore.chartData);
const holdingOrders = computed(() => socketStore.holdingOrders);
const totalProfit = computed(() => socketStore.userTotalProfit);
const totalFee = computed(() => socketStore.totalOverNightFee);
const profitColor = computed(() => (totalProfit.value <= 0 ? 'red' : 'green'));
const feeColor = computed(() => (totalFee.value > 0 ? 'green' : 'red'));
const tableData = computed(() => socketStore.holdingOrdersWithPrice);
const openInfoDrawer = (row) => {
  activeRowOrder.value = row.position;
  orderDrawerRef.value.show();
};
const closeDrawer = () => {
  activeRowOrder.value = -1;
};
const drawerData = computed(() =>
  tableData.value.find((item) => item.position === activeRowOrder.value)
);
const rowClassName = ({ row }) => {
  if (row.symbol === chartData.value.symbol) {
    return 'active tableRow';
  } else {
    return 'tableRow';
  }
};
const rowDblClick = (row) => {
  commonStore.changeChartData({ symbol: row.symbol, id: row.position });
};
watch(holdingOrders, (nv) => {
  tools.updateChartByList(nv, 'position', 'symbol');
});
const initChart = () => {
  tools.updateChartByList(tableData.value, 'position', 'symbol');
};
onMounted(async () => {
  initChart();
});
</script>
<style lang="less" scoped>
.orderTableBox {
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.orderTable {
  flex: 1;
  overflow-y: scroll;
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
.sumBox {
  font-size: 20px;
  font-weight: bold;
  height: 50px;
  .green {
    color: #008a58;
  }
  .red {
    color: #e14753;
  }
}
</style>
<style lang="less">
.orderTableBox {
  .tableRow {
    height: 60px;
    &.active {
      background-color: #d1d8e0;
    }
  }
}
</style>
