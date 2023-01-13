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
    </el-menu>
    <ProfileDrawer ref="profileDrawerRef" />
  </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import ProfileDrawer from './profileDrawer.vue';
const router = useRouter();
const route = useRoute();
const activeIndex = ref(route.path);
const profileDrawerRef = ref(null);
const menuItemData = [
  {
    index: '/index',
    icon: 'icon-menu',
    title: 'Profile',
  },
  {
    index: '/t/trade',
    icon: 'icon-chart',
    title: 'Trade',
  },
  {
    index: '/t/order',
    icon: 'icon-cart',
    title: 'Order',
  },
  {
    index: '/t/limit',
    icon: 'icon-unorderedlist',
    title: 'limit list',
  },
  {
    index: '/t/history',
    icon: 'icon-history',
    title: 'History',
  },
  {
    index: '/t/wallet',
    icon: 'icon-wallet',
    title: 'Wallet',
  },
];
const menuOpen = (index) => {
  if (index === '/index') {
    profileDrawerRef.value.show();
  } else {
    router.push(index);
  }
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
  }
}
</style>
