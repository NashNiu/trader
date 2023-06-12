<template>
  <el-dialog v-model="visible" title="verification">
    <span>verification</span>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue';

const visible = ref(false);
const show = () => {
  visible.value = true;
};
defineExpose({
  show,
});
</script>
<style scoped lang="less"></style>
