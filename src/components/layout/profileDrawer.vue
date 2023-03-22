<template>
  <el-drawer v-model="visible" direction="ltr" size="350">
    <div class="titleBox">
      <img :src="userImg" alt="" />
      <div class="userBox">
        <p>{{ userInfo.mtaccr }}</p>
      </div>
    </div>
    <div class="mainBox">
      <div class="item" @click="toggleLanguage">
        <p class="title">
          <img :src="enImg" alt="" />
          <span>{{ t('common.language') }}</span>
        </p>
        <span>
          <img :src="showLanguage ? upImg : downImg" alt="" />
        </span>
      </div>
      <div v-if="showLanguage" class="contentBox">
        <el-scrollbar height="200px">
          <p
            v-for="item in languageArr"
            :key="item.value"
            :class="`contentItem ${locale === item.value ? 'active' : ''}`"
            @click="changeLanguage(item.value)"
          >
            {{ item.label }}
          </p>
        </el-scrollbar>
      </div>
      <div class="item" @click="logOut">
        <p class="title">
          <img :src="logoutImg" alt="" />
          <span>{{ t('user.logout') }}</span>
        </p>
        <span></span>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
import { computed, ref } from 'vue';
import userImg from '@/assets/img/sidebar/user1.png';
import downImg from '@/assets/img/sidebar/down.png';
import upImg from '@/assets/img/sidebar/up.png';
import logoutImg from '@/assets/img/sidebar/logout.png';
import enImg from '@/assets/img/sidebar/en.png';
import { useUserStore } from '@/store/index.js';
import { tools } from '@/utils/index.js';
import { useI18n } from 'vue-i18n';
import { configConst } from '@/config/index.js';
// import { commonApi } from '@/api';
const { t, locale } = useI18n();
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const visible = ref(false);
const showLanguage = ref(false);
const languageArr = [
  {
    value: 'cn',
    label: '简体中文',
  },
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'bg',
    label: 'Bulgaria',
  },
  {
    value: 'af',
    label: 'Holland',
  },
  {
    value: 'cs',
    label: 'Česká republika',
  },
  {
    value: 'da',
    label: 'Kongeriget Danmark',
  },
  {
    value: 'de',
    label: 'German',
  },
  {
    value: 'el',
    label: 'Greece',
  },
  {
    value: 'es',
    label: 'Spain',
  },
  {
    value: 'et',
    label: 'Estonia',
  },
  {
    value: 'fi',
    label: 'Finland',
  },
  {
    value: 'fr',
    label: 'France',
  },
  {
    value: 'hu',
    label: 'Hungary',
  },
  {
    value: 'id',
    label: 'Indonesia',
  },
  {
    value: 'it',
    label: 'Italy',
  },
  {
    value: 'ja',
    label: 'Japan',
  },
  {
    value: 'ko',
    label: 'Korean',
  },
  {
    value: 'lt',
    label: 'Lithuania',
  },
  {
    value: 'lv',
    label: 'Latvia',
  },
  {
    value: 'no',
    label: 'Norway',
  },
  {
    value: 'pl',
    label: 'Poland',
  },
  {
    value: 'pt',
    label: 'Portugal',
  },
  {
    value: 'ro',
    label: 'Romania',
  },
  {
    value: 'ru',
    label: 'Russia',
  },
  {
    value: 'sk',
    label: 'Slovakia',
  },
  {
    value: 'sl',
    label: 'Slovenia',
  },
  {
    value: 'sv',
    label: 'Sweden',
  },
  {
    value: 'tr',
    label: 'Türkiye',
  },
  {
    value: 'uk',
    label: 'Ukraine',
  },
];
const toggleLanguage = () => {
  showLanguage.value = !showLanguage.value;
};
const changeLanguage = async (command) => {
  localStorage.setItem(configConst.LANGUAGE, command);
  locale.value = command;
  // await commonApi.setLanguage(command);
  location.reload();
};
const show = () => {
  visible.value = true;
};
const logOut = () => {
  tools.clearAndLogout();
};
defineExpose({
  show,
});
</script>
<style lang="less" scoped>
.titleBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  img {
    margin-bottom: 10px;
    width: 50px;
  }
  .userBox {
    font-size: 20px;
    color: #000000;
  }
}
.mainBox {
  padding-left: 20px;
  margin-top: 50px;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333333;
    font-size: 18px;
    cursor: pointer;
    //font-weight: bold;
    margin-top: 30px;
    .title {
      display: flex;
      align-items: center;
      font-family: 'Microsoft YaHei', '微软雅黑';
      img {
        margin-right: 5px;
        //width: 20px;
      }
    }
    .language {
      color: #0c3d93;
      font-size: 20px;
      cursor: pointer;
      font-weight: bold;
    }
  }
  .contentBox {
    padding: 10px 0;
    margin-top: 20px;
    background-color: #f4f4f4;
    border-radius: 4px;
    //max-height: 200px;
    //overflow-y: scroll;
    .contentItem {
      height: 34px;
      line-height: 34px;
      color: #333333;
      padding-left: 10px;
      cursor: pointer;
      &.active {
        background-color: #0c3d93;
        color: #ffffff;
      }
    }
  }
}
.el-dropdown-menu {
  overflow: scroll;
  max-height: 200px;
  overflow-x: hidden;
}
</style>
