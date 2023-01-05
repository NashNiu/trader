<template>
  <div class="chartContainer">
    <iframe :key="Date.now()" :src="url"></iframe>
  </div>
</template>
<script setup>
import { configUrl } from '@/config/index.js';
import { useCommonStore } from '@/store/index.js';
import { computed } from 'vue';
const commonStore = useCommonStore();
const activeChartName = computed(() => commonStore.activeChartName);
const url = computed(
  () => `${configUrl.chartUrl}?name=${activeChartName.value}`
);
</script>
<style scoped lang="less">
.chartContainer {
  width: 100%;
  height: 100%;
  iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
