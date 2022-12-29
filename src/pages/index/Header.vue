<template>
  <header class="site-header site-header__header-one">
    <nav class="navbar navbar-expand-lg navbar-light header-navigation stricky">
      <div class="container clearfix">
        <div class="logo-box clearfix">
          <a class="navbar-brand" href="/">
            <img
              src="../../assets/img/logo-m.png"
              class="main-logo"
              width="119"
              alt="Awesome Image"
            />
          </a>
          <button class="menu-toggler" data-target=".main-navigation">
            <span class="fa fa-bars"></span>
          </button>
        </div>
        <!-- /.logo-box -->
        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="main-navigation">
          <ul class="one-page-scroll-menu navigation-box">
            <li class="current scrollToLink">
              <router-link to="" @click="goTrade">商户中心</router-link>
            </li>
          </ul>
        </div>

        <LoginRegister v-if="centerDialogVisible" @hide="hideDialog" />
      </div>
    </nav>
  </header>
</template>
<script setup>
import LoginRegister from '../../components/common/login.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
const router = useRouter();
const centerDialogVisible = ref(false);
const hideDialog = () => {
  centerDialogVisible.value = false;
};
const goTrade = () => {
  console.log(sessionStorage.getItem('token'));
  if (sessionStorage.getItem('token')) {
    router.push({
      path: '/Trade',
      query: {},
    });
  } else {
    centerDialogVisible.value = true;
    console.log(centerDialogVisible.value);
  }
};
</script>

<style scoped>
.page-wrapper {
  position: relative;
  margin: 0 auto;
  width: 100%;
  min-width: 300px;
  overflow: hidden;
}
.site-header__header-one {
  background-color: rgb(56, 50, 50, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 91;
}
.header-navigation {
  background-color: transparent;
  margin-bottom: 0;
  border: none;
  border-radius: 0;
  padding: 0;
  position: relative;
}
.header-navigation .container {
  background: transparent;
  position: relative;
  display: block;
}
@media (min-width: 992px) {
  .navbar-expand-lg {
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
}
.navbar {
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}
.header-navigation .container .logo-box {
  float: left;
  position: absolute;
  top: 50%;
  left: 15px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.header-navigation .container .navbar-brand {
  height: auto;
  margin: 0;
  line-height: 1;
}
.navbar-brand {
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
}
.header-navigation .container .menu-toggler {
  display: none;
}
.fa {
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: inherit;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.site-header__header-one .header-navigation .main-navigation {
  padding-right: 0;
  text-align: center;
}
@media (min-width: 1200px) {
  .header-navigation .main-navigation {
    display: block !important;
  }
}

.header-navigation .main-navigation {
  float: none;
  text-align: right;
  padding-right: 90px;
}
.header-navigation ul.navigation-box {
  margin: 0;
  padding: 0;
  list-style: none;
}
.header-navigation ul.navigation-box > li:last-child {
  padding-right: 0;
}
.header-navigation ul.navigation-box > li:first-child {
  float: right;
  margin-right: 200px;
}
.header-navigation ul.navigation-box > li {
  position: relative;
  padding: 40px 0;
  display: inline-block;
  vertical-align: middle;
}
.header-navigation .container .right-side-box {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 15px;
}
.thm-btn {
  border: none;
  display: inline-block;
  vertical-align: middle;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  color: #2a2833;
  padding: 13px 41px;
  border-radius: 5px;
  -webkit-transition: background 0.4s ease, color 0.4s ease;
  transition: background 0.4s ease, color 0.4s ease;
  background-image: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#ff4eb5),
    to(#ffa065)
  );
  background-image: linear-gradient(90deg, #ff4eb5 0%, #ffa065 100%);
  position: relative;
}
a:active,
a:hover,
a:focus,
a:visited {
  text-decoration: none;
}
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
