<template>
  <section id="banner" class="banner-one">
    <div class="grey_box">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-8">
            <div class="banner-one__content">
              <h1>{{ t('index.bannerh1') }}</h1>
              <p>
                {{ t('index.banner') }}
              </p>
            </div>
            <a href="#" class="banner-one__btn thm-btn">
              <span>{{ t('index.chatLink') }}</span>
            </a>
            <!-- /.thm-btn -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<style scoped>
.banner-one {
  width: 100%;
  height: 780px;
  position: relative;
  background-image: url('../../assets/img/banner1.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top center;
  text-align: left;
}
.banner-one .grey_box {
  background-color: rgb(56, 50, 50, 0.2);
  color: #fff;
  height: 100%;
}
.banner-one__content h1 {
  font-size: 30px;
  margin-bottom: 21px;
}
.banner-one .container {
  padding-top: 246px;
  padding-bottom: 230px;
  position: relative;
}
@media (min-width: 1200px) {
  .col-xl-6 {
    -ms-flex: 0 0 50%;
    flex: 0 0 50%;
    max-width: 50%;
  }
  .container {
    max-width: 1200px;
  }
}

.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.banner-one .container {
  padding-top: 246px;
  padding-bottom: 230px;
  position: relative;
}
.banner-one__btn {
  padding: 12px 50px;
  background-image: linear-gradient(180deg, #0c3d93 0%, #092b65 100%);
  border-radius: 50px;
  color: #fff;
  margin-top: 30px;
  display: block;
  width: 80px;
}
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.container p {
  line-height: 28px;
}
@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
  }
}
</style>
