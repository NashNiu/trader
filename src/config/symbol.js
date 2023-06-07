import { configConst } from '@/config/index.js';
// type 1:数字货币 2:指数 3:外汇  4:商品  5:股票
// d: 报价精度，小数点位数
export const symbolArr = [
  {
    name: 'BTCUSDT',
    displayName: 'BTC/USDT',
    type: 1,
    isPopular: true,
    d: 2,
  },
  {
    name: 'ETHUSDT',
    displayName: 'ETH/USDT',
    type: 1,
    isPopular: true,
    d: 2,
  },
  {
    name: 'BCHUSDT',
    displayName: 'BCH/USDT',
    type: 1,
    isPopular: true,
    d: 2,
  },
  {
    name: 'DOTUSDT',
    displayName: 'DOT/USDT',
    type: 1,
    isPopular: true,
    d: 4,
  },
  {
    name: 'SOLUSDT',
    displayName: 'SOL/USDT',
    type: 1,
    isPopular: true,
    d: 4,
  },
  {
    name: 'SANDUSDT',
    displayName: 'SAND/USDT',
    type: 1,
    isPopular: false,
    d: 5,
  },
  {
    name: 'LTCUSDT',
    displayName: 'LTC/USDT',
    type: 1,
    isPopular: true,
    d: 2,
  },
  {
    name: 'AAVEUSDT',
    displayName: 'AAVE/USDT',
    type: 1,
    isPopular: false,
    d: 4,
  },
  {
    name: 'UNIUSDT',
    displayName: 'UNI/USDT',
    type: 1,
    isPopular: false,
    d: 4,
  },
  {
    name: 'ATOMUSDT',
    displayName: 'ATOM/USDT',
    type: 1,
    isPopular: false,
    d: 4,
  },
  {
    name: 'FILUSDT',
    displayName: 'FIL/USDT',
    type: 1,
    isPopular: false,
    d: 4,
  },
  {
    name: 'ADAUSDT',
    displayName: 'ADA/USDT',
    type: 1,
    isPopular: false,
    d: 5,
  },
  {
    name: 'DOGEUSDT',
    displayName: 'DOGE/USDT',
    type: 1,
    isPopular: false,
    d: 5,
  },
  {
    name: 'AXSUSDT',
    displayName: 'AXS/USDT',
    type: 1,
    isPopular: false,
    d: 2,
  },
  {
    name: 'US500',
    displayName: 'US500',
    type: 2,
    isPopular: false,
    d: 2,
  },
  {
    name: 'US30',
    displayName: 'US30',
    type: 2,
    isPopular: false,
    d: 2,
  },
  {
    name: 'NAS100',
    displayName: 'NAS100',
    type: 2,
    isPopular: false,
    d: 2,
  },
  {
    name: 'JPN225',
    displayName: 'JPN225',
    type: 2,
    isPopular: false,
    d: 1,
  },
  {
    name: 'GER30',
    displayName: 'GER30',
    type: 2,
    isPopular: false,
    d: 2,
  },
  {
    name: 'HK50',
    displayName: 'HK50',
    type: 2,
    isPopular: false,
    d: 1,
  },
  {
    name: 'CHA50',
    displayName: 'CHA50',
    type: 2,
    isPopular: false,
    d: 1,
  },
  {
    name: 'CHINA300',
    displayName: 'CHINA300',
    type: 2,
    isPopular: false,
    d: 1,
  },
  {
    name: 'AUDUSD',
    displayName: 'AUDUSD',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'USDJPY',
    displayName: 'USDJPY',
    type: 3,
    isPopular: false,
    d: 3,
  },
  {
    name: 'EURUSD',
    displayName: 'EURUSD',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'GBPUSD',
    displayName: 'GBPUSD',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'NZDUSD',
    displayName: 'NZDUSD',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'USDCAD',
    displayName: 'USDCAD',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'USDCHF',
    displayName: 'USDCHF',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'AUDJPY',
    displayName: 'AUDJPY',
    type: 3,
    isPopular: false,
    d: 3,
  },
  {
    name: 'AUDNZD',
    displayName: 'AUDNZD',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'CADJPY',
    displayName: 'CADJPY',
    type: 3,
    isPopular: false,
    d: 3,
  },
  {
    name: 'EURAUD',
    displayName: 'EURAUD',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'EURCHF',
    displayName: 'EURCHF',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'EURGBP',
    displayName: 'EURGBP',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'EURJPY',
    displayName: 'EURJPY',
    type: 3,
    isPopular: false,
    d: 3,
  },
  {
    name: 'GBPAUD',
    displayName: 'GBPAUD',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'GBPCHF',
    displayName: 'GBPCHF',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'GBPJPY',
    displayName: 'GBPJPY',
    type: 3,
    isPopular: false,
    d: 3,
  },
  {
    name: 'NZDJPY',
    displayName: 'NZDJPY',
    type: 3,
    isPopular: false,
    d: 3,
  },
  {
    name: 'USDCNH',
    displayName: 'USDCNH',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'USDHKD',
    displayName: 'USDHKD',
    type: 3,
    isPopular: false,
    d: 5,
  },
  {
    name: 'XAUUSD',
    displayName: 'XAUUSD',
    type: 4,
    isPopular: false,
    d: 2,
  },
  {
    name: 'XAGUSD',
    displayName: 'XAGUSD',
    type: 4,
    isPopular: false,
    d: 3,
  },
  {
    name: 'USOIL',
    displayName: 'USOil',
    type: 4,
    isPopular: false,
    d: 3,
  },
  {
    name: 'UKOIL',
    displayName: 'UKOil',
    type: 4,
    isPopular: false,
    d: 3,
  },
  // {
  //   name: 'BIDU',
  //   displayName: 'BIDU',
  //   type: 5,
  //   isPopular: false,
  //   d: 2,
  // },
  // {
  //   name: 'DIS',
  //   displayName: 'DIS',
  //   type: 5,
  //   isPopular: false,
  //   d: 2,
  // },
  // {
  //   name: 'MSFT',
  //   displayName: 'MSFT',
  //   type: 5,
  //   isPopular: false,
  //   d: 2,
  // },
  // {
  //   name: 'BABA',
  //   displayName: 'BABA',
  //   type: 5,
  //   isPopular: false,
  //   d: 2,
  // },
  // {
  //   name: 'KO',
  //   displayName: 'KO',
  //   type: 5,
  //   isPopular: false,
  //   d: 2,
  // },
  // {
  //   name: 'AAPL',
  //   displayName: 'AAPL',
  //   type: 5,
  //   isPopular: false,
  //   d: 2,
  // },
  // {
  //   name: 'FB',
  //   displayName: 'FB',
  //   type: 5,
  //   isPopular: false,
  //   d: 2,
  // },
  // {
  //   name: 'GS',
  //   displayName: 'GS',
  //   type: 5,
  //   isPopular: false,
  //   d: 2,
  // },
];

export const popularSymbols = symbolArr.filter((item) => item.isPopular);

export const cryptocurrencySymbols = symbolArr.filter(
  (item) => item.type === 1
);

export const indexSymbols = symbolArr.filter((item) => item.type === 2);

export const forexSymbols = symbolArr.filter((item) => item.type === 3);

export const commoditySymbols = symbolArr.filter((item) => item.type === 4);

export const stockSymbols = symbolArr.filter((item) => item.type === 5);

export const favoriteSymbols = symbolArr.filter((item) => {
  const localFavorites = localStorage.getItem(configConst.FAVORITES);
  if (localFavorites) {
    try {
      const favorites = JSON.parse(localFavorites);
      return favorites.includes(item.name);
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
});

export const getSymbolType = (symbol) => {
  return symbolArr.find((item) => item.name === symbol)?.type ?? 0;
};
