<template>
  <section id="features" class="service-one">
    <div class="container">
      <div class="block-title text-center">
        <h1>{{ t('index.featuresh1') }}</h1>
        <ul>
          <li>
            <img src="../../assets/img/features/icon1.png" alt="" />
            <h2>{{ t('index.featuresH21') }}</h2>
            <p>
              {{ t('index.featuresP1') }}
            </p>
          </li>
          <li>
            <img src="../../assets/img/features/icon2.png" alt="" />
            <h2>{{ t('index.featuresH22') }}</h2>
            <p>
              {{ t('index.featuresP2') }}
            </p>
          </li>
          <li>
            <img src="../../assets/img/features/icon3.png" alt="" />
            <h2>{{ t('index.featuresH23') }}</h2>
            <p>
              {{ t('index.featuresP3') }}
            </p>
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
.service-one {
  padding-bottom: 90px;
  padding-top: 100px;
}
.service-one h1 {
  font-size: 36px;
  margin-bottom: 60px;
  font-weight: bold;
  text-align: center;
}
.service-one ul {
  text-align: center;
  list-style-type: none;
  display: flex;
}
.service-one ul li {
  flex: 1;
  text-align: left;
  margin-right: 39px;
}
.service-one ul li img {
  display: block;
  width: 50px;
  height: 50px;
  margin-bottom: 30px;
}
.service-one ul li h2 {
  font-size: 22px;
  margin-bottom: 10px;
}
.service-one ul li p {
  color: #9b9b9b;
  font-size: 14px;
  line-height: 28px;
  width: 304px;
}
@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
