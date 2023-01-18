import Router from '@/router/index.js';
import {
  useSocketStore,
  useUserStore,
  useTradeStore,
  useCommonStore,
} from '@/store/index.js';
import { configConst, configKey } from '@/config/index.js';
import cryptoJS from 'crypto-js';
// 计算持仓浮动盈亏 和 价格变化
export function calcOrderChange({ order, liveData, cs }) {
  let profit = 0;
  let currentPrice = 0;
  if (!order || !liveData || !cs) {
    return {
      profit,
      currentPrice,
      change: '0%',
      color: '',
    };
  } else {
    let color, variety;
    if (order?.action === 0) {
      profit = (order?.vol / 10000) * (liveData.bid - order?.price) * cs;
      currentPrice = liveData?.bid;
      variety = (currentPrice - order.price) / order.price;
      color = variety > 0 ? 'up' : variety < 0 ? 'down' : '';
    } else {
      profit = (order?.vol / 10000) * (order?.price - liveData.ask) * cs;
      currentPrice = liveData?.ask;
      variety = (currentPrice - order.price) / order.price;
      color = variety > 0 ? 'down' : variety < 0 ? 'up' : '';
    }
    const change = `${(variety * 100).toFixed(4)}%`;
    const netValue = ((currentPrice * order.vol) / 10000).toFixed(2);
    return {
      profit: Number(profit.toFixed(2)),
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
  userStore.$reset();
  socketStore.closeSocket();
  socketStore.$reset();
  tradeStore.$reset();
  commonStore.$reset();
  localStorage.removeItem(configConst.token);
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
