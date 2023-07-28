<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/store/index.js';
import { useQRCode } from '@vueuse/integrations/useQRCode';
import { userApi } from '@/api';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const userStore = useUserStore();
const router = useRouter();
const authUrl = ref('');
const inputCode = ref('');
const submitting = ref(false);
const authCode = computed(() => {
  const searchParams = new URLSearchParams(authUrl.value.split('?')[1]);
  return searchParams.get('secret');
});
const getAuthUrl = async () => {
  const res = await userApi.bindGoogleAuth();
  if (res.data.status === 0) {
    authUrl.value = res.data.data;
  }
};
getAuthUrl();
const qrcode = useQRCode(authUrl, { margin: 0 });
const verify = async () => {
  submitting.value = true;
  const res = await userApi.verifyGoogleAuth(inputCode.value);
  submitting.value = false;
  if (res.data.status === 0) {
    if (res.data.data) {
      ElMessage.success(t('auth.bindSuccess'));
      userStore.setUserInfo({
        ...userStore.userInfo,
        isbindotp: 1,
      });
      await router.push('/t/UserCenter');
    } else {
      ElMessage.error(t('auth.bindFail'));
    }
  }
};
</script>
<template>
  <div class="authBindBox">
    <div class="title">{{ t('auth.twoFactor') }}</div>
    <div class="aLink">
      <span class="symbol">①</span>
      {{ t('auth.getCode') }}
    </div>
    <div v-loading="!authUrl" class="qrcodeBox">
      <span class="s1">{{ t('auth.qrcode') }}</span>
      <img class="qrImg" :src="qrcode" alt="qr code" />
      <span class="s1">{{ t('auth.setPass') }}</span>
      <p class="p1">{{ authCode }}</p>
    </div>
    <div class="aLink">
      <span class="symbol">②</span>
      {{ t('auth.input') }}
    </div>
    <div class="info">
      {{ t('auth.secretKey') }}
    </div>
    <div class="info">{{ t('auth.googleTwoFactor') }}</div>
    <div class="formBox">
      <el-input v-model="inputCode" class="input" size="large" />
      <el-button
        type="primary"
        :loading="submitting"
        :disabled="!inputCode"
        class="btn"
        size="large"
        @click="verify"
      >
        {{ t('auth.enable') }}
      </el-button>
    </div>
  </div>
</template>
<style scoped lang="less">
.authBindBox {
  width: 800px;
  margin: 50px auto;
  .title {
    font-size: 30px;
    color: #000000;
  }
  .aLink {
    margin-top: 30px;
    font-size: 22px;
    color: #0c3d93;
    .symbol {
      font-size: 30px;
    }
  }
  .qrcodeBox {
    margin-top: 30px;
    width: 275px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 20px;
    align-items: center;
    .s1 {
      font-size: 20px;
      color: #666666;
    }
    .qrImg {
      width: 156px;
      height: 156px;
      margin: 15px 0;
    }
    .p1 {
      height: 52px;
      width: 100%;
      background-color: #f6f6f6;
      border-radius: 8px;
      border: solid 1px #eeeeee;
      line-height: 52px;
      margin-top: 15px;
    }
  }
  .info {
    margin-top: 20px;
    font-size: 20px;
    color: #666666;
  }
  .formBox {
    width: 430px;
    margin-top: 20px;
    .btn {
      width: 100%;
      margin-top: 25px;
      font-size: 20px;
    }
  }
}
</style>
