<template>
  <el-tabs :tab-position="tabPosition" class="demo-tabs">
    <el-tab-pane label="User">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Grid /></el-icon>
        </span>
      </template>
    </el-tab-pane>
    <el-tab-pane label="Config">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Finished /></el-icon>
        </span>
      </template>
    </el-tab-pane>
    <el-tab-pane label="Role">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><HomeFilled /></el-icon>
        </span>
      </template>
    </el-tab-pane>
    <el-tab-pane label="Task">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Wallet /></el-icon>
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import { ref } from 'vue';
import { Grid, Finished, HomeFilled, Wallet } from '@element-plus/icons-vue';
const tabPosition = ref('left');
</script>

<style scoped>
.demo-tabs {
  background: #0c3d93;
}
.el-icon {
  color: #fff;
  width: 2em;
  height: 2em;
}
.el-icon svg {
  color: #fff;
  width: 2em;
  height: 2em;
}
.el-tabs__item:deep() {
  margin-bottom: 30px !important;
}
</style>
