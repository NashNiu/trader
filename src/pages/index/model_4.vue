<template>
  <div class="download">
    <el-row class="row_center">
      <el-col :xs="24" :sm="24" :md="12">
        <div class="left">
          <div class="left_title_top">MC LiquidityProvider</div>
          <div class="left_title">{{ t('index.title') }}</div>
          <p>
            {{ t('index.desc1') }}
            <br />
            <br />
            {{ t('index.desc2') }}
            <br />
            {{ t('index.desc3') }}
            <br />
            {{ t('index.desc4') }}
          </p>
          <div class="down_view hidden-xs-only">
            <div class="down_view_button">
              <div class="down_view_button-flex">
                <img src="../../assets/img/newIndex/Andriod.png" />
                <img src="../../assets/img/newIndex/IOS.png" />
              </div>
              <div class="down_view_button_2">{{ t('index.loginWap') }}</div>
            </div>
            <div class="down_view_ewm">
              <img src="../../assets/img/newIndex/ewm.png" />
            </div>
          </div>
          <!-- 移动端展示样式 -->
          <div class="down_view_m hidden-sm-and-up">
            <div class="down_view_ewm">
              <img src="../../assets/img/newIndex/ewm.png" />
            </div>
            <div class="down_view_m_button">
              <img src="../../assets/img/newIndex/Andriod_m.png" />
              <img src="../../assets/img/newIndex/IOS_m.png" />
            </div>
          </div>
          <div class="down_text">
            {{ t('index.clickTrade') }}
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12">
        <div class="right">
          <img src="../../assets/img/newIndex/down_img_2.png" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import 'element-plus/theme-chalk/display.css';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<style lang="less" scoped>
.download {
  background: #f1f4f6;
  .row_center {
    max-width: 1270px;
    margin: 0 auto;
  }
  .left {
    margin-top: 80px;
    .left_title_top {
      font-size: 34px;
      margin-bottom: 16px;
    }
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
    text-align: right;
    margin-top: 77px;
    margin-bottom: 77px;
  }
}
@media (max-width: 768px) {
  .row_center {
    padding: 30px 0 0;
    .el-col-xs-24 {
      padding: 0 20px;
      .left {
        margin-top: 0;
        .left_title {
          font-size: 24px;
          margin-bottom: 18px;
          line-height: 28px;
        }
        .left_title_top {
          font-size: 18px;
          line-height: 21px;
          margin-bottom: 11px;
        }
        p {
          margin-bottom: 26px;
        }
        .down_text {
          text-align: center;
          margin-bottom: 37px;
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
  .down_view_m {
    padding: 17px 0 20px;
    .down_view_ewm {
      text-align: center;
      margin-bottom: 24px;
    }
    .down_view_m_button {
      text-align: center;
      img {
        margin-bottom: 14px;
        &:nth-child(2) {
          margin-bottom: 0;
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
