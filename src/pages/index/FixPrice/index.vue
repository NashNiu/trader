<template>
  <div>
    <div class="price">
      <h1>{{ t('price.title') }}</h1>
      <div class="price_table">
        <div class="price_table-title">{{ t('price.commission') }}</div>
        <div class="price_table-tr">
          <div>{{ t('price.stock') }}</div>
          <div>{{ t('price.free') }}</div>
        </div>
        <div class="price_table-tr">
          <div></div>
          <div>{{ t('price.p1') }}</div>
        </div>
        <div class="price_table-tr">
          <div>{{ t('price.coin') }}</div>
          <div>
            <p>
              {{ t('price.p2') }}
            </p>
            <p>{{ t('price.view') }}</p>
            <p>{{ t('price.p3') }}</p>
          </div>
        </div>
      </div>
      <div class="price_table">
        <div class="price_table-title">{{ t('price.allFee') }}</div>
        <div class="price_table-tr">
          <div>{{ t('price.deposit') }}</div>
          <div>{{ t('price.free') }}</div>
        </div>
        <div class="price_table-tr">
          <div>{{ t('price.digitalWithdraw') }}</div>
          <div>{{ t('price.minersFee') }}</div>
        </div>
        <div class="price_table-tr">
          <div>{{ t('price.withdraw') }}</div>
          <div>{{ t('price.withdrawCharge') }}</div>
        </div>
      </div>
    </div>
    <Model_4 />
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import Model_4 from '../model_4.vue';
const { t } = useI18n();
</script>
<style lang="less" scoped>
.price {
  max-width: 1270px;
  margin: 0 auto;
  padding: 30px 0 51px;
  h1 {
    font-size: 40px;
    font-weight: 800;
    line-height: 46px;
    margin-bottom: 25px;
  }
  .price_table {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
    > div {
      border-bottom: 1px solid #e4eaed;
    }
    .price_table-title {
      font-size: 26px;
      font-weight: 600;
      line-height: 42px;
      padding-bottom: 30px;
    }
    .price_table-tr {
      padding: 16px 0;
      display: flex;
      > div {
        font-size: 16px;
        line-height: 25px;
        &:nth-child(1) {
          font-weight: bold;
          width: 22%;
        }
      }
    }
  }
}
</style>
