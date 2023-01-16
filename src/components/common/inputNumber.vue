<template>
  <div :class="`container ${size}`">
    <el-icon class="icon" @click="minus"><RemoveFilled /></el-icon>
    <input
      type="number"
      class="input"
      :value="inputValue"
      :step="0.0000000000001"
      :min="-999999999999999"
      :max="9999999999999999"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <el-icon class="icon" @click="plus"><CirclePlusFilled /></el-icon>
    <div class="tips">
      <slot name="tips"></slot>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  size: {
    type: String,
    default: 'large',
  },
  modelValue: {
    type: [Number, String],
    default: 1,
  },
  // 每次加减最小值
  step: {
    type: Number,
    default: 1,
  },
  // 保留几位小数
  digit: {
    type: Number,
    default: 2,
  },
});
const emit = defineEmits(['update:modelValue']);
const inputValue = computed({
  get() {
    if (props.modelValue) {
      return Number(props.modelValue);
    } else {
      return 0;
    }
  },
  set() {},
});
const plus = () => {
  emit(
    'update:modelValue',
    Number((props.modelValue + props.step).toFixed(props.digit))
  );
};
const minus = () => {
  emit(
    'update:modelValue',
    Number((props.modelValue - props.step).toFixed(props.digit))
  );
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
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }
    &[type='number'] {
      -moz-appearance: textfield;
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
