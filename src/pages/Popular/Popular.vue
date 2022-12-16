<template>
  <el-table :data="tableData" style="width: 100%" height="300" class="table1">
    <el-table-column prop="d1" label="Financial tool" width="180" />
    <el-table-column prop="d2" label="Change" width="180" />
    <el-table-column prop="d3" label="Sell" />
    <el-table-column>
      <template #header> </template>
      <template>
        <el-button round size="small" @click="visible = true">Sell</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="d4" label="Buy" />
    <el-table-column>
      <template #header> </template>
      <template #default="scope">
        <el-button
          round
          size="small"
          @click="handleEdit(scope.$index, scope.row)"
          >Buy</el-button
        >
      </template>
    </el-table-column>
    <el-table-column prop="d5" label="High/low" />
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
            <div>
              <el-form :model="form" label-width="120px">
                <el-form-item label="Quantity">
                  <el-input-number v-model="form.num" :step="1" />
                </el-form-item>
                <el-form-item label="Deposit required">
                  <span>HK$10</span>
                </el-form-item>
                <el-form-item label="Activity time">
                  <el-col :span="11">
                    <el-date-picker
                      v-model="form.date1"
                      type="date"
                      placeholder="Pick a date"
                      style="width: 100%"
                    />
                  </el-col>
                  <el-col :span="2" class="text-center">
                    <span class="text-gray-500">-</span>
                  </el-col>
                  <el-col :span="11">
                    <el-time-picker
                      v-model="form.date2"
                      placeholder="Pick a time"
                      style="width: 100%"
                    />
                  </el-col>
                </el-form-item>
                <el-form-item label="Stop surplus">
                  <el-switch v-model="form.delivery" />
                </el-form-item>
                <el-form-item label="Stop loss">
                  <el-switch v-model="form.delivery" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">Create</el-button>
                  <el-button>Cancel</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Limit" name="second">Limit</el-tab-pane>
        </el-tabs>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { ElButton } from 'element-plus';
import { ArrowRight } from '@element-plus/icons-vue';
const handleEdit = () => {};
const activeName = ref('first');
const handleClick = () => {
  console.log(123);
};
const tableData = [
  {
    d1: 'AUD/USD',
    d2: '-20%',
    d3: '45.25',
    d4: '46.25',
    d5: '0.354154/.0548484',
  },
  {
    d1: 'AUD/USD',
    d2: '-20%',
    d3: '45.25',
    d4: '46.25',
    d5: '0.354154/.0548484',
  },
  {
    d1: 'AUD/USD',
    d2: '-20%',
    d3: '45.25',
    d4: '46.25',
    d5: '0.354154/.0548484',
  },
  {
    d1: 'AUD/USD',
    d2: '-20%',
    d3: '45.25',
    d4: '46.25',
    d5: '0.354154/.0548484',
  },
];
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

const form = reactive({
  mum: 2,
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
});

const onSubmit = () => {
  console.log('submit!');
};
</script>

<style scoped lang="less">
.table1 {
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
  margin-top: 22px;
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
</style>
