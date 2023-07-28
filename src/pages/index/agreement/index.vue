<template>
  <div>
    <div class="agreement">
      <div class="title">{{ t('agreement.title') }}</div>
      <div class="content">
        <p>
          {{ t('agreement.title') }}
        </p>
        <p>
          {{ t('agreement.title') }}
        </p>
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
.agreement {
  max-width: 1270px;
  margin: 0 auto;
  padding: 40px 0 107px;
  .title {
    font-size: 26px;
    line-height: 41px;
    font-weight: bold;
    margin-bottom: 27px;
  }
  .content {
    font-size: 16px;
    line-height: 25px;
    color: #2d3436;
    > p {
      margin-bottom: 20px;
    }
  }
}
</style>
