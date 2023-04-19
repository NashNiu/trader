<template>
  <el-dialog v-model="visible" width="800" destroy-on-close>
    <template #header>
      <h3>{{ t('wallet.cashOutOfAccount') }}</h3>
    </template>
    <el-form :model="formData" label-width="200px">
      <el-form-item :label="t('wallet.paymentMethod')">
        <el-select v-model="formData.method" style="width: 250px">
          <el-option :label="t('wallet.giveMoneyToMyWallet')" :value="0" />
          <el-option :label="t('wallet.cashOutToExternalWallet')" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('wallet.cashCurrency')">
        <el-select v-model="formData.currency" style="width: 250px">
          <el-option
            v-for="item in userAssetsArr"
            :key="item.assetCoin"
            :label="item.assetCoin"
            :value="item.assetCoin"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.currency" :label="t('wallet.chooseNetWork')">
        <el-select v-model="formData.assetType" style="width: 250px">
          <el-option
            v-for="item in currentCurrencyData"
            :key="item.id"
            :label="item.assetType"
            :value="item.assetType"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.currency" :label="formData.currency">
        <span v-loading="beforeOrderLoading">{{ currencyPrice }}</span>
      </el-form-item>
      <el-form-item :label="t('wallet.amountPaid')">
        <el-input-number
          v-model="formData.amount"
          :controls="false"
          style="width: 250px; margin-right: 20px"
        />
        <span>{{ t('wallet.dollars') }} US</span>
      </el-form-item>
      <el-form-item :label="t('wallet.cashAvailable')">
        <el-input-number
          :model-value="transferAmount"
          :controls="false"
          disabled
          style="width: 250px; margin-right: 20px"
        />
        <span>{{ formData.currency }}</span>
      </el-form-item>
      <el-form-item
        v-if="formData.method === 1"
        :label="t('wallet.cashAddress')"
      >
        <el-input v-model="formData.externalAddress" style="width: 250px" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="confirmDisabled"
          :loading="submitting"
          @click="confirmOut"
        >
          {{ t('wallet.confirmPay') }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/index.js';
import { userApi } from '@/api';
import NP from 'number-precision';
import { ElMessage } from 'element-plus';

const { t } = useI18n();
const userStore = useUserStore();
const visible = ref(false);
const userAssetsArr = computed(() => userStore.userAssetsArr);
const formData = ref({
  method: 0,
  currency: '',
  assetType: '',
  amount: 0,
  externalAddress: '',
});
const beforeOrderLoading = ref(false);
const submitting = ref(false);
const currencyPrice = ref(0);
const orderId = ref();
const currentCurrencyData = computed(() => {
  if (formData.value.currency) {
    return (
      userAssetsArr.value.find(
        (item) => item.assetCoin === formData.value.currency
      )?.children ?? []
    );
  } else {
    return [];
  }
});
// const currentAddress = computed(() => {
//   if (formData.value.assetType) {
//     return (
//       currentCurrencyData.value.find(
//         (item) => item.assetType === formData.value.assetType
//       )?.address ?? ''
//     );
//   } else {
//     return '';
//   }
// });
const confirmDisabled = computed(() => {
  if (!formData.value.currency || !transferAmount.value) {
    return true;
  } else {
    return formData.value.method === 1 && !formData.value.externalAddress;
  }
});
const transferAmount = computed(() => {
  if (!currencyPrice.value || isNaN(currencyPrice.value)) {
    return 0;
  } else {
    return NP.round(NP.divide(formData.value.amount, currencyPrice.value), 6);
  }
});
const showDialog = () => {
  visible.value = true;
};
const confirmOut = async () => {
  const params = {
    id: orderId.value,
    amount: transferAmount.value,
    withdrawChannel: formData.value.method,
    // ToExternal: toExternal ? 1 : 0,
    externalAddress:
      formData.value.method === 1 ? formData.value.externalAddress : '',
  };
  submitting.value = true;
  const res = await userApi.withdrawConfirm(params);
  submitting.value = false;
  if (res.data.status === 0) {
    ElMessage.success(t('common.success'));
    visible.value = false;
  } else {
    ElMessage.error(t('common.failed'));
  }
};
watch(visible, (nv) => {
  if (!nv) {
    formData.value = {
      currency: '',
      method: 0,
      amount: 0,
      assetType: '',
      externalAddress: '',
    };
    orderId.value = null;
    currencyPrice.value = 0;
    beforeOrderLoading.value = false;
    submitting.value = false;
  }
});
watch(
  [() => formData.value.currency, () => formData.value.assetType],
  async ([nv1, nv2]) => {
    if (nv1 && nv2) {
      beforeOrderLoading.value = true;
      const res = await userApi.withdrawBefore({
        vaultId: userStore.userInfo.fb,
        platName: 'LP',
        assetCoin: nv1,
        assetType: nv2,
        withdrawChannel: formData.value.method,
        symbolName: nv1 + 'USDT',
      });
      beforeOrderLoading.value = false;
      if (res.data.status === 0) {
        currencyPrice.value = res.data.data.price;
        orderId.value = res.data.data.id;
      } else {
        ElMessage.error(t('common.failed'));
      }
    }
  }
);

defineExpose({
  open: () => showDialog(),
});
</script>
