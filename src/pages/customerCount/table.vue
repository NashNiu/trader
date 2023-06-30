<template>
  <div class="custom-table">
    <el-table
      v-loading="prop.loadingTable"
      row-key="account"
      style="width: 100%"
      size="small"
      :indent="20"
      :data="prop.treeData"
      :expand-row-keys="prop.expandedKey"
      :row-class-name="_getRowClass"
      :show-header="prop.childrenNode"
      @expand-change="_toggleRowExpansion"
    >
      <el-table-column type="expand" width="20">
        <template #default="props">
          <table-count
            :tree-data="props.row.childrens"
            :children-node="false"
            @expand="_toggleRowExpansion"
            @collapse="_toggleRowExpansion"
          ></table-count>
        </template>
      </el-table-column>
      <el-table-column
        prop="account"
        align="center"
        :label="t('customer.tracc')"
      ></el-table-column>
      <el-table-column
        prop="map.countnum"
        align="center"
        :label="t('customerCount.numcus')"
      ></el-table-column>
      <el-table-column
        prop="agentType"
        align="center"
        :label="t('customer.acctype')"
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
      <el-table-column align="center" :label="t('customerCount.totalde')">
        <template #default="scope">
          {{ formatDot(scope.row.map.deposit) }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('customerCount.totalwi')">
        <template #default="scope">
          {{ formatDot(scope.row.map.gold) }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('customerCount.netdeposit')">
        <template #default="scope">
          {{ formatDot(scope.row.map.netincome) }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('customerCount.proloss2')">
        <template #default="scope">
          {{ formatDot(scope.row.map.totalprofit) }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('customerCount.totaltra2')">
        <template #default="scope">
          <span :class="'tree' + scope.row.account"></span>
          {{ formatDot(scope.row.map.totallots) }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('customerCount.trebatess')">
        <template #default="scope">
          {{ formatDot(scope.row.map.totalsettledmoney) }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('customerCount.Commission')">
        <template #default="scope">
          {{ formatDot(scope.row.map.sumBackBrokerage) }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('customerCount.trebates2')">
        <template #default="scope">
          {{ formatDot(scope.row.map.startEquity) }}
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('customerCount.trebates3')">
        <template #default="scope">
          {{ formatDot(scope.row.map.endEquity) }}
        </template>
      </el-table-column>
      <template #empty>
        <div>{{ t('customer.nodate') }}</div>
      </template>
    </el-table>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import { currency } from '@/utils/tools.js';
const { t } = useI18n();
const prop = defineProps({
  treeData: {
    type: Array,
    default: () => {
      return [];
    },
  },
  childrenNode: {
    type: Boolean,
    default: true,
  },
  loadingTable: Boolean,
  expandedKey: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
const emit = defineEmits(['expand', 'collapse', 're-get-lsit']);
const formatDot = (val) => {
  return currency.currency(val, '') == '' ? '--' : currency.currency(val, '');
};
const _getRowClass = (row, index) => {
  if (row.row.childrens.length > 0) {
    return '';
  } else {
    return 'hide-expand';
  }
};
const _toggleRowExpansion = (row) => {
  if (prop.expandedKey.indexOf(row.account) < 0) {
    emit('expand', row);
  } else {
    emit('collapse', row);
  }
};
</script>
<script>
export default {
  name: 'tableCount',
};
</script>
<style>
.el-table th > .cell {
  text-align: center;
}
.el-form {
  padding: 0 20px;
}
.basic-left-free {
  overflow: hidden;
}
.basic-left-free .basic-bold {
  font-weight: bold;
  display: block;
  float: left;
  line-height: 32px;
}
.basic-agent-free {
  vertical-align: middle;
  line-height: 32px;
}
.custom-table .el-form--inline .el-form-item__content {
  width: 300px;
}
.hide-expand .el-table__expand-column .cell {
  display: none;
}
</style>
