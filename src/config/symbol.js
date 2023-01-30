import { configConst } from '@/config/index.js';
// type 1 USDT 2 goods
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
];

export const popularSymbols = symbolArr.filter((item) => item.isPopular);

export const goodsSymbols = symbolArr.filter((item) => item.type === 2);

export const favoriteSymbols = symbolArr.filter((item) => {
  const localFavorites = localStorage.getItem(configConst.favorites);
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
