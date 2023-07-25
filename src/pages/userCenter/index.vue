<template>
  <div class="userCenterContainer">
    <div class="header">{{ t('uc.uc') }}</div>
    <div class="content">
      <el-row>
        <el-col :span="24">
          <div class="title">{{ t('uc.two_factor') }}</div>
        </el-col>
      </el-row>
      <el-row class="itemBox" align="middle">
        <el-col :span="18">
          <div class="leftBox">
            <img :src="authImg" alt="auth" />
            <div>
              <p class="desc">{{ t('uc.authenticator') }}</p>
              <p class="info">{{ t('uc.protect') }}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div v-if="isBindOtp" class="status success">
            {{ t('uc.enabled') }}
          </div>
          <div v-else class="status danger">{{ t('uc.notOpen') }}</div>
        </el-col>
        <el-col :span="3">
          <div v-if="!isBindOtp">
            <el-button plain type="primary" size="large" @click="goAuthInfo">
              {{ t('uc.manage') }}
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="itemBox" align="middle">
        <el-col :span="18">
          <div class="leftBox">
            <img :src="loginPassImg" alt="loginPass" />
            <div>
              <p class="desc">{{ t('uc.loginPass') }}</p>
              <p class="info">{{ t('uc.manageLoginPass') }}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="3"></el-col>
        <el-col :span="3">
          <div>
            <el-button
              plain
              type="primary"
              size="large"
              @click="openChangePass"
            >
              {{ t('uc.modify') }}
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="itemBox" align="middle">
        <el-col :span="18">
          <div class="leftBox">
            <img :src="walletImg" alt="wallet" />
            <div>
              <p class="desc">{{ t('uc.payPass') }}</p>
              <p class="info">{{ t('uc.managePayPass') }}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div v-if="userInfo.paypassword" class="status success">
            {{ t('uc.settled') }}
          </div>
          <div v-else class="status danger">{{ t('uc.notSet') }}</div>
        </el-col>
        <el-col :span="3">
          <div v-if="userInfo.paypassword">
            <el-button plain type="primary" size="large" @click="openPayPass">
              {{ t('uc.modify') }}
            </el-button>
          </div>
          <div v-else>
            <el-button plain type="primary" size="large" @click="openPayPass">
              {{ t('uc.set') }}
            </el-button>
          </div>
        </el-col>
      </el-row>
      <div class="divider"></div>
      <el-row>
        <el-col :span="24">
          <div class="title">{{ t('uc.idAuth') }}</div>
        </el-col>
      </el-row>
      <el-row class="itemBox" align="middle">
        <el-col :span="18">
          <div class="leftBox">
            <img :src="userImg" alt="user" />
            <div>
              <p class="desc">{{ t('uc.idAuth') }}</p>
              <p class="info">{{ t('uc.finishIdAuth') }}</p>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div
            v-if="auditStatus === 0 || auditStatus === 1"
            class="status danger"
          >
            {{ t('uc.unverified') }}
          </div>
          <div v-else-if="auditStatus === 2" class="status">
            {{ t('uc.toBeReviewed') }}
          </div>
          <div v-else-if="auditStatus === 3" class="status success">
            {{ t('uc.verified') }}
          </div>
          <div v-else-if="auditStatus === 4" class="status danger">
            {{ t('uc.auditFail') }}
          </div>
        </el-col>
        <el-col :span="3">
          <div v-if="auditStatus === 0 || auditStatus === 1">
            <el-button
              plain
              type="primary"
              size="large"
              @click="openVerifyDialog"
            >
              {{ t('uc.authentication') }}
            </el-button>
          </div>
          <div v-else>
            <el-button
              plain
              type="primary"
              size="large"
              @click="openVerifyDialog"
            >
              {{ t('uc.view') }}
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <ChangePass ref="changePassRef" />
    <PayPassDialog ref="payPassDialogRef" />
    <Verification ref="verifyDialogRef" @complete="getAuditStatus" />
  </div>
</template>
<script setup>
import { computed, ref, onMounted } from 'vue';
import { useUserStore } from '@/store/index.js';
import authImg from '@/assets/img/usercenter/auth.png';
import loginPassImg from '@/assets/img/usercenter/loginPass.png';
import walletImg from '@/assets/img/usercenter/wallet.png';
import userImg from '@/assets/img/usercenter/user.png';
import ChangePass from './components/changePass.vue';
import PayPassDialog from '@/components/common/payPassDialog.vue';
import Verification from './components/verifyDialog.vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const isBindOtp = computed(() => userInfo.value?.isbindotp === 1);
const changePassRef = ref(null);
const router = useRouter();
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
  const res = await userStore.getAuditData();
  if (res.status === 0) {
    auditStatus.value = res.data?.auditstatus ?? 0;
  }
};
const goAuthInfo = () => {
  router.push('/t/authInfo');
};
onMounted(() => {
  getAuditStatus().then();
});
</script>
<style scoped lang="less">
.userCenterContainer {
  //padding: 30px;
  //box-sizing: border-box;
  .header {
    height: 92px;
    background-color: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding-left: 40px;
    font-size: 22px;
  }
  .content {
    padding: 50px 0;
    box-sizing: border-box;
    .itemBox {
      width: 1200px;
      margin: 50px auto;
      align-items: center;
      .leftBox {
        display: flex;
        align-items: center;
        img {
          width: 60px;
          height: 60px;
          margin-right: 20px;
        }
        .desc {
          font-size: 20px;
        }
        .info {
          font-size: 18px;
          color: #666666;
          margin-top: 10px;
        }
      }
      .status {
        font-size: 18px;
        &.success {
          color: #27ab3d;
        }
        &.danger {
          color: #dc2c2c;
        }
      }
    }
    .title {
      width: 1200px;
      margin: 0 auto;
      font-size: 22px;
    }
    .divider {
      margin: 50px 0;
      width: 100%;
      height: 1px;
      background-color: #eaeaea;
    }
  }
}
</style>
