<template>
  <div class="withdrawContainer">
    <div v-if="step === 1" class="step1">
      <div class="currencyBox">
        <span class="s1">{{ t('header.currency') }}</span>
        <el-popover
          :show-arrow="false"
          trigger="hover"
          :offset="10"
          popper-class="walletCoinPop"
          :popper-style="{ width: 'auto' }"
          placement="bottom-start"
          @show="() => getWalletData()"
        >
          <template #reference>
            <div class="coinDropdown">
              <p class="p1">
                <span class="amount">
                  {{ selectedCoin?.available?.toFixed(8) }}
                </span>
                <CoinIco
                  :size="24"
                  :coin="selectedCoin.currency"
                  class="icon"
                />
              </p>
              <img :src="DownArrowImg" alt="" class="downArrow" />
            </div>
          </template>
          <template #default>
            <div v-loading="getWalletDataLoading" class="allCoinBox">
              <el-scrollbar max-height="270px">
                <div
                  v-for="item in walletData"
                  :key="item.id"
                  class="walletItemBox"
                  :class="{ active: item.currency === selectedCoin }"
                  @click="coinItemClick(item)"
                >
                  <span class="amount">{{ item.available?.toFixed(8) }}</span>
                  <p class="p2">
                    <CoinIco class="icon" :size="24" :coin="item.currency" />
                    <span class="currency">{{ item.currency }}</span>
                  </p>
                </div>
              </el-scrollbar>
            </div>
          </template>
        </el-popover>
      </div>
      <div class="chainBox">
        <p class="p3">
          <CoinIco :size="16" :coin="selectedCoin.currency" />
          {{ t('header.receiptAddress', { coin: selectedCoin.currency }) }}
        </p>
        <div class="selectBox">
          <span class="s2">{{ t('header.selectChain') }}</span>
          <el-popover
            v-if="selectedCoin"
            :show-arrow="false"
            trigger="hover"
            :offset="10"
            popper-class="walletCoinPop"
            :popper-style="{ width: 'auto' }"
            placement="bottom-start"
          >
            <template #reference>
              <div class="typeDropdown">
                <span>{{ selectedType }}</span>
                <img :src="DownArrowImg" alt="" />
              </div>
            </template>
            <template #default>
              <div class="allTypeBox">
                <div
                  v-for="item in activeTypeArray"
                  :key="item.id"
                  class="typeItemBox"
                  :class="{ active: item.assetType === selectedType }"
                  @click="selectedType = item.assetType"
                >
                  <span class="currency">{{ item.assetType }}</span>
                </div>
              </div>
            </template>
          </el-popover>
        </div>
        <el-input
          v-model="withdrawAddress"
          class="inputAddress"
          placeholder="Receipt Address"
        />
        <div class="amountBox">
          <div class="labelBox">
            <span class="label">{{ t('header.amount') }}</span>
            <span class="price">{{ selectedCoin?.available }}</span>
          </div>
          <div class="amountInputBox">
            <el-input
              v-model="withdrawAmount"
              class="inputAmount"
              type="number"
              step="0.000000001"
              placeholder="Withdraw Amount"
            >
              <template #suffix>
                <CoinIco :size="24" :coin="selectedCoin.currency" />
              </template>
              <template #append>
                <div
                  class="max"
                  @click="withdrawAmount = selectedCoin?.available"
                >
                  {{ t('header.max') }}
                </div>
              </template>
            </el-input>
          </div>
        </div>
        <el-button type="primary" class="submitBtn" @click="submit">
          {{ t('header.withdraw') }}
        </el-button>
        <div class="tips">
          {{ t('header.minWithdraw') }} 0.00020000
          <CoinIco :size="16" :coin="selectedCoin.currency" />
          .
          {{
            t('header.withdrawFee', {
              coin: selectedCoin.currency,
              fee: '0.00007',
            })
          }}
        </div>
      </div>
    </div>
    <div v-if="step === 2" class="step2">
      <div class="label">{{ t('header.enterWithdrawPass') }}</div>
      <el-input
        v-model="password"
        class="inputPass"
        placeholder="password"
        type="password"
        show-password
      />
      <el-button type="primary" class="submitBtn" @click="enterPass">
        {{ t('common.submit') }}
      </el-button>
      <div class="back" @click="back">{{ t('uc.back') }}</div>
    </div>
  </div>
</template>
<script setup>
import DownArrowImg from '@/assets/img/header/down.png';
import { computed, ref } from 'vue';
import { useHeaderStore } from '@/store/index.js';
import CoinIco from '@/pages/Wallet/component/coinIco.vue';
import { promiseTimeout } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { userApi } from '@/api';
const emit = defineEmits(['hide']);
const { t } = useI18n();
const headerStore = useHeaderStore();
const walletData = computed(() => headerStore.walletData);
const addressData = computed(() => headerStore.addressData);
const getWalletDataLoading = ref(false);
const selectedCoin = ref({});
const selectedType = ref('');
const withdrawAddress = ref('');
const withdrawAmount = ref('');
const password = ref('');
const step = ref(1);
const activeTypeArray = computed(() => {
  if (selectedCoin.value.currency) {
    const target = addressData.value.find(
      (item) => item.assetCoin === selectedCoin.value.currency
    );
    return target?.children ?? [];
  } else {
    return [];
  }
});
const getWalletData = async (forceFresh = false) => {
  getWalletDataLoading.value = true;
  await headerStore.getWalletData({ forceFresh });
  getWalletDataLoading.value = false;
};
const coinItemClick = async (coin) => {
  if (coin !== selectedCoin.value) {
    selectedCoin.value = coin;
    await promiseTimeout(50);
    selectedType.value = activeTypeArray.value[0]?.assetType;
  }
};
const submit = async () => {
  if (selectedType.value && withdrawAddress.value && withdrawAmount.value) {
    const params = {
      platName: 'LP',
      amount: withdrawAmount.value,
      externalAddress: withdrawAddress.value,
      withdrawChannel: 1,
      assetCoin: selectedCoin.value?.currency,
      assetType: selectedType.value,
    };
    const res = await userApi.walletWithdraw(params);
    if (!res.data.status) {
      ElMessage.success(t('common.operateSuccess'));
      await getWalletData(true);
      emit('hide');
    } else {
      ElMessage.error(res.data.message || t('common.operateFailed'));
    }
  } else {
    ElMessage.error(t('wallet.amountOrAddressWrong'));
  }
};
const enterPass = () => {
  console.log(password.value);
};
const back = () => {
  step.value = 1;
};
</script>
<style scoped lang="less">
.withdrawContainer {
  padding: 0 30px;
  box-sizing: border-box;
  .step1 {
    .currencyBox {
      width: 300px;
      margin: 0 auto;
      .s1 {
        font-size: 16px;
        font-weight: bold;
        color: #666666;
      }
      .coinDropdown {
        margin-top: 10px;
        width: 270px;
        height: 52px;
        background-color: #f6f6f6;
        border-radius: 8px;
        border: solid 1px #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
        cursor: pointer;
        .p1 {
          display: flex;
          align-items: center;
          .amount {
            margin-right: 5px;
            font-size: 20px;
            //font-weight: bold;
            color: #666666;
          }
        }

        .downArrow {
          width: 24px;
        }
      }
    }
    .chainBox {
      margin-top: 30px;
      .p3 {
        font-size: 16px;
        font-weight: bold;
        color: #666666;
      }
      .selectBox {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .s2 {
          font-size: 16px;
          font-weight: bold;
          color: #666666;
        }
        .typeDropdown {
          margin-left: 20px;
          padding: 0 15px;
          height: 52px;
          background-color: #f6f6f6;
          border-radius: 8px;
          border: solid 1px #eeeeee;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          font-size: 20px;
          //font-weight: bold;
          color: #666666;
          img {
            margin-left: 15px;
          }
        }
      }
      .inputAddress {
        height: 52px;
        background-color: #f6f6f6;
        border-radius: 8px;
        border: solid 1px #eeeeee;
        font-size: 20px;
        margin-top: 10px;
      }
      .amountBox {
        margin-top: 20px;
        .labelBox {
          display: flex;
          justify-content: space-between;
          font-size: 16px;
          font-weight: bold;
          color: #666666;
        }
        .amountInputBox {
          margin-top: 10px;
          .inputAmount {
            height: 52px;
            background-color: #f6f6f6;
            border-radius: 8px;
            border: solid 1px #eeeeee;
            font-size: 20px;
            .max {
              cursor: pointer;
            }
          }
        }
      }
      .submitBtn {
        width: 100%;
        height: 52px;
        background-color: #0c3d93;
        border-radius: 8px;
        font-size: 20px;
        margin-top: 20px;
      }
      .tips {
        margin-top: 15px;
        font-size: 16px;
        color: #666666;
        word-break: break-word;
        line-height: 20px;
      }
    }
  }
  .step2 {
    .label {
      font-size: 16px;
      font-weight: bold;
      color: #666666;
    }
    .inputPass {
      margin-top: 15px;
      height: 52px;
      background-color: #f6f6f6;
      border-radius: 8px;
      border: solid 1px #eeeeee;
      font-size: 20px;
    }
    .submitBtn {
      width: 100%;
      height: 52px;
      background-color: #0c3d93;
      border-radius: 8px;
      margin: 20px 0;
      font-size: 20px;
    }
    .back {
      font-size: 16px;
      color: #333333;
      cursor: pointer;
    }
  }
}
.allCoinBox {
  .walletItemBox {
    //width: 270px;
    height: 48px;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    .amount {
      margin-right: 15px;
    }
    .p2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        margin-right: 5px;
      }
    }
    span {
      font-size: 20px;
      //font-weight: bold;
      color: #666666;
    }
    &:hover,
    &.active {
      background-color: #eef2f7;
    }
  }
}

.allTypeBox {
  .typeItemBox {
    height: 48px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover,
    &.active {
      background-color: #eef2f7;
    }
    .icon {
      margin-left: 15px;
    }
    .currency {
      font-size: 20px;
      //font-weight: bold;
      color: #666666;
      margin-left: 15px;
    }
  }
}
</style>
