<template>
  <div id="customer-box">
    <div class="customerTitle">
      <h3 class="title">{{ t('customerCount.title') }}</h3>
    </div>
    <div class="center-view">
      <div class="search">
        <div class="picker_style">
          <el-date-picker
            v-model="states.timeRange"
            type="daterange"
            value-format="YYYY-MM-DD"
            :range-separator="t('customerCount.to')"
            :start-placeholder="t('customerCount.startd')"
            :end-placeholder="t('customerCount.endd')"
            @change="handleDateChange"
          ></el-date-picker>
        </div>
        <div class="search_button">
          <el-button type="primary" @click="_searchUserList">
            {{ t('customerCount.query') }}
          </el-button>
          <el-button @click="_exportUserList">
            {{ t('customer.exportButton') }}
          </el-button>
        </div>
      </div>
      <div class="count-div">
        <p class="data-count">
          <el-button>
            {{ t('customerCount.numofdircli') }}
            {{ states.countData.directAccountNum }}
          </el-button>
          <el-button>
            {{ t('customerCount.numofsubid') }}
            {{ states.countData.lowAccountNum }}
          </el-button>
          <el-button>
            {{ t('customerCount.totaldep') }} {{ states.countData.deposit }}
          </el-button>
          <el-button>
            {{ t('customerCount.totalwit') }}{{ states.countData.gold }}
          </el-button>
        </p>
        <p class="data-count">
          <el-button>
            {{ t('customerCount.proloss') }}{{ states.countData.profit }}
          </el-button>
          <el-button>
            {{ t('customerCount.totaltra') }}{{ states.countData.lot }}
          </el-button>
          <el-button>
            {{ t('customerCount.trebates') }}{{ states.countData.sumBackPoint }}
          </el-button>
          <el-button>
            {{ t('customerCount.totalreb')
            }}{{ states.countData.sumBackBrokerage }}
          </el-button>
        </p>
      </div>
      <el-row :gutter="16">
        <el-col :span="5">
          <el-card class="box-card customer-tree" shadow="never">
            <template #header>
              <div class="clearfix user-tree">
                <span>{{ t('customer.undername') }}：</span>
              </div>
            </template>
            <el-tree
              ref="userTree"
              class="diy-style"
              accordion
              :empty-text="t('customer.nodate')"
              :render-content="_renderContent"
              :data="states.treeData"
              :default-expanded-keys="states.expandedKey"
              node-key="account"
              :props="states.defaultTreeDataProps"
              @node-click="_treeClick"
              @node-collapse="_collapse"
              @node-expand="_expand"
            ></el-tree>
          </el-card>
        </el-col>
        <el-col :span="19">
          <el-card class="box-card" shadow="never">
            <table-count
              class="tree-tbale"
              :expanded-key="states.expandedKey"
              :loading-table="states.loadingTable"
              :tree-data="states.treeData"
              @re-get-lsit="_getData"
              @expand="_expand"
              @collapse="_collapse"
            ></table-count>
          </el-card>
        </el-col>
      </el-row>
      <!-- <p class="tips-p">{{ t('customerCount.report') }}</p> -->
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import { onMounted, reactive, ref, nextTick } from 'vue';
import { useUserStore } from '@/store/index.js';
import { ElMessage } from 'element-plus';
import $ from 'jquery';
import tableCount from './table.vue';
import {
  getDailiSubordinateUserData,
  getSubordinateUserData,
  exportSubordinateUserData,
} from '@/api/agency.js';
const userStore = useUserStore();
const { t } = useI18n();
const userTree = ref();
const states = reactive({
  timeRange: '',
  countData: {},
  loadingTable: false,
  treeData: [],
  expandedKey: [],
  defaultTreeDataProps: {
    children: 'childrens',
    label: 'name',
  },
});
onMounted(() => {
  _searchUserList();
});
// 时间选择器方法
const handleDateChange = (value) => {
  if (value) {
    const startDate = value[0];
    const endDate = value[1];
    const maxRange = 90 * 24 * 60 * 60 * 1000; // 最大范围为90天，转换为毫秒数   this.t('fun.lg90')
    if (
      startDate &&
      endDate &&
      new Date(endDate) - new Date(startDate) > maxRange
    ) {
      // 判断选择的日期范围是否超过了最大范围
      ElMessage.error(t('customerCount.lg90'));
      states.timeRange = undefined; // 如果超过了最大范围，清空选择的日期范围
    }
  }
};
// 查询方法
const _searchUserList = () => {
  _getDailiDataCount();
  _getData();
};
// 查询交易详情数据
const _getDailiDataCount = async () => {
  const params = {
    beginCreateTime:
      states.timeRange && states.timeRange[0]
        ? states.timeRange[0] + ' 00:00:00'
        : undefined,
    endCreateTime:
      states.timeRange && states.timeRange[1]
        ? states.timeRange[1] + ' 23:59:59'
        : undefined,
    account: userStore.userInfo?.mtaccr,
    platform: userStore.platform,
  };
  const res = await getDailiSubordinateUserData(params);
  if (res.data.IsSuccess) {
    states.countData = res.data.Data;
  }
};
// 获取列表数据
const _getData = async () => {
  states.loadingTable = true;
  const params = {
    beginCreateTime:
      states.timeRange && states.timeRange[0]
        ? states.timeRange[0] + ' 00:00:00'
        : undefined,
    endCreateTime:
      states.timeRange && states.timeRange[1]
        ? states.timeRange[1] + ' 23:59:59'
        : undefined,
    account: userStore.userInfo?.mtaccr,
    platform: userStore.platform,
  };
  const res = await getSubordinateUserData(params);
  states.loadingTable = false;
  if (res.data.IsSuccess) {
    states.treeData = _createTreeData(res.data.Data);
  }
};
// 导出方法
const _exportUserList = async () => {
  const params = {
    beginCreateTime:
      states.timeRange && states.timeRange[0]
        ? states.timeRange[0] + ' 00:00:00'
        : undefined,
    endCreateTime:
      states.timeRange && states.timeRange[1]
        ? states.timeRange[1] + ' 23:59:59'
        : undefined,
    account: userStore.userInfo?.mtaccr,
    platform: userStore.platform,
  };
  const res = await exportSubordinateUserData(params);
  if (res.data.IsSuccess) {
    let url = res.data.Data;
    window.location.href =
      'http://manage.crm.lan/agentrelation/' +
      url.slice(url.indexOf('./') + 1, url.length);
  } else {
    ElMessage.error(res.data.Data);
  }
};
// 机构客户高亮
const _renderContent = (h, { data }) => {
  return h(
    'span',
    {
      class: 'custom-tree-node',
      style: {
        color: data.agentType == 1 ? '#5171e2' : '',
      },
    },
    [
      h(
        'span',
        {
          class: 'el-tree-node__label',
        },
        data.username
      ),
    ]
  );
};
// 生成数据
const _createTreeData = (data) => {
  let resData = data;
  console.log(resData);
  let tree = [];
  let minIndex = resData[0] ? resData[0].agentLevel : '1';
  for (let i = 0; i < resData.length; i++) {
    if (minIndex > resData[i].agentLevel) {
      minIndex = resData[i].agentLevel;
    }
  }
  for (let i = 0; i < resData.length; i++) {
    if (resData[i].agentLevel == minIndex) {
      resData[i].childrens = [];
      resData[i].havechildren = 0;
      resData[i]['auth'] = '1';
      tree.push(resData[i]);
      resData.splice(i, 1);
      i--;
    }
  }
  // 最外层排序
  tree.sort(sortTimeArr).sort(sortJGArr);
  run(tree);
  function run(chiArr) {
    if (resData.length !== 0) {
      for (let i = 0; i < chiArr.length; i++) {
        for (let j = 0; j < resData.length; j++) {
          if (chiArr[i].account == resData[j]['dailiAccount']) {
            resData[j].childrens = [];
            chiArr[i].havechildren = 1;
            resData[j]['auth'] = '0';
            chiArr[i].childrens.push(resData[j]);
            resData.splice(j, 1);
            j--;
          }
        }
        run(chiArr[i].childrens.sort(sortTimeArr).sort(sortJGArr));
      }
    }
  }
  function sortJGArr(a, b) {
    return b.agentType - a.agentType;
  }

  function sortTimeArr(a, b) {
    return (
      new Date(b.accountCreateTime).getTime() -
      new Date(a.accountCreateTime).getTime()
    );
  }
  return tree;
};
const _expand = (row) => {
  if (row.agentLevel == 1) {
    // 修改default-expanded-keys无法控制tree动态收缩和展开
    if (states.expandedKey.indexOf(row.account) < 0) {
      for (const item of userTree.value.store._getAllNodes()) {
        item.expanded = false;
      }
    }
    setExpandedKey(row);
  } else {
    setExpandedKey(row);
  }
};
const _collapse = (row) => {
  // 修改default-expanded-keys无法控制tree动态收缩和展开
  for (const item of userTree.value.store._getAllNodes()) {
    item.expanded = false;
  }
  if (states.expandedKey.indexOf(row.account) > -1) {
    updatedExpandeKey(row.account);
  }
};
// 关闭用户tree展开
const updatedExpandeKey = (account) => {
  for (let i = 0; i < states.expandedKey.length; i++) {
    if (states.expandedKey[i] == account) {
      states.expandedKey.splice(i);
      break;
    }
  }
};
const setExpandedKey = (row) => {
  if (!row) {
    states.expandedKey = [];
  } else if (row.agentLevel == 1) {
    states.expandedKey = [];
    states.expandedKey.push(row.account);
  } else {
    states.expandedKey.push(row.account);
  }
};
// 联动变色
const _treeClick = (row) => {
  $('.tree-active').removeClass('tree-active');
  nextTick(() => {
    $('.tree' + row.account)
      .closest('tr')
      .addClass('tree-active');
  });
};
</script>
<style lang="less">
.diy-style {
  padding: 15px 0;
  .el-tree-node {
    .el-tree-node__content {
      height: 32px;
      margin-bottom: 5px;
    }
  }
}
.customer-tree {
  .el-card__header {
    margin-bottom: 0 !important;
    padding: 11px 0px !important;
  }
  .el-card__body {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
}
</style>
<style lang="less" scoped>
.tips-p {
  color: #dc3b3b;
  font-size: 14px;
  margin-top: 20px;
}
.user-tree {
  padding: 0 10px;
  font-size: 14px;
}
.tree-active {
  background-color: #f5efe8 !important;
}
#customer-box {
  padding: 20px;
  box-sizing: border-box;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  height: 100%;
  .customerTitle {
    padding-left: 15px;
    .title {
      font-size: 22px;
      color: #0c3d93;
      margin-bottom: 15px;
    }
  }
  .center-view {
    margin-top: 15px;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: #ffffff;
    flex: 1;
    display: flex;
    flex-direction: column;
    height: calc(100% - 80px);
  }
  .search {
    display: flex;
    align-items: center;
    .search_button {
      margin-left: 30px;
    }
  }
  .count-div {
    margin-top: 20px;
    .data-count {
      padding-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .el-button {
        flex: 1;
        padding: 8px;
      }
    }
  }
}
</style>
