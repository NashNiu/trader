<template>
  <el-dialog
    v-model="visible"
    class="exchangeDialogContainer"
    width="800"
    destroy-on-close
    :before-close="beforeClose"
    @closed="afterClose"
    @open="onOpen"
  >
    <template #header>
      <h3>{{ t('wallet.currencyExchange') }}</h3>
    </template>
    <div v-loading="getDataLoading" class="contentBox">
      <el-space
        direction="vertical"
        :fill="true"
        class="spaceContainer"
        :size="30"
      >
        <el-row align="middle">
          <el-col :span="8">
            <p class="desc">{{ walletInfo?.currency }}</p>
          </el-col>
          <el-col :span="14">
            <span>{{ orderData?.price }}</span>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="8">
            <p class="desc">{{ t('wallet.exchangeAmount') }}</p>
          </el-col>
          <el-col :span="6">
            <el-input-number
              v-model="amount"
              :min="0"
              :controls="false"
              style="width: 95%"
            />
          </el-col>
          <el-col :span="2">
            {{ walletInfo?.currency }}
          </el-col>
          <el-col :span="8">
            <span>
              {{ t('common.balance') }}
              {{ Number(walletInfo?.available).toFixed(6) }}
              {{ walletInfo?.mtName?.split('USDT')[0] }}
            </span>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="8">
            <p class="desc">{{ t('wallet.convert') }}</p>
          </el-col>
          <el-col :span="6">
            <el-input-number
              v-model="usdAmount"
              disabled
              :controls="false"
              style="width: 95%"
            />
          </el-col>
          <el-col :span="2">USDT</el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="8"></el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="8">
            <el-button
              size="large"
              type="primary"
              :loading="submitLoading"
              :disabled="submitDisabled"
              @click="submit"
            >
              {{ t('common.confirm') }}
            </el-button>
          </el-col>
        </el-row>
      </el-space>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/store/index.js';
import { userApi } from '@/api/index.js';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps({
  walletInfo: {
    type: Object,
    default: () => ({}),
  },
});
const userStore = useUserStore();
const visible = ref(false);
const submitLoading = ref(false);
const getDataLoading = ref(false);
const closeByTimer = ref(false);
const orderData = ref({});
const amount = ref(0);
const submitDisabled = computed(() => amount.value <= 0);
const usdAmount = computed(() =>
  Number((amount.value * orderData.value?.price).toFixed(2))
);

const getData = async () => {
  getDataLoading.value = true;
  const res = await userApi.depositBefore({
    vaultId: userStore.userInfo.fb,
    platName: 'LP',
    assetCoin: props.walletInfo.currency,
    symbolName: props.walletInfo.currency + 'USDT',
  });
  getDataLoading.value = false;
  if (res.data.status === 0) {
    orderData.value = res.data.data;
  } else {
    ElMessage.error(t?.('common.operateFailed'));
    visible.value = false;
  }
};
const open = () => {
  visible.value = true;
};
const onOpen = () => {
  getData();
};
const beforeClose = (done) => {
  done();
};
const afterClose = () => {
  amount.value = 0;
  closeByTimer.value = false;
  getDataLoading.value = false;
  submitLoading.value = false;
};

const submit = async () => {
  if (amount.value > props.walletInfo?.available) {
    ElMessage.error(t?.('common.insufficientBalance'));
    return;
  }
  const params = {
    id: orderData.value.id,
    amount: amount.value,
  };
  submitLoading.value = true;
  const res = await userApi.confirmDeposit(params);
  if (res.data.status === 0) {
    ElMessage.success(t?.('common.success'));
    visible.value = false;
  } else {
    ElMessage.error(t?.('common.failed'));
  }
  submitLoading.value = false;
};
defineExpose({
  open,
});
</script>
<style scoped lang="less">
.exchangeDialogContainer {
  .contentBox {
    box-sizing: border-box;
    padding: 20px 20px 20px 30px;
    .spaceContainer {
      width: 100%;
      .desc {
        font-size: 16px;
        font-weight: bold;
        color: #333333;
      }
      .copyIcon {
        cursor: pointer;
        color: #0c3d93;
      }
      .qrImg {
        width: 250px;
      }
    }
  }
}
</style>
