<template>
  <div :class="`container ${size}`">
    <el-icon class="icon" @click="minus"><RemoveFilled /></el-icon>
    <input
      type="number"
      class="input"
      :value="modelValue"
      :step="0.0000000000001"
      :min="-99999999999999"
      :max="999999999999999999"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <el-icon class="icon" @click="plus"><CirclePlusFilled /></el-icon>
    <div class="tips">
      <slot name="tips"></slot>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
  size: {
    type: String,
    default: 'large',
  },
  modelValue: {
    type: Number,
    default: 1,
  },
});
const emit = defineEmits(['update:modelValue']);

const plus = () => {
  emit('update:modelValue', props.modelValue + 1);
};
const minus = () => {
  emit('update:modelValue', props.modelValue - 1);
};
</script>
<style scoped lang="less">
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #c8c8c8;
  box-sizing: border-box;
  position: relative;
  .input {
    border: none;
    flex: 1;
    text-align: center;
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
  .icon {
    color: #0c3d93;
    cursor: pointer;
  }
  &.large {
    height: 60px;
    .input {
      width: 250px;
      font-size: 30px;
    }
    .icon {
      font-size: 24px;
    }
  }
  &.small {
    height: 35px;
    .input {
      width: 200px;
      font-size: 22px;
    }
    .icon {
      font-size: 20px;
    }
  }
  .tips {
    width: 100%;
    position: absolute;
    bottom: -20px;
    text-align: center;
    font-size: 14px;
  }
}
</style>
