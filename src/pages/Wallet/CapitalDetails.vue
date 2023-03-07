<template>
  <el-tabs v-model="activeTab" @tab-change="tabChange">
    <el-tab-pane name="deposit">
      <template #label>
        <span>{{ t('wallet.depositDetail') }}</span>
        <el-icon
          v-if="activeTab === 'deposit'"
          style="margin-left: 10px"
          @click="reloadDepositData"
        >
          <Refresh />
        </el-icon>
      </template>
      <el-table
        v-loading="depositLoading"
        :data="depositData"
        stripe
        border
        style="width: 100%"
        :row-style="{ height: '50px' }"
      >
        <el-table-column
          align="center"
          prop="id"
          :label="t('wallet.orderNo')"
          width="120"
        />
        <el-table-column
          align="center"
          prop="i_time"
          :label="t('wallet.depositTime')"
        />
        <el-table-column
          prop="assetid"
          :label="t('wallet.cashDepositCurrency')"
        />
        <el-table-column prop="amount" :label="t('wallet.amountOfDeposit')" />
        <el-table-column
          prop="price"
          :label="t('wallet.depositExchangeRate')"
        />
        <el-table-column
          prop="usdamount"
          :label="t('wallet.depositUsdAmount')"
        />
        <el-table-column
          prop="i_status"
          :label="t('wallet.goldDepositStatus')"
        />
        <el-table-column
          prop="i_completeTime"
          :label="t('wallet.competeTime')"
        />
      </el-table>
      <el-row justify="end" align="middle" style="margin-top: 15px">
        <el-col :span="6">
          <el-pagination
            v-model:current-page="depositPageInfo.page"
            :total="depositPageInfo.total"
            layout="prev, pager, next"
            @current-change="depositPageChange"
          />
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane name="withdraw">
      <template #label>
        <span>{{ t('wallet.cashDetails') }}</span>
        <el-icon
          v-if="activeTab === 'withdraw'"
          style="margin-left: 10px"
          @click="reloadWithdrawData"
        >
          <Refresh />
        </el-icon>
      </template>
      <el-table
        v-loading="withdrawLoading"
        :data="withdrawData"
        stripe
        style="width: 100%"
        border
        :row-style="{ height: '50px' }"
      >
        <el-table-column width="100" prop="id" :label="t('wallet.orderNo')" />
        <el-table-column
          width="180"
          prop="i_time"
          :label="t('wallet.withdrawTime')"
        />
        <el-table-column
          prop="usdamount"
          :label="t('wallet.withdrawUsdAmount')"
        />
        <el-table-column prop="assetid" :label="t('wallet.withdrawCurrency')" />
        <el-table-column prop="price" :label="t('wallet.withdrawExchange')" />
        <el-table-column prop="amount" :label="t('wallet.withdrawAmount')" />
        <el-table-column
          show-overflow-tooltip
          prop="externaladdress"
          :label="t('wallet.withdrawAddress')"
        />
        <el-table-column prop="i_status" :label="t('wallet.withdrawStatus')" />
        <el-table-column prop="charges" :label="t('wallet.minerFee')" />
        <el-table-column
          width="180"
          prop="i_completeTime"
          :label="t('wallet.competeTime')"
        />
        <el-table-column :label="t('wallet.operations')">
          <template #default="{ row }">
            <el-button
              v-if="row.status === 1"
              link
              type="primary"
              size="small"
              @click="cancelWithdraw(row.id)"
            >
              {{ t('common.cancel') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row justify="end" align="middle" style="margin-top: 15px">
        <el-col :span="6">
          <el-pagination
            v-model:current-page="withdrawPageInfo.page"
            :total="withdrawPageInfo.total"
            layout="prev, pager, next"
            @current-change="withdrawPageChange"
          />
        </el-col>
      </el-row>
    </el-tab-pane>
    <el-tab-pane name="transferOut">
      <template #label>
        <span>{{ t('wallet.outDetails') }}</span>
        <el-icon
          v-if="activeTab === 'transferOut'"
          style="margin-left: 10px"
          @click="reloadTransferOutData"
        >
          <Refresh />
        </el-icon>
      </template>
      <el-table
        v-loading="transferOutLoading"
        :data="transferOutData"
        stripe
        border
        style="width: 100%"
        :row-style="{ height: '50px' }"
      >
        <el-table-column prop="id" width="100" :label="t('wallet.orderNo')" />
        <el-table-column
          prop="i_time"
          width="180"
          :label="t('wallet.applyTime')"
        />
        <el-table-column
          prop="assetid"
          :label="t('wallet.transferOutCurrency')"
        />
        <el-table-column
          prop="amount"
          :label="t('wallet.transferOutQuantity')"
        />
        <el-table-column
          show-overflow-tooltip
          prop="externaladdress"
          :label="t('wallet.receiveAddress')"
        />
        <el-table-column prop="charges" :label="t('wallet.minerFee')" />
        <el-table-column
          prop="i_status"
          :label="t('wallet.transferOutStatus')"
        />
        <el-table-column
          width="180"
          prop="i_completeTime"
          :label="t('wallet.transferOutTime')"
        />
        <el-table-column :label="t('wallet.operations')">
          <template #default="{ row }">
            <el-button
              v-if="row.status === 1"
              link
              type="primary"
              size="small"
              @click="cancelTransferOut(row.id)"
            >
              {{ t('common.cancel') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row justify="end" align="middle" style="margin-top: 15px">
        <el-col :span="6">
          <el-pagination
            v-model:current-page="transferOutPageInfo.page"
            :total="transferOutPageInfo.total"
            layout="prev, pager, next"
            @current-change="transferOutPageChane"
          />
        </el-col>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { userApi } from '@/api';
import dayjs from 'dayjs';
import { ElMessageBox } from 'element-plus';

const { t } = useI18n();
const activeTab = ref('deposit');
const depositLoading = ref(false);
const depositData = ref([]);
const depositPageInfo = ref({ page: 1, total: 0 });
const withdrawData = ref([]);
const withdrawLoading = ref(false);
const withdrawPageInfo = ref({ page: 1, total: 0 });
const transferOutData = ref([]);
const transferOutLoading = ref(false);
const transferOutPageInfo = ref({ page: 1, total: 0 });
const depositStatusOptions = {
  [1]: t('wallet.transferred'),
  [2]: t('wallet.noTransfer'),
  [3]: t('wallet.depositFail'),
  [4]: t('wallet.depositSuccess'),
};
const withdrawStatusOptions = {
  [1]: t('wallet.toBeReviewed'),
  [2]: t('wallet.canceled'),
  [3]: t('wallet.underReview'),
  [4]: t('wallet.underReview'), //审核成功,
  [5]: t('wallet.withdrawFail'), //审核不通过,
  [6]: t('wallet.underReview'), //扣款成功,
  [7]: t('wallet.underReview'), //扣款失败,
  [8]: t('wallet.underReview'), //钱包打款中,
  [9]: t('wallet.underReview'), //钱包打款失败,
  [10]: t('wallet.underReview'), //退回MT,
  [11]: t('wallet.withdrawSuccess'),
  [12]: t('wallet.withdrawFail'),
};
const transferOutStatusOptions = {
  [1]: t('wallet.toBeReviewed'),
  [2]: t('wallet.canceled'),
  [3]: t('wallet.underReview'),
  [4]: t('wallet.underReview'), //审核成功,
  [5]: t('wallet.withdrawFail'), //审核不通过,
  [6]: t('wallet.underReview'), //打款中,
  [7]: t('wallet.withdrawSuccess'),
  [8]: t('wallet.withdrawFail'),
};
const getDepositData = async (page = 0) => {
  depositLoading.value = true;
  const res = await userApi.getDepositList(page);
  depositLoading.value = false;
  if (res.data.status === 0) {
    depositData.value = res.data.data.content.map((item) => {
      return {
        ...item,
        i_time: dayjs(item.time).format('YYYY-MM-DD HH:mm:ss'),
        i_status: depositStatusOptions[item.status] || '--',
        i_completeTime: item.arrivaltime
          ? dayjs(item.arrivaltime).format('YYYY-MM-DD HH:mm:ss')
          : '--',
      };
    });
    depositPageInfo.value = {
      page: page + 1,
      total: res.data.data?.totalElements,
    };
  }
};
const depositPageChange = (page) => {
  getDepositData(page - 1);
};
const getWithdrawData = async (page = 0) => {
  withdrawLoading.value = true;
  const res = await userApi.getWithdrawList(page);
  withdrawLoading.value = false;
  if (res.data.status === 0) {
    withdrawData.value = res.data.data.content.map((item) => {
      return {
        ...item,
        i_time: dayjs(item.time).format('YYYY-MM-DD HH:mm:ss'),
        i_status: withdrawStatusOptions[item.status] || '--',
        i_completeTime: item.arrivaltime
          ? dayjs(item.arrivaltime).format('YYYY-MM-DD HH:mm:ss')
          : '--',
      };
    });
  }
  withdrawPageInfo.value = {
    page: page + 1,
    total: res.data.data?.totalElements,
  };
};
const withdrawPageChange = (page) => {
  getWithdrawData(page - 1);
};
const getTransferOutData = async (page = 0) => {
  transferOutLoading.value = true;
  const res = await userApi.getWalletOutList(page);
  transferOutLoading.value = false;
  if (res.data.status === 0) {
    transferOutData.value = res.data.data.content.map((item) => {
      return {
        ...item,
        i_time: dayjs(item.time).format('YYYY-MM-DD HH:mm:ss'),
        i_status: transferOutStatusOptions[item.status] || '--',
        i_completeTime: item.arrivaltime
          ? dayjs(item.arrivaltime).format('YYYY-MM-DD HH:mm:ss')
          : '--',
      };
    });
  }
  transferOutPageInfo.value = {
    page: page + 1,
    total: res.data.data?.totalElements,
  };
};
const transferOutPageChane = (page) => {
  getTransferOutData(page - 1);
};
const cancelTransferOut = (id) => {
  ElMessageBox.confirm(t('wallet.cancelConfirm'), t('common.warning'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning',
  }).then(async () => {
    transferOutLoading.value = true;
    await userApi.cancelWalletWithdraw({ id });
    transferOutLoading.value = false;
    await getTransferOutData(transferOutPageInfo.value.page - 1);
  });
};
const cancelWithdraw = (id) => {
  ElMessageBox.confirm(t('wallet.cancelConfirm'), t('common.warning'), {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    type: 'warning',
  }).then(async () => {
    withdrawLoading.value = true;
    await userApi.cancelMtWithdraw({ id });
    withdrawLoading.value = false;
    await getWithdrawData(transferOutPageInfo.value.page - 1);
  });
};
const tabChange = (tab) => {
  if (tab === 'deposit') {
    reloadDepositData();
  } else if (tab === 'withdraw') {
    reloadWithdrawData();
  } else if (tab === 'transferOut') {
    reloadTransferOutData();
  }
};
const reloadDepositData = () => {
  getDepositData(depositPageInfo.value.page - 1);
};
const reloadWithdrawData = () => {
  getWithdrawData(withdrawPageInfo.value.page - 1);
};
const reloadTransferOutData = () => {
  getTransferOutData(transferOutPageInfo.value.page - 1);
};
onMounted(() => {
  getDepositData();
});
</script>
