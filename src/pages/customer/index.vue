<template>
  <div class="customer-box">
    <div class="customerTitle">
      <h3 class="title">{{ t('customer.title') }}</h3>
    </div>
    <div class="tabContentBox">
      <div style="text-align: right; margin-bottom: 15px">
        <el-button type="primary" @click="_exportUserList">
          {{ t('customer.exportButton') }}
        </el-button>
      </div>
      <el-row :gutter="16">
        <el-col :span="5">
          <el-card class="box-card customer-tree card-style" shadow="never">
            <template #header>
              <div class="clearfix user-tree">
                <span>{{ t('customer.undername') }}：</span>
              </div>
            </template>
            <el-tree
              ref="userTree"
              node-key="account"
              class="diy-style"
              :icon="User"
              :empty-text="t('customer.nodate')"
              :render-content="_renderContent"
              :data="treeData"
              accordion
              :default-expanded-keys="expandedKey"
              :props="defaultTreeDataProps"
              @node-click="_treeClick"
              @node-collapse="_collapse"
              @node-expand="_expand"
            ></el-tree>
          </el-card>
        </el-col>
        <el-col :span="19">
          <el-card class="box-card" shadow="never">
            <new-table
              class="tree-tbale"
              :loading-table="loadingTable"
              :tree-data="treeData"
              :expanded-key="expandedKey"
              @re-get-lsit="_getData"
              @expand="_expand"
              @collapse="_collapse"
            ></new-table>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script setup>
import { User } from '@element-plus/icons-vue';
import { onMounted, ref, nextTick } from 'vue';
import { useUserStore } from '@/store/index.js';
import { exportUserList, getUserList } from '@/api/agency.js';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import newTable from './table.vue';
import $ from 'jquery';
const { t } = useI18n();
const treeData = ref([]); // 名下用户列表tree数据
const expandedKey = ref([]);
const userTree = ref();
const defaultTreeDataProps = ref({
  children: 'childrens',
  label: 'username',
});
const loadingTable = ref(false);
onMounted(() => {
  _getData();
});
const userStore = useUserStore();
// 导出名下客户列表方法
const _exportUserList = async () => {
  exportUserList({
    account: userStore.userInfo?.mtaccr,
    platform: userStore.platform,
  }).then((res) => {
    if (res.data.IsSuccess) {
      let url = res.data.Data;
      window.location.href =
        'http://manage.crm.lan/agentrelation/' +
        url.slice(url.indexOf('./') + 1, url.length);
    } else {
      ElMessage.error('导出下级用户列表失败');
    }
  });
};
// 获取名下客户列表
const _getData = async () => {
  console.log('asddddddddddddddddd');
  loadingTable.value = true;
  const res = await getUserList({
    account: String(userStore.userInfo?.mtaccr),
    platform: userStore.platform,
  });
  if (res.data.IsSuccess) {
    loadingTable.value = false;
    treeData.value = _createTreeData(res.data.Data);
    console.log(treeData.value);
  }
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
// 联动变色
const _treeClick = (row) => {
  $('.tree-active').removeClass('tree-active');
  nextTick(() => {
    $('.tree' + row.account)
      .closest('tr')
      .addClass('tree-active');
  });
};
const _collapse = (row) => {
  // 修改default-expanded-keys无法控制tree动态收缩和展开
  for (const item of userTree.value.store._getAllNodes()) {
    item.expanded = false;
  }
  if (expandedKey.value.indexOf(row.account) > -1) {
    updatedExpandeKey(row.account);
  }
};
const _expand = (row) => {
  if (row.agentLevel == 1) {
    // 修改default-expanded-keys无法控制tree动态收缩和展开
    if (expandedKey.value.indexOf(row.account) < 0) {
      for (const item of userTree.value.store._getAllNodes()) {
        item.expanded = false;
      }
    }
    setExpandedKey(row);
  } else {
    setExpandedKey(row);
  }
};
const setExpandedKey = (row) => {
  if (!row) {
    expandedKey.value = [];
  } else if (row.agentLevel == 1) {
    expandedKey.value = [];
    expandedKey.value.push(row.account);
  } else {
    expandedKey.value.push(row.account);
  }
};
// 关闭用户tree展开
const updatedExpandeKey = (account) => {
  for (let i = 0; i < expandedKey.value.length; i++) {
    if (expandedKey[i] == account) {
      expandedKey.value.splice(i);
      break;
    }
  }
};
</script>
<style lang="less">
.el-tree-node__expand-icon.is-leaf {
  color: #000;
  font-size: 16px;
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
.diy-style {
  .el-tree-node {
    .el-tree-node__content {
      height: 48px;
    }
  }
}
</style>
<style lang="less" scoped>
.tree-active {
  background-color: #f5efe8 !important;
}
.customer-box {
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
  .tabContentBox {
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
}
</style>
