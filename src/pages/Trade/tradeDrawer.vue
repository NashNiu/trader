<template>
  <el-drawer
    v-model="visible"
    direction="rtl"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :with-header="false"
    class="traderDrawerContainer"
    size="500"
    destroy-on-close
  >
    <div class="title">
      <el-icon class="closeIcon" @click="close"><ArrowRightBold /></el-icon>
    </div>
    <div class="contentBox">
      <el-tabs v-model="activeTab" stretch>
        <el-tab-pane name="Market">
          <template #label>
            <span class="tabName">Market</span>
          </template>
          <MarketTab
            ref="marketTabRef"
            :symbol="drawerData?.symbol"
            :type="drawerData.type"
            :digit="digit"
            :step="step"
            :stop-l="stopL"
            :con-size="conSize"
            @close="close"
          />
        </el-tab-pane>
        <el-tab-pane name="Limit">
          <template #label>
            <span class="tabName">Limit</span>
          </template>
          <limit-tab
            ref="limitTabRef"
            :symbol="drawerData?.symbol"
            :type="drawerData.type"
            :digit="digit"
            :step="step"
            :stop-l="stopL"
            :con-size="conSize"
            @close="close"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useSocketStore } from '@/store/index.js';
import MarketTab from './marketTab.vue';
import LimitTab from './limitTab.vue';
const props = defineProps({
  drawerData: {
    type: Object,
    default: () => ({
      type: 'buy',
      symbol: '',
    }),
  },
});
const socketStore = useSocketStore();
// 弹窗是否可见
const visible = ref(false);
// tab
const activeTab = ref('Market');

const marketTabRef = ref(null);
const limitTabRef = ref(null);
// 产品基本信息
const currentSblBasicData = computed(
  () => socketStore.sblBasicData[props.drawerData?.symbol] || {}
);

// 精度
const digit = computed(() => currentSblBasicData.value.digits);
// 每次加减多少
const step = computed(() => Math.pow(10, -digit.value) * 100);
// 产品挂单距离
const stopL = computed(
  () => currentSblBasicData.value.stopl * Math.pow(10, -digit.value) * 10
);
// 杠杆
const conSize = computed(() => currentSblBasicData.value.consize);

// 开启弹窗
const show = () => {
  visible.value = true;
  setTimeout(() => {
    limitTabRef.value?.initValue();
  }, 500);
};
// 关闭弹窗
const close = () => {
  visible.value = false;
  activeTab.value = 'Market';
  limitTabRef.value?.resetValue();
  marketTabRef.value?.resetValue();
};

defineExpose({
  show,
});
</script>
<style scoped lang="less">
@import '@/assets/css/component/trade/tradeDrawer.less';
</style>
<style lang="less">
.traderDrawerContainer {
  padding: 0;
  --el-drawer-padding-primary: 0;
}
</style>
