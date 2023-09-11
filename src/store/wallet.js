import { defineStore } from 'pinia';
import { newWalletApi } from '@/api';
export default defineStore('wallet', {
  state: () => ({
    token: '',
    rechargeList: [], // 可充币 币种列表
    withdrawCoinList: [], // 可提币 币种列表
    netList: {}, // 币种 支持的 网络列表
    netAddress: {}, //获取网络对应的充币地址
    coinBalance: [], // 账户资产
  }),
  actions: {
    // 获取钱包token
    async getNewWalletToken({ forceFresh } = { forceFresh: false }) {
      if (!forceFresh && this.token) return this.token;
      const res = await newWalletApi.getToken();
      if (res.data.status === 0 && res.data.data.status === 0) {
        this.token = res.data.data.token;
        return res.data.data.token;
      } else {
        await newWalletApi.createWallet();
        const res = await newWalletApi.getToken();
        this.token = res.data.data.token;
        return res.data.data.token;
      }
    },
    // 获取充币币种列表
    async getRechargeList() {
      if (!this.rechargeList.length) {
        const res = await newWalletApi.getCoinList(1);
        if (res.data.status === 0) {
          this.rechargeList = res.data.data;
        }
      }
    },
    // 获取提币币种列表
    async getWithdrawList() {
      if (!this.withdrawCoinList.length) {
        const res = await newWalletApi.getCoinList(2);
        if (res.data.status === 0) {
          this.withdrawCoinList = res.data.data;
        }
      }
    },
    // 获取币种对应的网络列表
    async getNetList(coin) {
      if (this.netList[coin]) {
        return this.netList[coin];
      } else {
        const res = await newWalletApi.getNetList(coin);
        if (res.data.status === 0) {
          this.netList[coin] = res.data.data;
        }
        return this.netList[coin] || [];
      }
    },
    // 获取网络对应的充币地址
    async getNetAddress(net) {
      if (this.netAddress[net]) {
        return this.netAddress[net];
      } else {
        const res = await newWalletApi.getChainAdd(net);
        if (res.data.status === 0) {
          this.netAddress[net] = res.data.data;
        }
        return this.netList[net] || '';
      }
    },
    // 获取账户资产
    async getBalance({ forceFresh } = { forceFresh: false }) {
      if (!forceFresh && this.coinBalance.length) return;
      const res = await newWalletApi.getBalance();
      if (res.data.status === 0) {
        this.coinBalance = res.data.data;
      }
    },
  },
});
