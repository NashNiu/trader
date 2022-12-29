<template>
  <el-card class="quotesListContainer">
    <el-table
      :data="tableData"
      row-class-name="tableRow"
      header-row-class-name="headerRow"
      @row-dblclick="rowDblClick"
    >
      <el-table-column prop="name" label="Financial tool" />
      <el-table-column prop="change" label="Change" width="180">
        <template #default="scope">
          <span :class="scope.row.changeColor">{{ scope.row.change }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="change" label="Sell">
        <template #default="scope">
          <span :class="scope.row.changeColor">{{ scope.row.sell }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="scope">
          <div class="operateBtn" @click="openSell(scope.row)">Sell</div>
        </template>
      </el-table-column>
      <el-table-column prop="change" label="Buy">
        <template #default="scope">
          <span :class="scope.row.changeColor">{{ scope.row.buy }}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template #default="scope">
          <div class="operateBtn" @click="openBuy(scope.row)">Buy</div>
        </template>
      </el-table-column>
      <el-table-column prop="highLow" label="High/low" />
      <el-table-column prop="d6" label="">
        <el-icon><Star /></el-icon>
      </el-table-column>
    </el-table>
    <TradeDrawer ref="tradeDrawer" :drawer-data="drawerData" />
  </el-card>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import {
  useSocketStore,
  useTradeStore,
  useCommonStore,
} from '@/store/index.js';
import TradeDrawer from './tradeDrawer.vue';

const socketStore = useSocketStore();
const tradeStore = useTradeStore();
const commonStore = useCommonStore();
const liveData = computed(() => socketStore.liveData);
const statisticData = computed(() => socketStore.statisticData);
const tradeDrawer = ref(null);
let drawerData = reactive({
  type: 'buy',
  symbol: '',
});
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

const tableData = computed(() =>
  tradeStore.symbolTypeArr[tradeStore.activeType].map((item) => {
    const symbolData = statisticData.value?.[item.name];
    const ask = liveData.value?.[item.name]?.['bid'] ?? '0.00';
    const high =
      symbolData?.['askHigh']?.toFixed(symbolData?.digits ?? 2) ?? '0.00';
    const low =
      symbolData?.['askLow']?.toFixed(symbolData?.digits ?? 2) ?? '0.00';
    const priceOpen = symbolData?.['priceOpen'];
    const change = ask && priceOpen ? (ask - priceOpen) / priceOpen : 0;
    const changeColor =
      ask > priceOpen ? 'green' : ask < priceOpen ? 'red' : '';
    return {
      name: item.displayName,
      change: `${(change * 100).toFixed(2)}%`,
      changeColor,
      sell: ask,
      buy: liveData.value?.[item.name]?.['ask'] ?? '0.00',
      highLow: `${high} \\ ${low}`,
      mtName: item.name,
    };
  })
);

const openSell = (row) => {
  drawerData = {
    type: 'sell',
    symbol: row.mtName,
  };
  tradeDrawer.value.show();
};
const openBuy = (row) => {
  drawerData = {
    type: 'buy',
    symbol: row.mtName,
  };
  tradeDrawer.value.show();
};
const rowDblClick = (row) => {
  commonStore.changeActiveChartName(row.mtName);
  console.log(row);
};
// const onSubmitSell = () => {
//   ElMessageBox.confirm(`Are you confirm to chose  ?`)
//     .then(() => {
//       console.log(2);
//       // visible.value = false;
//       // 市价下单
//       // useSocketStore.marketCreate({
//       //   sbl: 'DOTUSDT',
//       //   vol: 30000,
//       //   price: liveData.value?.['DOTUSDT']?.['bid'],
//       //   type: 0,
//       // });
//       // 挂单
//       // useSocketStore.positionCreate({
//       //   sbl: 'DOTUSDT',
//       //   vol: 100,
//       //   price: liveData.value?.['DOTUSDT']?.['bid'] * 0.8,
//       //   type: 2,
//       // });
//       // // 删除挂单
//       // useSocketStore.deleteHangingOrder(209);
//       // 平仓
//       useSocketStore.marketClose({ id: 217, vol: 10000 });
//     })
//     .catch(() => {
//       // catch error
//     });
// };
</script>

<style scoped lang="less">
.quotesListContainer {
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
  .operateBtn {
    color: #333;
    width: 80px;
    height: 29px;
    border-radius: 14px;
    border: solid 1px #333333;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .red {
    color: #e34d59;
  }
  .green {
    color: #078d5c;
  }
}
</style>
<style lang="less">
.quotesListContainer {
  .headerRow {
    color: #0c3d93;
  }
  .tableRow {
    height: 60px;
  }
}
</style>
