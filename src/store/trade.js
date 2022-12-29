import { defineStore } from 'pinia';
import { popularSymbols, goodsSymbols } from '@/assets/data/symbol.js';

export default defineStore('trade', {
  state: () => ({
    activeType: 'popular',
    symbolTypeArr: {
      popular: popularSymbols,
      goods: goodsSymbols,
    },
  }),
  actions: {
    setSymbolType(type) {
      this.activeType = type;
    },
  },
});
