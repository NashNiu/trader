<template>
  <div class="model_style">
    <div class="model_1">
      <el-row>
        <el-col :md="12">
          <div class="model_h4">
            {{ t('feature.local') }}
            <br />
            {{ t('feature.digital') }}
            <br />
            {{ t('feature.fast') }}
          </div>
          <p>
            {{ t('feature.manyCurrency') }}
          </p>
        </el-col>
        <el-col :md="12" class="model_img">
          <img src="../../../assets/img/newIndex/F_img_2.png" />
        </el-col>
      </el-row>
    </div>
    <div class="model_2">
      <h2>{{ t('feature.WideCoverage') }}</h2>
      <el-row>
        <el-col :md="12">
          <div class="model_tab">
            <div
              :class="data.tabActive === '1' ? 'model_tab-active' : ''"
              @click="tabClick('1')"
            >
              {{ t('feature.feature1') }}
            </div>
            <div
              :class="data.tabActive === '2' ? 'model_tab-active' : ''"
              @click="tabClick('2')"
            >
              {{ t('feature.feature2') }}
            </div>
            <div
              :class="data.tabActive === '3' ? 'model_tab-active' : ''"
              @click="tabClick('3')"
            >
              {{ t('feature.feature3') }}
            </div>
          </div>
        </el-col>
        <el-col :md="12" class="model_img">
          <img src="../../../assets/img/newIndex/F_img_3.png" />
        </el-col>
      </el-row>
    </div>
    <div class="model_3">
      <el-row>
        <el-col :md="12" class="model_3_col">
          <div class="model_3_text">
            <h4>{{ t('feature.currency') }}</h4>
            <p>{{ t('feature.contract') }}</p>
          </div>
          <div class="model_3_text">
            <h4>{{ t('feature.invest') }}</h4>
            <p>
              {{ t('feature.investDesc') }}
            </p>
          </div>
          <div class="model_3_text">
            <h4>{{ t('feature.trade') }}</h4>
            <p>{{ t('feature.tradeDesc') }}</p>
          </div>
        </el-col>
        <el-col :md="12" class="model_img">
          <img src="../../../assets/img/newIndex/F_img_4.png" />
        </el-col>
      </el-row>
    </div>
    <div class="model_3">
      <el-row>
        <el-col :md="12">
          <img src="../../../assets/img/newIndex/F_img_5.png" />
        </el-col>
        <el-col :md="12" class="model_3_col">
          <div class="model_3_text">
            <h4>{{ t('feature.notSure') }}</h4>
            <p>
              {{ t('feature.onlyAnswer') }}
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="model_4">
      <!-- <div class="model_3_text">
        <h4>{{ t('feature.ETF') }}</h4>
        <p>
          {{ t('feature.ETFDesc') }}
        </p>
      </div> -->
      <div class="model_3_text">
        <h4>{{ t('feature.index') }}</h4>
        <p>{{ t('feature.sample') }}</p>
      </div>
      <div class="model_4_table">
        <el-row>
          <el-col :md="4">
            <p>USA</p>
            <p>US30</p>
            <p>NAS100</p>
            <p>US500</p>
          </el-col>
          <el-col :md="4">
            <p>CHN</p>
            <p>CHA50</p>
            <p>CHINA300</p>
          </el-col>
          <el-col :md="4">
            <p>HK</p>
            <p>HK50</p>
          </el-col>
          <el-col :md="4">
            <p>JPN</p>
            <p>JPN225</p>
          </el-col>
          <el-col :md="4">
            <p>GER</p>
            <p>GER30</p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const data = reactive({
  tabActive: '1',
});
const tabClick = (name) => {
  data.tabActive = name;
};
</script>
<style lang="less" scoped>
.model_style {
  max-width: 1270px;
  margin: 0 auto;
  .model_img {
    text-align: right;
  }
  .model_1 {
    width: 100%;
    padding: 131px 0 63px;
    .el-row {
      align-items: center;
    }
    .model_h4 {
      font-size: 40px;
      font-weight: bold;
      line-height: 46px;
      margin-bottom: 36px;
    }
    p {
      font-size: 14px;
      color: #2d3436;
    }
  }
  .model_2 {
    padding: 78px 0 65px;
    h2 {
      font-size: 40px;
      text-align: center;
      margin-bottom: 58px;
    }
    .model_tab {
      font-size: 24px;
      color: #2d3436;
      position: relative;
      top: 80px;
      display: inline-block;
      > div {
        // width: 238px;
        height: 60px;
        padding: 0 20px;
        margin-bottom: 20px;
        font-weight: bold;
        border-radius: 8px;
        line-height: 60px;
        cursor: pointer;
      }
      .model_tab-active {
        // width: 230px;
        color: #2963a4;
        border: 1px solid #2963a4;
      }
    }
  }
  .model_3 {
    padding: 95px 0;
    .model_3_col {
      padding-top: 55px;
    }
    .model_3_text {
      color: #2d3436;
      margin-bottom: 29px;
      h4 {
        font-size: 24px;
        line-height: 41px;
        margin-bottom: 5px;
      }
      p {
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
  .model_4 {
    padding: 86px 0;
    .model_3_text {
      color: #2d3436;
      margin-bottom: 29px;
      h4 {
        font-size: 24px;
        line-height: 41px;
        margin-bottom: 5px;
      }
      p {
        font-size: 14px;
        line-height: 22px;
      }
    }
    .model_4_table {
      padding: 17px 64px 0;
      p {
        font-size: 20px;
        color: #2d3436;
        text-align: center;
        line-height: 32px;
      }
    }
  }
}
</style>
