<template>
  <div>
    <!-- 模块一 -->
    <div class="model_1">
      <div class="model_1_left">
        <div class="model_1_title">
          {{ t('index.model_1_title') }}
        </div>
        <div class="model_1_p">
          {{ t('index.model_1_p') }}
        </div>
        <div class="model_1_button">
          <div class="button_style button_1" @click="goTrade">
            <span>{{ t('index.model_1_button_1') }}</span>
            <img src="../../assets/img/newIndex/model/arrow_1.png">
          </div>
          <div class="button_style button_2" @click="goTrade">
            <span>{{ t('index.model_1_button_2') }}</span>
            <img src="../../assets/img/newIndex/model/arrow_2.png">
          </div>
        </div>
      </div>
      <div class="model_1_right">
        <img src="../../assets/img/newIndex/model/model_1.png">
      </div>
    </div>
    <!-- 下载模块 -->
    <div class="model_down">
      <div class="down_view">
        <div class="down_text">
          {{ t('index.down_text') }}
        </div>
        <div class="down_img">
          <div class="down_img_block">
            <img :src="androidSrc" alt="Andriod" />
            <img :src="iosSrc" alt="IOS" />
          </div>
          <img src="../../assets/img/newIndex/ewm.png" class="ewm_img"/>
        </div>
      </div>
    </div>
    <!-- 经验丰富的交易者 -->
    <div class="model_2">
      <div class="model_2_left">
        <h4 class="model_2_h4">{{ t('index.model_2_left[0]') }}</h4>
        <div class="model_2_left_p">
          {{ t('index.model_2_left[1]') }}
        </div>
        <div class="model_2_left_span">{{ t('index.model_2_left[2]') }}</div>
        <div class="model_2_left_span">{{ t('index.model_2_left[3]') }}</div>
        <div class="model_2_left_span">{{ t('index.model_2_left[4]') }}</div>
        <div class="model_2_left_span">{{ t('index.model_2_left[5]') }}</div>
        <div class="model_2_left_span">{{ t('index.model_2_left[6]') }}</div>
      </div>
      <div class="model_2_right">
        <h4 class="model_2_h4">{{ t('index.model_2_right[0]') }}</h4>
        <div class="model_2_left_p">
          {{ t('index.model_2_right[1]') }}
        </div>
        <div class="model_2_left_span">{{ t('index.model_2_right[2]') }}</div>
        <div class="model_2_left_span">{{ t('index.model_2_right[3]') }}</div>
        <div class="model_2_left_span">{{ t('index.model_2_right[4]') }}</div>
        <div class="model_2_left_span">{{ t('index.model_2_right[5]') }}</div>
        <div class="model_2_left_span">{{ t('index.model_2_right[6]') }}</div>
      </div>
    </div>
    <!-- 通过访问美国、加拿大、欧洲和亚洲等地的1650多个市场，开启无限的金融机会 -->
    <div class="model_3">
      <div class="model_title">
        {{ t('index.model_3[0]') }}
      </div>
      <div class="model_p">
        {{ t('index.model_3[1]') }}
      </div>
      <div class="model_3_icon">
        <div>
          <img src="../../assets/img/newIndex/P_icon_3.png" />
          <div class="model_3_icon_span">{{ t('product.cryptocurrency') }}</div>
        </div>
        <div>
          <img src="../../assets/img/newIndex/P_icon_4.png" />
          <div class="model_3_icon_span">{{ t('product.forex') }}</div>
        </div>
        <div>
          <img src="../../assets/img/newIndex/P_icon_1.png" />
          <div class="model_3_icon_span">{{ t('product.index') }}</div>
        </div>
        <div>
          <img src="../../assets/img/newIndex/P_icon_6.png" />
          <div class="model_3_icon_span">{{ t('product.Commodities') }}</div>
        </div>
      </div>
    </div>
    <!-- 最大化的保护交易成功 -->
    <div class="model_4">
      <div class="model_title">
        {{ t('index.model_4[0]') }}
      </div>
      <div class="model_p">
        {{ t('index.model_4[1]') }}
      </div>
      <div class="model_3_icon">
        <div>
          <img src="../../assets/img/newIndex/model_4_1.png" />
          <div class="model_3_icon_span">{{ t('index.model_4[2]') }}</div>
        </div>
        <div>
          <img src="../../assets/img/newIndex/model_4_2.png" />
          <div class="model_3_icon_span">{{ t('index.model_4[3]') }}</div>
        </div>
        <div>
          <img src="../../assets/img/newIndex/model_4_3.png" />
          <div class="model_3_icon_span">{{ t('index.model_4[4]') }}</div>
        </div>
      </div>
    </div>
    <!-- 为什么MC是流动性提供者？ -->
    <div class="model_5">
      <div class="model_title">
        {{ t('index.model_5[0]') }}
      </div>
      <div class="model_5_list">
        <div class="model_list_item">
          <img src="../../assets/img/newIndex/model_5_1.png" />
          <div class="model_5_list_title">{{ t('index.model_5[1]') }}</div>
          <div class="model_5_list_content">
            {{ t('index.model_5[2]') }}
          </div>
        </div>
        <div class="model_list_item">
          <img src="../../assets/img/newIndex/model_5_2.png" />
          <div class="model_5_list_title">{{ t('index.model_5[3]') }}</div>
          <div class="model_5_list_content">
            {{ t('index.model_5[4]') }}
          </div>
        </div>
        <div class="model_list_item">
          <img src="../../assets/img/newIndex/model_5_3.png" />
          <div class="model_5_list_title">{{ t('index.model_5[5]') }}</div>
          <div class="model_5_list_content">
            {{ t('index.model_5[6]') }}
          </div>
        </div>
      </div>
    </div>
    <!-- MC的诞生旨在为交易者提供度身定制的服务 -->
    <div class="model_6">
      <img src="../../assets/img/newIndex/model_6.png" />
      <div class="model_6_right">
        <div class="model_6_title">{{ t('index.model_6.model_6_title') }}</div>
        <div class="model_6_p">{{ t('index.model_6.model_6_p') }}</div>
        <div v-for="item in 4" :key="item" class="model_6_list">
          {{ t(`index.model_6.model_6_list[${item-1}]`) }}
        </div>
      </div>
    </div>
    <!-- 在最受欢迎的市场上提供实时定价 -->
    <div class="model_7">
      <div class="model_title">
        {{ t('index.model_7') }}
      </div>
      <div class="model_7_table">
        <el-table
          :data="tableData"
          style="width: 1200px; margin:0 auto;">
          <el-table-column
            prop="name"
            label="Name"
          >
          </el-table-column>
          <el-table-column
            label="Sell"
          >
            <template #default="scope">
              <span :class="`${scope.row.changeColor} bold`">
                {{ scope.row.sell }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="Buy"
          >
            <template #default="scope">
              <span :class="`${scope.row.changeColor} bold`">
                {{ scope.row.buy }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="Change"
          >
            <template #default="scope">
              <span :class="`${scope.row.changeColor} bold`">
                {{ scope.row.change }}
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 实时、深入的分析 -->
    <div class="model_8">
      <img src="../../assets/img/newIndex/model_8.png" />
      <div class="model_8_right">
        <h2>{{ t('index.model_8[0]') }}</h2>
        <div class="model_8_list">
          <h4>{{ t('index.model_8[1]') }}</h4>
          <div class="model_list_content">{{ t('index.model_8[2]') }}</div>
        </div>
        <div class="model_8_list">
          <h4>{{ t('index.model_8[3]') }}</h4>
          <div class="model_list_content">{{ t('index.model_8[4]') }}</div>
        </div>
        <div class="model_8_list">
          <h4>{{ t('index.model_8[5]') }}</h4>
          <div class="model_list_content">{{ t('index.model_8[6]') }}</div>
        </div>
        <div class="model_1_button">
          <div class="button_style button_1" @click="goTrade">
            <span>{{ t('index.model_1_button_1') }}</span>
            <img src="../../assets/img/newIndex/model/arrow_1.png">
          </div>
          <div class="button_style button_2" @click="goTrade">
            <span>{{ t('index.model_1_button_2') }}</span>
            <img src="../../assets/img/newIndex/model/arrow_2.png">
          </div>
        </div>
        <div class="down_img">
          <div class="down_img_block">
            <img :src="androidSrc" alt="Andriod" />
            <img :src="iosSrc" alt="IOS" />
          </div>
          <img src="../../assets/img/newIndex/ewm.png" class="ewm_img"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import androidImg from '@/assets/img/newIndex/Andriod.png';
import androidImgEn from '@/assets/img/newIndex/Andriod_en.png';
import iosImg from '@/assets/img/newIndex/IOS.png';
import iosImgEn from '@/assets/img/newIndex/IOS_en.png';
import { useHeaderStore, useTradeStore, useSocketStore } from '@/store/index.js';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
const tradeStore = useTradeStore();
const socketStore = useSocketStore();
const headerStore = useHeaderStore();
const { t, locale } = useI18n();
const androidSrc = locale.value === 'cn' ? androidImg : androidImgEn;
const iosSrc = locale.value === 'cn' ? iosImg : iosImgEn;
const statisticData = computed(() => socketStore.statisticData);
const liveData = computed(() => socketStore.liveData);
const tableSymbolList = computed(
  () => tradeStore.symbolTypeArr[tradeStore.activeType]
);
const tableData = computed(() =>
  tableSymbolList.value.map((item) => {
    const symbolData = statisticData.value?.[item.name];
    const ask = liveData.value?.[item.name]?.['bid'] ?? '0.00';
    const high =
      symbolData?.['askHigh']?.toFixed(symbolData?.digits ?? 2) ?? '0.00';
    const low =
      symbolData?.['askLow']?.toFixed(symbolData?.digits ?? 2) ?? '0.00';
    const priceOpen = symbolData?.['priceOpen'];
    const change = ask && priceOpen ? (ask - priceOpen) / priceOpen : 0;
    const changeColor =
      ask > priceOpen ? 'green' : ask < priceOpen ? 'red' : '';
    return {
      name: item.displayName,
      change: `${(change * 100).toFixed(2)}%`,
      changeColor,
      sell: ask,
      buy: liveData.value?.[item.name]?.['ask'] ?? '0.00',
      highLow: `${high} / ${low}`,
      mtName: item.name,
    };
  })
);
const goTrade = () => {
  headerStore.setCenterDialogVisible(true);
};
</script>
<style lang="less" scoped>
.model_title {
  width: 1007px;
  font-size: 40px;
  font-weight: 600;
  line-height: 64px;
  letter-spacing: 0em;
  text-align: center;
  margin: 0 auto 21px;
}
.model_p {
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
}
.model_1 {
  display: flex;
  .model_1_left,.model_1_right {
    flex: 1;
    padding: 96px 0 21px;
  }
  .model_1_left {
    background-color: #F1F4F6;
    text-align: right;
    padding-right: 39px;
    .model_1_title {
      width: 601px;
      display: inline-block;
      font-size: 40px;
      font-weight: 800;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 20px;
    }
    .model_1_p {
      width: 601px;
      display: inline-block;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 30px;
    }
  }
  .model_1_right {
    background-color: #F9F9F9;
  }
}
.model_1_button {
      width: 601px;
      display: inline-block;
      text-align: left;
    }
    .button_style {
      display: inline-block;
      height: 50px;
      border-radius: 5px;
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      line-height: 26px;
      letter-spacing: 0em;
      line-height: 50px;
      text-align: left;
      padding: 0 15px;
      cursor: pointer;
      span {
        margin-right: 12px;
        vertical-align: middle;
      }
      img {
        vertical-align: middle;
      }
    }
    .button_1 {
      border: 1px solid #2963A4;
      color: #2963A4;
      margin-right: 15px;
    }
    .button_2 {
      background-color: #2963A4;
      color: #fff;
    }
.model_down {
  background-color: #EDECEC;
  .down_view {
    width: 1240px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 30px 0;
    .down_text {
      width: 547px;
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: 0em;
      text-align: left;
      color: #2D3436;
      padding-top: 8px;
    }
  }
}
.down_img {
  margin-right: 150px;
  .down_img_block {
    display: inline-block;
    margin-right: 40px;
    img {
      display: block;
      cursor: pointer;
      &:nth-child(1) {
        margin-bottom: 20px;
      }
    }
  }
  .ewm_img {
    width: 120px;
  }
}
.model_2 {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  .model_2_left,.model_2_right {
    width: 459px;
    background-color: #F9F9F9;
    padding: 31px 57px 49px 64px;
  }
  .model_2_left {
    margin-right: 40px;
  }
  .model_2_h4 {
    font-size: 40px;
    font-weight: 600;
    line-height: 64px;
    letter-spacing: 0em;
    text-align: center;
    margin-bottom: 10px;
  }
  .model_2_left_p {
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 20px;
  }
  .model_2_left_span {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    margin-bottom: 20px;
    &:last-child{
      margin-bottom: 0;
    }
  }
}
.model_3 {
  background-color: #F1F4F6;
  padding: 60px 0 117px;
}
.model_3_icon {
  width: 662px;
  margin: 72px auto 0;
  display: flex;
  justify-content: space-between;
  > div {
    text-align: center;
    > img {
      margin-bottom: 10px;
    }
    .model_3_icon_span {
      font-size: 16px;
      font-weight: 500;
      line-height: 26px;
      letter-spacing: 0em;
      text-align: center;
    }
  }
}
.model_4 {
  padding: 60px 0 133px;
}
.model_5 {
  padding: 60px 0 103px;
  background-color: #F1F4F6;
  .model_5_list {
    display: flex;
    justify-content: center;
    padding-top: 40px;
    .model_list_item {
      width: 373px;
      &:nth-child(2) {
        margin: 0 40px;
      }
      > img {
        margin: 0 auto 10px;
        display: block;
      }
      .model_5_list_title {
        font-size: 18px;
        font-weight: 600;
        line-height: 29px;
        letter-spacing: 0em;
        text-align: center;
        margin-bottom: 10px;
      }
      .model_5_list_content {
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: 0em;
        text-align: center;
      }
    }
  }
}
.model_6 {
  display: flex;
  justify-content: center;
  padding: 83px 0;
  > img {
    margin-right: 164px;
  }
  .model_6_right {
    width: 620px;
    .model_6_title {
      font-size: 40px;
      font-weight: 600;
      line-height: 64px;
      letter-spacing: 0em;
      margin-bottom: 10px;
      color: #000000;
    }
    .model_6_p {
      font-size: 26px;
      font-weight: 400;
      line-height: 42px;
      letter-spacing: 0em;
      color: #000000;
      margin-bottom: 20px;
    }
    .model_6_list {
      font-size: 16px;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 15px;
      &::before {
        content: '';
        width: 10px;
        height: 10px;
        background-color: #2963A4;
        display: inline-block;
        margin-right: 15px;
        border-radius: 10px;
      }
    }
  }
}
.model_7 {
  padding: 60px 0;
  .model_title {
    margin-bottom: 70px;
  }
}
.model_8 {
  background-color: #F1F4F6;
  padding: 60px 0;
  display: flex;
  justify-content: center;
  .model_8_right {
    width: 630px;
    padding: 40px 36px 40px 54px;
    background-color: #F9F9F9;
    > h2{
      font-size: 40px;
      font-weight: 600;
      line-height: 64px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 21px;
    }
    .model_8_list {
      margin-bottom: 46px;
      > h4 {
        font-size: 20px;
        font-weight: 600;
        line-height: 32px;
        letter-spacing: 0em;
        text-align: left;
        margin-bottom: 10px;
        &::before {
          content: '';
          width: 20px;
          height: 17px;
          display: inline-block;
          background-image: url('../../assets/img/newIndex/arrow_1.png');
          background-repeat: no-repeat;
          background-size: cover;
          margin-right: 15px;
        }
      }
      .model_list_content {
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        letter-spacing: 0em;
        text-align: left;

      }
    }
    .model_1_button {
      margin-top: -26px;
      margin-bottom: 40px;
    }
    .down_img {
      margin-left: 50px;
      .down_img_block {
        vertical-align: middle;
      }
      .ewm_img {
        width: 180px;
        vertical-align: middle;
      }
    }
  }
}
</style>
