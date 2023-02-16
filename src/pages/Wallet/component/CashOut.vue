<template>
  <el-dialog v-model="visible" width="800" destroy-on-close>
    <template #header>
      <h3>{{ t('wallet.cashOutOfAccount') }}</h3>
    </template>
    <el-form :model="formData" label-width="200px">
      <el-form-item :label="t('wallet.paymentMethod')">
        <el-select v-model="formData.method" style="width: 250px">
          <el-option :label="t('wallet.giveMoneyToMyWallet')" value="1" />
          <el-option :label="t('wallet.cashOutToExternalWallet')" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('wallet.cashCurrency')">
        <el-select v-model="formData.currency" style="width: 250px">
          <el-option label="eth" value="eth" />
          <el-option label="btc" value="btc" />
        </el-select>
      </el-form-item>
      <el-form-item label="usdt/btc">
        <span>1234 0.23%</span>
      </el-form-item>
      <el-form-item :label="t('wallet.amountPaid')">
        <el-input-number
          :controls="false"
          style="width: 250px; margin-right: 20px"
        />
        <span>{{ t('wallet.dollars') }} US($1000)</span>
      </el-form-item>
      <el-form-item :label="t('wallet.cashAvailable')">
        <el-input-number
          :controls="false"
          style="width: 250px; margin-right: 20px"
        />
        <span>ETH</span>
      </el-form-item>
      <el-form-item :label="t('wallet.cashAddress')">
        <el-input style="width: 250px" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary">{{ t('wallet.confirmPay') }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const visible = ref(false);
const formData = reactive({
  method: 1,
  currency: 'eth',
});
const showDialog = () => {
  visible.value = true;
};
defineExpose({
  open: () => showDialog(),
});
</script>
