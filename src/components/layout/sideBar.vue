<template>
  <div class="sideBarBox">
    <el-menu
      :default-active="activeIndex"
      collapse
      class="sideBar"
      background-color="#0c3d93"
      text-color="#ffffff"
      @select="menuOpen"
    >
      <el-menu-item
        v-for="item in menuItemData"
        :key="item.index"
        :index="item.index"
        :class="{ menuItemActive: activeIndex === item.index }"
      >
        <el-icon><SvgIcon :icon-class="item.icon" /></el-icon>
        <template #title>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
      <div class="sideBarOther">
        <Img :src="HelpImg" class="otherItem" @click="clickHelp" />
      </div>
    </el-menu>
    <ProfileDrawer ref="profileDrawerRef" />
  </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import ProfileDrawer from './profileDrawer.vue';
import { useI18n } from 'vue-i18n';
import HelpImg from '@/assets/img/sidebar/help.png';
import { configUrl } from '@/config';
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const activeIndex = ref(route.path);
const profileDrawerRef = ref(null);
const menuItemData = [
  {
    index: '/index',
    icon: 'icon-menu',
    title: t?.('menu.profile'),
  },
  {
    index: '/t/trade',
    icon: 'icon-chart',
    title: t?.('menu.trade'),
  },
  {
    index: '/t/order',
    icon: 'icon-cart',
    title: t?.('menu.order'),
  },
  {
    index: '/t/limit',
    icon: 'icon-unorderedlist',
    title: t?.('menu.limit'),
  },
  {
    index: '/t/history',
    icon: 'icon-history',
    title: t?.('menu.history'),
  },
  {
    index: '/t/wallet',
    icon: 'icon-wallet',
    title: t?.('menu.wallet'),
  },
  {
    index: '/t/customer',
    icon: 'icon-dollar',
    title: t?.('menu.customer'),
  },
  {
    index: '/t/customerCount',
    icon: 'icon-bnb',
    title: t?.('menu.customerCount'),
  },
  {
    index: '/t/commManage',
    icon: 'icon-doge',
    title: t?.('menu.commManage'),
  },
];
const menuOpen = (index) => {
  if (index === '/index') {
    profileDrawerRef.value.show();
  } else {
    router.push(index);
  }
};
const clickHelp = () => {
  window.open(configUrl.helpUrl);
};
watch(
  () => router.currentRoute.value,
  (nv) => {
    activeIndex.value = nv.path;
  }
);
</script>
<style lang="less">
.sideBarBox {
  height: 100%;
  .sideBar {
    height: 100%;
    .menuItemActive {
      background-color: #266fe8;
      color: #ffffff;
      box-sizing: border-box;
      border-left: 6px solid #ffffff;
    }
    .sideBarOther {
      width: 100%;
      position: absolute;
      top: 85%;
      display: flex;
      align-items: center;
      flex-direction: column;
      .otherItem {
        cursor: pointer;
      }
    }
  }
  .el-menu-item.is-active {
    color: #fff;
  }
}
</style>
