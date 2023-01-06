<template>
  <el-drawer
    v-model="visible"
    direction="rtl"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :with-header="false"
    class="orderDrawerContainer"
  >
    <div class="title">
      <el-icon class="closeIcon" @click="close"><ArrowRightBold /></el-icon>
    </div>
    <div class="contentBox">
      <p class="type">{{ drawerData.actionType }}</p>
      <h3 class="symbolName">{{ drawerData.symbol }}</h3>
      <p class="price">{{ drawerData.price }}</p>
      <p class="time">{{ drawerData.createTime }}</p>
      <div class="orderInfoBox">
        <div class="infoItemBox">
          <span class="key">Order Number</span>
          <span class="value">{{ drawerData.position }}</span>
        </div>
        <!--        <div>-->
        <!--          <span>Position profit and loss</span>-->
        <!--          <span>{{drawerData.position}}</span>-->
        <!--        </div>-->
        <!--        <div>-->
        <!--          <span>Maintenance margin</span>-->
        <!--          <span>{{drawerData.position}}</span>-->
        <!--        </div>-->
        <div class="infoItemBox">
          <span class="key">Quantity</span>
          <span class="value">{{ drawerData.vol }}</span>
        </div>

        <div class="infoItemBox">
          <span class="key">Current Price</span>
          <span class="value">{{ currentPrice }}</span>
        </div>
        <!--        <div>-->
        <!--          <span>Stop loss price</span>-->
        <!--          <span>{{ drawerData.sl }}</span>-->
        <!--        </div>-->
        <!--        <div>-->
        <!--          <span>Stop surplus price</span>-->
        <!--          <span>{{ drawerData.tp }}</span>-->
        <!--        </div>-->
        <div class="infoItemBox">
          <span class="key">Overnight fee</span>
          <span class="value">{{ drawerData.storage }}</span>
        </div>
      </div>
      <div v-if="!drawerData.isInfo" class="btnContainer">
        <div class="btnBox" @click="closePosition">Close Position</div>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
import { computed, defineProps, ref } from 'vue';
import { useCommonStore, useSocketStore } from '@/store/index.js';
import { ElLoading } from 'element-plus';
const socketStore = useSocketStore();
const commonStore = useCommonStore();
const props = defineProps({
  drawerData: {
    type: Object,
    default: () => ({
      type: 'buy',
      symbol: '',
    }),
  },
});
const currentSblData = computed(
  () => socketStore.liveData[props.drawerData?.symbol] || {}
);
const currentPrice = computed(() => {
  if (props.drawerData.action === 0) {
    return currentSblData.value.ask;
  } else {
    return currentSblData.value.bid;
  }
});
const visible = ref(false);
const show = () => {
  visible.value = true;
};
const close = () => {
  visible.value = false;
};
const closePosition = () => {
  socketStore.marketClose({ id: props.drawerData.position });
  close();
  const instance = ElLoading.service({ lock: true, text: 'wait a minute' });
  commonStore.setLoadingInstance(instance);
};
defineExpose({
  show,
});
</script>
<style scoped lang="less">
@import '@/assets/css/component/order/orderDrawer.less';
</style>
<style lang="less">
.orderDrawerContainer {
  padding: 0;
  --el-drawer-padding-primary: 0;
  --el-color-primary: #0c3d93;
}
</style>
