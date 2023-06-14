<template>
  <el-dialog
    v-model="visible"
    width="680"
    class="walletDialogContainer"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    top="10vh"
    :destroy-on-close="true"
  >
    <template #header>
      <div class="walletDialogHeader">
        <div>
          <img :src="wallerImg" alt="" />
          <span>Wallet</span>
        </div>
        <img :src="closeImg" class="close" alt="" @click="hide" />
      </div>
    </template>
    <div class="bodyContainer">
      <div class="titleContainer">
        <div
          v-for="item in tabData"
          :key="item.value"
          :class="{ active: activeTab === item.value, titleItem: true }"
          @click="activeTab = item.value"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="contentContainer">
        <div v-show="activeTab === 1">
          <Verification
            v-show="ifNeedVerification"
            @finish="certificateFinish"
          />
          <Deposit v-if="!ifNeedVerification" />
        </div>
        <Withdraw v-show="activeTab === 2" @hide="hide" />
        <Transfer v-show="activeTab === 3" @hide="hide" />
      </div>
      <!--      <div class="footerBox">-->
      <!--        <span class="tips">-->
      <!--          Improve your account security with Two-Factor Authentication-->
      <!--        </span>-->
      <!--        <el-button type="primary" class="footerBtn">Enable 2FA</el-button>-->
      <!--      </div>-->
    </div>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue';
import wallerImg from '@/assets/img/header/wallet.png';
import closeImg from '@/assets/img/header/close.png';
import Verification from '@/components/walletDialog/verification.vue';
import Deposit from '@/components/walletDialog/deposit.vue';
import Withdraw from '@/components/walletDialog/withdraw.vue';
import Transfer from '@/components/walletDialog/transfer.vue';
const visible = ref(false);
const tabData = [
  {
    label: 'Deposit',
    value: 1,
  },
  {
    label: 'Withdraw',
    value: 2,
  },
  {
    label: 'Transfer account',
    value: 3,
  },
  {
    label: 'Buy Crypto',
    value: 4,
  },
];
const ifNeedVerification = ref(true);
const activeTab = ref(1);
const hide = () => {
  visible.value = false;
};
const show = () => {
  visible.value = true;
};
const certificateFinish = () => {
  ifNeedVerification.value = false;
};
defineExpose({ show });
</script>
<style lang="less" scoped>
.walletDialogHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 10px 30px 30px;
  box-sizing: border-box;
  div {
    display: flex;
    align-items: center;
  }
  img {
    width: 27px;
  }
  span {
    margin-left: 10px;
    font-family: MicrosoftYaHei-Bold;
    font-size: 22px;
    color: #333333;
  }
  .close {
    width: 17px;
    cursor: pointer;
  }
}
.bodyContainer {
  margin-top: -20px;
  .titleContainer {
    width: 600px;
    height: 52px;
    border-radius: 8px;
    background-color: #f6f6f6;
    font-size: 20px;
    color: #333333;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    .titleItem {
      cursor: pointer;
      height: 52px;
      justify-content: center;
      align-items: center;
      display: flex;
      border-radius: 8px;
      white-space: nowrap;
      padding: 0 20px;
      flex: 1;
      transition: all 0.3s;
      &.active {
        background-color: #266fe8;
        color: #ffffff;
      }
    }
  }
  .contentContainer {
    margin: 20px auto 0;
    padding-bottom: 20px;
  }
  .footerBox {
    padding: 25px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-top: 1px solid #eaeaea;
    box-sizing: border-box;
    .tips {
      font-size: 16px;
      color: #333333;
      margin-bottom: 15px;
    }
    .footerBtn {
      width: 154px;
      height: 52px;
      background-color: #266fe8;
      border-radius: 8px;
      font-size: 20px;
      color: #ffffff;
    }
  }
}
</style>
<style lang="less">
.walletDialogContainer {
  --el-dialog-padding-primary: 0;
}
</style>
