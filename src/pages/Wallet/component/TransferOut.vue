<template>
  <el-dialog
    v-model="visible"
    width="600"
    destroy-on-close
    class="transferDialogContainer"
  >
    <template #header>
      <h3>{{ t('wallet.transferOutCurrency') }}</h3>
    </template>
    <el-space direction="vertical" fill :size="30" style="width: 100%">
      <el-row align="middle" :gutter="20">
        <el-col :span="8">
          <p class="desc">{{ t('wallet.transferOutQuantity') }}</p>
        </el-col>
        <el-col :span="8">
          <el-input-number
            v-model="transferQuantity"
            :min="0"
            :controls="false"
            style="width: 95%"
          />
        </el-col>
      </el-row>
      <el-row align="middle" :gutter="20">
        <el-col :span="8">
          <p class="desc">{{ t('wallet.receiveAddress') }}</p>
        </el-col>
        <el-col :span="8">
          <el-input v-model="transferAddress" style="width: 95%" />
        </el-col>
      </el-row>
      <el-row align="middle" :gutter="20">
        <el-col :span="8">
          <p class="desc">{{ t('wallet.minerFee') }}</p>
        </el-col>
        <el-col :span="8">
          <el-input v-model="transferAddress" style="width: 95%" />
        </el-col>
      </el-row>
      <el-row align="middle" :gutter="20">
        <el-col :span="4" :offset="5">
          <el-button>{{ t('common.cancel') }}</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">{{ t('wallet.transferOut') }}</el-button>
        </el-col>
      </el-row>
    </el-space>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const visible = ref(false);
const showDialog = () => {
  visible.value = true;
};
const transferQuantity = ref(0);
const transferAddress = ref('');
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
