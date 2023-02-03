<template>
  <section class="cta-one">
    <div class="container">
      <div class="block-title text-center">
        <h1>{{ t('index.callToh1') }}</h1>
        <ul>
          <li>
            <img src="../../assets/img/features/icon4.png" alt="" />
            <h2>{{ t('index.callToh21') }}</h2>
            <p>
              {{ t('index.callToP1') }}
            </p>
          </li>
          <li>
            <img src="../../assets/img/features/icon5.png" alt="" />
            <h2>{{ t('index.callToh22') }}</h2>
            <p>
              {{ t('index.callToP2') }}
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
.cta-one {
  padding: 165px 0;
  position: relative;
  background: #f9f9f9;
}
.cta-one h1 {
  font-size: 36px;
  margin-bottom: 60px;
  font-weight: bold;
  text-align: center;
}
.cta-one ul {
  text-align: center;
  list-style-type: none;
  display: flex;
}
.cta-one ul li {
  flex: 1;
  text-align: left;
  margin-right: 39px;
}
.cta-one ul li h2 {
  font-size: 22px;
  margin: 20px 0;
}
.cta-one ul li p {
  color: #9b9b9b;
  font-size: 14px;
  line-height: 28px;
  width: 400px;
}
@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
