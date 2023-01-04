import { defineStore } from 'pinia';
export default defineStore('user', {
  state: () => ({
    userInfo: {},
  }),
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
  },
});
