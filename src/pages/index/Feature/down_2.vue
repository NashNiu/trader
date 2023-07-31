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
            <div class="down_view_ewm">
              <img src="../../../assets/img/newIndex/F_ewm.png" />
            </div>
          </div>
          <div class="down_text hidden-xs-only">
            {{ t('feature.scanDownload') }}
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12">
        <div class="right">
          <img src="../../../assets/img/newIndex/down_img_2.png" />
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
