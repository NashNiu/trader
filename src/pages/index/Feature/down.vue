<template>
  <div class="download">
    <el-row class="row_center">
      <el-col :xs="24" :sm="24" :md="12">
        <div class="right">
          <img src="../../../assets/img/newIndex/F_img.png" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12">
        <div class="left">
          <div class="left_title">{{ t('feature.title') }}</div>
          <p>{{ t('feature.desc') }}</p>
          <div class="down_text hidden-xs-only">
            {{ t('feature.download') }}。
          </div>
          <div class="down_view hidden-xs-only">
            <div class="down_view_button">
              <div class="down_view_button-flex">
                <img :src="androidSrc" alt="Andriod" />
                <img :src="iosSrc" alt="IOS" />
              </div>
              <div class="down_view_button_2">{{ t('feature.loginWap') }}</div>
            </div>
            <div class="down_view_ewm">
              <img src="../../../assets/img/newIndex/ewm.png" />
            </div>
          </div>
          <div class="down_text hidden-xs-only">
            {{ t('feature.clickDownload') }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import 'element-plus/theme-chalk/display.css';
import { useI18n } from 'vue-i18n';
import androidImg from '@/assets/img/newIndex/Andriod.png';
import androidImgEn from '@/assets/img/newIndex/Andriod_en.png';
import iosImg from '@/assets/img/newIndex/IOS.png';
import iosImgEn from '@/assets/img/newIndex/IOS_en.png';
const { t, locale } = useI18n();
const androidSrc = locale.value === 'cn' ? androidImg : androidImgEn;
const iosSrc = locale.value === 'cn' ? iosImg : iosImgEn;
</script>
<style lang="less" scoped>
.download {
  background: #fff;
  .row_center {
    max-width: 1270px;
    margin: 0 auto;
  }
  .left {
    margin-top: 85px;
    .left_title {
      font-family: Roboto;
      font-size: 44px;
      font-weight: 800;
      line-height: 52px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 20px;
    }
    p {
      font-family: Roboto;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
      color: #2d3436;
      margin-bottom: 17px;
    }
    .down_text {
      font-family: Roboto;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
      color: #2d3436;
    }
    .down_view {
      display: flex;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 15px;
      .down_view_button {
        margin-right: 40px;
        .down_view_button-flex {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          cursor: pointer;
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
  }
  .right {
    text-align: left;
    margin-top: 77px;
    margin-bottom: 77px;
  }
}
@media (max-width: 768px) {
  .row_center {
    .el-col-xs-24 {
      padding: 0 20px;
      .left {
        margin-top: 0;
        .left_title {
          font-size: 24px;
          margin-bottom: 8px;
          line-height: 28px;
          margin-top: 30px;
        }
        p {
          margin-bottom: 26px;
        }
      }
      .right {
        margin-top: 0;
        margin-bottom: 25px;
        text-align: center;
        img {
          width: 260px;
        }
      }
    }
  }
}
@media (max-width: 992px) and (min-width: 768px) {
  .row_center {
    .right {
      text-align: center;
    }
  }
}
</style>
