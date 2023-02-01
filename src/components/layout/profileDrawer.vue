<template>
  <el-drawer v-model="visible" direction="ltr" size="400">
    <div class="titleBox">
      <img :src="userImg" alt="" />
      <div class="userBox">
        <p>{{ userInfo.mtaccr }}</p>
      </div>
    </div>
    <div class="mainBox">
      <p class="item">
        <el-dropdown @command="changeLanguage">
          <span class="language">{{ t('common.language') }}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="cn">简体中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </p>
      <p class="item" @click="logOut">{{ t('user.logout') }}</p>
    </div>
  </el-drawer>
</template>
<script setup>
import { computed, ref } from 'vue';
import userImg from '@/assets/img/sidebar/user.png';
import { useUserStore } from '@/store/index.js';
import { tools } from '@/utils/index.js';
import { useI18n } from 'vue-i18n';
import { configConst } from '@/config/index.js';

const { t, locale } = useI18n();
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const visible = ref(false);
const changeLanguage = (command) => {
  localStorage.setItem(configConst.LANGUAGE, command);
  locale.value = command;
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
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  img {
    margin-right: 15px;
  }
  .userBox {
    font-size: 20px;
    color: #0c3d93;
  }
}
.mainBox {
  padding-left: 20px;
  margin-top: 30px;
  .item {
    color: #0c3d93;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    margin-top: 20px;
    .language {
      color: #0c3d93;
      font-size: 20px;
      cursor: pointer;
      font-weight: bold;
    }
  }
}
</style>
