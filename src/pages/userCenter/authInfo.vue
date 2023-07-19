<script setup>
import googleImg from '@/assets/img/usercenter/google.png';
import appStoreImg from '@/assets/img/usercenter/appStore.png';
import { useRouter } from 'vue-router';
const router = useRouter();
const goAuthBind = () => {
  router.push('/t/authBind');
};
</script>
<template>
  <div class="authInfoBox">
    <div class="section">
      <div class="h3">绑定谷歌验证器</div>
      <div class="info">
        我们通过双重身份认证，采用谷歌双重认证保护您的账号。设置方式简单仅需花费几分钟即可完成
      </div>
    </div>
    <div class="divider"></div>
    <div class="section">
      <div class="alink">下载 Google Authenticator 应用程序</div>
      <div class="info">
        IOS手机装置可从APP商店下载Google Authenticator
        应用程序,而Android手机装置则可至Google Pay商店。
      </div>
      <div class="imgBox">
        <img :src="googleImg" alt="google" />
        <img :src="appStoreImg" alt="app store" />
      </div>
      <div class="info">成功安装app至手机后，我们将协助您的账号创建2FA令牌</div>
      <div class="btnBox">
        <el-button type="primary" size="large" class="btn" @click="goAuthBind">
          继续
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
