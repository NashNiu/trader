import { defineStore } from 'pinia';
import { useSocketStore } from '@/store/index.js';

export default defineStore('user', {
  state: () => ({
    userInfo: {},
    walletAssets: 0,
    userFundsVisible: true,
  }),
  getters: {
    totalAssets(state) {
      const socketStore = useSocketStore();
      return (
        state.walletAssets + socketStore?.userFunds?.balance ?? 0
      ).toFixed(2);
    },
  },
  actions: {
    setUserInfo(data) {
      this.userInfo = data;
    },
    updateUserWallets(data) {
      this.userInfo = {
        ...this.userInfo,
        fb: data,
      };
    },
    clearUserInfo() {
      this.userInfo = {};
      localStorage.clear();
    },
    setWalletAssets(data) {
      this.walletAssets = data;
    },
    setUserFundsVisible(data) {
      this.userFundsVisible = data;
    },
  },
});
