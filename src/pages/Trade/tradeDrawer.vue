<template>
  <el-drawer
    v-model="visible"
    direction="rtl"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :with-header="false"
    class="traderDrawerContainer"
    size="450"
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
          <div>
            <h3 class="symbolName">{{ drawerData?.symbol }}</h3>
            <DeepPrice :symbol="drawerData?.symbol" />
            <el-row :gutter="20" align="middle" justify="space-between">
              <el-col :span="8">
                <span>Quantity</span>
              </el-col>
              <el-col :span="16">
                <InputNumber v-model.number="orderCount" size="small" />
              </el-col>
            </el-row>
            <el-row :gutter="20" align="middle" justify="space-between">
              <el-col :span="8">
                <span>Deposit required</span>
              </el-col>
              <el-col :span="6">
                <span>100000</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" align="middle" justify="space-between">
              <el-col :span="8">
                <span>Stop surplus</span>
              </el-col>
              <el-col :span="4">
                <el-switch />
              </el-col>
            </el-row>
            <el-row :gutter="20" align="middle" justify="space-between">
              <el-col :span="8">
                <span>Stop loss</span>
              </el-col>
              <el-col :span="4">
                <el-switch />
              </el-col>
            </el-row>
            <div class="btnContainer">
              <div class="btnBox" @click="createOrder">
                {{ drawerData.type === 'buy' ? 'Buy' : 'Sell' }}
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane name="Limit">
          <template #label>
            <span class="tabName">Limit</span>
          </template>
          <div>
            <h3 class="symbolName">{{ drawerData?.symbol }}</h3>
            <DeepPrice :symbol="drawerData?.symbol" />
            <el-row :gutter="20" align="middle">
              <el-col :span="8">
                <span>Price</span>
              </el-col>
              <el-col :span="16">
                <InputNumber v-model.number="orderCount" size="small" />
              </el-col>
            </el-row>
            <el-row :gutter="20" align="middle">
              <el-col :span="8">
                <span>Quantity</span>
              </el-col>
              <el-col :span="16">
                <InputNumber v-model.number="orderCount" size="small" />
              </el-col>
            </el-row>
            <el-row :gutter="20" align="middle" justify="space-between">
              <el-col :span="8">
                <span>Deposit required</span>
              </el-col>
              <el-col :span="4">
                <span>100000</span>
              </el-col>
            </el-row>
            <el-row :gutter="20" align="middle" justify="space-between">
              <el-col :span="8">
                <span>Stop surplus</span>
              </el-col>
              <el-col :span="4">
                <el-switch />
              </el-col>
            </el-row>
            <el-row :gutter="20" align="middle" justify="space-between">
              <el-col :span="8">
                <span>Stop loss</span>
              </el-col>
              <el-col :span="4">
                <el-switch />
              </el-col>
            </el-row>
            <div class="btnContainer">
              <div class="btnBox" @click="createHangingOrder">
                {{ drawerData.type === 'buy' ? 'Buy' : 'Sell' }}
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref, defineProps, computed } from 'vue';
import { useSocketStore, useCommonStore } from '@/store/index.js';
import InputNumber from '@/components/common/inputNumber.vue';
import DeepPrice from './deepPrice.vue';
import { ElLoading } from 'element-plus';
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
const commonStore = useCommonStore();
const visible = ref(false);
const activeTab = ref('Market');
const orderCount = ref(1);
const currentSblData = computed(
  () => socketStore.liveData[props.drawerData?.symbol] || {}
);
const currentPrice = computed(() => {
  if (props.drawerData.type === 'buy') {
    return currentSblData.value.ask;
  } else {
    return currentSblData.value.bid;
  }
});
const show = () => {
  visible.value = true;
};
const close = () => {
  visible.value = false;
  orderCount.value = 1;
};
const createOrder = () => {
  const params = {
    sbl: props.drawerData?.symbol,
    vol: orderCount.value,
    price: currentPrice.value,
    type: props.drawerData?.type === 'buy' ? 0 : 1,
  };
  socketStore.marketCreate(params);
  close();
  const instance = ElLoading.service({ lock: true, text: 'wait a minute' });
  commonStore.setLoadingInstance(instance);
};
const createHangingOrder = () => {
  console.log('hang order');
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
  --el-color-primary: #0c3d93;
}
</style>
