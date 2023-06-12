<template>
  <el-dialog v-model="visible" title="update pay pass">
    <span>update pay pass {{ userInfo.email }}</span>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { computed } from 'vue';
import { useCommonStore, useUserStore } from '@/store/index.js';
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const commonStore = useCommonStore();
const visible = ref(false);
const show = () => {
  visible.value = true;
};
defineExpose({
  show,
});
</script>
<style scoped lang="less"></style>
