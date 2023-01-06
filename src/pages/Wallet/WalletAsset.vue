<template>
  <el-card
    :body-style="{ padding: '0px', height: '100%' }"
    class="walletAssetContainer"
  >
    <h3 class="title">Wallet Assets $ {{ walletsValue.toFixed(2) }}</h3>
    <div class="contentBox">
      <div v-for="item in walletData" :key="item.name" class="itemBox">
        <div class="iconBox">
          <SvgIcon icon-class="icon-bitcoin" size="50px" color="#f7931a" />
        </div>
        <div class="symbolBox">
          <p class="symbol">{{ item.id }}</p>
          <p class="balance">Wallet Balance</p>
        </div>
        <div class="balanceValue">{{ item.balance }}</div>
        <div class="operateBox">
          <SvgIcon
            class="card icon"
            icon-class="icon-creditcard"
            size="35px"
            @click="openRechargeDialog(item)"
          />
          <SvgIcon
            class="dollar icon"
            icon-class="icon-dollar1"
            size="35px"
            @click="openExchangeDialog(item)"
          />
        </div>
      </div>
    </div>
    <ExchangeDialog ref="exchangeDialogRef" :wallet-info="activeWalletInfo" />
    <RechargeDialog ref="rechargeDialogRef" :wallet-info="activeWalletInfo" />
  </el-card>
</template>
<script setup>
import { computed, ref } from 'vue';
import SvgIcon from '@/components/common/svgIcon.vue';
import ExchangeDialog from './Exchange.vue';
import RechargeDialog from './Recharge.vue';
import { getWalletInfo } from '@/api/user.js';
import { ElMessage } from 'element-plus';
import { useUserStore, useSocketStore } from '@/store/index.js';
const socketStore = useSocketStore();
const userStore = useUserStore();
const liveData = computed(() => socketStore.liveData);
const exchangeDialogRef = ref(null);
const rechargeDialogRef = ref(null);
const walletData = ref([]);
const walletsValue = computed(() => {
  return walletData.value.reduce((pre, cur) => {
    const ask = liveData.value[cur?.id?.replace('_TEST', '') + 'USDT']?.ask;
    let value = 0;
    if (ask) {
      value = ask * cur?.balance + pre;
    } else {
      value = pre;
    }
    userStore.setWalletAssets(value);
    return value;
  }, 0);
});
const activeWalletInfo = ref({});
const openExchangeDialog = (data) => {
  activeWalletInfo.value = data;
  exchangeDialogRef.value.open();
};
const openRechargeDialog = (data) => {
  activeWalletInfo.value = data;
  rechargeDialogRef.value.open();
};

const getWalletData = async () => {
  const res = await getWalletInfo(userStore.userInfo?.fb);
  if (res.data.status === 0) {
    walletData.value = res.data.data;
  } else {
    ElMessage.error('GET WALLET INFO FAILED');
  }
};
await getWalletData();
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
        width: 150px;
      }
      .operateBox {
        margin-left: 20px;
        font-size: 30px;
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
