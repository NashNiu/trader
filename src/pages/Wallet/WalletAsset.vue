<template>
  <el-card
    v-loading="loadingData"
    :body-style="{ padding: '0px', height: '100%' }"
    class="walletAssetContainer"
  >
    <h3 class="title">
      {{ t('wallet.walletAssets') }} $
      {{ walletsValue.toFixed(2) }}
    </h3>
    <div class="contentBox">
      <div
        v-for="item in walletData"
        :key="item.name"
        v-loading="item.loading"
        class="itemBox"
      >
        <div class="iconBox">
          <SvgIcon icon-class="icon-bitcoin" size="50px" color="#f7931a" />
        </div>
        <div class="symbolBox">
          <p class="symbol">{{ item.id }}</p>
          <p class="balance">
            {{ t('wallet.wallet') }}{{ t('common.balance') }}
          </p>
        </div>
        <div class="balanceValue">
          <span>{{ Number(item?.total)?.toFixed(6) }}</span>
          <el-icon class="refreshIcon" @click="refreshBalance(item)">
            <Refresh />
          </el-icon>
        </div>
        <div class="operateBox">
          <el-tooltip :content="t('wallet.rechargeCurrency')" placement="top">
            <img
              src="@/assets/img/cashIn.png"
              class="operateItem"
              alt="cashIn"
              @click="openRechargeDialog(item)"
            />
          </el-tooltip>
          <el-tooltip :content="t('wallet.currencyExchange')" placement="top">
            <img
              src="@/assets/img/exchange.png"
              class="operateItem"
              alt="exchange"
              @click="openExchangeDialog(item)"
            />
          </el-tooltip>
          <el-tooltip :content="t('wallet.cashOut')" placement="top">
            <img
              src="@/assets/img/cashOut.png"
              class="operateItem"
              alt="cashOut"
              @click="openTransferOutDialog(item)"
            />
          </el-tooltip>
        </div>
      </div>
    </div>
    <ExchangeDialog ref="exchangeDialogRef" :wallet-info="activeWalletInfo" />
    <RechargeDialog ref="rechargeDialogRef" :wallet-info="activeWalletInfo" />
    <TransferOutDialog ref="transferDialogRef" />
  </el-card>
</template>
<script setup>
import { computed, ref } from 'vue';
import SvgIcon from '@/components/common/svgIcon.vue';
import ExchangeDialog from './component/Exchange.vue';
import RechargeDialog from './component/Recharge.vue';
import TransferOutDialog from './component/TransferOut.vue';
import { userApi } from '@/api';
import { ElMessage } from 'element-plus';
import { useUserStore, useSocketStore } from '@/store/index.js';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const socketStore = useSocketStore();
const userStore = useUserStore();
const liveData = computed(() => socketStore.liveData);
const exchangeDialogRef = ref(null);
const rechargeDialogRef = ref(null);
const transferDialogRef = ref();
const walletData = ref([]);
const walletsValue = computed(() => {
  return walletData.value.reduce((pre, cur) => {
    const ask = liveData.value[cur?.mtName]?.ask;
    let value;
    if (ask) {
      value = ask * cur?.total + pre;
    } else {
      value = pre;
    }
    userStore.setWalletAssets(value);
    return value;
  }, 0);
});
const activeWalletInfo = ref({});
const loadingData = ref(true);
const openExchangeDialog = (data) => {
  activeWalletInfo.value = data;
  exchangeDialogRef.value.open();
};
const openRechargeDialog = (data) => {
  activeWalletInfo.value = data;
  rechargeDialogRef.value.open();
};
const openTransferOutDialog = (data) => {
  activeWalletInfo.value = data;
  transferDialogRef.value?.open();
};
const refreshBalance = async (item) => {
  item.loading = true;
  const res = await userApi.refreshAssetBalance(
    userStore.userInfo?.fb,
    item.id
  );
  if (res.data.status === 0) {
    const res2 = await userApi.getAssetBalance(userStore.userInfo?.fb, item.id);
    if (res2.data.status === 0) {
      const index = walletData.value.findIndex((li) => li.id === item.id);
      if (index > -1) {
        walletData.value[index] = {
          ...walletData.value[index],
          loading: false,
          ...res.data.data,
        };
      }
    }
  }
};
const getWalletData = async () => {
  loadingData.value = true;
  const res = await userApi.getWalletInfo(userStore.userInfo?.fb);
  loadingData.value = false;
  if (res.data.status === 0) {
    const dataArr = res.data.data;
    for (const item of dataArr) {
      const nameRes = await userApi.getSymbolName(item.id);
      if (nameRes.data.status === 0) {
        item.mtName = nameRes.data.data;
      }
    }
    walletData.value = dataArr;
  } else {
    ElMessage.error('GET WALLET INFO FAILED');
  }
};
getWalletData();
</script>
<style lang="less" scoped>
.walletAssetContainer {
  height: 520px;
  overflow: hidden;
  color: #0c3d93;
  margin-top: 10px;
  .title {
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #f8f8f8;
    font-size: 20px;
    padding-left: 15px;
  }
  .contentBox {
    padding: 0 15px;
    box-sizing: border-box;
    height: calc(100% - 60px);
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
    .itemBox {
      height: 100px;
      background-color: #eef2f7;
      display: flex;
      align-items: center;
      margin-top: 15px;
      padding: 20px;
      box-sizing: border-box;
      .symbolBox {
        margin-left: 25px;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        .symbol {
          font-size: 20px;
          font-weight: bold;
        }
        .balance {
          font-size: 18px;
        }
      }
      .balanceValue {
        align-self: flex-end;
        margin-left: 50px;
        width: 160px;
      }
      .refreshIcon {
        margin-left: 15px;
        cursor: pointer;
        font-size: 20px;
      }
      .operateBox {
        margin-left: 20px;
        font-size: 30px;
        .operateItem {
          margin-right: 20px;
          cursor: pointer;
        }
        .icon {
          cursor: pointer;
          &.card {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
