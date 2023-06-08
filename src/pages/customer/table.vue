<template>
  <div class="custom-table">
    <el-table
      style="width: 100%"
      size="small"
      class="table-style"
      :data="treeData"
      :row-key="getRowKeys"
      :expand-row-keys="expandedKey"
      :row-class-name="_getRowClass"
      :show-header="childrenNode"
      @expand-change="_toggleRowExpansion"
    >
      <el-table-column type="expand" width="30">
        <template #default="props">
          <new-table
            :children-node="false"
            :tree-data="props.row.childrens"
            @expand="_toggleRowExpansion"
            @collapse="_toggleRowExpansion"
          ></new-table>
        </template>
      </el-table-column>
      <el-table-column
        :label="t('customer.tracc')"
        prop="account"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="t('customer.acctype')"
        prop="agentType"
        width="180"
        align="center"
      >
        <template #default="scope">
          <span :class="'tree' + scope.row.account"></span>
          <span :style="scope.row.agentType == 1 ? 'color:#5171e2' : ''">
            {{
              scope.row.agentType == 1
                ? t('customer.inscustom')
                : t('customer.ordcustom')
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="t('customer.Group')"
        prop="isNoLoad"
        width="85"
        align="center"
      >
        <template #default="scope">
          {{ getIsNoLoad(scope.row.isNoLoad) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="t('customer.groper')"
        prop="haveGroups"
        width="210"
        align="center"
      >
        <template #default="scope">
          {{ getIsNoLoad(scope.row.haveGroups) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="joinDailiTime"
        align="center"
        :label="t('customer.regdate')"
      >
        <template #default="scope">
          <span>
            {{
              getDate(
                new Date(scope.row.joinDailiTime).getTime() / 1000,
                'year'
              )
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="t('customer.operation')" width="140">
        <template #default="scope">
          <el-tooltip :content="t('customer.tinfom')" placement="top">
            <el-button
              type="success"
              :icon="Message"
              circle
              @click="_handleDetails(scope.$index, scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            v-if="scope.row.agentType == '1'"
            placement="top"
            :content="t('customer.lowlevel')"
          >
            <el-button
              type="primary"
              :icon="Edit"
              circle
              @click="_handleEdit(scope.$index, scope.row, 'edit')"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            v-if="
              scope.row.agentType != '1' && accountId == scope.row.dailiAccount
            "
            :content="t('customer.cgrade')"
            placement="top"
          >
            <el-button
              type="danger"
              :icon="Upload"
              circle
              @click="_handleEdit(scope.$index, scope.row, 'up')"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <template #empty>
        <div>{{ t('customer.nodate') }}</div>
      </template>
    </el-table>
    <!-- 修改下级返佣和升级下级 -->
  </div>
</template>
<script setup>
// import { computed, onMounted, ref, watch } from 'vue';
import { Message, Edit, Upload } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/index.js';
import { getDate } from '@/utils/tools.js';
const userStore = useUserStore();
const accountId = userStore.userInfo?.mtaccr;
const { t } = useI18n();
const prop = defineProps(['treeData', 'childrenNode', 'loadingTable']);
const getIsNoLoad = (status) => {
  if (status !== '' && status) {
    const Data = status.split(',');
    let listItem = [];
    userStore.NoLoadList.forEach((item) => {
      if (Data.indexOf(item.value) !== -1) {
        listItem.push(item.label);
      }
    });
    return listItem.join(',');
  } else {
    return '--';
  }
};
</script>
<style lang="less" scoped>
.custom-table {
  .el-form--inline {
    .el-form-item__content {
      width: 300px;
    }
  }
}
</style>
