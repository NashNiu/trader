<template>
  <div class="popular">
    <el-table :data="tableData" style="width: 100%" height="300" class="table1">
      <el-table-column prop="d1" label="Financial tool" width="180" />
      <el-table-column prop="d2" label="Change" width="180" />
      <el-table-column prop="d3" label="Sell" />
      <el-table-column>
        <template #header> </template>
        <el-button round size="small" @click="visible = true">Sell</el-button>
      </el-table-column>
      <el-table-column prop="d4" label="Buy" />
      <el-table-column>
        <template #default>
          <el-button round size="small" @click="visible2 = true">Buy</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="d5" label="High/low" />
      <el-table-column prop="d6" label="">
        <el-icon v-model="starV" @click="starV = 1"><Star /></el-icon>
      </el-table-column>
    </el-table>
    <div class="tableBox">
      <el-drawer v-model="visible" :show-close="false" :modal="false">
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass" @click="close">
            <el-icon><ArrowRight /></el-icon>
          </h4>
        </template>
        <div class="Tabs">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane label="Market" name="first">
              <h1>Hong Kong HS50 Index</h1>
              <div>
                <el-row :gutter="16">
                  <el-col :span="8"
                    ><div class="grid-content ep-bg-purple">
                      <span>Bid</span>
                    </div>
                  </el-col>
                  <el-col :span="8"
                    ><div class="grid-content ep-bg-purple">
                      <span>Ask</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="line-progress">
                <span class="sp-bid">30%</span>
                <el-progress
                  :percentage="30"
                  width="100"
                  :show-text="false"
                ></el-progress>
                <span class="sp-ask">70%</span>
              </div>
              <div>
                <el-table
                  :data="tableData2"
                  style="width: 100%"
                  :row-class-name="tableRowClassName"
                >
                  <el-table-column prop="d1" width="80" />
                  <el-table-column prop="d2" width="80" />
                  <el-table-column prop="d3" width="80" />
                  <el-table-column prop="d4" width="80" />
                </el-table>
              </div>
              <div class="tab1-ts">
                <el-form :model="form" label-width="120px">
                  <el-form-item label="Quantity">
                    <el-input-number
                      v-model="form.num"
                      :step="1"
                      @change="handleChange"
                    />
                  </el-form-item>
                  <el-form-item label="Deposit required">
                    <span>HK$10</span>
                  </el-form-item>
                  <el-form-item label="Stop surplus">
                    <el-switch v-model="form.surplus" />
                  </el-form-item>
                  <el-form-item label="Stop loss">
                    <el-switch v-model="form.loss" />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      class="btn-trade"
                      @click="onSubmitSell"
                      >Sell</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Limit" name="second">Limit</el-tab-pane>
          </el-tabs>
        </div>
      </el-drawer>
    </div>
    <div class="tableBox">
      <el-drawer v-model="visible2" :show-close="false" :modal="false">
        <template #header="{ close, titleId, titleClass }">
          <h4 :id="titleId" :class="titleClass" @click="close">
            <el-icon><ArrowRight /></el-icon>
          </h4>
        </template>
        <div class="Tabs">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane label="Market" name="first">
              <h1>Hong Kong HS50 Index</h1>
              <div>
                <el-row :gutter="16">
                  <el-col :span="8"
                    ><div class="grid-content ep-bg-purple">
                      <span>Bid</span>
                    </div>
                  </el-col>
                  <el-col :span="8"
                    ><div class="grid-content ep-bg-purple">
                      <span>Ask</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="line-progress">
                <span class="sp-bid">30%</span>
                <el-progress
                  :percentage="30"
                  width="100"
                  :show-text="false"
                ></el-progress>
                <span class="sp-ask">70%</span>
              </div>
              <div>
                <el-table
                  :data="tableData2"
                  style="width: 100%"
                  :row-class-name="tableRowClassName"
                >
                  <el-table-column prop="d1" width="80" />
                  <el-table-column prop="d2" width="80" />
                  <el-table-column prop="d3" width="80" />
                  <el-table-column prop="d4" width="80" />
                </el-table>
              </div>
              <div class="tab1-ts">
                <el-form :model="form" label-width="120px">
                  <el-form-item label="Quantity">
                    <el-input-number
                      v-model="form.num"
                      :step="1"
                      @change="handleChange"
                    />
                  </el-form-item>
                  <el-form-item label="Deposit required">
                    <span>HK$10</span>
                  </el-form-item>
                  <el-form-item label="Stop surplus">
                    <el-switch v-model="form.surplus" />
                  </el-form-item>
                  <el-form-item label="Stop loss">
                    <el-switch v-model="form.loss" />
                  </el-form-item>
                  <el-form-item>
                    <el-button
                      type="primary"
                      class="btn-trade"
                      @click="onSubmitSell"
                      >Buy</el-button
                    >
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Limit" name="second">Limit</el-tab-pane>
          </el-tabs>
        </div>
      </el-drawer>
    </div>
    <div>
      <!--    <iframe-->
      <!--      style="width: 100%; height: 500px"-->
      <!--      src="https://traderview.mcrare.com/klinechart/#/?name=BTCUSDT"-->
      <!--    ></iframe>-->
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { ElButton, ElMessageBox } from 'element-plus';
import { Star, ArrowRight } from '@element-plus/icons-vue';
import { socketStore } from '@/store/index.js';
import { popularSymbols } from '@/assets/data/symbol.js';

const useSocketStore = socketStore();
const liveData = computed(() => useSocketStore.liveData);
const statisticData = computed(() => useSocketStore.statisticData);
const activeName = ref('first');
if (
  !useSocketStore.socket &&
  sessionStorage.getItem('account') &&
  sessionStorage.getItem('password')
) {
  useSocketStore.initSocket({
    account: sessionStorage.getItem('account'),
    password: sessionStorage.getItem('password'),
  });
}

const handleClick = () => {
  console.log(123);
};

const starV = 0;

const tableData = computed(() =>
  popularSymbols.map((item) => {
    const symbolData = statisticData.value?.[item.name];
    const ask = liveData.value?.[item.name]?.['bid'] ?? '0.00';
    const high =
      symbolData?.['askHigh']?.toFixed(symbolData?.digits ?? 2) ?? '0.00';
    const low =
      symbolData?.['askLow']?.toFixed(symbolData?.digits ?? 2) ?? '0.00';
    const change =
      ask && symbolData?.['priceOpen']
        ? (ask - symbolData?.['priceOpen']) / symbolData?.['priceOpen']
        : 0;
    return {
      d1: item.displayName,
      d2: `${(change * 100).toFixed(2)}%`,
      d3: ask,
      d4: liveData.value?.[item.name]?.['ask'] ?? '0.00',
      d5: `${high} \\ ${low}`,
    };
  })
);

const tableData2 = [
  {
    d1: '2013',
    d2: 'Tom',
    d3: 'No. ',
    d4: '2013',
  },
  {
    d1: '2013',
    d2: 'Tom',
    d3: 'No. ',
    d4: '2013',
  },
  {
    d1: '2013',
    d2: 'Tom',
    d3: 'No. ',
    d4: '2013',
  },
  {
    d1: '2013',
    d2: 'Tom',
    d3: 'No. ',
    d4: '2013',
  },
  {
    d1: '2013',
    d2: 'Tom',
    d3: 'No. ',
    d4: '2013',
  },
];
const visible = ref(false);
const visible2 = ref(false);
const form = reactive({
  num: 1,
  region: '',
  date1: '',
  date2: '',
  surplus: true,
  loss: true,
});
const handleChange = () => {
  console.log(123);
};
// const changeStar = () => {};
const onSubmitSell = () => {
  ElMessageBox.confirm(`Are you confirm to chose  ?`)
    .then(() => {
      console.log(2);
      // visible.value = false;
      // 市价下单
      // useSocketStore.marketCreate({
      //   sbl: 'DOTUSDT',
      //   vol: 30000,
      //   price: liveData.value?.['DOTUSDT']?.['bid'],
      //   type: 0,
      // });
      // 挂单
      // useSocketStore.positionCreate({
      //   sbl: 'DOTUSDT',
      //   vol: 100,
      //   price: liveData.value?.['DOTUSDT']?.['bid'] * 0.8,
      //   type: 2,
      // });
      // // 删除挂单
      // useSocketStore.deleteHangingOrder(209);
      // 平仓
      useSocketStore.marketClose({ id: 217, vol: 10000 });
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style scoped lang="less">
.table1 {
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
  margin-top: 22px;
}
.popular {
  width: 95%;
  float: right;
}
.tableBox ::v-deep .el-drawer {
  .el-drawer__header {
    background: #0c3d93;
    text-align: left;
  }
  .el-icon {
    color: #fff;
    position: relative;
    top: -5px;
    height: 2em;
    width: 2em;
    svg {
      height: 2em;
      width: 2em;
    }
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.Tabs {
  h1 {
    color: #0c3d93;
    font-size: 1.3em;
    text-align: left;
    margin-bottom: 50px;
  }
  .grid-content {
    text-align: left;
  }
}
.Tabs ::v-deep .el-tabs__nav {
  width: 100%;
}
.Tabs ::v-deep .el-tabs__item:hover {
  color: #0c3d93;
}
.Tabs ::v-deep .el-tabs__item {
  width: 50%;
}
.Tabs ::v-deep .el-tabs__item.is-active {
  color: #0c3d93;

  font-weight: bold;
}
.tab1-ts {
  margin-top: 20px;
}
.Tabs ::v-deep .el-tabs__active-bar {
  background-color: #0c3d93;
}
.line-progress {
  margin-top: 10px;
  margin-bottom: 20px;
  .sp-bid {
    color: red;
  }
  .sp-ask {
    color: green;
  }
  .el-progress {
    width: 70%;
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
    ::v-deep .el-progress-bar__outer {
      background: green;
    }
    ::v-deep .el-progress-bar__inner {
      background: red;
    }
  }
}
.el-form-item__content {
  margin-left: 0;
}
.btn-trade {
  background: #0d3d92;
  width: 300px;
  border: none;
  border-radius: 30px;
  margin: 0 auto;
  display: block;
  height: 45px;
  line-height: 30px;
  font-size: 20px;
}
</style>
