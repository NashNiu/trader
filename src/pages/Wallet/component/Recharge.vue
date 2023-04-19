<template>
  <el-dialog
    v-model="visible"
    class="rechargeDialogContainer"
    width="800"
    destroy-on-close
  >
    <template #header>
      <h3>{{ t('wallet.rechargeCurrency') }}</h3>
    </template>
    <div class="contentBox">
      <el-space
        direction="vertical"
        :fill="true"
        class="spaceContainer"
        :size="30"
      >
        <el-row align="middle">
          <el-col :span="8">
            <p class="desc">{{ t('wallet.wallet') }}</p>
          </el-col>
          <el-col :span="14">
            {{ walletInfo?.currency }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <p class="desc">{{ t('wallet.chooseNetWork') }}</p>
          </el-col>
          <el-col :span="14">
            <el-select v-model="coinNetwork">
              <el-option
                v-for="item in addressArr"
                :key="item.id"
                :label="item.assetType"
                :value="item.assetType"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row v-if="coinNetwork" align="middle">
          <el-col :span="8">
            <p class="desc">{{ t('wallet.copyAddress') }}</p>
          </el-col>
          <el-col :span="14">
            <el-space>
              <span>{{ coinAddress }}</span>
              <el-icon class="copyIcon">
                <CopyDocument @click="copyAddress" />
              </el-icon>
            </el-space>
          </el-col>
        </el-row>
        <el-row v-if="coinNetwork">
          <el-col :span="10" :offset="8">
            <img class="qrImg" :src="qrcode" alt="qr code" />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="10" :offset="8">
            <el-button size="large" type="primary" @click="close">
              {{ t('common.close') }}
            </el-button>
          </el-col>
        </el-row>
      </el-space>
    </div>
  </el-dialog>
</template>
<script setup>
import { computed, ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import { useQRCode } from '@vueuse/integrations/useQRCode';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/index.js';

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
const { t } = useI18n();
const props = defineProps({
  walletInfo: {
    type: Object,
    default: () => ({}),
  },
});
const visible = ref(false);
const coinNetwork = ref();
const coinAddress = computed(() => {
  if (coinNetwork.value) {
    return (
      addressArr.value.find((item) => item.assetType === coinNetwork.value)
        ?.address ?? ''
    );
  } else {
    return '';
  }
});
const qrcode = useQRCode(coinAddress, { margin: 0 });
const { isSupported, copy } = useClipboard({
  source: coinAddress,
  legacy: true,
});
const copyAddress = () => {
  if (isSupported) {
    copy?.();
    ElMessage.success(t?.('common.copySuccess'));
  } else {
    ElMessage.error('Your browser does not support Clipboard API');
  }
};
const open = () => {
  coinNetwork.value = '';
  visible.value = true;
};
const close = () => {
  coinNetwork.value = '';
  visible.value = false;
};
defineExpose({
  open,
});
</script>
<style scoped lang="less">
.rechargeDialogContainer {
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
