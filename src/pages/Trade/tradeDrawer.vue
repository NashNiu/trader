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
            <div class="price">current price: {{ currentPrice }}</div>
            <div class="inputNumberBox">
              <InputNumber v-model.number="orderCount" />
            </div>
            <div class="deepPriceBox">
              <div class="deepPriceTitle">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <span>Bid</span>
                  </el-col>
                  <el-col :span="12">
                    <span>Ask</span>
                  </el-col>
                </el-row>
              </div>
              <el-row :gutter="20">
                <el-col :span="12">
                  <div
                    v-for="(item, index) in symbolDeepBid"
                    :key="index"
                    :class="`deepPriceItemBox ${item.change}`"
                  >
                    <span>
                      <span class="index">{{ index + 1 }}</span>
                      <span class="deepPrice">{{
                        item.price.toFixed(symbolBasicData?.digits ?? 2)
                      }}</span>
                    </span>
                    <span class="vol">{{ item.vol }}</span>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div
                    v-for="(item, index) in symbolDeepAsk"
                    :key="index"
                    :class="`deepPriceItemBox ${item.change}`"
                  >
                    <span>
                      <span class="index ask">{{ index + 1 }}</span>
                      <span class="deepPrice">{{
                        item.price.toFixed(symbolBasicData?.digits ?? 2)
                      }}</span>
                    </span>
                    <span class="vol">{{ item.vol }}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="btnContainer">
              <div class="btnBox" @click="createOrder">
                {{ drawerData.type === 'buy' ? 'Buy' : 'Sell' }}
              </div>
            </div>
          </div>
        </el-tab-pane>
        <!--        <el-tab-pane name="Limit">-->
        <!--          <template #label>-->
        <!--            <span class="tabName">Limit</span>-->
        <!--          </template>-->
        <!--        </el-tab-pane>-->
      </el-tabs>
    </div>
  </el-drawer>
</template>
<script setup>
import { ref, defineProps, computed } from 'vue';
import { useSocketStore, useCommonStore } from '@/store/index.js';
import InputNumber from '@/components/common/inputNumber.vue';
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
const symbolBasicData = computed(() => {
  return socketStore.sblBasicData?.[props.drawerData?.symbol];
});
const symbolDeepAsk = computed(() => {
  return (
    socketStore.deepQuotation?.[props.drawerData?.symbol]?.filter(
      (item) => item.type === 1
    ) ?? []
  );
});
const symbolDeepBid = computed(() => {
  return (
    socketStore.deepQuotation?.[props.drawerData?.symbol]?.filter(
      (item) => item.type === 2
    ) ?? []
  );
});
const visible = ref(false);
const activeTab = ref('Market');
const orderCount = ref(1);
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
  // setTimeout(() => {
  //   commonStore.closeLoading();
  // }, 2000);
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
