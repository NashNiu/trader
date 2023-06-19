<template>
  <el-dialog
    v-model="visible"
    title="View"
    class="verifyDialogContainer"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    top="10vh"
    :destroy-on-close="true"
    width="680"
  >
    <template #header>
      <div class="verifyDialogHeader">
        <div>
          <span>View</span>
        </div>
        <img :src="closeImg" class="close" alt="" @click="hide" />
      </div>
    </template>
    <div class="contentContainer">
      <Verification
        :show-title="false"
        show-status
        parent="userVerify"
        @finish="verifyFinish"
      />
    </div>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue';
import Verification from '@/components/walletDialog/verification.vue';
import closeImg from '@/assets/img/header/close.png';
const emit = defineEmits(['complete']);
const visible = ref(false);
const show = () => {
  visible.value = true;
};
const hide = () => {
  visible.value = false;
};
const verifyFinish = () => {
  hide();
  emit('complete');
};
defineExpose({
  show,
});
</script>
<style scoped lang="less">
.verifyDialogHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px 0 20px;
  box-sizing: border-box;
  div {
    display: flex;
    align-items: center;
  }
  img {
    width: 27px;
  }
  span {
    margin-left: 10px;
    font-family: MicrosoftYaHei-Bold;
    font-size: 22px;
    color: #333333;
  }
  .close {
    width: 17px;
    cursor: pointer;
  }
}
.verifyDialogContainer {
  .contentContainer {
    margin: 0 auto;
    padding-bottom: 20px;
  }
}
</style>

<style lang="less">
.verifyDialogContainer {
  --el-dialog-padding-primary: 0;
}
</style>
