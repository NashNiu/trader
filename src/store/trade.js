import { defineStore } from 'pinia';
import { configSymbols } from '@/config/index.js';

export default defineStore('trade', {
  state: () => ({
    activeType: 'popular',
    symbolTypeArr: {
      popular: configSymbols.popularSymbols,
      index: configSymbols.indexSymbols,
      favorite: configSymbols.favoriteSymbols,
      cryptocurrency: configSymbols.cryptocurrencySymbols,
      forex: configSymbols.forexSymbols,
      commodity: configSymbols.commoditySymbols,
      stock: configSymbols.stockSymbols,
    },
  }),
  actions: {
    setSymbolType(type) {
      this.activeType = type;
    },
    updateFavorite(data) {
      const target = configSymbols.symbolArr.find((item) => item.name === data);
      if (target) {
        const existedIndex = this.symbolTypeArr.favorite.findIndex(
          (item) => item.name === data
        );
        if (existedIndex > -1) {
          this.symbolTypeArr.favorite.splice(existedIndex, 1);
        } else {
          this.symbolTypeArr.favorite.push(target);
        }
      }
    },
  },
});
