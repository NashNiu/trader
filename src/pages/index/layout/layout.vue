<template>
  <div>
    <Header />
    <div>
      <router-view />
    </div>
    <Footer />
  </div>
</template>
<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
import Header from '../Header.vue';
import Footer from '../Footer.vue';
watch(() => route.path,(newPath, oldPath) => {
  if (oldPath !== undefined && newPath !== oldPath) {
    window.scrollTo(0, 0);
  }
},{ immediate: true });
</script>
