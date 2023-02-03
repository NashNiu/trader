<template>
  <section id="pricing" class="pricing-one">
    <div class="container">
      <div class="block-title text-center">
        <h1>{{ t('index.PricingH1') }}</h1>
        <ul>
          <li>
            <a href="/">
              {{ t('index.PricingP1') }}
              <img src="../../assets/img/features/Vector.png" alt="" />
            </a>
          </li>
          <li>
            <a href="/">
              {{ t('index.PricingP2') }}
              <img src="../../assets/img/features/Vector.png" alt="" />
            </a>
          </li>
          <li>
            <a href="/">
              {{ t('index.PricingP3') }}
              <img src="../../assets/img/features/Vector.png" alt="" />
            </a>
          </li>
          <li>
            <a href="/">
              {{ t('index.PricingP4') }}
              <img src="../../assets/img/features/Vector.png" alt="" />
            </a>
          </li>
        </ul>
      </div>
      <!-- /.block-title -->
    </div>
    <!-- /.container -->
  </section>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<style scoped>
@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
.pricing-one h1 {
  font-size: 36px;
  margin-bottom: 60px;
  font-weight: bold;
  text-align: center;
}
.pricing-one ul {
  text-align: center;
  list-style-type: none;
  display: flex;
}
.pricing-one ul li {
  width: 25%;
  display: inline-block;
  font-weight: bold;
  font-size: 22px;
}
.pricing-one ul li a {
  color: #0c3d93;
  font-weight: bold;
  line-height: 35px;
}
.pricing-one {
  padding: 165px 0;
  position: relative;
}
</style>
