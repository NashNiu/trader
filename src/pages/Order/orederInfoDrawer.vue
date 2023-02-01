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
          <span class="key">{{ t('order.orderNumber') }}</span>
          <span class="value">{{ drawerData.position }}</span>
        </div>
        <div class="infoItemBox">
          <span class="key">{{ t('common.profit') }}</span>
          <span class="value">{{ drawerData.profit }}</span>
        </div>
        <div class="infoItemBox">
          <span class="key">{{ t('common.quantity') }}</span>
          <span class="value">{{ drawerData.lot }}</span>
        </div>

        <div class="infoItemBox">
          <span class="key">{{ t('common.currentPrice') }}</span>
          <span class="value">{{ drawerData.currentPrice }}</span>
        </div>
        <div class="infoItemBox">
          <span class="key">{{ t('common.stopLossPrice') }}</span>
          <span class="value">{{ drawerData.sl }}</span>
        </div>
        <div class="infoItemBox">
          <span class="key">{{ t('common.stopSurplusPrice') }}</span>
          <span class="value">{{ drawerData.tp }}</span>
        </div>
        <div class="infoItemBox">
          <span class="key">{{ t('common.overnightFee') }}</span>
          <span class="value">{{ drawerData.storage }}</span>
        </div>
      </div>
      <div v-if="!drawerData.isInfo" class="btnContainer">
        <div class="btnBox" @click="closePosition">
          {{ t('order.closePosition') }}
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref } from 'vue';
import { useCommonStore, useSocketStore } from '@/store/index.js';
import { ElLoading } from 'element-plus';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
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
const emit = defineEmits(['close']);
const visible = ref(false);
const show = () => {
  visible.value = true;
};
const close = () => {
  visible.value = false;
  emit('close');
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
