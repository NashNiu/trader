<template>
  <div class="model_3">
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
    <div class="model_text">
      <h4>{{ t('index.stock') }}</h4>
      <p>
        {{ t('index.joinUs') }}
      </p>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<style lang="less" scoped>
.model_3 {
  max-width: 1270px;
  margin: 0 auto;
  padding: 89px 0 216px;
  overflow: hidden;
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
  .model_text {
    h4 {
      font-size: 40px;
      margin-bottom: 25px;
    }
    p {
      font-size: 14px;
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
      text-align: center;
      h4 {
        font-size: 24px;
        margin-bottom: 14px;
      }
      p {
        font-size: 14px;
        padding: 0 20px;
        line-height: 22px;
      }
    }
  }
}
</style>
