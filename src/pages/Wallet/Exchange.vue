<template>
  <el-dialog
    v-model="visible"
    class="exchangeDialogContainer"
    width="800"
    destroy-on-close
    @closed="afterClose"
  >
    <template #header>
      <h3>Currency Exchange</h3>
    </template>
    <div class="contentBox">
      <el-space
        direction="vertical"
        :fill="true"
        class="spaceContainer"
        :size="30"
      >
        <el-row align="middle">
          <el-col :span="6">
            <p class="desc">USDT/{{ currentSymbol }}</p>
          </el-col>
          <el-col :span="14">
            <span>{{ liveData?.ask }}</span>
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="6">
            <p class="desc">Exchange amount</p>
          </el-col>
          <el-col :span="6">
            <el-input-number
              v-model="amount"
              controls-position="right"
              style="width: 95%"
            />
          </el-col>
          <el-col :span="2">
            {{ currentSymbol }}
          </el-col>
          <el-col :span="8">
            <span
              >Available balance {{ walletInfo?.balance }}
              {{ currentSymbol }}</span
            >
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="6">
            <p class="desc">convertible</p>
          </el-col>
          <el-col :span="6">
            <el-input-number
              v-model="usdAmount"
              disabled
              controls-position="right"
              style="width: 95%"
            />
          </el-col>
          <el-col :span="2"> USDT </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="8"> </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="8">
            <el-button
              size="large"
              type="primary"
              :loading="submitLoading"
              @click="submit"
              >Confirm Redemption</el-button
            >
          </el-col>
        </el-row>
      </el-space>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useSocketStore, useUserStore } from '@/store/index.js';
import { createDeposit } from '@/api/user.js';
import { ElMessage } from 'element-plus';

const props = defineProps({
  walletInfo: {
    type: Object,
    default: () => ({}),
  },
});
const socketStore = useSocketStore();
const userStore = useUserStore();
const visible = ref(false);
const submitLoading = ref(false);
const currentSymbol = computed(() => {
  return props.walletInfo.id?.replace('_TEST', '');
});
const liveData = computed(
  () => socketStore.liveData[currentSymbol.value + 'USDT']
);
const amount = ref(0);
const usdAmount = computed(() =>
  Number((amount.value * liveData.value?.ask).toFixed(2))
);
const open = () => {
  visible.value = true;
};
const afterClose = () => {
  amount.value = 0;
};
const submit = async () => {
  const params = {
    vaultId: userStore.userInfo.fb,
    platName: 'LP',
    assetId: props.walletInfo?.id,
    amount: amount.value,
    price: liveData.value?.ask,
  };
  submitLoading.value = true;
  const res = await createDeposit(params);
  if (res.data.status === 0) {
    ElMessage.success('submit success');
    visible.value = false;
  } else {
    ElMessage.error('submit error');
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
