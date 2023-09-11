import { defineStore } from 'pinia';
import { userApi } from '@/api';
import NP from 'number-precision';
import { useUserStore } from '@/store/index.js';
export default defineStore('header', {
  state: () => ({
    walletData: [],
    addressData: [],
    centerDialogVisible: false,
  }),
  actions: {
    async getWalletData({ forceFresh } = { forceFresh: false }) {
      if (this.walletData.length && !forceFresh) return;
      const res = await userApi.getBackEndWalletInfo();
      if (res.data.status === 0) {
        this.walletData = res.data.data.map((item) => ({
          ...item,
          available: NP.round(item.balance - item.freeze, 6),
        }));
      }
    },
    async getAddressData() {
      if (this.addressData.length) return;
      const userStore = useUserStore();
      const res = await userApi.getWalletInfo(userStore.userInfo?.fb);
      if (res?.data?.status === 0) {
        this.addressData = res.data.data.reduce((pre, cur) => {
          const target = pre.find((item) => item.assetCoin === cur.assetCoin);
          if (target) {
            target.children.push(cur);
          } else {
            pre.push({
              assetCoin: cur.assetCoin,
              children: [cur],
            });
          }
          return pre;
        }, []);
        userStore.setUserAssetsArr(this.addressData);
      }
    },
    setCenterDialogVisible(data) {
      this.centerDialogVisible = data;
    },
  },
});
