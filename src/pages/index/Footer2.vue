<template>
  <div>
    <footer class="site-footer">
      <div class="site-footer__upper">
        <div class="container">
          <div class="row">
            <div class="col-12 col-md-6 col-lg-3 footer--widget widget-about">
              <div class="footer-widget footer-widget__about">
                <img
                  src="../../assets/img/logo-m.png"
                  width="119"
                  alt=""
                  class="footer-widget__logo"
                />
                <p class="footer-widget__contact">
                  {{ t('index.partner') }}
                </p>
                <!-- /.footer-widget__contact -->
                <p class="footer-widget__contact">
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    placeholder="Subscribe Our Newsletter"
                    value=""
                  />
                </p>
                <!-- /.footer-widget__contact -->
              </div>
              <!-- /.footer-widget -->
            </div>
            <!-- /.col-lg-2 -->
            <div
              class="col-12 col-sm-4 col-md-6 col-lg-2 footer--widget widget-links"
            >
              <h3 class="footer-widget__title">{{ t('index.link') }}</h3>
              <!-- /.footer-widget__title -->
              <ul class="footer-widget__links list-unstyled">
                <li>
                  <a href="#">{{ t('index.t1') }}</a>
                </li>
                <li>
                  <a href="#">{{ t('index.t2') }}</a>
                </li>
                <li>
                  <a href="#">{{ t('index.t3') }}</a>
                </li>
                <li>
                  <a href="#">{{ t('index.t4') }}</a>
                </li>
                <li>
                  <a href="#">{{ t('index.t5') }}</a>
                </li>
                <li>
                  <a href="#">{{ t('index.t6') }}</a>
                </li>
                <li>
                  <a href="#">{{ t('index.t7') }}</a>
                </li>
                <li>
                  <a href="#">{{ t('index.t8') }}</a>
                </li>
              </ul>
              <!-- /.footer-widget__links -->
            </div>
            <!-- /.footer-widget -->
            <div
              class="col-12 col-sm-8 col-md-6 col-lg-7 footer--widget widget-links widget-links-inline"
            >
              <h3 class="footer-widget__title">{{ t('index.about') }}</h3>
              <!-- /.footer-widget__title -->
              <p>
                Magic Compass Group (Magic Compass Holdings Limited) is the
                ultimate holding company of Magic Compass Ltd, Magic Compass
                Securities Limited, Magic Compass Financial Services OÜ, Magic
                Compass International Capital Ltd and Magic Compass Investments
                Limited. Registered address: Cistra Corporate Services Centre,
                Wickhams Cay II, Road Town, Tortola, VG1110, British Virgin
                Islands.
              </p>
            </div>
            <!-- /.footer-widget -->
          </div>
          <!-- /.row -->
        </div>
        <!-- /.container -->
      </div>
      <!-- /.site-footer__upper -->
      <div class="site-footer__bottom">
        <div class="container">
          <div class="inner-container text-center">
            <p class="site-footer__copy">
              &copy; 2022 Magic Compass Group.All Rights Reserved.
            </p>
            <!-- /.site-footer__copy -->
          </div>
          <!-- /.inner-container -->
        </div>
        <!-- /.container -->
      </div>
      <!-- /.site-footer__bottom -->
    </footer>

    <a href="#" data-target="html" class="scroll-to-target scroll-to-top">
      <i class="fa fa-angle-up"></i>
    </a>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
<style scoped>
.site-footer {
  position: relative;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: hidden;
  background-color: #000;
  color: #fff;
}
.site-footer__upper {
  padding-top: 120px;
  padding-bottom: 120px;
}
.row {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}
.footer-widget__title {
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  margin: 0;
  line-height: 1em;
  margin-bottom: 40px;
}
.footer-widget__links li a {
  font-size: 16px;
  font-weight: 400;
  color: #74727a;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
.list-unstyled {
  padding-left: 0;
  list-style: none;
}
.site-footer__bottom .inner-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
  padding-top: 44px;
  padding-bottom: 44px;
  color: #333;
}
.footer-widget__links li {
  line-height: 1.5em;
}
.site-footer__bottom {
  background-color: #fff9ff;
}
.footer-widget__contact {
  margin: 10px 0;
}
.footer--widget {
  line-height: 22px;
}
@media (min-width: 992px) {
  .col-lg-3 {
    -ms-flex: 0 0 25%;
    flex: 0 0 25%;
    max-width: 25%;
  }
  .col-lg-2 {
    -ms-flex: 0 0 16.666667%;
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }
  .col-lg-7 {
    -ms-flex: 0 0 58.333333%;
    flex: 0 0 58.333333%;
    max-width: 58.333333%;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
</style>
