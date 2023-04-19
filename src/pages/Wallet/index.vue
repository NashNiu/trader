<template>
  <div class="walletBox">
    <div class="walletTitle">
      <h3 class="title">{{ t('wallet.myAssets') }}</h3>
      <el-radio-group v-model="tabValue" size="large">
        <el-radio-button label="overview">
          {{ t('wallet.assetsOverview') }}
        </el-radio-button>
        <el-radio-button label="detail">
          {{ t('wallet.capitalDetails') }}
        </el-radio-button>
      </el-radio-group>
    </div>
    <div class="tabContentBox">
      <MyAsset v-show="tabValue === 'overview'" />
      <keep-alive>
        <component :is="component[tabValue]" />
      </keep-alive>
    </div>
  </div>
</template>
<script setup>
import MyAsset from './MyAsset.vue';
import WalletAsset from './WalletAsset.vue';
import CapitalDetail from './CapitalDetails.vue';
import { useI18n } from 'vue-i18n';
import { ref } from 'vue';

const component = {
  overview: WalletAsset,
  detail: CapitalDetail,
};
const { t } = useI18n();
const tabValue = ref('overview');
</script>
<style lang="less" scoped>
.walletBox {
  padding: 20px;
  box-sizing: border-box;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  height: 100%;
  .walletTitle {
    padding-left: 15px;
    .title {
      font-size: 22px;
      color: #0c3d93;
      margin-bottom: 15px;
    }
  }
  .tabContentBox {
    margin-top: 15px;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: #ffffff;
    flex: 1;
    display: flex;
    flex-direction: column;
    height: calc(100% - 80px);
  }
}
</style>
