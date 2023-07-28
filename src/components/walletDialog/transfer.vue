<template>
  <div class="transferContainer">
    <div class="currencyBox">
      <span class="s1">{{ t('header.currency') }}</span>
      <el-popover
        :show-arrow="false"
        trigger="hover"
        :offset="10"
        popper-class="walletCoinPop"
        :popper-style="{ width: 'auto' }"
        placement="bottom-start"
        @show="() => getWalletData()"
      >
        <template #reference>
          <div class="coinDropdown">
            <p class="p1">
              <span class="amount">
                {{ selectedCoin?.available?.toFixed(8) }}
              </span>
              <CoinIco :size="24" :coin="selectedCoin.currency" class="icon" />
            </p>
            <img :src="DownArrowImg" alt="" class="downArrow" />
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
                @click="coinItemClick(item)"
              >
                <span class="amount">{{ item.available?.toFixed(8) }}</span>
                <p class="p2">
                  <CoinIco class="icon" :size="24" :coin="item.currency" />
                  <span class="currency">{{ item.currency }}</span>
                </p>
              </div>
            </el-scrollbar>
          </div>
        </template>
      </el-popover>
    </div>
    <div class="amountBox">
      <div class="labelBox">
        <span class="label">{{ t('header.amount') }}</span>
        <span class="price">{{ selectedCoin?.available }}</span>
      </div>
      <div class="amountInputBox">
        <el-input
          v-model="withdrawAmount"
          class="inputAmount"
          type="number"
          step="0.000000001"
          :placeholder="t('header.enterTransferAmount')"
        >
          <template #suffix>
            <CoinIco :size="24" :coin="selectedCoin.currency" />
          </template>
          <template #append>
            <div class="max" @click="withdrawAmount = selectedCoin?.available">
              {{ t('header.max') }}
            </div>
          </template>
        </el-input>
      </div>
      <div class="rateBox">
        <p class="p1">
          {{ t('header.currentRate') }}
          <span v-if="orderData.price" class="bold">
            {{ selectedCoin.currency }}
            {{ selectedCoin.currency === 'USDT' ? '' : '/USDT' }}=
            {{ orderData.price }}
          </span>
        </p>
        <p class="p1" v-html="t('header.receiveUSDT')"></p>
      </div>
      <el-button
        type="primary"
        :disabled="submitDisabled"
        :loading="submitting"
        class="submitBtn"
        @click="submit"
      >
        {{ t('header.transferToAccount') }}
      </el-button>
    </div>
  </div>
</template>
<script setup>
import DownArrowImg from '@/assets/img/header/down.png';
import CoinIco from '@/pages/Wallet/component/coinIco.vue';
import { computed, ref } from 'vue';
import { useHeaderStore, useUserStore } from '@/store/index.js';
import { userApi } from '@/api/index.js';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
const emit = defineEmits(['hide']);
const selectedCoin = ref({});
const { t } = useI18n();
const headerStore = useHeaderStore();
const userStore = useUserStore();
const walletData = computed(() => headerStore.walletData);
const getWalletDataLoading = ref(false);
const withdrawAmount = ref('');
const orderData = ref({});
const submitting = ref(false);
const submitDisabled = computed(() => withdrawAmount.value <= 0);
const getWalletData = async (forceFresh = false) => {
  getWalletDataLoading.value = true;
  await headerStore.getWalletData({ forceFresh });
  getWalletDataLoading.value = false;
};
const createOrderBefore = async (coin) => {
  const res = await userApi.depositBefore({
    vaultId: userStore.userInfo.fb,
    platName: 'LP',
    assetCoin: coin.currency,
    symbolName: coin.currency + 'USDT',
  });
  if (res.data.status === 0) {
    orderData.value = res.data.data;
  }
};
const coinItemClick = async (coin) => {
  if (coin !== selectedCoin.value) {
    selectedCoin.value = coin;
    await createOrderBefore(coin);
    // await promiseTimeout(50);
    // selectedType.value = activeTypeArray.value[0]?.assetType;
  }
};
const submit = async () => {
  if (withdrawAmount.value > selectedCoin.value?.available) {
    ElMessage.error(t?.('common.insufficientBalance'));
    return;
  }
  const params = {
    id: orderData.value.id,
    amount: withdrawAmount.value,
  };
  submitting.value = true;
  const res = await userApi.confirmDeposit(params);
  if (res.data.status === 0) {
    ElMessage.success(t?.('common.success'));
    await getWalletData(true);
    emit('hide');
  }
  submitting.value = false;
};
</script>
<style scoped lang="less">
.transferContainer {
  padding: 0 30px;
  box-sizing: border-box;
  .currencyBox {
    width: 300px;
    margin: 0 auto;
    .s1 {
      font-size: 16px;
      font-weight: bold;
      color: #666666;
    }
    .coinDropdown {
      margin-top: 10px;
      width: 270px;
      height: 52px;
      background-color: #f6f6f6;
      border-radius: 8px;
      border: solid 1px #eeeeee;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      cursor: pointer;
      .p1 {
        display: flex;
        align-items: center;
        .amount {
          margin-right: 5px;
          font-size: 20px;
          //font-weight: bold;
          color: #666666;
        }
      }

      .downArrow {
        width: 24px;
      }
    }
  }
  .amountBox {
    margin-top: 20px;
    .labelBox {
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      font-weight: bold;
      color: #666666;
    }
    .amountInputBox {
      margin-top: 10px;
      .inputAmount {
        height: 52px;
        background-color: #f6f6f6;
        border-radius: 8px;
        border: solid 1px #eeeeee;
        font-size: 20px;
        .max {
          cursor: pointer;
        }
      }
    }
    .submitBtn {
      width: 100%;
      height: 52px;
      background-color: #0c3d93;
      border-radius: 8px;
      margin: 20px 0;
      font-size: 20px;
    }
  }
  .rateBox {
    .p1 {
      font-size: 16px;
      color: #aaaaaa;
      margin-top: 10px;
      .bold {
        font-weight: bold;
        color: #333333;
      }
    }
  }
}
.allCoinBox {
  .walletItemBox {
    //width: 270px;
    height: 48px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .amount {
      margin-right: 15px;
    }
    .p2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        margin-right: 5px;
      }
    }
    span {
      font-size: 20px;
      //font-weight: bold;
      color: #666666;
    }
    &:hover,
    &.active {
      background-color: #eef2f7;
    }
  }
}
</style>
