<template>
  <el-dialog v-model="visible" width="800" destroy-on-close>
    <template #header>
      <h3>{{ t('wallet.cashOutOfAccount') }}</h3>
    </template>
    <el-form :model="formData" label-width="200px">
      <el-form-item :label="t('wallet.paymentMethod')">
        <el-select v-model="formData.method" style="width: 250px">
          <el-option :label="t('wallet.giveMoneyToMyWallet')" :value="1" />
          <el-option :label="t('wallet.cashOutToExternalWallet')" :value="2" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('wallet.cashCurrency')">
        <el-select v-model="formData.currency" style="width: 250px">
          <el-option
            v-for="item in userAssetsArr"
            :key="item.assetId"
            :label="item.assetId"
            :value="item.assetId"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="formData.currency" :label="currentCurrency">
        <span v-loading="beforeOrderLoading">{{ currencyPrice }}</span>
      </el-form-item>
      <el-form-item :label="t('wallet.amountPaid')">
        <el-input-number
          v-model="formData.amount"
          :controls="false"
          style="width: 250px; margin-right: 20px"
        />
        <span>{{ t('wallet.dollars') }} US($1000)</span>
      </el-form-item>
      <el-form-item :label="t('wallet.cashAvailable')">
        <el-input-number
          :model-value="transferAmount"
          :controls="false"
          disabled
          style="width: 250px; margin-right: 20px"
        />
        <span>ETH</span>
      </el-form-item>
      <el-form-item
        v-if="formData.method === 2"
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
  method: 1,
  currency: '',
  amount: 0,
  externalAddress: '',
});
const beforeOrderLoading = ref(false);
const submitting = ref(false);
const currencyPrice = ref(0);
const orderId = ref();
const currentCurrency = computed(() => {
  if (formData.value.currency) {
    return (
      userAssetsArr.value.find(
        (item) => item.assetId === formData.value.currency
      )?.mtName ?? ''
    );
  } else {
    return '';
  }
});
const confirmDisabled = computed(() => {
  if (
    !formData.value.currency ||
    !formData.value.method ||
    !transferAmount.value
  ) {
    return true;
  } else {
    return formData.value.method === 2 && !formData.value.externalAddress;
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
  const toExternal = formData.value.method === 2;
  const params = {
    id: orderId.value,
    amount: transferAmount.value,
    ToExternal: toExternal ? 1 : 0,
    externalAddress: toExternal ? formData.value.externalAddress : undefined,
  };
  console.log(params);
  submitting.value = true;
  const res = await userApi.withdrawConfirm(params);
  submitting.value = false;
  if (res.data.status === 0) {
    ElMessage.success(t('common.success'));
    visible.value = false;
  } else {
    ElMessage.success(t('common.failed'));
  }
};
watch(visible, (nv) => {
  if (!nv) {
    formData.value = {
      currency: '',
      method: 1,
      amount: 0,
      externalAddress: '',
    };
    orderId.value = null;
    currencyPrice.value = 0;
    beforeOrderLoading.value = false;
    submitting.value = false;
  }
});
watch(
  () => formData.value.currency,
  async (nv) => {
    if (nv) {
      beforeOrderLoading.value = true;
      const res = await userApi.withdrawBefore({
        vaultId: userStore.userInfo.fb,
        platName: 'LP',
        assetId: nv,
      });
      if (res.data.status === 0) {
        beforeOrderLoading.value = false;
        currencyPrice.value = res.data.data.price;
        orderId.value = res.data.data.id;
      }
    }
  }
);

defineExpose({
  open: () => showDialog(),
});
</script>
