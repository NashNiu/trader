<template>
  <SvgIcon
    :icon-class="coinClass"
    :size="size + 'px'"
    :color="coinColor[coin] || '#ffbe4e'"
  />
</template>
<script setup>
import SvgIcon from '@/components/common/svgIcon.vue';
import { computed } from 'vue';
const props = defineProps({
  coin: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 50,
  },
});
const coinClass = computed(() => {
  if (Object.keys(coinColor).includes(props.coin)) {
    return `icon-${props.coin.toLowerCase()}`;
  } else {
    return `icon-bitcoin`;
  }
});
const coinColor = {
  ETH: '#3e5bf2',
  USDT: '#1ba27a',
  USDC: '#2775ca',
  BNB: '#f4bb0b',
  DOGE: '#c3a723',
  BCH: '#8ac072',
  LTC: '#e59c38',
  XRP: '#168dc3',
  // bitcoin: '#ffbe4e',
};
</script>
