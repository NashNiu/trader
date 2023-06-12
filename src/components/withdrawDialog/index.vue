<template>
  <el-dialog
    v-model="visible"
    width="680"
    class="withdrawDialogContainer"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    top="10vh"
    :destroy-on-close="true"
  >
    <template #header>
      <div class="withdrawDialogHeader">
        <div class="title">出金</div>
        <img :src="closeImg" class="close" alt="" @click="hide" />
      </div>
    </template>
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
    >
      <el-form-item :label="t('wallet.paymentMethod')" prop="method">
        <el-select v-model="formData.method" style="width: 250px">
          <el-option :label="t('wallet.giveMoneyToMyWallet')" :value="0" />
          <el-option :label="t('wallet.cashOutToExternalWallet')" :value="1" />
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="t('wallet.cashCurrency')" prop="currency">
            <el-select v-model="formData.currency" style="width: 250px">
              <el-option
                v-for="item in userAssetsArr"
                :key="item.assetCoin"
                :label="item.assetCoin"
                :value="item.assetCoin"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            v-if="formData.currency"
            label=" "
            prop="assetType"
            label-width="20"
          >
            <el-select v-model="formData.assetType" style="width: 250px">
              <el-option
                v-for="item in currentCurrencyData"
                :key="item.id"
                :label="item.assetType"
                :value="item.assetType"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item :label="t('wallet.cashAddress')" prop="externalAddress">
        <el-input
          v-model="formData.externalAddress"
          :disabled="formData.method === 0"
          style="width: 250px"
        />
      </el-form-item>
      <el-form-item :label="t('wallet.amountPaid')" prop="amount">
        <el-input-number
          v-model="formData.amount"
          :controls="false"
          style="width: 250px; margin-right: 20px"
        />
      </el-form-item>

      <div v-if="formData.currency">
        <span v-loading="beforeOrderLoading">
          目前汇率是{{ currencyPrice }},钱包将会到账
          {{ transferAmount }}
          {{ formData.currency }}
        </span>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="confirmDisabled"
          :loading="submitting"
          @click="passCheck"
        >
          {{ t('wallet.confirmPay') }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import closeImg from '@/assets/img/header/close.png';
import { useI18n } from 'vue-i18n';
import { useHeaderStore, useUserStore } from '@/store/index.js';
import NP from 'number-precision';
import { ElMessage, ElMessageBox } from 'element-plus';
import { userApi } from '@/api';
const { t } = useI18n();
const userStore = useUserStore();
const headerStore = useHeaderStore();
const visible = ref(false);
const formRef = ref();
const userAssetsArr = computed(() => userStore.userAssetsArr);
const beforeOrderLoading = ref(false);
const submitting = ref(false);
const formData = ref({
  method: 0,
  currency: '',
  assetType: '',
  amount: 0,
  externalAddress: '',
});
const currencyPrice = ref(0);
const orderId = ref();
const formRules = reactive({
  birthday: [
    { required: true, message: 'Please pick a date', trigger: 'blur' },
  ],
  city: [{ required: true, message: 'Please input a city', trigger: 'blur' }],
  job: [{ required: true, message: 'Please input a job', trigger: 'blur' }],
});
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

const transferAmount = computed(() => {
  if (!currencyPrice.value || isNaN(currencyPrice.value)) {
    return 0;
  } else {
    return NP.round(NP.divide(formData.value.amount, currencyPrice.value), 6);
  }
});

const confirmDisabled = computed(() => {
  if (!formData.value.currency || !transferAmount.value) {
    return true;
  } else {
    return formData.value.method === 1 && !formData.value.externalAddress;
  }
});
const passCheck = () => {
  ElMessageBox.prompt('Please input your password', '', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    inputType: 'password',
    inputPattern: /^.+$/,
    inputErrorMessage: 'Required',
  }).then(({ value }) => {
    console.log(value);
  });
};

const confirmOut = async () => {
  const params = {
    id: orderId.value,
    amount: transferAmount.value,
    withdrawChannel: formData.value.method,
    externalAddress:
      formData.value.method === 1 ? formData.value.externalAddress : '',
  };
  submitting.value = true;
  const res = await userApi.withdrawConfirm(params);
  submitting.value = false;
  if (res.data.status === 0) {
    ElMessage.success(t?.('common.success'));
    visible.value = false;
  } else {
    ElMessage.error(t?.('common.failed'));
  }
};
const show = () => {
  visible.value = true;
};
const hide = () => {
  visible.value = false;
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
  async ([nv1, nv2], [ov1]) => {
    if (ov1 !== nv1) {
      formData.value.externalAddress = '';
      formData.value.assetType = '';
    } else {
      if (nv1 && nv2) {
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
          ElMessage.error(t?.('common.failed'));
        }
      }
    }
  }
);
defineExpose({ show });
onMounted(() => {
  headerStore.getAddressData().then();
});
</script>
<style scoped lang="less">
.withdrawDialogHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px 30px 30px;
  box-sizing: border-box;
  .title {
    font-size: 22px;
    color: #333333;
  }
  .close {
    width: 17px;
    cursor: pointer;
  }
}
</style>
<style lang="less">
.withdrawDialogContainer {
  --el-dialog-padding-primary: 0;
}
</style>
