<template>
  <el-dialog v-model="dialogVisible" title="change pass">
    <span>change pass {{ userInfo.email }}</span>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { computed } from 'vue';
import { useUserStore } from '@/store/index.js';
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const dialogVisible = ref(false);
const show = () => {
  dialogVisible.value = true;
};
defineExpose({
  show,
});
</script>
<style scoped lang="less"></style>
