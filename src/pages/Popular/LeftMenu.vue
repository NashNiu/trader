<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        active-text-color="#fff"
        background-color="#0c3d93"
        class="el-menu-vertical-demo"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <el-icon><Grid /></el-icon>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Handbag /></el-icon>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><Paperclip /></el-icon>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><CreditCard /></el-icon>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import {
  Grid,
  Handbag,
  Paperclip,
  CreditCard as IconMenu,
} from '@element-plus/icons-vue';
</script>

<style scoped>
.tac {
  width: 150px;
  position: fixed;
  left: 0;
}
</style>
