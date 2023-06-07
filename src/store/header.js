import { defineStore } from 'pinia';
import { userApi } from '@/api';
import NP from 'number-precision';
import { ElMessage } from 'element-plus';
import { useUserStore } from '@/store/index.js';
export default defineStore('header', {
  state: () => ({
    walletData: [],
    addressData: [],
  }),

  actions: {
    async getWalletData() {
      if (this.walletData.length) return;
      const res = await userApi.getBackEndWalletInfo();
      if (res.data.status === 0) {
        this.walletData = res.data.data.map((item) => ({
          ...item,
          available: NP.round(item.balance - item.freeze, 6),
        }));
      } else {
        ElMessage.error('GET WALLET INFO FAILED');
      }
    },
    async getAddressData() {
      if (this.addressData.length) return;
      const userStore = useUserStore();
      const res = await userApi.getWalletInfo(userStore.userInfo?.fb);
      if (res.data.status === 0) {
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
      }
    },
  },
});
