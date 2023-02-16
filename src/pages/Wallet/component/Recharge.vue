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
            {{ walletInfo?.id }}
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="8">
            <p class="desc">{{ t('wallet.copyAddress') }}</p>
          </el-col>
          <el-col :span="14">
            <el-space>
              <span>{{ walletInfo?.address }}</span>
              <el-icon class="copyIcon">
                <CopyDocument @click="copyAddress" />
              </el-icon>
            </el-space>
          </el-col>
        </el-row>
        <el-row>
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

const { t } = useI18n();
const props = defineProps({
  walletInfo: {
    type: Object,
    default: () => ({}),
  },
});
const visible = ref(false);
const address = computed(() => props.walletInfo?.address);
const qrcode = useQRCode(address, { margin: 0 });
const { isSupported, copy } = useClipboard({ source: address, legacy: true });

const copyAddress = () => {
  if (isSupported) {
    copy?.();
    ElMessage.success(t?.('common.copySuccess'));
  } else {
    ElMessage.error('Your browser does not support Clipboard API');
  }
};
const open = () => {
  visible.value = true;
};
const close = () => {
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
