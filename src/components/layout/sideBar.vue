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
      <!--      <el-menu-item-->
      <!--        index="/index"-->
      <!--        :class="{ menuItemActive: activeIndex === '/index' }"-->
      <!--      >-->
      <!--        <el-icon><Grid /></el-icon>-->
      <!--        <template #title><span>Profile</span></template>-->
      <!--      </el-menu-item>-->
      <!--      <el-menu-item-->
      <!--        index="/trade"-->
      <!--        :class="{ menuItemActive: activeIndex === '/trade' }"-->
      <!--      >-->
      <!--        <el-icon><DataLine /></el-icon>-->
      <!--        <template #title><span>Trade</span></template>-->
      <!--      </el-menu-item>-->
      <!--      <el-menu-item-->
      <!--        index="/order"-->
      <!--        :class="{ menuItemActive: activeIndex === '/order' }"-->
      <!--      >-->
      <!--        <el-icon><MessageBox /></el-icon>-->
      <!--        <template #title><span>Order List</span></template>-->
      <!--      </el-menu-item>-->
      <!--      <el-menu-item-->
      <!--        index="/history"-->
      <!--        :class="{ menuItemActive: activeIndex === '/history' }"-->
      <!--      >-->
      <!--        <el-icon><Document /></el-icon>-->
      <!--        <template #title><span>History Order</span></template>-->
      <!--      </el-menu-item>-->
      <!--      <el-menu-item-->
      <!--        index="/wallet"-->
      <!--        :class="{ menuItemActive: activeIndex === '/wallet' }"-->
      <!--      >-->
      <!--        <el-icon><SvgIcon icon-class="icon-wallet" /></el-icon>-->
      <!--        <template #title><span>Wallet</span></template>-->
      <!--      </el-menu-item>-->

      <el-menu-item
        v-for="item in menuItemData"
        :key="item.index"
        :index="item.index"
        :class="{ menuItemActive: activeIndex === item.index }"
      >
        <el-icon><SvgIcon :icon-class="item.icon" /></el-icon>
        <template #title
          ><span>{{ item.title }}</span></template
        >
      </el-menu-item>
    </el-menu>
    <ProfileDrawer ref="profileDrawerRef" />
  </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue';
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
    index: '/trade',
    icon: 'icon-chart',
    title: 'Trade',
  },
  {
    index: '/order',
    icon: 'icon-cart',
    title: 'Order',
  },
  {
    index: '/history',
    icon: 'icon-history',
    title: 'History',
  },
  {
    index: '/wallet',
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
