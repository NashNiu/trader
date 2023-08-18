<script setup>
import { configUrl } from '@/config';
import { tools } from '@/utils';
import { ref, computed } from 'vue';
const loading = ref(false);
const token = ref('');
const url = computed(
  () => `${configUrl.newWalletUrl}?token=${token.value}&plat=LP`
);
const getToken = async () => {
  loading.value = true;
  token.value = await tools.getNewWalletToken();
  loading.value = false;
};
getToken();
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
