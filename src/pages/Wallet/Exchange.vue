<template>
  <el-dialog v-model="visible" class="exchangeDialogContainer">
    <template #header>
      <h3>Recharge Currency</h3>
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
            <p class="desc">Select the charging network</p>
          </el-col>
          <el-col :span="14">
            <el-select style="width: 100%" />
          </el-col>
        </el-row>
        <el-row align="middle">
          <el-col :span="8">
            <p class="desc">Copy the charging address</p>
          </el-col>
          <el-col :span="14">
            <el-space>
              <span>bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh</span>
              <el-icon class="copyIcon"
                ><CopyDocument @click="copyAddress"
              /></el-icon>
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
            <el-button size="large" type="primary">Close</el-button>
          </el-col>
        </el-row>
      </el-space>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import { useQRCode } from '@vueuse/integrations/useQRCode';

const visible = ref(false);
const address = ref('bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh');
const qrcode = useQRCode(address, { margin: 0 });
const { isSupported, copy } = useClipboard();
const copyAddress = () => {
  if (isSupported) {
    copy?.(address.value);
    ElMessage.success('copy success');
  } else {
    ElMessage.error('Your browser does not support Clipboard API');
  }
};
const open = () => {
  visible.value = true;
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
