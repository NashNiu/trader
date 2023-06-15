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
    <Verification
      v-show="ifNeedVerification"
      parent="traderWithdraw"
      @finish="certificateFinish"
    />
    <el-form
      v-if="!ifNeedVerification"
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="120px"
      label-position="top"
      class="form"
    >
      <el-form-item :label="t('wallet.paymentMethod')" prop="method">
        <el-select v-model="formData.method" style="width: 240px">
          <el-option :label="t('wallet.giveMoneyToMyWallet')" :value="0" />
          <el-option :label="t('wallet.cashOutToExternalWallet')" :value="1" />
        </el-select>
      </el-form-item>
      <el-space :gutter="25" alignment="flex-end">
        <el-form-item :label="t('wallet.cashCurrency')" prop="currency">
          <el-select v-model="formData.currency" style="width: 240px">
            <el-option
              v-for="item in userAssetsArr"
              :key="item.assetCoin"
              :label="item.assetCoin"
              :value="item.assetCoin"
            />
          </el-select>
        </el-form-item>
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
      </el-space>
      <el-form-item :label="t('wallet.cashAddress')" prop="externalAddress">
        <el-input
          v-model="formData.externalAddress"
          :disabled="formData.method === 0"
          style="width: 520px"
        />
      </el-form-item>
      <el-form-item :label="t('wallet.amountPaid')" prop="amount">
        <el-input
          v-model="formData.amount"
          :controls="false"
          style="width: 520px"
        >
          <template #append>
            <el-button type="primary" class="maxBtn">Max</el-button>
          </template>
        </el-input>
      </el-form-item>

      <div v-if="formData.currency" class="tips">
        <span v-loading="beforeOrderLoading">
          目前汇率是{{ currencyPrice }},钱包将会到账
          {{ transferAmount }}
          {{ formData.currency }}
        </span>
      </div>
      <el-form-item>
        <el-button
          :disabled="confirmDisabled"
          type="primary"
          :loading="submitting"
          class="submitBtn"
          @click="beforeSubmit"
        >
          {{ t('wallet.confirmPay') }}
        </el-button>
      </el-form-item>
    </el-form>
    <PayPassDialog ref="payPassDialogRef" @next="beforeSubmit" />
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
import PayPassDialog from '@/components/common/payPassDialog.vue';
import Verification from '@/components/walletDialog/verification.vue';

const { t } = useI18n();
const userStore = useUserStore();
const headerStore = useHeaderStore();
const userInfo = computed(() => userStore.userInfo);
const visible = ref(false);
const formRef = ref();
const payPassDialogRef = ref(null);
const userAssetsArr = computed(() => userStore.userAssetsArr);
const beforeOrderLoading = ref(false);
const submitting = ref(false);
const ifNeedVerification = ref(true);
const formData = ref({
  method: 0,
  currency: '',
  assetType: '',
  amount: '',
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
  ElMessageBox.prompt('Please input your payment password', '', {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
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
            } else {
              ElMessage.error('密码不对');
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
    ElMessage.info('还未设置支付密码，请先设置支付密码');
    payPassDialogRef.value.show();
  }
};
const certificateFinish = () => {
  ifNeedVerification.value = false;
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
  ifNeedVerification.value = true;
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
.withdrawDialogContainer {
  .withdrawDialogHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px 15px 90px;
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
  .form {
    padding: 30px 90px 30px 90px;
    box-sizing: border-box;
  }
  .maxBtn {
    width: 60px;
    background-color: #266fe8 !important;
    border-radius: 0px 6px 6px 0px;
    font-size: 14px;
    font-weight: bold;
    color: #ffffff !important;
  }
  .tips {
    font-size: 16px;
    color: #333333;
  }
  .submitBtn {
    margin-top: 40px;
    width: 520px;
    height: 42px;
    background-color: #0c3d93;
    border-radius: 8px;
    font-family: MicrosoftYaHei;
    font-size: 20px;
    color: #ffffff;
  }
}
</style>
<style lang="less">
.withdrawDialogContainer {
  --el-dialog-padding-primary: 0;
  .el-form--default.el-form--label-top .el-form-item .el-form-item__label {
    margin-bottom: 2px;
  }
}
</style>
