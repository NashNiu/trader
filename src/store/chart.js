import { defineStore } from 'pinia';
import { request, KlineDecode } from '@/utils/index.js';
import { configUrl } from '@/config/index.js';
import NP from 'number-precision';
NP.enableBoundaryChecking(false);
export default defineStore('chart', {
  state: () => ({
    tvWidget: null,
    activeSymbolInfo: {},
    // 第一根K线时间
    firstBarTime: '',
    // 最后一根K线数据
    lastBarData: {},
    // 订阅回调函数
    subscribeFn: {},
  }),
  actions: {
    setWidget(data) {
      this.tvWidget = data;
    },
    setActiveSymbolInfo(data) {
      // console.log(data);
      this.activeSymbolInfo = data;
    },
    setFirstBarTime(data) {
      this.firstBarTime = data;
    },
    setLastBarData(data) {
      this.lastBarData = data;
    },
    setSubscribeFn(data) {
      this.subscribeFn = data;
    },
    removeActiveSymbol(data) {
      if (this.activeSymbolInfo.subscriberUID === data) {
        // this.activeSymbolInfo = {}
      }
    },
    // 获取历史K线
    async getBars(data) {
      const { symbolInfo, resolution, to } = data;
      const resolutionToMin = resolution?.includes('M')
        ? 43200
        : resolution?.includes('W')
        ? 10080
        : resolution?.includes('D')
        ? 1440
        : resolution;
      let symbolName = [
        ...KlineDecode.stringToBin(symbolInfo.name, 12),
        ...KlineDecode.intToBin(resolutionToMin),
        ...KlineDecode.intToBin(200),
        ...KlineDecode.intToBin(0),
        ...KlineDecode.intToBin(to + 8 * 60 * 60),
      ];
      const encodeSymbolName = KlineDecode.arrayBufferToBase64(
        new Int8Array(symbolName)
      );
      const precision = symbolInfo.d;
      try {
        const res = await request.post(
          '/',
          {
            b: encodeSymbolName,
          },
          { baseURL: configUrl.klineHistoryDataUrl }
        );
        if (res.data.length) {
          return res.data.map((item) => {
            const blob = window.atob(item.b);
            const timeStamp = KlineDecode.base64ToInt(blob.slice(20))[0] * 1000;
            return {
              open: NP.round(
                KlineDecode.base64ToFloat32(blob.slice(0, 4))[0],
                precision
              ),
              close: NP.round(
                KlineDecode.base64ToFloat32(blob.slice(4, 8))[0],
                precision
              ),
              high: NP.round(
                KlineDecode.base64ToFloat32(blob.slice(8, 12))[0],
                precision
              ),
              low: NP.round(
                KlineDecode.base64ToFloat32(blob.slice(12, 16))[0],
                precision
              ),
              volume: NP.round(
                KlineDecode.base64ToInt(blob.slice(16, 20))[0],
                precision
              ),
              time: timeStamp,
            };
          });
        } else {
          return [];
        }
      } catch (err) {
        console.log(err);
      }
    },
    // 把历史K线数据更新到图表上
    updateHistoryData(data) {
      const {
        symbolInfo,
        resolution,
        firstDataRequest,
        from,
        to,
        onHistoryCallback,
      } = data;
      if (firstDataRequest) {
        const getBarsData = { symbolInfo, resolution, from, to };
        this.getBars(getBarsData).then((bars) => {
          if (bars.length) {
            onHistoryCallback?.(bars, { noData: false });
            this.setLastBarData(bars[bars.length - 1]);
            this.setFirstBarTime(bars[0].time / 1000 - 8 * 60 * 60);
          } else {
            onHistoryCallback?.(bars, { noData: true });
          }
        });
      } else {
        const getBarsData = {
          symbolInfo,
          resolution,
          from,
          to: this.firstBarTime,
        };
        this.getBars(getBarsData).then((bars) => {
          if (bars.length) {
            if (this.firstBarTime === bars[0].time / 1000 - 8 * 60 * 60) {
              onHistoryCallback?.([], { noData: true });
            } else {
              onHistoryCallback?.(bars, { noData: false });
            }
            this.setFirstBarTime(bars[0].time / 1000 - 8 * 60 * 60);
          } else {
            onHistoryCallback?.(bars, { noData: true });
          }
        });
      }
    },
    // 更新实时报价
    updateLiveData(data) {
      if (data.n === this.activeSymbolInfo?.name) {
        let newLastBar = KlineDecode.updateBar(data, {
          resolution: this.activeSymbolInfo.resolution,
          lastBar: this.lastBarData,
          precision: this.activeSymbolInfo.d,
        });
        if (newLastBar) {
          this.subscribeFn?.onRealtimeCallback?.(newLastBar);
          this.setLastBarData(newLastBar);
        }
      }
    },
    // 切换品种
    changeSymbol(symbol) {
      this.setLastBarData({});
      this.setFirstBarTime('');
      this.setSubscribeFn({});
      this.tvWidget?.activeChart().setSymbol(symbol);
    },
  },
});
