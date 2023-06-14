<template>
  <div class="userCenterContainer">
    <div class="section">
      <div class="label">E-mail address</div>
      <div class="actionBox">
        {{ userInfo?.email }}
      </div>
    </div>
    <div class="section">
      <div class="label">Login Password</div>
      <div class="actionBox">
        <span class="operate" @click="openChangePass">
          Change Login Password
        </span>
      </div>
    </div>
    <div class="section">
      <div class="label">Payment Password</div>
      <div class="actionBox">
        <span class="left">
          {{ userInfo.paypassword ? 'Settled' : 'Not Set' }}
        </span>
        <span class="operate" @click="openPayPass">
          {{ userInfo.paypassword ? 'Change' : 'Set' }}
        </span>
      </div>
    </div>
    <div class="section">
      <div class="label">Verification</div>
      <div class="actionBox">
        <template v-if="auditStatus === 0 || auditStatus === 1">
          <span class="left">Not certified</span>
          <span class="operate" @click="openVerifyDialog">Certification</span>
        </template>
        <template v-if="auditStatus === 2">
          <span class="left">To Be Verified</span>
          <span class="operate" @click="openVerifyDialog">View</span>
        </template>
        <template v-if="auditStatus === 3">
          <span class="left">Verified</span>
          <span class="operate" @click="openVerifyDialog">View</span>
        </template>
        <template v-if="auditStatus === 4">
          <span class="left">Verified Failed</span>
          <span class="operate" @click="openVerifyDialog">View</span>
        </template>
      </div>
    </div>

    <ChangePass ref="changePassRef" />
    <PayPassDialog ref="payPassDialogRef" />
    <Verification ref="verifyDialogRef" @complete="getAuditStatus" />
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue';
import { useUserStore } from '@/store/index.js';
import { userApi } from '@/api';
import ChangePass from './components/changePass.vue';
import PayPassDialog from '@/components/common/payPassDialog.vue';
import Verification from './components/verifyDialog.vue';
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const changePassRef = ref(null);
const payPassDialogRef = ref(null);
const verifyDialogRef = ref(null);
const auditStatus = ref(0);
const openPayPass = () => {
  payPassDialogRef.value.show();
};
const openChangePass = () => {
  changePassRef.value?.show();
};
const openVerifyDialog = () => {
  verifyDialogRef.value.show();
};
const getAuditStatus = async () => {
  const res = await userApi.getCertificate();
  if (res.data.status === 0) {
    auditStatus.value = res.data.data.auditstatus;
  }
};
onMounted(() => {
  getAuditStatus().then();
});
</script>
<style scoped lang="less">
.userCenterContainer {
  padding: 30px;
  box-sizing: border-box;
  .section {
    margin-bottom: 23px;
    display: block;
    .label {
      font-size: 18px;
      color: #0c3d93;
    }
    .actionBox {
      margin-top: 10px;
      width: 320px;
      height: 46px;
      background-color: #ffffff;
      border-radius: 8px;
      border: solid 1px #dfdfdf;
      display: flex;
      align-items: center;
      padding: 0 20px;
      box-sizing: border-box;
      font-size: 16px;
      color: #333333;
      .operate {
        color: #266fe8;
        cursor: pointer;
      }
      .left {
        margin-right: 20px;
      }
    }
  }
}
</style>
