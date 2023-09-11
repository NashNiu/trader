<script setup>
import { configUrl } from '@/config';
import { ref, computed } from 'vue';
import { useWalletStore } from '@/store';
const walletStore = useWalletStore();
const loading = ref(false);
const token = computed(() => walletStore.token);
const url = computed(
  () => `${configUrl.newWalletUrl}?token=${token.value}&plat=LP`
);
</script>
<template>
  <div v-loading="loading" class="container">
    <iframe :src="url" class="frameBox"></iframe>
  </div>
</template>
<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .frameBox {
    width: 100%;
    height: 100%;
  }
}
</style>
