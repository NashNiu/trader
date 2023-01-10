// type 1 USDT 2 goods
import { configConst } from '@/config/index.js';

export const symbolArr = [
  {
    name: 'BTCUSDT',
    displayName: 'BTC/USDT',
    type: 1,
    isPopular: true,
  },
  {
    name: 'ETHUSDT',
    displayName: 'ETH/USDT',
    type: 1,
    isPopular: true,
  },
  {
    name: 'BCHUSDT',
    displayName: 'BCH/USDT',
    type: 1,
    isPopular: true,
  },
  {
    name: 'DOTUSDT',
    displayName: 'DOT/USDT',
    type: 1,
    isPopular: true,
  },
  {
    name: 'SOLUSDT',
    displayName: 'SOL/USDT',
    type: 1,
    isPopular: true,
  },
  {
    name: 'SANDUSDT',
    displayName: 'SAND/USDT',
    type: 1,
    isPopular: false,
  },
  {
    name: 'LTCUSDT',
    displayName: 'LTC/USDT',
    type: 1,
    isPopular: true,
  },
  {
    name: 'AAVEUSDT',
    displayName: 'AAVE/USDT',
    type: 1,
    isPopular: false,
  },
  {
    name: 'UNIUSDT',
    displayName: 'UNI/USDT',
    type: 1,
    isPopular: false,
  },
  {
    name: 'ATOMUSDT',
    displayName: 'ATOM/USDT',
    type: 1,
    isPopular: false,
  },
  {
    name: 'US500',
    displayName: 'US500',
    type: 2,
    isPopular: false,
  },
  {
    name: 'US30',
    displayName: 'US30',
    type: 2,
    isPopular: false,
  },
  {
    name: 'NAS100',
    displayName: 'NAS100',
    type: 2,
    isPopular: false,
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
