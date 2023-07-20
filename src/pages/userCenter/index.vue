<template>
  <div class="userCenterContainer">
    <div class="header">个人中心</div>
    <div class="content">
      <el-row>
        <el-col :span="24">
          <div class="title">双重验证（2FA）</div>
        </el-col>
      </el-row>
      <el-row class="itemBox" align="middle">
        <el-col :span="18">
          <div class="leftBox">
            <img :src="authImg" alt="auth" />
            <div>
              <p class="desc">身份验证器</p>
              <p class="info">保护您的交易和账户安全</p>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div v-if="isBindOtp" class="status success">已启用</div>
          <div v-else class="status danger">未开启</div>
        </el-col>
        <el-col :span="3">
          <div v-if="!isBindOtp">
            <el-button plain type="primary" size="large" @click="goAuthInfo">
              管理
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="itemBox" align="middle">
        <el-col :span="18">
          <div class="leftBox">
            <img :src="loginPassImg" alt="loginPass" />
            <div>
              <p class="desc">登录密码</p>
              <p class="info">用于管理您的账户登录密码</p>
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
              修改
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-row class="itemBox" align="middle">
        <el-col :span="18">
          <div class="leftBox">
            <img :src="walletImg" alt="wallet" />
            <div>
              <p class="desc">支付密码</p>
              <p class="info">用于管理您的账户支付密码</p>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div v-if="userInfo.paypassword" class="status success">已设置</div>
          <div v-else class="status danger">未设置</div>
        </el-col>
        <el-col :span="3">
          <div v-if="userInfo.paypassword">
            <el-button plain type="primary" size="large" @click="openPayPass">
              修改
            </el-button>
          </div>
          <div v-else>
            <el-button plain type="primary" size="large" @click="openPayPass">
              设置
            </el-button>
          </div>
        </el-col>
      </el-row>
      <div class="divider"></div>
      <el-row>
        <el-col :span="24">
          <div class="title">身份认证</div>
        </el-col>
      </el-row>
      <el-row class="itemBox" align="middle">
        <el-col :span="18">
          <div class="leftBox">
            <img :src="userImg" alt="user" />
            <div>
              <p class="desc">身份认证</p>
              <p class="info">完成身份认证，保护账户安全，获得更多权益</p>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div
            v-if="auditStatus === 0 || auditStatus === 1"
            class="status danger"
          >
            未认证
          </div>
          <div v-else-if="auditStatus === 2" class="status">待审核</div>
          <div v-else-if="auditStatus === 3" class="status success">
            审核通过
          </div>
          <div v-else-if="auditStatus === 4" class="status danger">
            审核失败
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
              认证
            </el-button>
          </div>
          <div v-else>
            <el-button
              plain
              type="primary"
              size="large"
              @click="openVerifyDialog"
            >
              查看
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
