<script setup>
import googleImg from '@/assets/img/usercenter/google.png';
import appStoreImg from '@/assets/img/usercenter/appStore.png';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const router = useRouter();
const goAuthBind = () => {
  router.push('/t/authBind');
};
</script>
<template>
  <div class="authInfoBox">
    <div class="section">
      <div class="h3">{{ t('auth.bind') }}</div>
      <div class="info">
        {{ t('auth.title') }}
      </div>
    </div>
    <div class="divider"></div>
    <div class="section">
      <div class="alink">{{ t('auth.download') }}</div>
      <div class="info">
        {{ t('auth.install') }}
      </div>
      <div class="imgBox">
        <img :src="googleImg" alt="google" />
        <img :src="appStoreImg" alt="app store" />
      </div>
      <div class="info">{{ t('auth.afterInstall') }}</div>
      <div class="btnBox">
        <el-button type="primary" size="large" class="btn" @click="goAuthBind">
          {{ t('auth.next') }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
.authInfoBox {
  padding-top: 50px;
  .section {
    width: 1200px;
    margin: 30px auto 0;
    .h3 {
      font-size: 30px;
    }
    .info {
      font-size: 20px;
      color: #666666;
      margin: 30px 0;
    }
    .alink {
      font-size: 22px;
      color: #0c3d93;
    }
    .imgBox {
      display: flex;
      align-items: center;
      margin: 20px 0;
      img {
        width: 194px;
        height: 56px;
        margin-right: 40px;
      }
    }
  }
  .divider {
    width: 100%;
    height: 1px;
    background-color: #eaeaea;
  }
  .btnBox {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    box-sizing: border-box;
    padding-right: 200px;
    .btn {
      width: 360px;
    }
  }
}
</style>
