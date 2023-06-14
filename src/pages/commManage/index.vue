<template>
  <div class="manage-box">
    <div class="customerTitle">
      <h3 class="title">{{ t('commManage.title') }}</h3>
    </div>
    <div class="center-view">
      <el-tabs v-model="data.tabActive" type="card" @tab-click="_handleClick">
        <el-tab-pane :label="t('commManage.ewallet')" name="first">
          <el-row :gutter="10">
            <el-col :span="5">
              <div class="top-box blank1">
                <h4>
                  {{ formatSettleType(data.electronic.settlementType) }}
                </h4>
                <h6>{{ t('commManage.comtype') }}</h6>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="top-box blank2">
                <h4>${{ data.electronic.balance }}</h4>
                <h6>{{ t('commManage.walletbal') }}</h6>
              </div>
            </el-col>
          </el-row>
          <el-card
            class="box-card container_box_card"
            shadow="never"
            style="margin-top: 15px"
          >
            <template #header>
              <div class="clearfix">
                <span>{{ t('commManage.ewallet') }}</span>
                <b></b>
              </div>
            </template>
            <el-row :gutter="0">
              <el-col
                style="margin-bottom: 20px; margin-top: 40px"
                :span="12"
                :offset="5"
              >
                <span class="sub-label">{{ t('commManage.transfermt4') }}</span>
                <span>{{ data.userInfo.account }}</span>
              </el-col>
              <el-col style="margin-bottom: 20px" :span="12" :offset="5">
                <span>{{ t('commManage.transferamo') }}</span>
                <el-input
                  v-model="data.mt4.money"
                  style="width: 200px"
                  :placeholder="t('commManage.amountomt4acc')"
                ></el-input>
              </el-col>
              <el-col :span="12" :offset="5">
                <el-button
                  type="primary"
                  :loading="data.btnLoading"
                  @click="_extractCommission"
                >
                  {{ t('commManage.submit') }}
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24" class="tips">
                <h3>{{ t('commManage.tips') }}：</h3>
                <p>1.{{ t('commManage.tips1') }}</p>
                <p>2.{{ t('commManage.tips2') }}</p>
              </el-col>
            </el-row>
          </el-card>
        </el-tab-pane>
        <el-tab-pane :label="t('commManage.cdetails')" name="secend">
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
            </div>
          </div>
          <el-row :gutter="20" class="set-margin-top">
            <el-col :span="6">
              <div class="info-text grid-content bg-purple">
                <p class="info-money">
                  {{ data.tradeInfo.settmentOverview.alreadySettledMoney }}
                </p>
                <p>{{ t('commManage.totalcomm') }}($)</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="info-text grid-content bg-purple">
                <p class="info-money">
                  {{ data.tradeInfo.settmentOverview.sumBackBrokerage }}
                </p>
                <p>{{ t('commManage.sotr') }}（$）</p>
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
                      {{
                        data.tradeInfo.settmentOverview.britainOilCountStatic
                      }}
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
                {{ scope.row.command === OP_BUY ? '买入' : '卖出' }}
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
            ></el-table-column>
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
            <!-- <el-table-column
              width="120"
              align="center"
              :label="t('commManage.ownlow')"
            >
              <template #default="scope">
                {{
                  scope.row.childAgentCommission
                    ? scope.row.childAgentCommission
                    : '--'
                }}
              </template>
            </el-table-column> -->
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
                  scope.row.backBrokerage !== ''
                    ? scope.row.backBrokerage
                    : '--'
                }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              width="140"
              :label="t('commManage.settleteime')"
            >
              <template #default="scope">
                {{ scope.row.updateDate ? scope.row.updateDate : '--' }}
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
        </el-tab-pane>
        <el-tab-pane :label="t('commManage.rr')" name="third">
          <el-form
            ref="form1"
            label-width="150px"
            :model="data.form"
            :inline="true"
          >
            <!-- 返佣权限 -->
            <div class="basic-left-free">
              <span class="basic-bold" style="margin-right: 25px">
                {{ t('customer.groper') }}
              </span>
              <el-form-item>
                <el-checkbox-group
                  v-model="data.form.haveGroups"
                  style="width: 800px"
                  disabled
                >
                  <el-checkbox
                    v-for="item in isNoLoad"
                    :key="item.value"
                    :label="item.value"
                  >
                    {{ item.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </div>
            <el-tabs v-model="data.activeName" type="card">
              <el-tab-pane :label="t('customer.stpset')" name="0">
                <div class="basic-left-free">
                  <span class="basic-bold">{{ t('customer.frebate2') }}</span>
                  <el-form-item style="margin-left: 65px">
                    <el-input
                      v-model.number="data.form.exchangeFreeCommission"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentExchangeFreeCommission }}
                    {{ t('customer.ulot') }}
                  </span>
                </div>
                <div class="basic-left-free">
                  <span class="basic-bold">{{ t('customer.srebtae2') }}</span>
                  <el-form-item style="margin-left: 65px">
                    <el-input
                      v-model.number="data.form.stockFreeCommission"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentStockFreeCommission }}
                    {{ t('customer.ulot') }}
                  </span>
                </div>
                <div class="basic-left-free">
                  <span class="basic-bold">{{ t('customer.indexc') }}</span>
                </div>
                <div>
                  <el-form-item :label="t('customer.chinar300s')">
                    <el-input
                      v-model.number="data.form.china300FreeCommission"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentChina300FreeCommission }}
                    {{ t('customer.ulot') }}
                  </span>
                  <el-form-item :label="t('customer.chinar50s')">
                    <el-input
                      v-model.number="data.form.china50FreeCommission"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentChina50FreeCommission }}
                    {{ t('customer.ulot') }}
                  </span>
                  <el-form-item :label="t('customer.rebates2')">
                    <el-input
                      v-model.number="data.form.indexFreeCommission"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentIndexFreeCommission }}
                    {{ t('customer.ulot') }}
                  </span>
                </div>
                <div class="basic-left-free">
                  <span class="basic-bold">{{ t('customer.comclass2') }}</span>
                </div>
                <div>
                  <el-form-item :label="t('customer.lgrebate2')">
                    <el-input
                      v-model.number="data.form.goldFreeCommission"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentGoldFreeCommission }}
                    {{ t('customer.ulot') }}
                  </span>

                  <el-form-item :label="t('customer.lsrebate2')">
                    <el-input
                      v-model.number="data.form.silverFreeCommission"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentSilverFreeCommission }}
                    {{ t('customer.ulot') }}
                  </span>

                  <el-form-item :label="t('customer.usoilrebate2')">
                    <el-input
                      v-model.number="data.form.crudeOilFreeCommission"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentCrudeOilFreeCommission }}
                    {{ t('customer.ulot') }}
                  </span>

                  <el-form-item :label="t('customer.ukoilrebate2')">
                    <el-input
                      v-model.number="data.form.britainOilFreeCommission"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentBritainOilFreeCommission }}
                    {{ t('customer.ulot') }}
                  </span>
                </div>
                <div class="basic-left-free">
                  <span class="basic-bold">
                    {{ t('customer.cryrebates2') }}
                  </span>
                </div>
                <div>
                  <el-form-item :label="t('customer.otherrebates2')">
                    <el-input
                      v-model="data.form.btcsFreeCommission"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentBtcsFreeCommission }}
                    {{ t('customer.ulot') }}
                  </span>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="t('customer.ecnset')" name="1">
                <div class="basic-left-free">
                  <span class="basic-bold">{{ t('customer.frebate2') }}</span>
                  <el-form-item style="margin-left: 65px">
                    <el-input
                      v-model.number="data.form.exchangeFreeCommissionEcn"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentExchangeFreeCommissionEcn }}
                    {{ t('customer.ulot') }}
                  </span>
                </div>
                <div class="basic-left-free">
                  <span class="basic-bold">{{ t('customer.srebtae2') }}</span>
                  <el-form-item style="margin-left: 65px">
                    <el-input
                      v-model.number="data.form.stockFreeCommissionEcn"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentStockFreeCommissionEcn }}
                    {{ t('customer.ulot') }}
                  </span>
                </div>
                <div class="basic-left-free">
                  <span class="basic-bold">{{ t('customer.indexc') }}</span>
                </div>
                <div>
                  <el-form-item :label="t('customer.chinar300s')">
                    <el-input
                      v-model.number="data.form.china300FreeCommissionEcn"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentChina300FreeCommissionEcn }}
                    {{ t('customer.ulot') }}
                  </span>
                  <el-form-item :label="t('customer.chinar50s')">
                    <el-input
                      v-model.number="data.form.china50FreeCommissionEcn"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentChina50FreeCommissionEcn }}
                    {{ t('customer.ulot') }}
                  </span>
                  <el-form-item :label="t('customer.rebates2')">
                    <el-input
                      v-model.number="data.form.indexFreeCommissionEcn"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentIndexFreeCommissionEcn }}
                    {{ t('customer.ulot') }}
                  </span>
                </div>
                <div class="basic-left-free">
                  <span class="basic-bold">{{ t('customer.comclass2') }}</span>
                </div>
                <div>
                  <el-form-item :label="t('customer.lgrebate2')">
                    <el-input
                      v-model.number="data.form.goldFreeCommissionEcn"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentGoldFreeCommissionEcn }}
                    {{ t('customer.ulot') }}
                  </span>

                  <el-form-item :label="t('customer.lsrebate2')">
                    <el-input
                      v-model.number="data.form.silverFreeCommissionEcn"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentSilverFreeCommissionEcn }}
                    {{ t('customer.ulot') }}
                  </span>

                  <el-form-item :label="t('customer.usoilrebate2')">
                    <el-input
                      v-model.number="data.form.crudeOilFreeCommissionEcn"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentCrudeOilFreeCommissionEcn }}
                    {{ t('customer.ulot') }}
                  </span>

                  <el-form-item :label="t('customer.ukoilrebate2')">
                    <el-input
                      v-model.number="data.form.britainOilFreeCommissionEcn"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentBritainOilFreeCommissionEcn }}
                    {{ t('customer.ulot') }}
                  </span>
                </div>
                <div class="basic-left-free">
                  <span class="basic-bold">
                    {{ t('customer.cryrebates2') }}
                  </span>
                </div>
                <div>
                  <el-form-item :label="t('customer.otherrebates2')">
                    <el-input
                      v-model="data.form.btcsFreeCommissionEcn"
                      disabled
                    ></el-input>
                  </el-form-item>
                  <span class="basic-agent-free">
                    {{ data.form.agentBtcsFreeCommissionEcn }}
                    {{ t('customer.ulot') }}
                  </span>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '@/store/index.js';
import { ElMessage } from 'element-plus';
import {
  extractCommission,
  saveExtractCommission,
  getElectronicWallet,
  exportTradeInfoDetails,
  tradeInfoDetails,
  getGroupsAndBackPoint,
} from '@/api/agency.js';
import { currency } from '@/utils/tools.js';
const userStore = useUserStore();
const { t } = useI18n();
const isNoLoad = userStore.NoLoadList;
const data = reactive({
  tabActive: 'first',
  electronic: {},
  userInfo: {
    account: userStore.userInfo?.mtaccr,
  },
  mt4: {
    currentWay: 1,
    money: '',
  },
  btnLoading: false,
  timeRange: '',
  pageSize: 10,
  tradeInfo: {
    settmentOverview: {},
    tradeInfo: [],
  },
  form: {},
  activeName: '0',
});
onMounted(() => {
  _getElectronicWallet();
});
const formatDot = (val) => {
  return currency.currency(val, '') == '' ? '--' : currency.currency(val, '');
};
// tab切换
const _handleClick = (tab, event) => {
  let index = +tab.index;
  switch (index) {
    case 0:
      _getElectronicWallet();
      break;
    case 1:
      _getCMTradeInfoDetails(0);
      break;
    case 2:
      _getGroupsAndBackPoint();
      break;
  }
};
const _pageChange = (page) => {
  _getCMTradeInfoDetails(page);
};
const formatSettleType = (val) => {
  let str = '';
  switch (parseInt(val)) {
    case 0:
      str = '每周结算';
      return str;
    case 1:
      str = '每月结算';
      return str;
    case 2:
      str = '禁止结算';
      return str;
    case 3:
      str = '每日结算';
      return str;
  }
  return '';
};
// 获取电子钱包
const _getElectronicWallet = async () => {
  const params = {
    account: userStore.userInfo?.mtaccr,
    platform: userStore.platform,
  };
  const res = await getElectronicWallet(params);
  if (res.data.IsSuccess) {
    data.electronic = res.data.Data;
  }
};
// 佣金明细
const _getCMTradeInfoDetails = async (num) => {
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
    account: userStore.userInfo?.mtaccr,
    platform: userStore.platform,
    pageSize: data.pageSize,
    pageNo: num,
    isSettlement: 1,
  };
  const res = await tradeInfoDetails(params);
  if (res.data.IsSuccess) {
    data.loadingTable = false;
    data.tradeInfo = res.data.Data;
  }
};
// 返点标准
const _getGroupsAndBackPoint = async () => {
  const params = {
    account: userStore.userInfo?.mtaccr,
    platform: userStore.platform,
  };
  const res = await getGroupsAndBackPoint(params);
  if (res.data.IsSuccess) {
    const Data = res.data.Data;
    data.form = { ...Data };
    if (Data.haveGroups !== '') {
      data.form.haveGroups = Data.haveGroups.split(',').map(Number);
    }
  }
};
// 提交佣金
const _extractCommission = async () => {
  data.btnLoading = true;
  const params = {
    type: 1,
    money: data.mt4.money,
    account: userStore.userInfo?.mtaccr,
    platform: userStore.platform,
  };
  if (params.money < 5) {
    ElMessage.error(t('commManage.lgus5'));
    data.btnLoading = false;
    return;
  }
  const res = await extractCommission(params);
  if (res.data.IsSuccess) {
    // 满足转账条件提交转账申请
    saveExtractCommission(params).then((res) => {
      if (res.data.IsSuccess) {
        data.btnLoading = false;
        data.mt4.money = '';
        _getElectronicWallet();
      } else {
        ElMessage.error(res.data.Data);
      }
    });
  } else {
    data.btnLoading = false;
    ElMessage.error(res.data.Data);
  }
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
// 查询方法
const _searchUserList = () => {
  _getCMTradeInfoDetails(0);
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
    account: userStore.userInfo?.mtaccr,
    platform: userStore.platform,
  };
  const res = await exportTradeInfoDetails(params);
  if (res.data.IsSuccess) {
    let url = res.data.Data;
    window.location.href =
      'http://manage.crm.lan/agentrelation/' +
      url.slice(url.indexOf('./') + 1, url.length);
  } else {
    ElMessage.error(res.data.Data);
  }
};
</script>
<style lang="less" scoped>
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
.manage-box {
  padding: 20px;
  box-sizing: border-box;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  height: 100%;
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
  .top-box {
    width: 100%;
    height: 100px;
    background-repeat: no-repeat;
    background-position: 0;
    background-size: contain;
    h4 {
      font-size: 20px;
      color: #23b7e5;
      padding-left: 110px;
      padding-top: 27px;
      margin-bottom: 5px;
    }
    h6 {
      font-size: 12px;
      color: #8b9ea5;
      font-weight: 100;
      padding-left: 110px;
    }
  }
  .blank1 {
    background-image: url(../../assets/img/wallet_1.png);
  }
  .blank2 {
    background-image: url(../../assets/img/wallet_2.png);
  }
  .tips {
    margin-top: 120px;
    h3 {
      color: #dc3b3b;
      font-size: 16px;
      margin-top: 22px;
    }
    p {
      font-size: 14px;
      color: #303133;
      margin-top: 10px;
      span {
        color: #848ca3;
      }
    }
  }
}
.customerTitle {
  padding-left: 15px;
  .title {
    font-size: 22px;
    color: #0c3d93;
    margin-bottom: 15px;
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
.basic-left-free {
  overflow: hidden;
  display: flex;
  .basic-bold {
    font-weight: bold;
    display: block;
    line-height: 32px;
  }
}
.basic-agent-free {
  line-height: 32px;
  font-size: 14px;
  vertical-align: top;
}
</style>
