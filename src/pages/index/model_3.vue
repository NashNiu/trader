<template>
  <div class="model_3">
    <div class="model_3_top">
      <el-row :gutter="40">
        <el-col :sm="12" :md="6" class="row_col_style">
          <div>
            <img src="../../assets/img/newIndex/icon_1.png" />
          </div>
          <h4>{{ t('index.quickBegin') }}</h4>
          <p>{{ t('index.oneMin') }}</p>
        </el-col>
        <el-col :sm="12" :md="6" class="row_col_style">
          <div>
            <img src="../../assets/img/newIndex/icon_2.png" />
          </div>
          <h4>{{ t('index.tradeAll') }}</h4>
          <p>{{ t('index.manyMarket') }}</p>
        </el-col>
        <el-col :sm="12" :md="6" class="row_col_style">
          <div>
            <img src="../../assets/img/newIndex/icon_3.png" />
          </div>
          <h4>{{ t('index.tradeGlobal') }}</h4>
          <p>{{ t('index.tradeDigital') }}</p>
        </el-col>
        <el-col :sm="12" :md="6" class="row_col_style">
          <div>
            <img src="../../assets/img/newIndex/icon_4.png" />
          </div>
          <h4>{{ t('index.powerAndSafe') }}</h4>
          <p>
            {{ t('index.tenBillion') }}
          </p>
        </el-col>
      </el-row>
    </div>
    <!-- 股票合约玩法 -->
    <div class="model_text">
      <div class="model_text_content">
        <div>
          <h4>{{ t('index.stock') }}</h4>
          <p>
            {{ t('index.joinUs') }}
          </p>
        </div>
        <img src="../../assets/img/newIndex/index_5.png" />
      </div>
    </div>
    <!-- 加入社群 -->
    <div class="model_5">
      <div>
        <h4>{{ t('index.community') }}</h4>
        <p>{{ t('index.communityTip') }}</p>
        <div class="href-list">
          <img
            src="../../assets/img/newIndex/s_icon_1.png"
            @click="
              goHref('https://www.youtube.com/@MagicCompassOfficial/videos')
            "
          />
          <img
            src="../../assets/img/newIndex/s_icon_2.png"
            @click="goHref('https://twitter.com/MagicCompassO')"
          />
          <img
            src="../../assets/img/newIndex/s_icon_3.png"
            @click="goHref('https://www.facebook.com/MagicCompassOfficial')"
          />
          <img
            src="../../assets/img/newIndex/s_icon_4.png"
            @click="goHref('https://www.linkedin.com/company/magic-compass-ltd/')"
          />
          <img
            src="../../assets/img/newIndex/s_icon_5.png"
            @click="goHref('https://www.tiktok.com/@magiccompass2023')"
          />
          <img
            src="../../assets/img/newIndex/s_icon_6.png"
            @click="goHref('https://www.instagram.com/magiccompassofficial/')"
          />
        </div>
      </div>
      <img src="../../assets/img/newIndex/index_6.png" />
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const goHref = (url) => {
  window.open(url, '_black');
};
</script>
<style lang="less" scoped>
.model_3 {
  // max-width: 1270px;
  margin: 0 auto;
  // padding: 89px 0 216px;
  padding: 89px 0 0;
  overflow: hidden;
  .model_3_top {
    max-width: 1270px;
    margin: 0 auto;
    padding-bottom: 40px;
    .row_col_style {
      text-align: center;
      margin-bottom: 36px;
      img {
        margin-bottom: 15px;
      }
      h4 {
        font-size: 16px;
        margin-bottom: 5px;
      }
      p {
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
  .model_text {
    background-color: #f1f4f6;
    .model_text_content {
      display: flex;
      justify-content: space-between;
      max-width: 1270px;
      margin: 0 auto;
      padding: 60px 0 63px;
      > div {
        &:nth-child(1) {
          margin-right: 80px;
        }
      }
    }
    h4 {
      font-size: 40px;
      margin-bottom: 25px;
    }
    p {
      font-size: 14px;
      line-height: 22px;
    }
  }
  .model_5 {
    max-width: 1270px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      font-size: 40px;
      margin-bottom: 25px;
    }
    p {
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 59px;
    }
    .href-list {
      display: flex;
      align-items: center;
      > img {
        margin-right: 52px;
      }
    }
  }
}
@media (max-width: 768px) {
  .model_3 {
    padding: 36px 0 37px;
    .row_col_style {
      margin-bottom: 26px;
    }
    .model_text {
      background-color: #f1f4f6;
      text-align: center;
      .model_text_content {
        display: block;
        text-align: center;
        padding: 40px 0 60px;
        > img {
          width: 270px;
        }
        > div {
          &:nth-child(1) {
            margin-right: 0;
          }
        }
      }
      h4 {
        font-size: 24px;
        margin-bottom: 14px;
      }
      p {
        font-size: 14px;
        padding: 0 20px 37px;
        line-height: 22px;
      }
    }
    .model_5 {
      display: block;
      padding: 40px 0 0;
      text-align: center;
      >img {
        width: 350px;
      }
      h4 {
        font-size: 24px;
        margin-bottom: 14px;
        text-align: center;
      }
      p {
        font-size: 14px;
        padding: 0 20px 29px;
        line-height: 22px;
        margin-bottom: 0;
        text-align: left;
      }
      .href-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        > img {
          width: 40px;
          margin-right: 0;
        }
      }
    }
  }
}
</style>
