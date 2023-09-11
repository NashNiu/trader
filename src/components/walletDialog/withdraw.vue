<template>
  <div class="withdrawContainer">
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
              <CoinIco :size="24" :coin="selectedCoin" class="icon" />
              <span class="amount">
                {{ selectedCoin }}
              </span>
            </p>
            <img :src="DownArrowImg" alt="" class="downArrow" />
          </div>
        </template>
        <template #default>
          <div v-loading="getWalletDataLoading" class="allCoinBox">
            <el-scrollbar max-height="270px">
              <div
                v-for="item in walletData"
                :key="item.currency"
                class="walletItemBox"
                :class="{ active: item.currency === selectedCoin }"
                @click="coinItemClick(item.currency)"
              >
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
        <span>{{ t('header.withdrawAmount') }}</span>
        <span>{{ t('header.availableWithdrawAmount') }} {{ balance }}</span>
      </div>
      <el-input
        v-model="withdrawAmount"
        type="number"
        class="inputAmount"
      ></el-input>
      <div class="infoBox">
        <!-- <div class="itemBox">
          <span>{{ t('header.payAmount') }}</span>
          <span>230</span>
        </div> -->
        <div class="itemBox">
          <span>{{ t('header.actualArrival') }}</span>
          <span>{{ transferAmount }} {{ selectedCoin }}</span>
        </div>
      </div>
      <el-button
        :disabled="confirmDisabled"
        type="primary"
        :loading="submitting"
        class="submitBtn"
        @click="beforeSubmit"
      >
        {{ t('wallet.confirmPay') }}
      </el-button>
    </div>

    <PayPassDialog ref="payPassDialogRef" @next="beforeSubmit" />
  </div>
</template>
<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import CoinIco from '@/pages/Wallet/component/coinIco.vue';
import { useI18n } from 'vue-i18n';
import { useUserStore, useWalletStore, useSocketStore } from '@/store/index.js';
import NP from 'number-precision';
import { ElMessage, ElMessageBox } from 'element-plus';
import { userApi } from '@/api';
import PayPassDialog from '@/components/common/payPassDialog.vue';

const emit = defineEmits(['hide']);
const { t } = useI18n();
const socketStore = useSocketStore();
const userStore = useUserStore();
const walletStore = useWalletStore();
const userInfo = computed(() => userStore.userInfo);
const balance = computed(() => socketStore.balance);
const walletData = computed(() => walletStore.rechargeList);
const payPassDialogRef = ref(null);
const userAssetsArr = computed(() => userStore.userAssetsArr);
const beforeOrderLoading = ref(false);
const submitting = ref(false);
const formData = ref({
  method: 0,
  currency: '',
  assetType: '',
  amount: '',
  externalAddress: '',
});
const currencyPrice = ref(0);
const orderId = ref();
const getWalletDataLoading = ref(false);
const selectedCoin = ref('');
const withdrawAmount = ref('');
const transferAmount = computed(() => {
  if (!currencyPrice.value || isNaN(currencyPrice.value)) {
    return 0;
  } else {
    return NP.round(NP.divide(withdrawAmount.value, currencyPrice.value), 6);
  }
});

const confirmDisabled = computed(() => {
  return !selectedCoin.value || !transferAmount.value;
});

const getWalletData = async () => {
  getWalletDataLoading.value = true;
  await walletStore.getRechargeList();
  getWalletDataLoading.value = false;
};
const coinItemClick = async (coin) => {
  if (coin !== selectedCoin.value) {
    selectedCoin.value = coin;
  }
};
const passCheck = () => {
  ElMessageBox.prompt(t('header.inputPayPass'), '', {
    confirmButtonText: t('common.confirm'),
    cancelButtonText: t('common.cancel'),
    inputType: 'password',
    inputPattern: /^.+$/,
    inputErrorMessage: 'Required',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        console.log(action, instance, done);
        instance.confirmButtonLoading = true;
        userApi
          .verifyPayPass({
            payPassword: instance.inputValue,
          })
          .then((res) => {
            if (res.data.status === 0) {
              confirmOut();
            }
          })
          .finally(() => {
            instance.confirmButtonLoading = false;
            done();
          });
      } else {
        done();
      }
    },
  });
};
const beforeSubmit = () => {
  if (userInfo.value.paypassword) {
    passCheck();
  } else {
    ElMessage.info(t('header.setPayPassFirst'));
    payPassDialogRef.value.show();
  }
};

const confirmOut = async () => {
  const params = {
    id: orderId.value,
    amount: transferAmount.value,
    withdrawChannel: 0,
  };
  submitting.value = true;
  const res = await userApi.withdrawConfirm(params);
  submitting.value = false;
  if (res.data.status === 0) {
    ElMessage.success(t?.('common.success'));
    emit('hide');
  }
};

watch(selectedCoin, async (nv) => {
  if (nv) {
    if (formData.value.method === 0) {
      const currentCoin = userAssetsArr.value.find(
        (item) => item.assetCoin === formData.value.currency
      );
      const currentType = currentCoin?.children.find(
        (item) => item.assetType === formData.value.assetType
      );
      formData.value.externalAddress = currentType?.address ?? '';
    }
    beforeOrderLoading.value = true;
    const res = await userApi.withdrawBefore({
      vaultId: userStore.userInfo.fb,
      platName: 'LP',
      assetCoin: nv,
      assetType: 'TRON',
      withdrawChannel: 1,
      symbolName: nv + 'USDT',
    });
    beforeOrderLoading.value = false;
    if (res.data.status === 0) {
      currencyPrice.value = res.data.data.price;
      orderId.value = res.data.data.id;
    }
  }
});
onMounted(() => {
  // walletStore.getRechargeList();
});
</script>
<style scoped lang="less">
.withdrawContainer {
  padding: 0 30px;
  box-sizing: border-box;
  .currencyBox {
    width: 300px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    .s1 {
      font-size: 16px;
      font-weight: bold;
      color: #666666;
    }
    .coinDropdown {
      margin-left: 20px;
      //width: 270px;
      flex: 1;
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
          margin-left: 15px;
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
      margin-bottom: 10px;
    }
    .inputAmount {
      height: 52px;
      background-color: #f6f6f6;
      border-radius: 8px;
      border: solid 1px #eeeeee;
      font-size: 20px;
    }
    .infoBox {
      font-size: 16px;
      font-weight: bold;
      color: #666666;
      margin-top: 20px;
      .itemBox {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
      }
    }
    .submitBtn {
      margin: 30px 0;
      width: 100%;
      height: 52px;
      background-color: #0c3d93;
      border-radius: 8px;
      font-family: MicrosoftYaHei;
      font-size: 20px;
      color: #ffffff;
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
<style lang="less">
.withdrawContainer {
  --el-dialog-padding-primary: 0;
  .el-form--default.el-form--label-top .el-form-item .el-form-item__label {
    margin-bottom: 2px;
  }
}
</style>
