import { defineStore } from 'pinia';
import { useSocketStore } from '@/store/index.js';
import { userApi } from '@/api';
export default defineStore('user', {
  state: () => ({
    userInfo: {},
    walletAssets: 0,
    userFundsVisible: true,
    auditData: {},
    userAssetsArr: [], // 客户的数字货币类型
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
    // 获取用户的认证信息
    async getAuditData({ forceFresh } = { forceFresh: false }) {
      if (!forceFresh && this.auditData?.status === 0) return this.auditData;
      const res = await userApi.getCertificate();
      if (res.data.status === 0) {
        this.auditData = res.data;
      } else {
        this.auditData = {};
      }
      return this.auditData;
    },
  },
});
