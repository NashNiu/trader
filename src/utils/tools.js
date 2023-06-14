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
/**
  @param {Number} timeStamp 传入的时间戳
  @param {Number} startType 要返回的时间字符串的格式类型，传入'year'则返回年开头的完整时间
*/
export const getDate = (timeStamp, startType, line) => {
  const e = line || '-';
  const d = new Date(timeStamp * 1000);
  const year = d.getFullYear();
  const month = getHandledValue(d.getMonth() + 1);
  const date = getHandledValue(d.getDate());
  const hours = getHandledValue(d.getHours());
  const minutes = getHandledValue(d.getMinutes());
  const second = getHandledValue(d.getSeconds());
  let resStr = '';
  if (startType === 'year') {
    resStr =
      year + e + month + e + date + ' ' + hours + ':' + minutes + ':' + second;
  } else if (startType === 'ymd') {
    resStr = year + e + month + e + date;
  } else {
    resStr = month + e + date + ' ' + hours + ':' + minutes;
  }
  return resStr;
};
const getHandledValue = (num) => {
  return num < 10 ? '0' + num : num;
};
export const currency = {
  currency: (value, currency, decimals) => {
    const digitsRE = /(\d{3})(?=\d)/g;
    value = parseFloat(value);
    if (!isFinite(value) || (!value && value !== 0)) return '';
    currency = currency != null ? currency : '$';
    decimals = decimals != null ? decimals : 2;
    let stringified = Math.abs(value).toFixed(decimals);
    let _int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
    let i = _int.length % 3;
    let head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
    let _float = decimals ? stringified.slice(-1 - decimals) : '';
    let sign = value < 0 ? '-' : '';
    return (
      sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
    );
  },
};
