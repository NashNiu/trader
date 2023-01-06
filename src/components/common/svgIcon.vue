<template>
  <svg :class="classList" aria-hidden="false">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  className: {
    type: String,
    default: '',
  },
  iconClass: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  size: {
    type: String,
    default: '20px',
  },
});
const classList = computed(() => {
  return ['icon', props.className || ''];
});
const iconName = computed(() => {
  return `#${props.iconClass}`;
});
</script>
<style scoped>
.icon {
  width: v-bind('props.size');
  height: v-bind('props.size');
  position: relative;
  vertical-align: -2px;
  fill: v-bind('props.color');
}
</style>
