<template>
  <div class="customer-box">
    <div class="customerTitle">
      <h3 class="title">{{ t('commManage.cdetails') }}</h3>
    </div>
    <div class="tabContentBox">
      <div class="search">
        <div class="picker_style">
          <el-date-picker
            v-model="data.timeRange"
            type="daterange"
            value-format="YYYY/MM/DD"
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
          <el-button @click="_goPage">
            {{ t('customer.return') }}
          </el-button>
        </div>
      </div>
      <el-row :gutter="20" class="set-margin-top">
        <el-col :span="6">
          <div class="info-text grid-content bg-purple">
            <p class="info-money">
              {{ data.tradeInfo.settmentOverview.alreadySettledMoney }}
            </p>
            <p>{{ t('commManage.sor') }}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="info-text grid-content bg-purple">
            <p class="info-money">
              {{ data.tradeInfo.settmentOverview.sumBackBrokerage }}
            </p>
            <p>{{ t('commManage.settlecomms') }}</p>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="set-margin-top">
        <el-col :span="20">
          <div>
            <p class="count-title">{{ t('commManage.tataltrance') }}</p>
            <el-row :gutter="15" :span="24">
              <el-col :span="6">
                <span class="count-cat">
                  {{ t('commManage.lindgold') }}
                  <br />
                  {{ data.tradeInfo.settmentOverview.goldCountStatic }}
                </span>
              </el-col>
              <el-col :span="6">
                <span class="count-cat">
                  {{ t('commManage.usoil') }}
                  <br />
                  {{ data.tradeInfo.settmentOverview.oilCountStatic }}
                </span>
              </el-col>
              <el-col :span="6">
                <span class="count-cat">
                  {{ t('commManage.forexchange') }}
                  <br />
                  {{ data.tradeInfo.settmentOverview.exchangeCountStatic }}
                </span>
              </el-col>
            </el-row>
            <el-row :gutter="15" :span="24">
              <el-col :span="6">
                <span class="count-cat">
                  {{ t('commManage.china300') }}
                  <br />
                  {{ data.tradeInfo.settmentOverview.china300CountStatic }}
                </span>
              </el-col>
              <el-col :span="6">
                <span class="count-cat">
                  {{ t('commManage.china50') }}
                  <br />
                  {{ data.tradeInfo.settmentOverview.china50CountStatic }}
                </span>
              </el-col>
              <el-col :span="6">
                <span class="count-cat">
                  {{ t('commManage.lonsilv') }}
                  <br />
                  {{ data.tradeInfo.settmentOverview.silverCountStatic }}
                </span>
              </el-col>
            </el-row>
            <el-row :gutter="15" :span="24">
              <el-col :span="6">
                <span class="count-cat">
                  {{ t('commManage.britishoil') }}
                  <br />
                  {{ data.tradeInfo.settmentOverview.britainOilCountStatic }}
                </span>
              </el-col>
              <el-col :span="6">
                <span class="count-cat">
                  {{ t('commManage.stock') }}
                  <br />
                  {{ data.tradeInfo.settmentOverview.stockCountStatic }}
                </span>
              </el-col>
              <el-col :span="6">
                <span class="count-cat">
                  {{ t('commManage.oindex') }}
                  <br />
                  {{ data.tradeInfo.settmentOverview.indexCountStatic }}
                </span>
              </el-col>
            </el-row>
            <el-row :gutter="15">
              <el-col :span="6">
                <span class="count-cat">
                  {{ t('commManage.otherbtc') }}
                  <br />
                  {{
                    data.tradeInfo.settmentOverview.btcsCountStatic +
                    data.tradeInfo.settmentOverview.btcCountStatic
                  }}
                </span>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <el-table
        v-loading="loadingTable"
        size="small"
        class="set-margin-top"
        :data="data.tradeInfo.tradeInfo ? data.tradeInfo.tradeInfo : []"
        style="width: 100%"
      >
        <el-table-column
          prop="order_id"
          :label="t('commManage.ordnum')"
          align="center"
        ></el-table-column>
        <el-table-column align="center" :label="t('commManage.ordite')">
          <template #default="scope">
            {{ scope.row.symbol }}
          </template>
        </el-table-column>
        <el-table-column
          width="70"
          align="center"
          :label="t('commManage.salet')"
        >
          <template #default="scope">
            {{ scope.row.command === 'OP_BUY' ? '买入' : '卖出' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="lot"
          width="80"
          align="center"
          :label="t('commManage.lotsize')"
        >
          <template #default="scope">
            {{ formatDot(scope.row.lot) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="close_time"
          width="145"
          align="center"
          :label="t('commManage.closet')"
        >
          <template #default="scope">
            <span>
              {{
                getDate(new Date(scope.row.close_time).getTime() / 1000, 'year')
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          :label="t('commManage.traclient')"
        ></el-table-column>
        <el-table-column
          align="center"
          width="140"
          :label="t('commManage.insclients')"
        >
          <template #default="scope">
            {{ scope.row.daliName ? scope.row.daliName : '--' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="account_commission"
          align="center"
          :label="t('commManage.ownrebate')"
        ></el-table-column>
        <el-table-column align="center" :label="t('commManage.sor')">
          <template #default="scope">
            {{
              scope.row.account_can_gain_comm !== ''
                ? scope.row.account_can_gain_comm
                : '--'
            }}
          </template>
        </el-table-column>
        <el-table-column align="center" :label="t('commManage.soc')">
          <template #default="scope">
            {{
              scope.row.backBrokerage !== '' ? scope.row.backBrokerage : '--'
            }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="140"
          :label="t('commManage.settleteime')"
        >
          <template #default="scope">
            <span>
              {{
                getDate(new Date(scope.row.updateDate).getTime() / 1000, 'year')
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="isSettlement"
          align="center"
          :label="t('commManage.ss')"
        ></el-table-column>
        <template #empty>
          <div>{{ t('customer.nodate') }}</div>
        </template>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        ref="pageTrade"
        :page-size="data.pageSize"
        :total="data.tradeInfo.count"
        @current-change="_pageChange($event)"
      ></el-pagination>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/index.js';
import { useRoute, useRouter } from 'vue-router';
import { currency } from '@/utils/tools.js';
import {
  getTradeInfoDetails,
  getExportTradeInfoDetails,
} from '@/api/agency.js';
import { getDate } from '@/utils/tools.js';
const { t } = useI18n();
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const account = route.query.account;
const data = reactive({
  timeRange: '',
  loadingTable: false,
  tradeInfo: {
    settmentOverview: {},
    tradeInfo: [],
  },
});
onMounted(() => {
  getData(0);
});
const formatDot = (val) => {
  return currency.currency(val, '') == '' ? '--' : currency.currency(val, '');
};
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
      data.timeRange = undefined; // 如果超过了最大范围，清空选择的日期范围
    }
  }
};
const _searchUserList = () => {
  getData(0);
};
// 返佣明细导出方法
const _exportUserList = async () => {
  const params = {
    beginCreateTime:
      data.timeRange && data.timeRange[0]
        ? data.timeRange[0] + ' 00:00:00'
        : undefined,
    endCreateTime:
      data.timeRange && data.timeRange[1]
        ? data.timeRange[1] + ' 23:59:59'
        : undefined,
    account: account,
    platform: userStore.platform,
    isSettlement: 1,
  };
  const res = await getExportTradeInfoDetails(params);
  if (res.data.IsSuccess) {
    let url = res.data.Data;
    window.location.href =
      'http://manage.crm.lan/agentrelation/' +
      url.slice(url.indexOf('./') + 1, url.length);
  } else {
    ElMessage.error(res.data.Data);
  }
};
const _goPage = () => {
  router.go(-1);
};
const getData = async (num) => {
  data.loadingTable = true;
  let params = {
    beginCreateTime:
      data.timeRange && data.timeRange[0]
        ? data.timeRange[0] + ' 00:00:00'
        : undefined,
    endCreateTime:
      data.timeRange && data.timeRange[1]
        ? data.timeRange[1] + ' 23:59:59'
        : undefined,
    account: account,
    platform: userStore.platform,
    pageSize: data.pageSize,
    pageNo: num,
    isSettlement: 1,
  };
  const res = await getTradeInfoDetails(params);
  if (res.data.IsSuccess) {
    data.loadingTable = false;
    data.tradeInfo = res.data.Data;
  }
};
const _pageChange = (page) => {
  getData(page - 1);
};
</script>
<style lang="less" scoped>
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
.search {
  display: flex;
  align-items: center;
  .search_button {
    margin-left: 30px;
  }
}
.info-text {
  margin-top: 5px;
  p {
    font-size: 14px;
    color: #848ca3;
  }
  .info-money {
    font-size: 22px;
    line-height: 24px;
    color: #3756c3;
    margin-bottom: 8px;
  }
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.bg-purple {
  margin-top: 10px;
  background: #f1fbff;
  padding: 15px 0;
  text-align: center;
  border-bottom: 4px solid #bbeeff;

  p {
    color: #8b9ea5;
  }

  .info-money {
    color: #23b7e5;
    font-size: 24px;
    margin-bottom: 10px;
  }
}
.count-title {
  text-align: left;
  font-size: 20px;
  line-height: 30px;
  font-size: 16px;
}
.count-cat {
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  display: inline-block;
  padding: 5px;
  width: 95%;
  margin-bottom: 5px;
  font-size: 14px;
  text-align: center;
}
</style>
