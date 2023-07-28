<template>
  <div>
    <div class="model">
      <div class="model_title">
        <h4>{{ t('index.product') }}</h4>
        <p>{{ t('product.followingItems') }}</p>
      </div>
      <el-row>
        <el-col :md="16">
          <div class="model_flex">
            <img src="../../../assets/img/newIndex/P_icon_1.png" />
            <div class="model_flex_text">
              <h4>{{ t('product.index') }}</h4>
              <p>{{ t('product.fastTrade') }}</p>
            </div>
          </div>
        </el-col>
        <el-col :md="8">
          <div class="model_flex">
            <img src="../../../assets/img/newIndex/P_icon_2.png" />
            <div class="model_flex_text">
              <h4>{{ t('product.preciousMetal') }}</h4>
              <p>{{ t('product.fastTrade') }}</p>
            </div>
          </div>
        </el-col>
        <el-col :md="16">
          <div class="model_flex">
            <img src="../../../assets/img/newIndex/P_icon_3.png" />
            <div class="model_flex_text">
              <h4>{{ t('product.cryptocurrency') }}</h4>
              <p>{{ t('product.fastTrade') }}</p>
            </div>
          </div>
        </el-col>
        <el-col :md="8">
          <div class="model_flex">
            <img src="../../../assets/img/newIndex/P_icon_4.png" />
            <div class="model_flex_text">
              <h4>{{ t('product.forex') }}</h4>
              <p>{{ t('product.fastTrade') }}</p>
            </div>
          </div>
        </el-col>
        <el-col :md="16">
          <div class="model_flex">
            <img src="../../../assets/img/newIndex/P_icon_5.png" />
            <div class="model_flex_text">
              <h4>{{ t('product.oil') }}</h4>
              <p>{{ t('product.fastTrade') }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="model_problem">
        <h4>{{ t('product.otherProduct') }}？</h4>
        <p>{{ t('product.findMore') }}</p>
        <div class="model_problem_tab">
          <div class="model_problem_tab-active">{{ t('index.product') }}</div>
          <div>{{ t('product.tools') }}</div>
        </div>
      </div>
    </div>
    <Model_4 />
  </div>
</template>
<script setup>
import Model_4 from '../model_4.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<style lang="less" scoped>
.model {
  padding: 30px 0;
  max-width: 1270px;
  margin: 0 auto;
  .model_title {
    margin-bottom: 30px;
    h4 {
      font-size: 40px;
      font-weight: bold;
      margin-bottom: 25px;
    }
    p {
      font-size: 14px;
      color: #2d3436;
    }
  }
  .model_flex {
    display: flex;
    align-items: center;
    margin-bottom: 39px;
    .model_flex_text {
      margin-left: 30px;
      h4 {
        font-size: 16px;
        line-height: 25px;
        font-weight: bold;
      }
      p {
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
  .model_problem {
    text-align: center;
    h4 {
      font-size: 26px;
      line-height: 41px;
      color: #2d3436;
    }
    p {
      font-size: 14px;
      line-height: 22px;
      color: #2d3436;
      margin-bottom: 23px;
    }
    .model_problem_tab {
      display: inline-flex;
      align-items: center;
      > div {
        height: 44px;
        padding: 0 17px;
        font-size: 14px;
        font-weight: bold;
        color: #2963a4;
        line-height: 44px;
        cursor: pointer;
        &:nth-child(1) {
          margin-right: 23px;
        }
      }
      .model_problem_tab-active {
        background: #2963a4;
        border-radius: 100px;
        color: #fff;
      }
    }
  }
}
</style>
