<template>
  <section id="banner" class="banner-one">
    <div class="grey_box">
      <div class="container">
        <div class="row">
          <div class="col-xl-6 col-lg-8">
            <div class="banner-one__content">
              <h1>流动性提供商</h1>
              <p>
                我們的機構交易解決流动性方案在設計時考慮了机构和专业客户的交易和风险对冲需求，並且可以同时支持根據業務及客戶的需求制訂。通過獲得深度流動性、無與倫比的市場範圍和如MagicCompass這樣的世界領導者可以提供的卓越服務，最大化客戶的價值和效率。
              </p>
            </div>
            <a href="#" class="banner-one__btn thm-btn"><span>聯繫我們</span></a
            ><!-- /.thm-btn -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

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
  width: 75px;
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
