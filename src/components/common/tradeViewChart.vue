<template>
  <div class="chartContainer">
    <iframe :src="url" :key="Date.now()"></iframe>
  </div>
</template>
<script setup>
import { urlConfig } from '@/config/index.js';
import { useCommonStore } from '@/store/index.js';
import { computed } from 'vue';
const commonStore = useCommonStore();
const activeChartName = computed(() => commonStore.activeChartName);
const url = computed(
  () => `${urlConfig.chartUrl}?name=${activeChartName.value}`
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
