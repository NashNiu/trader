<template>
  <div class="withdrawContainer">
    <div v-if="step === 1" class="step1">
      <div class="selectBox">
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
                  <CoinIco :size="24" :coin="selectedCoin" class="icon" />
                  <span class="currency">{{ selectedCoin }}</span>
                </p>
                <img :src="DownArrowImg" alt="" class="downArrow" />
              </div>
            </template>
            <template #default>
              <div v-loading="getWalletDataLoading" class="allCoinBox">
                <el-scrollbar max-height="270px">
                  <div
                    v-for="item in coinList"
                    :key="item.currency"
                    class="walletItemBox"
                    :class="{ active: item.currency === selectedCoin }"
                    @click="coinItemClick(item)"
                  >
                    <!--                  <span class="amount">{{ item.available?.toFixed(8) }}</span>-->
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
        <div v-if="selectedCoin" class="chainBox">
          <span class="s2">{{ t('header.selectChain') }}</span>
          <el-popover
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
                  v-for="item in activeNetList"
                  :key="item.chain"
                  class="typeItemBox"
                  :class="{ active: item.chain === selectedType }"
                  @click="selectedType = item.chain"
                >
                  <span class="currency">{{ item.chain }}</span>
                </div>
              </div>
            </template>
          </el-popover>
        </div>
      </div>
      <div v-if="selectedCoin" class="availableBox">
        可提金额 {{ activeCoinBalance }} {{ selectedCoin }}
      </div>
      <div class="inputBox">
        <div class="addressBox">
          <p class="p3">
            {{ t('header.receiptAddress', { coin: selectedCoin }) }}
          </p>
          <el-input
            v-model="withdrawAddress"
            class="inputAddress"
            placeholder="Receipt Address"
          />
        </div>
        <div class="amountBox">
          <div class="labelBox">
            <span class="label">{{ t('header.amount') }}</span>
          </div>
          <div class="amountInputBox">
            <el-input
              v-model="withdrawAmount"
              class="inputAmount"
              type="number"
              step="0.000000001"
              placeholder="Withdraw Amount"
            />
          </div>
        </div>
        <div class="feeBox">
          <p class="p3">{{ t('header.withdrawalFee') }}</p>
          <el-input
            :value="activeNetInfo?.withdrawFee ?? 0"
            disabled
            class="inputAddress"
            :placeholder="t('header.withdrawalFee')"
          />
        </div>
        <div class="infoBox">
          <p class="itemBox">
            <span>实际到账</span>
            <span>{{ actualAmount }} {{ selectedCoin }}</span>
          </p>
        </div>
        <el-button type="primary" class="submitBtn" @click="nextStep">
          {{ t('header.withdrawCoin') }}
        </el-button>
      </div>
    </div>
    <div v-if="step === 2" class="step2">
      <div class="label">{{ t('uc.enterVerifyCode') }}</div>
      <div class="codeBox">
        <el-input v-model="emailCode" class="codeInput" />
        <el-button
          class="sendBtn"
          type="primary"
          :disabled="sendCodeDisabled"
          :loading="sendingCode"
          @click="sendCode"
        >
          {{ sendCodeText }}
        </el-button>
      </div>
      <el-button
        type="primary"
        :disabled="!emailCode"
        class="submitBtn"
        @click="submit"
      >
        {{ t('common.submit') }}
      </el-button>
      <div class="back" @click="back">{{ t('uc.back') }}</div>
    </div>
  </div>
</template>
<script setup>
import DownArrowImg from '@/assets/img/header/down.png';
import { computed, ref, onMounted } from 'vue';
import { useWalletStore } from '@/store/index.js';
import CoinIco from '@/pages/Wallet/component/coinIco.vue';
import { promiseTimeout } from '@vueuse/core';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { newWalletApi } from '@/api';
const emit = defineEmits(['hide']);
const { t } = useI18n();

const step = ref(1);
const walletStore = useWalletStore();
const coinList = computed(() => walletStore.withdrawCoinList);
const getWalletDataLoading = ref(false);
const selectedCoin = ref('');
const selectedType = ref('');
const withdrawAddress = ref('');
const withdrawAmount = ref('');
const activeNetList = computed(() => walletStore.netList[selectedCoin.value]);
const activeCoinBalance = computed(
  () =>
    walletStore.coinBalance.find((item) => item.currency === selectedCoin.value)
      ?.amount ?? 0
);
// 当前币种下网络的信息
const activeNetInfo = computed(() =>
  activeNetList.value?.find((item) => item.chain === selectedType.value)
);
// 实际到账
const actualAmount = computed(() => {
  return (
    withdrawAmount.value
      ? withdrawAmount.value - activeNetInfo.value?.withdrawFee ?? 0
      : 0
  ).toFixed(2);
});

// 邮箱验证码
const emailCode = ref('');
const sendCodeDisabled = ref(false);
const sendCodeText = ref(t('uc.sendCode'));
const sendingCode = ref(false);
const countDown = ref(30);

const getWalletData = async () => {
  getWalletDataLoading.value = true;
  await walletStore.getWithdrawList();
  getWalletDataLoading.value = false;
};
const coinItemClick = async (coin) => {
  if (coin !== selectedCoin.value) {
    selectedCoin.value = coin.currency;
    await walletStore.getNetList(coin.currency);
    await promiseTimeout(50);
    selectedType.value = activeNetList.value[0]?.assetType;
  }
};
const startCount = () => {
  sendCodeDisabled.value = true;
  countDown.value--;
  sendCodeText.value = countDown.value + 's';
  if (countDown.value > 0) {
    setTimeout(startCount, 1000);
  } else {
    sendCodeDisabled.value = false;
    sendCodeText.value = t('uc.sendCode');
    countDown.value = 30;
  }
};
// 发送验证码
const sendCode = async () => {
  sendingCode.value = true;
  const res = await newWalletApi.sendEmailCode();
  sendingCode.value = false;
  if (res.data.status === 0) {
    ElMessage({
      message: t('login.codeSuccess'),
      type: 'success',
    });
    startCount();
  }
};
const nextStep = async () => {
  if (selectedType.value && withdrawAddress.value && withdrawAmount.value) {
    step.value = 2;
  } else {
    ElMessage.error(t('wallet.amountOrAddressWrong'));
  }
};
const submit = async () => {
  const params = {
    mchCode: 'LP', //业务平台标识
    currency: selectedCoin.value, //币种
    chain: selectedType.value, //主网信息
    amount: withdrawAmount.value, //提币数量含手续费
    dcAddr: withdrawAddress.value, //提币地址
    emailVerifyCode: emailCode.value, //邮箱验证码
  };
  const res = await newWalletApi.withdraw(params);
  if (res.data.status === 0) {
    ElMessage.success(t('common.operateSuccess'));
    await walletStore.getBalance({ forceFresh: true });
    emit('hide');
  } else {
    ElMessage.error(res.data.message || t('common.operateFailed'));
  }
};
const back = () => {
  step.value = 1;
};
onMounted(() => {
  walletStore.getBalance();
});
</script>
<style scoped lang="less">
.withdrawContainer {
  padding: 0 30px;
  box-sizing: border-box;
  .step1 {
    .selectBox {
      display: flex;
      justify-content: center;
      align-items: center;
      .currencyBox {
        //width: 300px;
        //margin: 0 auto;
        display: flex;
        align-items: center;
        //padding: 0 20px;
        margin-right: 30px;
        .s1 {
          font-size: 16px;
          font-weight: bold;
          color: #666666;
        }
        .coinDropdown {
          margin-left: 15px;
          //margin-top: 10px;
          //width: 270px;
          height: 52px;
          background-color: #f6f6f6;
          border-radius: 8px;
          border: solid 1px #eeeeee;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 15px;
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
            .currency {
              font-size: 20px;
              font-weight: bold;
              color: #666666;
              margin-left: 10px;
            }
          }
          .downArrow {
            margin-left: 35px;
            width: 18px;
          }
        }
      }
      .chainBox {
        display: flex;
        align-items: center;
        //margin-top: 10px;
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
            margin-left: 35px;
          }
        }
      }
    }
    .availableBox {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      font-size: 16px;
      color: #666666;
      font-weight: bold;
    }
    .inputBox {
      margin-top: 30px;
      .p3 {
        font-size: 16px;
        font-weight: bold;
        color: #666666;
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
      .feeBox {
        margin-top: 20px;
      }
      .infoBox {
        margin-top: 20px;
        font-size: 16px;
        color: #666666;
        font-weight: bold;
        .itemBox {
          display: flex;
          justify-content: space-between;
        }
      }
      .submitBtn {
        //width: 100%;
        padding: 0 50px;
        display: block;
        height: 52px;
        background-color: #0c3d93;
        border-radius: 8px;
        font-size: 20px;
        margin: 20px auto 0;
      }
    }
  }
  .step2 {
    .label {
      font-size: 16px;
      font-weight: bold;
      color: #666666;
    }
    .codeBox {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 52px;
      font-size: 20px;
      .codeInput {
        height: 52px;
        flex: 1;
        background-color: #f6f6f6;
        border-radius: 8px;
        border: solid 1px #eeeeee;
        font-size: 20px;
      }
      .sendBtn {
        height: 52px;
        width: 180px;
        margin-left: 10px;
        font-size: 20px;
      }
    }
    .submitBtn {
      padding: 0 50px;
      display: block;
      //width: 100%;
      height: 52px;
      //background-color: #0c3d93;
      border-radius: 8px;
      font-size: 20px;
      margin: 20px auto 0;
    }
    .back {
      font-size: 16px;
      color: #333333;
      cursor: pointer;
      display: inline-block;
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
