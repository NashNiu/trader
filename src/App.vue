<script setup>
import Index from './pages/Index.vue';
import Trade from './pages/Trade.vue';
</script>

<template>
  <!-- <Index />
  <Trade /> -->
  <router-view></router-view>
</template>

<style scoped>
@import './assets/css/reset.css';
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
