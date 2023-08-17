<template>
  <div class="platform">
    <div class="banner">
      <h4>{{ t('plat.mt5') }}</h4>
      <p>
        {{ t('plat.title1') }}
        <br />
        {{ t('plat.title2') }}
      </p>
    </div>
    <div class="width_1270 once-view">
      <el-row align="middle">
        <el-col :md="12">
          <img src="../../../assets/img/newIndex/P_img.png" />
        </el-col>
        <el-col :md="12">
          <div class="once-view_button">
            <p>{{ t('plat.tradeNow') }}</p>
            <p>
              {{ t('plat.or') }}
              <span>{{ t('plat.title2') }}</span>
            </p>
          </div>
          <p style="font-size: 16px; color: #2963a4">
            {{ t('plat.p1') }}
          </p>
        </el-col>
      </el-row>
    </div>
    <div class="width_1270 MT5Model">
      <div id="MT5" class="MT5Model_1">
        <div class="MT5Model_1_title">
          <h1>{{ t('plat.mt5Down') }}</h1>
          <h2>{{ t('plat.applyTo') }}</h2>
          <p>
            {{ t('plat.wide') }}，
            <br />
            {{ t('plat.extra') }}。
          </p>
        </div>
      </div>
      <el-row :gutter="40">
        <el-col :md="12">
          <div class="list-model">
            <div>
              <img src="../../../assets/img/newIndex/dui.png" />
              <span>{{ t('plat.indicator') }}</span>
            </div>
            <div>
              <img src="../../../assets/img/newIndex/dui.png" />
              <span>{{ t('plat.tools') }}</span>
            </div>
            <div>
              <img src="../../../assets/img/newIndex/dui.png" />
              <span>{{ t('plat.frame') }}</span>
            </div>
            <div>
              <img src="../../../assets/img/newIndex/dui.png" />
              <span>{{ t('plat.orderType') }}</span>
            </div>
            <div>
              <img src="../../../assets/img/newIndex/dui.png" />
              <span>{{ t('plat.chart') }}</span>
            </div>
            <div>
              <img src="../../../assets/img/newIndex/dui.png" />
              <span>{{ t('plat.trade') }}</span>
            </div>
            <div>
              <img src="../../../assets/img/newIndex/dui.png" />
              <span>{{ t('plat.trackLoss') }}</span>
            </div>
          </div>
        </el-col>
        <el-col :md="12">
          <div class="list-model">
            <div>
              <img src="../../../assets/img/newIndex/dui.png" />
              <span>{{ t('plat.interface') }}</span>
            </div>
            <div>
              <img src="../../../assets/img/newIndex/dui.png" />
              <span>{{ t('plat.customizable') }}</span>
            </div>
            <div>
              <img src="../../../assets/img/newIndex/dui.png" />
              <span>{{ t('plat.EA') }}</span>
            </div>
            <div>
              <img src="../../../assets/img/newIndex/dui.png" />
              <span>{{ t('plat.calendar') }}</span>
            </div>
            <div>
              <img src="../../../assets/img/newIndex/dui.png" />
              <span>{{ t('plat.DOM') }}</span>
            </div>
            <div>
              <img src="../../../assets/img/newIndex/dui.png" />
              <span>{{ t('plat.OS') }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="MT5Model_down">
        <el-col :md="12">
          <img src="../../../assets/img/newIndex/P_img_2.png" />
        </el-col>
        <el-col :md="9" :push="3" class="MT5Model_down_right">
          <div>
            <h4>
              {{ t('plat.freeDown') }}
            </h4>
            <div class="down_button" @click="downMt5">
              {{ t('plat.forWin') }}
            </div>
            <div class="down_button down_button_black" @click="downMt5">
              {{ t('plat.forMac') }}
            </div>
            <div class="down_table">
              <div>
                <p>{{ t('plat.osRequire') }}:</p>
                <p>
                  {{ t('plat.requirement') }}
                </p>
              </div>
              <div>
                <p>{{ t('plat.attention') }}:</p>
                <p>
                  {{ t('plat.a1') }}，
                  <br />
                  {{ t('plat.a2') }}。
                </p>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="MT5Model_tool">
        <div class="MT5Model_title">
          <h1>{{ t('plat.tradeCenter') }}</h1>
          <p>
            {{ t('plat.desc1') }}
          </p>
        </div>
        <div class="MT5Model_tool_b">
          <img src="../../../assets/img/newIndex/P_tool_button.png" />
          <img src="../../../assets/img/newIndex/P_tool_button2.png" />
        </div>
      </div>
      <div class="MT5Model_trading">
        <div class="MT5Model_title">
          <h1>{{ t('plat.autoTrade') }}</h1>
          <p>{{ t('plat.meta') }}</p>
        </div>
        <div class="MT5Model_trading_button">
          <div>
            <img src="../../../assets/img/newIndex/document.png" />
            <span>{{ t('plat.userGuide') }}</span>
          </div>
          <div>
            <img src="../../../assets/img/newIndex/document.png" />
            <span>{{ t('plat.eaGuide') }}</span>
          </div>
        </div>
        <!-- <div class="MT5Model_trading_switch"></div> -->
      </div>
      <div id="Mobile" class="MT5Model_mobile">
        <div class="MT5Model_title">
          <h1>{{ t('plat.mt5Mobile') }}</h1>
          <p>
            {{ t('plat.mclpPro') }}
          </p>
        </div>
        <el-row class="MT5Model_mobile_model" align="middle">
          <el-col :md="12">
            <img src="../../../assets/img/newIndex/P_img_3.png" />
          </el-col>
          <el-col :md="9" :push="3" class="MT5Model_mobile_down">
            <img :src="androidSrc" alt="Andriod" />
            <img :src="iosSrc" alt="IOS" />
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :md="12">
            <div class="list-model list-model_height">
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.timeFrame') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.analysisTool') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.chartTrade') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.headline') }}</span>
              </div>
            </div>
          </el-col>
          <el-col :md="12">
            <div class="list-model list-model_height">
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.interface') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.email') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.notice') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.optimizedInterface') }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div id="WAB" class="MT5Model_wab">
        <div class="MT5Model_title">
          <h1>
            <span>{{ t('plat.web') }}</span>
          </h1>
          <p>
            <span>{{ t('plat.withoutInstalling') }}</span>
            。。
          </p>
        </div>
        <div class="MT5Model_wab_button">
          <img src="../../../assets/img/newIndex/P_wab_button.png" />
          <div class="MT5Model_wab_button_text">
            <h4>{{ t('plat.osRequire') }}:</h4>
            <p>{{ t('plat.requirement2') }}</p>
          </div>
        </div>
        <el-row :gutter="40">
          <el-col :md="12">
            <div class="list-model list-model_height">
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.analysisTool') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.timeFrame') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.clickTrade') }}</span>
              </div>
            </div>
          </el-col>
          <el-col :md="12">
            <div class="list-model list-model_height">
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.interface') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.customizeDisplay') }}</span>
              </div>
              <div>
                <img src="../../../assets/img/newIndex/dui.png" />
                <span>{{ t('plat.safeData') }}</span>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="MT5Model_wab_button">
          <img src="../../../assets/img/newIndex/P_wab_button.png" />
          <div class="MT5Model_wab_button_text">
            <h2>{{ t('plat.notSure') }}？</h2>
            <div>
              {{ t('plat.compare') }}
            </div>
          </div>
          <img
            src="../../../assets/img/newIndex/P_wab_button_2.png"
            class="button"
          />
          <div class="phone">
            {{ t('plat.doubt') }}
            <span>{{ t('plat.onlineConsultant') }}</span>
            ，
            <span>{{ t('plat.e_mail') }}</span>
            {{ t('plat.or') }}
            <span>{{ t('plat.freePhone') }}</span>
            {{ t('plat.supportTeam') }}
          </div>
        </div>
        <el-row :gutter="40" class="MT5Model_wab_introduce">
          <el-col :md="6">
            <img src="../../../assets/img/newIndex/wab_bar.png" />
            <h4>10+{{ t('plat.broker1') }}</h4>
            <p>
              {{ t('plat.broker2') }}
            </p>
          </el-col>
          <el-col :md="6">
            <img src="../../../assets/img/newIndex/wab_bar_2.png" />
            <h4>{{ t('plat.experience') }}</h4>
            <p>
              {{ t('plat.awards') }}
            </p>
          </el-col>
          <el-col :md="6">
            <img src="../../../assets/img/newIndex/wab_bar_3.png" />
            <h4>{{ t('plat.transparency') }}</h4>
            <p>
              {{ t('plat.supervise') }}
              <br />
              {{ t('plat.justice') }}
            </p>
          </el-col>
          <el-col :md="6">
            <img src="../../../assets/img/newIndex/wab_bar_4.png" />
            <h4>{{ t('plat.mt5Broker') }}</h4>
            <p>
              2020
              <br />
              ForexBrokers.com
            </p>
          </el-col>
        </el-row>
        <div class="MT5Model_wab_bottom">
          <h4>{{ t('plat.tradingTour') }}</h4>
          <div class="button">{{ t('plat.tradeNow') }}</div>
          <div class="text" @click="goTrade">
            {{ t('plat.or') }}
            <span>{{ t('plat.tryDemo') }}</span>
          </div>
        </div>
      </div>
    </div>
    <Model_4 />
  </div>
</template>
<script setup>
import Model_4 from '../model_4.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import androidImg from '@/assets/img/newIndex/Andriod.png';
import androidImgEn from '@/assets/img/newIndex/Andriod_en.png';
import iosImg from '@/assets/img/newIndex/IOS.png';
import iosImgEn from '@/assets/img/newIndex/IOS_en.png';
import { useHeaderStore } from '@/store/index.js';
const headerStore = useHeaderStore();
const { t, locale } = useI18n();
const androidSrc = locale.value === 'cn' ? androidImg : androidImgEn;
const iosSrc = locale.value === 'cn' ? iosImg : iosImgEn;
const downMt5 = () => {
  window.location.href = 'https://www.metatrader5.com/en/download';
};
const goTrade = () => {
  headerStore.setCenterDialogVisible(true);
};
const hideDialog = () => {
  headerStore.setCenterDialogVisible(false);
};
</script>
<style lang="less" scoped>
.banner {
  width: 100%;
  height: 360px;
  background-image: url('../../../assets/img/newIndex/P_banner.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  color: #fff;
  h4 {
    font-size: 40px;
    line-height: 47px;
    padding-top: 123px;
    padding-bottom: 14px;
  }
  p {
    font-size: 16px;
    line-height: 26px;
  }
}
.width_1270 {
  width: 1270px;
  margin: 0 auto;
}
.once-view {
  padding: 66px 0 90px;
  .once-view_button {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    > p {
      &:nth-child(1) {
        width: 120px;
        height: 44px;
        border-radius: 5px;
        background: #2963a4;
        color: #fff;
        font-size: 14px;
        text-align: center;
        line-height: 44px;
        cursor: pointer;
        margin-right: 20px;
      }
      &:nth-child(2) {
        font-size: 16px;
        span {
          color: #2963a4;
        }
      }
    }
  }
}
.MT5Model_1 {
  .MT5Model_1_title {
    margin-bottom: 54px;
    text-align: center;
    h1 {
      font-size: 40px;
      line-height: 47px;
      margin-bottom: 26px;
    }
    h2 {
      font-size: 26px;
      line-height: 41px;
      margin-bottom: 27px;
    }
    p {
      font-size: 16px;
      line-height: 25px;
    }
  }
}
.list-model {
  width: 100%;
  height: 350px;
  background: #f9f9f9;
  padding: 50px 0 0;
  > div {
    font-size: 16px;
    line-height: 25px;
    color: #2d3436;
    margin-bottom: 19px;
    margin-left: 105px;
    > img {
      margin-right: 18px;
    }
  }
}
.MT5Model_down {
  padding: 114px 0 48px;
  .MT5Model_down_right {
    display: flex;
    justify-content: right;
    h4 {
      font-size: 24px;
      line-height: 38px;
      margin-bottom: 22px;
      font-weight: normal;
    }
    .down_button {
      width: 311px;
      height: 70px;
      line-height: 70px;
      text-align: center;
      font-size: 14px;
      background-color: #2963a4;
      border-radius: 5px;
      color: #fff;
      cursor: pointer;
    }
    .down_button_black {
      background-color: #000;
      margin-top: 15px;
      margin-bottom: 30px;
    }
    .down_table {
      > div {
        border-top: 1px solid #e4eaed;
        padding: 20px 0 29px;
        p {
          &:nth-child(1) {
            font-size: 14px;
            font-weight: bold;
            margin-bottom: 6px;
          }
          &:nth-child(2) {
            font-size: 12px;
            line-height: 19.2px;
          }
        }
      }
    }
  }
}
.MT5Model_tool {
  width: 100%;
  padding: 64px 0 99px;
  background-color: #f9f9f9;
  .MT5Model_tool_b {
    display: flex;
    justify-content: center;
    margin-top: 46px;
    > img {
      cursor: pointer;
      &:nth-child(1) {
        margin-right: 20px;
      }
    }
  }
}
.MT5Model_trading {
  padding: 61px 0 97px;
  .MT5Model_trading_button {
    display: flex;
    justify-content: center;
    padding: 49px 0 60px;
    > div {
      width: 360px;
      height: 50px;
      border: 1px solid #000000;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 5px;
      margin-right: 20px;
      img {
        margin-right: 10px;
      }
    }
  }
}
.MT5Model_mobile {
  padding-bottom: 81px;
  .MT5Model_mobile_model {
    padding: 55px 0 72px;
    .MT5Model_mobile_down {
      img {
        cursor: pointer;
        &:nth-child(1) {
          margin-right: 15px;
        }
      }
    }
  }
  .list-model_height {
    height: 210px;
  }
}
.MT5Model_title {
  text-align: center;
  h1 {
    font-size: 40px;
    line-height: 46px;
    margin-bottom: 22px;
  }
  p {
    font-size: 16px;
    line-height: 25px;
  }
}
.MT5Model_wab {
  padding-bottom: 72px;
  .MT5Model_title {
    margin-bottom: 25px;
  }
  .MT5Model_wab_button {
    text-align: center;
    > img {
      margin-bottom: 30px;
    }
    .MT5Model_wab_button_text {
      h2 {
        font-size: 26px;
        line-height: 41px;
        color: #2d3436;
        margin-bottom: 17px;
      }
      h4 {
        font-size: 14px;
        line-height: 22px;
        color: #2d3436;
        margin-bottom: 6px;
      }
      p {
        font-size: 12px;
        line-height: 19px;
        color: #2d3436;
      }
    }
    .button {
      margin-top: 26px;
    }
    .phone {
      font-size: 16px;
      line-height: 25px;
      color: #2d3436;
      span {
        color: #2963a4;
      }
    }
  }
  .list-model_height {
    height: 160px;
    margin-top: 59px;
    margin-bottom: 61px;
  }
}
.MT5Model_wab_introduce {
  margin-top: 85px;
  margin-bottom: 78px;
  img {
    margin-bottom: 30px;
  }
  h4 {
    font-size: 26px;
    margin-bottom: 18px;
    color: #2d3436;
  }
  p {
    font-size: 16px;
    line-height: 25px;
    color: #2d3436;
  }
}
.MT5Model_wab_bottom {
  text-align: center;
  h4 {
    font-size: 26px;
    color: #2d3436;
    line-height: 41px;
    margin-bottom: 22px;
  }
  .button {
    width: 120px;
    height: 44px;
    background-color: #2963a4;
    text-align: center;
    line-height: 44px;
    color: #fff;
    border-radius: 5px;
    margin-bottom: 20px;
    display: inline-block;
    cursor: pointer;
  }
  .text {
    font-size: 16px;
    line-height: 25px;
    span {
      color: #2963a4;
    }
  }
}
</style>
