import { defineStore } from 'pinia';

export default defineStore('common', {
  state: () => ({
    loadingInstance: null,
    activeChartName: 'ETHUSDT',
  }),
  actions: {
    setLoadingInstance(payload) {
      this.loadingInstance = payload;
    },
    closeLoading() {
      if (this.loadingInstance) {
        this.loadingInstance.close();
      }
    },
    changeActiveChartName(name) {
      this.activeChartName = name;
    },
  },
});
