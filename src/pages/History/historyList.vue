<template>
  <div class="historyTableBox">
    <el-table
      v-loading="loadingData"
      :data="tableData"
      header-row-class-name="headerRow"
      :row-class-name="rowClassName"
      class="orderTable"
      @row-click="rowDblClick"
    >
      <el-table-column
        prop="symbol"
        :label="t('common.type') + '/' + t('common.financialTool')"
      >
        <template #default="scope">
          <div>
            <span class="orderType">{{ scope.row.Command }}</span>
            <br />
            <span class="symbolName">{{ scope.row.Symbol }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="OpenPrice" :label="t('common.openPrice')">
        <template #default="scope">
          <span class="bold">{{ scope.row.OpenPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ClosePrice" :label="t('common.closePrice')">
        <template #default="scope">
          <span class="bold">{{ scope.row.ClosePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Lot" :label="t('common.quantity')">
        <template #default="scope">
          <span class="bold">{{ scope.row.Lot }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Profit" :label="t('common.profit')">
        <template #default="scope">
          <span class="bold">{{ scope.row.Profit }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :label="t('common.openingTime')" />
      <el-table-column prop="closeTime" :label="t('common.closeTime')" />
    </el-table>
    <el-row v-if="!loadingData" align="middle">
      <el-col :span="8" :offset="4">
        <div class="sumBox">
          <div :class="profitColor">
            <span class="desc">{{ t('common.totalProfit') }}:</span>
            <span class="value bold">${{ totalProfit }}</span>
          </div>
        </div>
      </el-col>
      <el-col :span="10" class="footBox">
        <el-pagination
          layout="prev, pager, next"
          :page-size="pageSize"
          :total="totalCount"
          @current-change="pageChange"
        />
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { getHistoryOrder } from '@/api/historyOrder.js';
import { ref, onMounted, computed, watch } from 'vue';
import dayjs from 'dayjs';
import { useCommonStore, useUserStore } from '@/store/index.js';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const commonStore = useCommonStore();
const userStore = useUserStore();

const loadingData = ref(false);
const pageIndex = ref(1);
const pageSize = ref(5);
const historyData = ref({});
const chartData = computed(() => commonStore.chartData);
const totalCount = computed(() => historyData.value?.TotalCount ?? 0);
const totalProfit = computed(() => historyData.value?.SumProfit ?? 0);
const profitColor = computed(() => (totalProfit.value > 0 ? 'green' : 'red'));
const isRealAccount = computed(() => userStore.isRealAccount);
const tableData = computed(
  () =>
    historyData.value?.Data?.map((item) => {
      const createTime = dayjs(item.OpenTime).format('YYYY-MM-DD HH:mm:ss');
      const closeTime = dayjs(item.CloseTime).format('YYYY-MM-DD HH:mm:ss');
      return {
        ...item,
        createTime,
        closeTime,
      };
    }) ?? []
);
const getTableData = async () => {
  loadingData.value = true;
  const res = await getHistoryOrder({
    pageIndex: pageIndex.value,
    commandType: 0,
    pageSize: pageSize.value,
    login: isRealAccount.value
      ? userStore.userInfo?.mtaccr
      : userStore.userInfo?.mtaccd,
    startTime: dayjs().subtract(30, 'day').format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    sourceID: 53,
  });
  loadingData.value = false;
  if (res.data.data.IsSuccess) {
    historyData.value = res.data.data;
  }
};

const pageChange = (page) => {
  pageIndex.value = page;
  getTableData();
};
const rowClassName = ({ row }) => {
  if (row.OrderId === chartData.value.id) {
    return 'active tableRow';
  } else {
    return 'tableRow';
  }
};
const rowDblClick = (row) => {
  commonStore.changeChartData({ symbol: row.Symbol, id: row.OrderId });
};
const initChart = () => {
  if (tableData.value.length) {
    const firstData = tableData.value[0];
    if (chartData.value.symbol !== firstData.Symbol) {
      commonStore.changeChartData({
        symbol: firstData.Symbol,
        id: firstData.OrderId,
      });
    }
  } else {
    commonStore.changeChartData({});
  }
};
watch(isRealAccount, async () => {
  historyData.value = [];
  totalCount.value = 0;
  pageIndex.value = 1;
  await getTableData();
  initChart();
});
onMounted(async () => {
  await getTableData();
  initChart();
});
</script>
<style lang="less" scoped>
.historyTableBox {
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &::-webkit-scrollbar {
    width: 3px;
  }
  /* 滚动槽 */
  &::-webkit-scrollbar-track {
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
  .footBox {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .sumBox {
    font-size: 20px;
    font-weight: bold;
    .desc {
      margin-right: 5px;
    }
    .red {
      color: #e14753;
    }
    .green {
      color: #008a58;
    }
  }
  .orderType {
    font-size: 12px;
  }
  .symbolName {
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
<style lang="less">
.historyTableBox {
  .tableRow {
    height: 60px;
    cursor: pointer;
    &.active {
      background-color: #d1d8e0;
    }
  }
}
</style>
