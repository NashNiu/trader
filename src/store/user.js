import { defineStore } from 'pinia';
import { useSocketStore } from '@/store/index.js';

export default defineStore('user', {
  state: () => ({
    userInfo: {},
    walletAssets: 0,
    userFundsVisible: true,
    userAssetsArr: [], // 客户的数字货币类型
    platform: 53, // 平台id
    NoLoadList: [{ value: '0', label: 'real/LP/MC1S' }],
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
    setWalletAssets(data) {
      this.walletAssets = data;
    },
    setUserFundsVisible(data) {
      this.userFundsVisible = data;
    },
    setUserAssetsArr(data) {
      this.userAssetsArr = data;
    },
  },
});
