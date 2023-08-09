<template>
  <div>
    <Header />
    <div class="content">
      <img src="../../assets/img/error.png" />
    </div>
    <Footer />
  </div>
</template>
<script setup>
import Header from '../index/Header.vue';
import Footer from '../index/Footer.vue';
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 667px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F8F8F8;
}
</style>