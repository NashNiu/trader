<template>
  <div class="container">
    <div class="assetBox">
      <el-popover
        :show-arrow="false"
        trigger="hover"
        :offset="10"
        popper-class="walletCoinPop"
        placement="bottom-start"
        @show="getWalletData"
      >
        <template #reference>
          <div class="coinBox dropdown">
            <p>
              <CoinIco :size="24" :coin="selectedCoin" class="icon" />
              <span>{{ selectedCoin }}</span>
            </p>
            <img :src="DownArrowImg" alt="" />
          </div>
        </template>
        <template #default>
          <div v-loading="getWalletDataLoading" class="allCoinBox">
            <el-scrollbar max-height="270px">
              <div
                v-for="item in walletData"
                :key="item.id"
                class="walletItemBox"
                :class="{ active: item.currency === selectedCoin }"
                @click="coinItemClick(item.currency)"
              >
                <CoinIco class="icon" :size="24" :coin="item.currency" />
                <span class="currency">{{ item.currency }}</span>
              </div>
            </el-scrollbar>
          </div>
        </template>
      </el-popover>
      <el-popover
        v-if="selectedCoin"
        :show-arrow="false"
        trigger="hover"
        :offset="10"
        popper-class="walletCoinPop"
        :popper-style="{ width: 'auto' }"
        placement="bottom-start"
      >
        <template #reference>
          <div class="networkBox dropdown">
            <span>{{ selectedType }}</span>
            <img :src="DownArrowImg" alt="" />
          </div>
        </template>
        <template #default>
          <div class="allTypeBox">
            <div
              v-for="item in activeTypeArray"
              :key="item.id"
              class="typeItemBox"
              :class="{ active: item.assetType === selectedType }"
              @click="selectedType = item.assetType"
            >
              <span class="currency">{{ item.assetType }}</span>
            </div>
          </div>
        </template>
      </el-popover>
    </div>
    <div class="sec2">
      <div class="title">Your {{ selectedCoin }} deposit address</div>
      <div class="addressBox">
        <span class="address">
          {{ currentAddress }}
        </span>
        <div v-if="currentAddress" class="copyBox">
          <img :src="copyImg" alt="" @click="copyAddress" />
        </div>
      </div>
      <div v-if="currentAddress" class="qrBox">
        <img class="qrImg" :src="qrcode" alt="qr code" />
        <span>
          Only send {{ selectedCoin }} to this address, 1 confirmation required.
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import CoinIco from '@/pages/Wallet/component/coinIco.vue';
import DownArrowImg from '@/assets/img/header/down.png';
import { useHeaderStore } from '@/store/index.js';
import { computed, ref, onMounted } from 'vue';
import copyImg from '@/assets/img/header/copy.png';
import { promiseTimeout, useClipboard } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { useQRCode } from '@vueuse/integrations/useQRCode';
const headerStore = useHeaderStore();
const { t } = useI18n();
const walletData = computed(() => headerStore.walletData);
const addressData = computed(() => headerStore.addressData);
const getWalletDataLoading = ref(false);
const selectedCoin = ref('');
const selectedType = ref('');
const activeTypeArray = computed(() => {
  if (selectedCoin.value) {
    const target = addressData.value.find(
      (item) => item.assetCoin === selectedCoin.value
    );
    return target?.children ?? [];
  } else {
    return [];
  }
});
const currentAddress = computed(() => {
  if (selectedType.value) {
    const target = activeTypeArray.value.find(
      (item) => item.assetType === selectedType.value
    );
    return target?.address ?? '';
  } else {
    return '';
  }
});
const qrcode = useQRCode(currentAddress, { margin: 0 });

const getWalletData = async () => {
  getWalletDataLoading.value = true;
  await headerStore.getWalletData();
  getWalletDataLoading.value = false;
};

const coinItemClick = async (coin) => {
  if (coin !== selectedCoin.value) {
    selectedCoin.value = coin;
    await promiseTimeout(50);
    selectedType.value = activeTypeArray.value[0]?.assetType;
  }
};
const { isSupported, copy } = useClipboard({
  source: currentAddress,
  legacy: true,
});
const copyAddress = () => {
  if (isSupported) {
    copy?.();
    ElMessage.success(t?.('common.copySuccess'));
  } else {
    ElMessage.error('Your browser does not support Clipboard API');
  }
};
onMounted(() => {
  headerStore.getAddressData().then();
});
</script>
<style scoped lang="less">
.container {
  --el-popover-padding: 0;
  .assetBox {
    display: flex;
    justify-content: center;
    .dropdown {
      width: 155px;
      height: 52px;
      min-width: 150px;
      background-color: #f6f6f6;
      border-radius: 8px;
      border: solid 1px #eeeeee;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 0 15px;
      cursor: pointer;
      &.coinBox {
        margin-right: 35px;
      }
      &.networkBox {
        width: 330px;
      }
      p {
        display: flex;
        align-items: center;
        margin: 0;
        span {
          margin-left: 10px;
        }
      }
      span {
        font-size: 20px;
        //font-weight: bold;
        color: #666666;
        margin-right: 10px;
      }
    }
  }
  .sec2 {
    width: 100%;
    padding: 0 30px;
    margin-top: 30px;
    box-sizing: border-box;
    .title {
      font-size: 16px;
      color: #333333;
    }
    .addressBox {
      width: 100%;
      height: 52px;
      background-color: #f6f6f6;
      border-radius: 8px;
      border: solid 1px #eeeeee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      box-sizing: border-box;
      margin-top: 5px;
      .address {
        font-size: 16px;
        color: #333333;
      }
      .copyBox {
        width: 42px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-left: 2px solid #333333;
        img {
          cursor: pointer;
        }
      }
    }
    .qrBox {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-top: 30px;
      .qrImg {
        width: 240px;
      }
      span {
        font-size: 16px;
        color: #333333;
        margin-top: 30px;
      }
    }
  }
}
.allCoinBox,
.allTypeBox {
  .walletItemBox,
  .typeItemBox {
    //width: 146px;
    height: 48px;
    display: flex;
    //justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover,
    &.active {
      background-color: #eef2f7;
    }
    .icon {
      margin-left: 15px;
    }
    .currency {
      font-size: 20px;
      //font-weight: bold;
      color: #666666;
      margin-left: 15px;
    }
  }
}
</style>
<style lang="less">
.walletCoinPop {
  --el-popover-border-radius: 8px;
  --el-popover-padding: 0;
}
</style>
