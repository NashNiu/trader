<template>
  <!-- <header class="site-header site-header__header-one">
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
        <div class="main-navigation">
          <ul class="one-page-scroll-menu navigation-box">
            <li class="current scrollToLink">
              <span class="goTrade" @click="goTrade">
                {{ t('index.goTrade') }}
              </span>
              <span class="goLanguage">
                <el-dropdown @command="changeLanguage">
                  <span class="language">{{ t('common.language') }}</span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="cn">简体中文</el-dropdown-item>
                      <el-dropdown-item command="en">English</el-dropdown-item>
                      <el-dropdown-item command="bg">Bulgaria</el-dropdown-item>
                      <el-dropdown-item command="af">Holland</el-dropdown-item>
                      <el-dropdown-item command="cs">
                        Česká republika
                      </el-dropdown-item>
                      <el-dropdown-item command="da">
                        Kongeriget Danmark
                      </el-dropdown-item>
                      <el-dropdown-item command="de">German</el-dropdown-item>
                      <el-dropdown-item command="el">Greece</el-dropdown-item>
                      <el-dropdown-item command="es">Spain</el-dropdown-item>
                      <el-dropdown-item command="et">Estonia</el-dropdown-item>
                      <el-dropdown-item command="fi">Finland</el-dropdown-item>
                      <el-dropdown-item command="fr">France</el-dropdown-item>
                      <el-dropdown-item command="hu">Hungary</el-dropdown-item>
                      <el-dropdown-item command="id">
                        Indonesia
                      </el-dropdown-item>
                      <el-dropdown-item command="it">Italy</el-dropdown-item>
                      <el-dropdown-item command="ja">Japan</el-dropdown-item>
                      <el-dropdown-item command="ko">Korean</el-dropdown-item>
                      <el-dropdown-item command="lt">
                        Lithuania
                      </el-dropdown-item>
                      <el-dropdown-item command="lv">Latvia</el-dropdown-item>
                      <el-dropdown-item command="no">Norway</el-dropdown-item>
                      <el-dropdown-item command="pl">Poland</el-dropdown-item>
                      <el-dropdown-item command="pt">Portugal</el-dropdown-item>
                      <el-dropdown-item command="ro">Romania</el-dropdown-item>
                      <el-dropdown-item command="ru">Russia</el-dropdown-item>
                      <el-dropdown-item command="sk">Slovakia</el-dropdown-item>
                      <el-dropdown-item command="sl">Slovenia</el-dropdown-item>
                      <el-dropdown-item command="sv">Sweden</el-dropdown-item>
                      <el-dropdown-item command="tr">Türkiye</el-dropdown-item>
                      <el-dropdown-item command="uk">Ukraine</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </span>
            </li>
          </ul>
        </div>

        <LoginRegister v-if="centerDialogVisible" @hide="hideDialog" />
      </div>
    </nav>
  </header> -->
  <div class="header">
    <el-menu
      :default-active="data.activeIndex"
      class="el-menu-demo hidden-sm-and-down"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item>
        <router-link to="/index">
          <img src="../../assets/logo_new.png" />
        </router-link>
      </el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="1" @click="goPage('/Feature')">功能</el-menu-item>
      <el-menu-item index="2" @click="goPage('/Product')">产品</el-menu-item>
      <el-menu-item index="3" @click="goPage('/FixPrice')">定价</el-menu-item>
      <el-sub-menu index="4">
        <template #title>平台</template>
        <el-menu-item index="4-1" @click="goPage('/Platform')">
          移动端
        </el-menu-item>
        <el-menu-item index="4-2" @click="goPage('/Platform')">
          MT5平台
        </el-menu-item>
        <el-menu-item index="4-3" @click="goPage('/Platform')">
          WAP网页端
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="5" @click="goPage('/teach')">教学</el-menu-item>
      <el-menu-item index="6" @click="goPage('/Support')">支持</el-menu-item>
      <el-dropdown @command="changeLanguage">
        <div class="lang_pc">
          <img src="../../assets/img/newIndex/earth.png" />
          <span>{{ data.langActive }}</span>
          <img src="../../assets/img/newIndex/arrow_down.png" />
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in data.langList"
              :key="item.id"
              :command="item"
            >
              {{ item.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div class="menu-right">
        <div
          v-if="token"
          class="loginLast"
          @click="
            () => {
              router.push({
                path: '/t/trade',
              });
            }
          "
        >
          <img src="../../assets/img/newIndex/user_img.png" />
          <span>{{ userInfo.email }}</span>
        </div>
        <template v-else>
          <div class="menu-button menu-button_1" @click="goTrade">登录</div>
          <div class="menu-button menu-button_2" @click="toggleTab">注册</div>
        </template>
        <div class="menu-button menu-button_3" @click="goPage('/app')">
          下载应用
        </div>
      </div>
    </el-menu>
    <!-- 移动端导航 -->
    <div class="mobile_menu hidden-md-and-up">
      <router-link to="/index">
        <img src="../../assets/logo_new.png" class="logo" />
      </router-link>
      <img
        src="../../assets/img/newIndex/menu.png"
        @click="
          () => {
            data.drawer2 = true;
          }
        "
      />
    </div>
    <el-drawer
      v-model="data.drawer2"
      direction="ltr"
      :show-close="false"
      class="drawer_style"
      size="90%"
    >
      <template #header>
        <div class="back">
          <img
            src="../../assets/img/newIndex/arrow.png"
            @click="
              () => {
                data.drawer2 = false;
              }
            "
          />
        </div>
      </template>
      <div class="router-menu">
        <div @click="goTrade">登录</div>
        <div @click="toggleTab">注册</div>
        <div @click="goPage('/Feature')">功能</div>
        <div @click="goPage('/Product')">产品</div>
        <div @click="goPage('/FixPrice')">定价</div>
        <div @click="goPage('/teach')">教学</div>
        <div @click="goPage('/Support')">支持</div>
        <div @click="goPage('/app')">下载应用</div>
        <div
          @click="
            () => {
              data.innerDrawer = true;
            }
          "
        >
          <span>语言</span>
          <div class="lang_view">
            <span>{{ data.langActive }}</span>
            <img src="../../assets/img/newIndex/vector_2.png" />
          </div>
        </div>
      </div>
      <el-drawer
        v-model="data.innerDrawer"
        size="80%"
        direction="ltr"
        :show-close="false"
        :append-to-body="true"
      >
        <div class="router-menu">
          <div
            v-for="item in data.langList"
            :key="item.id"
            @click="switchLang(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </el-drawer>
    </el-drawer>
    <LoginRegister v-if="centerDialogVisible" ref="Login" @hide="hideDialog" />
  </div>
</template>
<script setup>
import 'element-plus/theme-chalk/display.css';
import LoginRegister from '../../components/common/login.vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {
  ref,
  reactive,
  nextTick,
  onMounted,
  onBeforeMount,
  computed,
} from 'vue';
import { configConst } from '@/config/index.js';
import { useUserStore } from '@/store/index.js';
import { getUserInfoByToken } from '@/api/user.js';
import { tools } from '@/utils/index.js';
const { locale } = useI18n();
const router = useRouter();
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const token = localStorage.getItem(configConst.TOKEN);
const data = reactive({
  activeIndex: 1,
  drawer: false,
  innerDrawer: false,
  langActive: '简体中文',
  langList: [
    {
      name: '简体中文',
      id: 'cn',
    },
    {
      name: 'English',
      id: 'en',
    },
    {
      name: 'Bulgaria',
      id: 'bg',
    },
    {
      name: 'Holland',
      id: 'af',
    },
    {
      name: 'Česká republika',
      id: 'cs',
    },
    {
      name: 'Kongeriget Danmark',
      id: 'da',
    },
    {
      name: 'German',
      id: 'de',
    },
    {
      name: 'Greece',
      id: 'el',
    },
    {
      name: 'Spain',
      id: 'es',
    },
    {
      name: 'Estonia',
      id: 'et',
    },
    {
      name: 'Finland',
      id: 'fi',
    },
    {
      name: 'France',
      id: 'fr',
    },
    {
      name: 'Hungary',
      id: 'hu',
    },
    {
      name: 'Indonesia',
      id: 'id',
    },
    {
      name: 'Italy',
      id: 'it',
    },
    {
      name: 'Japan',
      id: 'ja',
    },
    {
      name: 'Korean',
      id: 'ko',
    },
    {
      name: 'Lithuania',
      id: 'lt',
    },
    {
      name: 'Latvia',
      id: 'lv',
    },
    {
      name: 'Norway',
      id: 'no',
    },
    {
      name: 'Poland',
      id: 'pl',
    },
    {
      name: 'Portugal',
      id: 'pt',
    },
    {
      name: 'Romania',
      id: 'ro',
    },
    {
      name: 'Russia',
      id: 'ru',
    },
    {
      name: 'Slovakia',
      id: 'sk',
    },
    {
      name: 'Slovenia',
      id: 'sl',
    },
    {
      name: 'Sweden',
      id: 'sv',
    },
    {
      name: 'Türkiye',
      id: 'tr',
    },
    {
      name: 'Ukraine',
      id: 'uk',
    },
  ],
});
const centerDialogVisible = ref(false);
onMounted(() => {
  screenLang();
});
onBeforeMount(() => {
  checkToken();
});
const checkToken = async () => {
  if (token) {
    const res = await getUserInfoByToken();
    if (res?.data?.status === 0) {
      const password = tools.decrypt(res.data?.data?.password);
      userStore.setUserInfo({ ...res.data.data, password });
    }
  }
};
const screenLang = () => {
  const langID = localStorage.getItem(configConst.LANGUAGE);
  data.langList.forEach((item) => {
    if (langID === item.id) {
      data.langActive = item.name;
    }
  });
};
const hideDialog = () => {
  centerDialogVisible.value = false;
};
const toggleTab = () => {
  centerDialogVisible.value = true;
  nextTick(() => {
    const Login = ref(null);
    console.log(Login.value);
  });
};
const changeLanguage = (command) => {
  localStorage.setItem(configConst.LANGUAGE, command.id);
  locale.value = command.id;
  location.reload();
  data.langActive = command.name;
};
// 切换语言
const switchLang = (item) => {
  localStorage.setItem(configConst.LANGUAGE, item.id);
  locale.value = item.id;
  location.reload();
  data.langActive = item.name;
};
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath);
};
const goTrade = () => {
  if (localStorage.getItem('token')) {
    router.push({
      path: '/t/trade',
      query: {},
    });
  } else {
    centerDialogVisible.value = true;
  }
};
const goPage = (url) => {
  data.drawer2 = false;
  router.push({
    path: url,
  });
};
</script>

<style scoped>
.linkBlock {
  display: block;
}
a {
  text-decoration: none;
}
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
.goTrade {
  cursor: pointer;
  color: #ffffff;
}
.goLanguage {
  cursor: pointer;
  color: #ffffff;
  margin-left: 30px;
}
.language {
  color: #fff;
}
.el-dropdown-menu {
  overflow: scroll;
  max-height: 200px;
  overflow-x: hidden;
}
</style>
<style lang="less" scoped>
.lang_pc {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  cursor: pointer;
  span {
    margin: 0 6px;
  }
}
.header {
  background-color: #fff;
  height: 98px;
  .el-menu-demo {
    max-width: 1300px;
    margin: 0 auto;
    height: 100%;
    border-bottom: none;
    .el-menu-item {
      font-size: 16px;
      color: #000;
    }
  }
  .flex-grow {
    flex-grow: 1;
  }
  .menu-right {
    display: flex;
    align-items: center;
    .loginLast {
      display: flex;
      align-items: center;
      margin-right: 20px;
      cursor: pointer;
      img {
        width: 40px;
        margin-right: 10px;
      }
    }
    .menu-button {
      width: 92px;
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      cursor: pointer;
    }
    .menu-button_1 {
      color: #2a64a5;
      border: 1px solid #2a64a5;
    }
    .menu-button_2 {
      background: linear-gradient(90deg, #2964a5 0%, #0e305d 100%);
      margin: 0 10px;
    }
    .menu-button_3 {
      background: #239ffe;
    }
  }
}
.mobile_menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 20px;
  .logo {
    width: 138px;
    height: 26px;
  }
}
.back {
  text-align: right;
}
.router-menu {
  > div {
    border-bottom: 1px solid #e4eaed;
    font-size: 16px;
    line-height: 25.6px;
    padding: 10px 0;
    text-align: center;
    position: relative;
    .lang_view {
      position: absolute;
      right: 20px;
      top: 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      height: 100%;
      img {
        margin-left: 15px;
      }
    }
  }
}
@media (max-width: 768px) {
  .header {
    height: 64px;
  }
}
</style>
<style>
.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  font-size: 16px;
  color: #000;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border: none;
}
.drawer_style .el-drawer__body {
  padding: 0;
}
</style>
