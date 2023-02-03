import { configSymbols as symbolInfoArr } from '@/config/index';
import { useChartStore } from '@/store/index.js';

const DataFeedBase = (function () {
  class DataFeedBase {
    constructor() {
      this.configurationData = {
        supported_resolutions: [1, 5, 15, 30, 60, 240, '1D', '1W', '1M'],
        intraday_multipliers: ['1', '5', '15', '30', '60', '240'],
      };
      this.chartStore = useChartStore();
    }
    onReady(callback) {
      setTimeout(() => {
        callback(this.configurationData);
      }, 0);
    }
    resolveSymbol(symbolName, onSymbolResolvedCallback) {
      const currentSymbol = symbolInfoArr.symbolArr.find((item) =>
        symbolName.includes(item.name)
      );
      const commonSymbolInfo = {
        has_intraday: true,
        has_daily: true,
        has_weekly_and_monthly: true,
        intraday_multipliers: this.configurationData.intraday_multipliers,
        supported_resolutions: this.configurationData.supported_resolutions,
        data_status: 'streaming',
        has_no_volume: true,
        format: 'price',
        minmov: 1,
        pricescale: 10 ** currentSymbol.d,
      };
      const currentSymbolInfo = {
        ...commonSymbolInfo,
        ...currentSymbol,
        session: '0000-0000|0000-0000:1234567;1',
        timezone: 'Etc/UTC',
      };
      setTimeout(() => {
        onSymbolResolvedCallback(currentSymbolInfo);
      }, 0);
    }
    getBars(
      symbolInfo,
      resolution,
      from,
      to,
      onHistoryCallback,
      onErrorCallback,
      firstDataRequest
    ) {
      // console.log('get bar');
      this.chartStore.setActiveSymbolInfo({ ...symbolInfo, resolution });
      this.chartStore.updateHistoryData({
        symbolInfo,
        resolution,
        from,
        to,
        onHistoryCallback,
        onErrorCallback,
        firstDataRequest,
      });
    }
    subscribeBars(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback
    ) {
      // console.log('subscribeBars');
      this.chartStore.setActiveSymbolInfo({
        // symbolInfo,
        resolution,
        onRealtimeCallback,
        subscriberUID,
        onResetCacheNeededCallback,
      });
      this.chartStore.setSubscribeFn({
        onRealtimeCallback,
      });
    }
    unsubscribeBars(subscriberUID) {
      this.chartStore.removeActiveSymbol(subscriberUID);
    }
  }
  return DataFeedBase;
})();

export default DataFeedBase;
