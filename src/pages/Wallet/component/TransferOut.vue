<template>
  <el-dialog
    v-model="visible"
    width="800"
    destroy-on-close
    class="transferDialogContainer"
  >
    <template #header>
      <h3>{{ t('wallet.transferOutCurrency') }}</h3>
    </template>
    <el-space direction="vertical" fill :size="30" style="width: 100%">
      <el-row align="middle" :gutter="20">
        <el-col :span="6">
          <p class="desc">{{ t('wallet.transferOutQuantity') }}</p>
        </el-col>
        <el-col :span="14">
          <el-input-number
            v-model="transferQuantity"
            :min="0"
            :controls="false"
            style="width: 95%"
            @blur="getTransferFee"
          />
        </el-col>
      </el-row>
      <el-row align="middle" :gutter="20">
        <el-col :span="6">
          <p class="desc">{{ t('wallet.chooseNetWork') }}</p>
        </el-col>
        <el-col :span="14">
          <el-select v-model="coinNetwork">
            <el-option
              v-for="item in addressArr"
              :key="item.id"
              :label="item.assetType"
              :value="item.id"
            />
          </el-select>
        </el-col>
      </el-row>
      <el-row v-if="coinNetwork" align="middle" :gutter="20">
        <el-col :span="6">
          <p class="desc">{{ t('wallet.receiveAddress') }}</p>
        </el-col>
        <el-col :span="14">
          <el-input
            v-model="transferAddress"
            style="width: 95%"
            @blur="getTransferFee"
          />
        </el-col>
      </el-row>
      <el-row align="middle" :gutter="20">
        <el-col :span="6">
          <p class="desc">{{ t('wallet.minerFee') }}</p>
        </el-col>
        <el-col v-loading="loadingTransferFee" :span="14">
          <el-input v-model="transferFee" disabled style="width: 95%" />
        </el-col>
      </el-row>
      <el-row align="middle" :gutter="20">
        <el-col :span="4" :offset="5">
          <el-button @click="visible = false">
            {{ t('common.cancel') }}
          </el-button>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            :loading="transferLoading"
            @click="transferOut"
          >
            {{ t('wallet.transferOut') }}
          </el-button>
        </el-col>
      </el-row>
    </el-space>
  </el-dialog>
</template>
<script setup>
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/index.js';
import { ElMessage } from 'element-plus';
import { userApi } from '@/api';
const props = defineProps({
  walletInfo: {
    type: Object,
    default: () => ({}),
  },
});
const { t } = useI18n();
const userStore = useUserStore();
const addressArr = computed(() => {
  const target = userStore.userAssetsArr.find(
    (item) => item.assetCoin === props.walletInfo.currency
  );
  if (target) {
    return target.children;
  } else {
    return [];
  }
});
const visible = ref(false);
const coinNetwork = ref();
const showDialog = () => {
  visible.value = true;
  setTimeout(() => {
    if (addressArr.value.length) {
      coinNetwork.value = addressArr.value[0].id;
    } else {
      coinNetwork.value = '';
    }
  }, 10);
};
const transferQuantity = ref(0);
const transferAddress = ref('');
const transferFee = ref(0);
const loadingTransferFee = ref(false);
const transferLoading = ref(false);
watch(visible, (nv) => {
  if (!nv) {
    transferAddress.value = '';
    transferFee.value = 0;
    transferLoading.value = false;
    transferQuantity.value = 0;
  }
});
const getTransferFee = async () => {
  if (transferAddress.value && transferQuantity.value) {
    loadingTransferFee.value = true;
    const params = {
      assetId: coinNetwork.value,
      vaultId: userStore.userInfo.fb,
      externalAddress: transferAddress.value,
      amount: transferQuantity.value,
    };
    const res = await userApi.getTransferFee(params);
    loadingTransferFee.value = false;
    if (res.data.status === 0) {
      transferFee.value = res.data.data?.low?.networkFee ?? 0;
    }
  }
};
const transferOut = async () => {
  if (transferQuantity.value && transferAddress.value) {
    const target = addressArr.value.find(
      (item) => item.id === coinNetwork.value
    );
    const params = {
      platName: 'LP',
      amount: transferQuantity.value,
      externalAddress: transferAddress.value,
      withdrawChannel: 1,
      assetCoin: target?.assetCoin,
      assetType: target?.assetType,
    };
    transferLoading.value = true;
    const res = await userApi.walletWithdraw(params);
    if (!res.data.status) {
      ElMessage.success(t('common.operateSuccess'));
      visible.value = false;
    } else {
      ElMessage.error(res.data.message || t('common.operateFailed'));
      transferLoading.value = false;
    }
  } else {
    ElMessage.error(t('wallet.amountOrAddressWrong'));
  }
};
defineExpose({
  open: () => showDialog(),
});
</script>
<style lang="less" scoped>
.transferDialogContainer {
  .desc {
    font-size: 16px;
    font-weight: bold;
    color: #333333;
    text-align: right;
  }
}
</style>
