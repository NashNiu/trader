<template>
  <div class="platform">
    <div class="banner">
      <h4>{{ t('index.mclp') }}</h4>
      <p>
        {{ t('plat.title3') }}
      </p>
    </div>
    <div class="width_1270 MCLPModel_mobile">
      <el-row class="MT5Model_mobile_model" align="middle">
        <el-col :md="12">
          <img src="../../../assets/img/newIndex/P_img_4.png" />
        </el-col>
        <el-col :md="9" :push="3" class="MT5Model_mobile_down">
          <h4>{{ t('plat.MCLP_title') }}</h4>
          <div>
            <img :src="androidSrc" alt="Andriod" />
            <img :src="iosSrc" alt="IOS" />
          </div>
          <div class="down_view_button_2" @click="loginOpen">
            {{ t('index.loginWap') }}
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="MCLP_advantage">
      <h2>{{ t('plat.advantage_h2') }}</h2>
      <div class="width_1270">
        <el-row :gutter="40">
          <el-col :md="12">
            <div class="list-model list-model_height">
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[0]') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[1]') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[2]') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[3]') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[4]') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[5]') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[6]') }}</span>
              </div>
            </div>
          </el-col>
          <el-col :md="12">
            <div class="list-model list-model_height">
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[7]') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[8]') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[9]') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[10]') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[11]') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[12]') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.advantage_list[13]') }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import androidImg from '@/assets/img/newIndex/Andriod.png';
import androidImgEn from '@/assets/img/newIndex/Andriod_en.png';
import iosImg from '@/assets/img/newIndex/IOS.png';
import iosImgEn from '@/assets/img/newIndex/IOS_en.png';
import { useRouter } from 'vue-router';
import { useHeaderStore } from '@/store/index.js';
const headerStore = useHeaderStore();
const router = useRouter();
const { t, locale } = useI18n();
const androidSrc = locale.value === 'cn' ? androidImg : androidImgEn;
const iosSrc = locale.value === 'cn' ? iosImg : iosImgEn;
const loginOpen = () => {
  if (localStorage.getItem('token')) {
    router.push({
      path: '/t/trade',
      query: {},
    });
  } else {
    headerStore.setCenterDialogVisible(true);
  }
};
</script>
<style lang="less" scoped>
.banner {
  width: 100%;
  height: 360px;
  background-image: url('../../../assets/img/newIndex/P_banner.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  color: #fff;
  h4 {
    font-size: 40px;
    line-height: 47px;
    padding-top: 82px;
    padding-bottom: 14px;
  }
  p {
    width: 785px;
    font-size: 16px;
    line-height: 26px;
    margin: 0 auto;
  }
}
.width_1270 {
  width: 1270px;
  margin: 0 auto;
}
.MCLPModel_mobile {
  padding-bottom: 81px;
  .MT5Model_mobile_model {
    padding: 55px 0 72px;
    .MT5Model_mobile_down {
      h4 {
        font-size: 26px;
        line-height: 30.47px;
        font-weight: 600;
        margin-bottom: 40px;
      }
      > div {
        margin-bottom: 12px;
        img {
          cursor: pointer;
          &:nth-child(1) {
            margin-right: 15px;
          }
        }
      }
      .down_view_button_2 {
        width: 365px;
        height: 45px;
        border-radius: 5px;
        border: 1px solid #2963a4;
        text-align: center;
        line-height: 45px;
        font-family: Roboto;
        font-size: 14px;
        font-weight: 400;
        color: #2963a4;
        cursor: pointer;
      }
    }
  }
  .list-model_height {
    height: 210px;
  }
}
.MCLP_advantage {
  padding: 60px 0;
  background: #f1f4f6;
  h2 {
    font-size: 40px;
    font-weight: 800;
    line-height: 47px;
    letter-spacing: 0em;
    text-align: center;
    color: #000000;
    margin-bottom: 60px;
  }
  .list-model {
    width: 100%;
    height: 350px;
    background: #f9f9f9;
    padding: 50px 0 0;
    > div {
      font-size: 16px;
      line-height: 25px;
      color: #2d3436;
      margin-bottom: 19px;
      margin-left: 105px;
      > img {
        margin-right: 18px;
      }
    }
  }
}
</style>
