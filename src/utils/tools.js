import Router from '@/router/index.js';
import {
  useSocketStore,
  useUserStore,
  useTradeStore,
  useCommonStore,
  useChartStore,
  useHeaderStore,
} from '@/store/index.js';
import { configConst, configKey } from '@/config/index.js';
import cryptoJS from 'crypto-js';
import { getSymbolType, symbolArr } from '@/config/symbol.js';
// 计算持仓 价格变化
export function calcOrderChange({ order, liveData }) {
  // let profit = 0;
  let currentPrice = 0;
  if (!order || !liveData) {
    return {
      // profit,
      currentPrice,
      change: '0%',
      color: '',
    };
  } else {
    let color, variety;
    if (order?.action === 0) {
      // profit = (order?.vol / 10000) * (liveData.bid - order?.price) * cs;
      currentPrice = liveData?.bid;
      variety = (currentPrice - order.price) / order.price;
      color = variety > 0 ? 'up' : variety < 0 ? 'down' : '';
    } else {
      // profit = (order?.vol / 10000) * (order?.price - liveData.ask) * cs;
      currentPrice = liveData?.ask;
      variety = (currentPrice - order.price) / order.price;
      color = variety > 0 ? 'down' : variety < 0 ? 'up' : '';
    }
    const change = `${(variety * 100).toFixed(4)}%`;
    const netValue = ((currentPrice * order.vol) / 10000).toFixed(2);
    return {
      // profit: Number(profit.toFixed(2)),
      color,
      currentPrice,
      change,
      netValue,
    };
  }
}

// 清除登录信息，清除store信息，退出登录，跳到首页
export function clearAndLogout() {
  const userStore = useUserStore();
  const socketStore = useSocketStore();
  const tradeStore = useTradeStore();
  const commonStore = useCommonStore();
  const headerStore = useHeaderStore();
  const chartStore = useChartStore();
  userStore.$reset();
  socketStore.closeSocket();
  socketStore.$reset();
  tradeStore.$reset();
  commonStore.$reset();
  headerStore.$reset();
  chartStore.$reset();
  localStorage.removeItem(configConst.TOKEN);
  Router.push({ name: 'Index' }).then();
}

export function decrypt(data) {
  const key = cryptoJS.enc.Utf8.parse(configKey.aesKey);
  const decrypt = cryptoJS.AES.decrypt(data, key, {
    iv: cryptoJS.enc.Utf8.parse(configKey.cbcIV),
    mode: cryptoJS.mode.CBC,
    padding: cryptoJS.pad.Pkcs7,
  });
  return cryptoJS.enc.Utf8.stringify(decrypt).toString();
}

// 列表数据变化的时候，切换图表
export function updateChartByList(listData, idKey, symbolKey) {
  const commonStore = useCommonStore();
  const chartData = commonStore.chartData;
  if (listData.length) {
    const firstData = listData[0];
    if (firstData[idKey] !== chartData.id) {
      commonStore.changeChartData({
        symbol: firstData[symbolKey],
        id: firstData[idKey],
      });
    }
  } else {
    commonStore.changeChartData({});
  }
}

// 计算保证金 consize: 合约  marginInit: 初始保证金
export function calcMargin({ symbol, count, consize, price, marginInt, type }) {
  const level = 100; //杠杆
  // type 1:数字货币 2:指数 3:外汇  4:商品  5:股票
  if (type === 1) {
    return ((count * consize * price) / level).toFixed(2);
  } else if (type === 2) {
    return (marginInt * count).toFixed(2);
  } else if (type === 3) {
    if (marginInt) {
      return ((marginInt * count) / level).toFixed(2);
    }
    if (symbol.startsWith('USD')) {
      return ((consize * count) / level).toFixed(2);
    } else if (symbol.endsWith('USD')) {
      return ((consize * count * price) / level).toFixed(2);
    } else {
      return ((consize * count * price) / level).toFixed(2);
    }
  } else if (type === 4) {
    if (marginInt) {
      return (marginInt * count).toFixed(2);
    }
    return ((count * consize * price) / level).toFixed(2);
  }
}

// 计算盈亏
export function calcProfit({ createPrice, closePrice, lot, consize, rate }) {
  if (
    isNaN(createPrice) ||
    isNaN(closePrice) ||
    isNaN(lot) ||
    isNaN(consize) ||
    isNaN(rate)
  ) {
    return 0;
  }
  return ((closePrice - createPrice) * lot * consize * rate).toFixed(2);
}

// 计算浮动盈亏时需要的汇率的产品名称 或者固定汇率
// 如果有汇率，直接用汇率，没有汇率，用产品名称取实时汇率
export function getProfitSymbol(symbol, symbolInfo) {
  const type = getSymbolType(symbol);
  if (!symbol || !symbolInfo) {
    return {
      rate: 1,
    };
  }
  if (type === 1 || type === 4) {
    return {
      rate: 1,
    };
  } else if (type === 2) {
    if (symbolInfo?.cur_profit === 'USD') {
      return {
        rate: 1,
      };
    } else {
      if (
        symbolArr.find((item) => item.name === symbolInfo?.cur_profit + 'USD')
      ) {
        return {
          symbol: symbolInfo?.cur_profit + 'USD',
          multiply: true,
        };
      } else {
        return {
          symbol: 'USD' + symbolInfo?.cur_profit,
          multiply: false,
        };
      }
    }
  } else if (type === 3) {
    if (symbol.startsWith('USD')) {
      return {
        symbol: symbol,
        multiply: false,
      };
    } else if (symbol.endsWith('USD')) {
      return {
        symbol: symbol,
        multiply: true,
      };
    } else {
      if (
        symbolArr.find((item) => item.name === symbolInfo.cur_profit + 'USD')
      ) {
        return {
          symbol: symbolInfo?.cur_profit + 'USD',
          multiply: true,
        };
      } else {
        return {
          symbol: 'USD' + symbolInfo?.cur_profit,
          multiply: false,
        };
      }
    }
  }
}
