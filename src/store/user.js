import { defineStore } from 'pinia';
export default defineStore('user', {
  state: () => ({
    userInfo: {},
  }),
  actions: {
    setUserInfo(data) {
      this.userInfo = data;
    },
    clearUserInfo() {
      this.userInfo = {};
    },
  },
});
