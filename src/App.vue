<script setup>
import Header from './components/common/Header.vue';
import Popular from './components/common/Popular.vue';
</script>

<template>
  <div id="app">
    <Header />
    <!-- <router-view></router-view> -->
    <Popular />
  </div>
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
