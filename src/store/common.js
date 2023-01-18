import { defineStore } from 'pinia';

export default defineStore('common', {
  state: () => ({
    loadingInstance: null,
    chartData: {
      id: 'BTC/USDT',
      symbol: 'BTCUSDT',
    },
  }),
  getters: {
    chartDataAvailable(state) {
      return state.chartData?.id && state.chartData?.symbol;
    },
  },
  actions: {
    setLoadingInstance(payload) {
      this.loadingInstance = payload;
    },
    closeLoading() {
      if (this.loadingInstance) {
        this.loadingInstance.close();
      }
    },
    changeChartData(data) {
      this.chartData = data;
    },
  },
});
