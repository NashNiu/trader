<template>
  <div class="historyTableBox">
    <el-table v-loading="loadingData" :data="tableData" class="orderTable">
      <el-table-column prop="symbol" label="Type/Financial tool">
        <template #default="scope">
          <div>
            <span class="orderType">{{ scope.row.Command }}</span>
            <br />
            <span class="symbolName">{{ scope.row.Symbol }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="OpenPrice" label="OpenPrice">
        <template #default="scope">
          <span class="bold">{{ scope.row.OpenPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="ClosePrice" label="ClosePrice">
        <template #default="scope">
          <span class="bold">{{ scope.row.ClosePrice }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Lot" label="Lot">
        <template #default="scope">
          <span class="bold">{{ scope.row.Lot }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="Profit" label="Profit">
        <template #default="scope">
          <span class="bold">{{ scope.row.Profit }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="Opening time" />
      <el-table-column prop="closeTime" label="CloseTime" />
    </el-table>
    <div class="paginationBox">
      <el-pagination
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="totalCount"
        @current-change="pageChange"
      />
    </div>
  </div>
</template>
<script setup>
import { getHistoryOrder } from '@/api/historyOrder.js';
import { ref } from 'vue';
import dayjs from 'dayjs';
import { useUserStore } from '@/store/index.js';

const userStore = useUserStore();
const tableData = ref([]);
const loadingData = ref(false);
const pageIndex = ref(1);
const pageSize = ref(5);
const totalCount = ref(0);

const getTableData = async () => {
  loadingData.value = true;
  const res = await getHistoryOrder({
    pageIndex: pageIndex.value,
    commandType: 0,
    pageSize: pageSize.value,
    login: userStore.userInfo?.mtaccr,
    startTime: dayjs().subtract(30, 'day').format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    sourceID: 53,
  });
  loadingData.value = false;
  if (res.data.data.IsSuccess) {
    tableData.value = res.data.data.Data.map((item) => {
      const createTime = dayjs(item.OpenTime).format('YYYY-MM-DD HH:mm:ss');
      const closeTime = dayjs(item.CloseTime).format('YYYY-MM-DD HH:mm:ss');
      return {
        ...item,
        createTime,
        closeTime,
      };
    });
    totalCount.value = res.data.data.TotalCount;
  }
};
getTableData();
const pageChange = (page) => {
  pageIndex.value = page;
  getTableData();
};
</script>
<style lang="less" scoped>
.historyTableBox {
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
  .paginationBox {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
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
