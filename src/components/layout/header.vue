<template>
  <header>
    <div class="header-content">
      <h1 class="content-logo">
        <img src="/logo.png" alt="" />
      </h1>

      <div class="search-buy-login">
        <div class="content-search">
          <input type="text" :placeholder="t('common.search')" />
          <el-icon size="25"><Search /></el-icon>
        </div>
      </div>
      <div class="walletBox">
        <el-popover
          :show-arrow="false"
          trigger="click"
          :width="211"
          :offset="10"
          popper-class="walletInfoPop"
          @show="getWalletData"
        >
          <template #reference>
            <div class="assetBox">
              <span>Search Currency</span>
              <img :src="DownArrowImg" alt="" />
            </div>
          </template>
          <template #default>
            <el-scrollbar v-loading="getWalletDataLoading" max-height="270px">
              <div class="inputBox">
                <el-input
                  v-model="searchWalletText"
                  placeholder="查询"
                ></el-input>
              </div>

              <div class="allWalletBox">
                <div
                  v-for="item in filterWalletData"
                  :key="item.id"
                  class="walletItemBox"
                >
                  <span class="balance">{{ item.available.toFixed(8) }}</span>
                  <span class="currency">{{ item.currency }}</span>
                  <CoinIco class="icon" :size="22" :coin="item.currency" />
                </div>
              </div>
            </el-scrollbar>
          </template>
        </el-popover>

        <div class="btnBox" @click="showWalletDialog">wallet</div>
      </div>
      <div class="content-nav">
        <div class="itemBox">
          <span class="itemValue">
            {{ userFundsVisible ? '$' + balance?.toFixed(2) : ' *** ' }}
          </span>
          <span class="itemKey">{{ t('common.balance') }}</span>
        </div>
        <div class="itemBox">
          <span class="itemValue">
            {{ userFundsVisible ? '$' + netWorth.toFixed(2) : ' *** ' }}
          </span>
          <span class="itemKey">{{ t('common.netWorth') }}</span>
        </div>
        <div class="itemBox">
          <span class="itemValue">
            {{ userFundsVisible ? '$' + availableMargin.toFixed(2) : ' *** ' }}
          </span>
          <span class="itemKey">{{ t('common.availableMargin') }}</span>
        </div>
        <div class="itemBox small">
          <span class="itemValue">
            {{ userFundsVisible ? '$' + (userFunds?.margin || 0) : ' *** ' }}
          </span>
          <span class="itemKey">{{ t('common.occupy') }}</span>
        </div>
        <div class="itemBox small">
          <span class="itemValue">
            {{ userFundsVisible ? '$' + profit.toFixed(2) : ' *** ' }}
          </span>
          <span class="itemKey">{{ t('common.profit') }}</span>
        </div>
        <div class="itemBox iconBox">
          <template v-if="userFundsVisible">
            <el-icon class="view" @click="setFundsVisible(false)">
              <View />
            </el-icon>
          </template>
          <template v-else>
            <el-icon class="view" @click="setFundsVisible(true)">
              <Hide />
            </el-icon>
          </template>
        </div>
      </div>
      <div class="outBtn">
        <el-button
          class="withdrawBtn"
          type="primary"
          @click="showWithdrawDialog"
        >
          withdraw
        </el-button>
      </div>
    </div>
    <WalletDialog ref="walletDialogRef" />
    <WithdrawDialog ref="withdrawDialogRef" />
  </header>
</template>
<script setup>
import { Search } from '@element-plus/icons-vue';
import { useSocketStore, useUserStore, useHeaderStore } from '@/store/index.js';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import CoinIco from '@/pages/Wallet/component/coinIco.vue';
import DownArrowImg from '@/assets/img/header/down.png';
import WalletDialog from '@/components/walletDialog/index.vue';
import WithdrawDialog from '@/components/withdrawDialog/index.vue';
const { t } = useI18n();
const socketStore = useSocketStore();
const userStore = useUserStore();
const headerStore = useHeaderStore();
const walletDialogRef = ref();
const withdrawDialogRef = ref();
const userFunds = computed(() => socketStore.userFunds);
const netWorth = computed(() => socketStore.userNetWorth);
const profit = computed(
  () => socketStore.userTotalProfit + socketStore.totalOverNightFee
);
const availableMargin = computed(() => socketStore.availableMargin);
const userFundsVisible = computed(() => userStore.userFundsVisible);
const balance = computed(() => socketStore.balance);
const setFundsVisible = (visible) => {
  userStore.setUserFundsVisible(visible);
};

const getWalletDataLoading = ref(false);
const walletData = computed(() => headerStore.walletData);
const searchWalletText = ref('');
const filterWalletData = computed(() => {
  if (searchWalletText.value.trim()) {
    return walletData.value.filter((item) =>
      item?.currency?.includes(searchWalletText.value.trim().toUpperCase())
    );
  } else {
    return walletData.value;
  }
});
const getWalletData = async () => {
  getWalletDataLoading.value = true;
  await headerStore.getWalletData();
  getWalletDataLoading.value = false;
};
const showWalletDialog = () => {
  walletDialogRef?.value?.show();
};
const showWithdrawDialog = () => {
  withdrawDialogRef.value.show();
};
</script>

<style scoped lang="less">
header {
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80px;
  background: white;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
}
.header-content {
  display: flex;
  justify-content: normal;
  height: 100%;
  align-items: center;
  /*width: 1500px;*/
}
.content-logo {
  width: 160px;
  height: 50px;
  cursor: pointer;
  margin-right: 40px;
  margin-left: 40px;
}
.content-logo img {
  height: 100%;
}
.content-nav {
  /*width: 800px;*/
  height: 100%;
  display: flex;
  align-items: center;
  .itemBox {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-right: 23px;
    width: 130px;
    &.small {
      width: 110px;
    }
    &.iconBox {
      width: 30px;
    }
    .itemValue {
      font-size: 22px;
      color: #000000;
      margin-bottom: 5px;
      font-family: 'roboto-bold';
    }
    .itemKey {
      font-size: 16px;
      color: #666666;
    }
    .view {
      font-size: 24px;
      cursor: pointer;
    }
  }
}

.search-buy-login {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 320px;
  .content-search {
    display: flex;
    align-items: center;
    padding: 3px 10px;
    width: 320px;
    height: 52px;
    border-radius: 26px;
    background: #f0f2f4;
    box-sizing: border-box;
  }
  .content-search input {
    padding: 0 10px;
    width: 240px;
    height: 40px;
    border: 0;
    border-radius: 8px;
    color: #808080;
    background: #f0f2f4;
    font-size: 16px;
    outline: none;
  }
}
.walletBox {
  margin: 0 40px;
  width: 311px;
  height: 52px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  .assetBox {
    width: 211px;
    height: 52px;
    background-color: #f4f4f4;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    box-sizing: border-box;
    font-family: MicrosoftYaHei;
    font-size: 20px;
    color: #666666;
    .icon {
      margin: 0 20px 0 10px;
    }
    --el-border-radius-base: '12px';
  }
  .btnBox {
    width: 100px;
    height: 52px;
    background-color: #266fe8;
    font-size: 22px;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.outBtn {
  .withdrawBtn {
    width: 107px;
    height: 52px;
    background-color: #266fe8;
    border-radius: 12px;
    font-size: 20px;
  }
}
</style>
<style lang="less">
.walletInfoPop {
  --el-border-radius-base: 12px;
  --el-popover-padding: 0;
  .el-popover.el-popper {
    padding: 0;
  }
  .inputBox {
    padding: 10px 15px;
    box-sizing: border-box;
  }
  .allWalletBox {
    .walletItemBox {
      display: flex;
      height: 42px;
      align-items: center;
      transition: all 0.3s;
      cursor: pointer;
      &.active,
      &:hover {
        background: #eef2f7;
      }
      .balance {
        padding-left: 12px;
        font-size: 16px;
        color: #666666;
        width: 120px;
        box-sizing: border-box;
      }
      .currency {
        padding: 0 5px 0 5px;
        font-size: 16px;
        font-weight: bold;
        color: #666666;
        box-sizing: border-box;
        width: 60px;
      }
      .icon {
        padding-right: 5px;
      }
    }
  }
}
</style>
