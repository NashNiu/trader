<template>
  <div v-loading="loadingData" class="walletAssetContainer">
    <el-space>
      <h3 class="title">
        {{ t('wallet.walletAssets') }} $
        {{ walletsValue.toFixed(2) }}
      </h3>
      <el-icon class="refreshIcon" @click="getWalletData">
        <Refresh />
      </el-icon>
    </el-space>

    <div class="contentBox">
      <div
        v-for="item in walletData"
        :key="item.currency"
        v-loading="item.loading"
        class="itemBox"
      >
        <div class="iconBox">
          <CoinIco :coin="item.currency" />
        </div>
        <div class="symbolBox">
          <p class="symbol">{{ item.currency }}</p>
          <p class="balance">
            {{ t('wallet.wallet') }}{{ t('common.balance') }}
          </p>
        </div>
        <div class="balanceValue">
          <span>{{ item.available }}</span>
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
          <el-tooltip :content="t('wallet.transferOut')" placement="top">
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
    <TransferOutDialog
      ref="transferDialogRef"
      :wallet-info="activeWalletInfo"
    />
  </div>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue';
// import SvgIcon from '@/components/common/svgIcon.vue';
import ExchangeDialog from './component/Exchange.vue';
import RechargeDialog from './component/Recharge.vue';
import TransferOutDialog from './component/TransferOut.vue';
import CoinIco from '@/pages/Wallet/component/coinIco.vue';
import { userApi } from '@/api';
import { ElMessage } from 'element-plus';
import { useSocketStore, useUserStore } from '@/store/index.js';
import { useI18n } from 'vue-i18n';
import NP from 'number-precision';
const { t } = useI18n();
const socketStore = useSocketStore();
const userStore = useUserStore();
const liveData = computed(() => socketStore.liveData);
const exchangeDialogRef = ref(null);
const rechargeDialogRef = ref(null);
const transferDialogRef = ref();
const walletData = ref([]); // 后台返回的钱包余额
const walletAddressData = ref([]); // 第三方返回的钱包地址
const walletsValue = computed(() => {
  return walletData.value.reduce((pre, cur) => {
    const ask = liveData.value[cur?.currency + 'USDT']?.ask;
    let value;
    if (ask) {
      value = ask * (cur?.balance - cur?.freeze) + pre;
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
const getWallerAddressInfo = async () => {
  const res = await userApi.getWalletInfo(userStore.userInfo?.fb);
  if (res.data.status === 0) {
    walletAddressData.value = res.data.data.reduce((pre, cur) => {
      if (pre.length) {
        const target = pre.find((item) => item.assetCoin === cur.assetCoin);
        if (target) {
          target.children.push(cur);
          target.available = Number(cur.available) + target.available;
        } else {
          pre.push({
            assetCoin: cur.assetCoin,
            children: [cur],
            available: Number(cur.available),
          });
        }
      } else {
        pre.push({
          assetCoin: cur.assetCoin,
          children: [cur],
          available: Number(cur.available),
        });
      }
      return pre;
    }, []);
    userStore.setUserAssetsArr(walletAddressData.value);
  }
};
const getWalletData = async () => {
  loadingData.value = true;
  const res = await userApi.getBackEndWalletInfo();
  loadingData.value = false;
  if (res.data.status === 0) {
    walletData.value = res.data.data.map((item) => ({
      ...item,
      available: NP.round(item.balance - item.freeze, 6),
    }));
  } else {
    ElMessage.error('GET WALLET INFO FAILED');
  }
};
onMounted(() => {
  getWalletData();
  getWallerAddressInfo();
});
</script>
<style lang="less" scoped>
.walletAssetContainer {
  //height: 520px;
  flex: 1;
  overflow: hidden;
  color: #0c3d93;
  margin-top: 10px;
  .title {
    height: 40px;
    display: flex;
    align-items: center;
    //background-color: #f8f8f8;
    font-size: 20px;
    padding-left: 5px;
  }
  .refreshIcon {
    margin-left: 15px;
    cursor: pointer;
    font-size: 20px;
  }
  .contentBox {
    padding: 0;
    box-sizing: border-box;
    height: calc(100% - 40px);
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
      margin-bottom: 15px;
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
