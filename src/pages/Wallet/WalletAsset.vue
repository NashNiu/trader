<template>
  <el-card
    :body-style="{ padding: '0px', height: '100%' }"
    class="walletAssetContainer"
  >
    <h3 class="title">Wallet Assets: $11111</h3>
    <div class="contentBox">
      <div v-for="item in walletData" :key="item.name" class="itemBox">
        <div class="iconBox">
          <SvgIcon icon-class="icon-bitcoin" size="50px" color="#f7931a" />
        </div>
        <div class="symbolBox">
          <p class="symbol">{{ item.name }}</p>
          <p class="balance">Wallet Balance</p>
        </div>
        <div class="balanceValue">{{ item.value }}</div>
        <div class="operateBox">
          <SvgIcon
            class="card icon"
            icon-class="icon-creditcard"
            size="35px"
            @click="openExchangeDialog"
          />
          <SvgIcon class="dollar icon" icon-class="icon-dollar1" size="35px" />
        </div>
      </div>
    </div>
    <ExchangeDialog ref="exchangeDialogRef" />
  </el-card>
</template>
<script setup>
import { ref } from 'vue';
import SvgIcon from '@/components/common/svgIcon.vue';
import ExchangeDialog from './Exchange.vue';
const exchangeDialogRef = ref(null);
const openExchangeDialog = () => {
  exchangeDialogRef.value.open();
};
const walletData = [
  {
    name: 'BTC',
    value: '0.0006515411',
  },
  {
    name: 'ETH',
    value: '0.33515411',
  },
  {
    name: 'LTC',
    value: '0.36515454411',
  },
];
</script>
<style lang="less" scoped>
.walletAssetContainer {
  height: 520px;
  overflow: hidden;
  color: #0c3d93;
  margin-top: 10px;
  .title {
    height: 60px;
    display: flex;
    align-items: center;
    background-color: #f8f8f8;
    font-size: 20px;
    padding-left: 15px;
  }
  .contentBox {
    padding: 0 15px;
    box-sizing: border-box;
    height: calc(100% - 60px);
    overflow: scroll;
    &::-webkit-scrollbar {
      width: 3px;
    }
    /* 滚动槽 */
    &::-webkit-scrollbar-track {
      //-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
    }
    /* 滚动条滑块 */
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.1);
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
    }
    &::-webkit-scrollbar-thumb:window-inactive {
      background: rgba(0, 0, 0, 0.1);
    }
    .itemBox {
      height: 100px;
      background-color: #eef2f7;
      display: flex;
      align-items: center;
      margin-top: 15px;
      padding: 20px;
      box-sizing: border-box;
      .symbolBox {
        margin-left: 25px;
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        .symbol {
          font-size: 20px;
          font-weight: bold;
        }
        .balance {
          font-size: 18px;
        }
      }
      .balanceValue {
        align-self: flex-end;
        margin-left: 50px;
        width: 150px;
      }
      .operateBox {
        margin-left: 20px;
        font-size: 30px;
        .icon {
          cursor: pointer;
          &.card {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
