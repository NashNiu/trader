<template>
  <div class="model_style">
    <div class="model_1">
      <el-row>
        <el-col :md="12">
          <div class="model_h4">
            本地存款。
            <br />
            数字币存款。
            <br />
            极速到账。
          </div>
          <p>
            可以24种不同币种存款，且可根据投资需要进行货币兑换，以及法币和数字币兑换。
          </p>
        </el-col>
        <el-col :md="12" class="model_img">
          <img src="../../../assets/img/newIndex/F_img_2.png" />
        </el-col>
      </el-row>
    </div>
    <div class="model_2">
      <h2>投资品种覆盖面广泛、灵活</h2>
      <el-row>
        <el-col :md="12">
          <div class="model_tab">
            <div
              :class="data.tabActive === '1' ? 'model_tab-active' : ''"
              @click="tabClick('1')"
            >
              特点1：交易成本低
            </div>
            <div
              :class="data.tabActive === '2' ? 'model_tab-active' : ''"
              @click="tabClick('2')"
            >
              特点2 ：品种更新快
            </div>
            <div
              :class="data.tabActive === '3' ? 'model_tab-active' : ''"
              @click="tabClick('3')"
            >
              特点3：品种覆盖面广
            </div>
          </div>
        </el-col>
        <el-col :md="12" class="model_img">
          <img src="../../../assets/img/newIndex/F_img_3.png" />
        </el-col>
      </el-row>
    </div>
    <div class="model_3">
      <el-row>
        <el-col :md="12" class="model_3_col">
          <div class="model_3_text">
            <h4>品种</h4>
            <p>合约和投资策略覆盖全球30多个市场上百种交易品种。</p>
          </div>
          <div class="model_3_text">
            <h4>投资</h4>
            <p>
              合约可供您快速查看和跟踪交易品种。在委托单输入面板点击买价或卖价加载交易品种，或使用交易品种窗口向自选列表添加单或订单。
            </p>
          </div>
          <div class="model_3_text">
            <h4>下单</h4>
            <p>
              如果您持有的是复杂多边策略并且想借公司行动之机获取股息，合约可供您在到期日前手动行权期权。您也可以在星期五到期时行使根据结算所规则允许失效的期权。
            </p>
          </div>
        </el-col>
        <el-col :md="12" class="model_img">
          <img src="../../../assets/img/newIndex/F_img_4.png" />
        </el-col>
      </el-row>
    </div>
    <div class="model_3">
      <el-row>
        <el-col :md="12">
          <img src="../../../assets/img/newIndex/F_img_5.png" />
        </el-col>
        <el-col :md="12" class="model_3_col">
          <div class="model_3_text">
            <h4>不确定从哪里开始？试试投资策略向导</h4>
            <p>
              只需回答几个关于您对未来交易品种走势预期的问题，投资策略向导便会给出多个标准策略，您可以从激进程度、盈利概率和最大收益等方面进行筛选。
            </p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="model_4">
      <div class="model_3_text">
        <h4>ETF和指数</h4>
        <p>
          在推动市场走向的新闻发生时、在当地市场的交易时段或您方便的时候，交易ETF和指数
          并寻找到更多机会。
        </p>
      </div>
      <div class="model_3_text">
        <h4>灵活的美国指数交易是如何运作的</h4>
        <p>下列可供交易的指数代码，提供了参与广泛板块的机会:</p>
      </div>
      <div class="model_4_table">
        <el-row>
          <el-col :md="6">
            <p>AGG</p>
            <p>EFA</p>
            <p>EWA</p>
            <p>EWJ</p>
            <p>FXI</p>
            <p>GLD</p>
          </el-col>
          <el-col :md="6">
            <p>DIA</p>
            <p>CHINA300</p>
            <p>GER30</p>
            <p>JPN225</p>
            <p>US30</p>
            <p>CHA50</p>
            <p>HK50</p>
            <p>US500</p>
            <p>NAS100</p>
          </el-col>
          <el-col :md="6">
            <p>DOG</p>
          </el-col>
          <el-col :md="6">
            <p>EEM</p>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue';
const data = reactive({
  tabActive: '1',
});
const tabClick = (name) => {
  data.tabActive = name;
};
</script>
<style lang="less" scoped>
.model_style {
  max-width: 1270px;
  margin: 0 auto;
  .model_img {
    text-align: right;
  }
  .model_1 {
    width: 100%;
    padding: 131px 0 63px;
    .el-row {
      align-items: center;
    }
    .model_h4 {
      font-size: 40px;
      font-weight: bold;
      line-height: 46px;
      margin-bottom: 36px;
    }
    p {
      font-size: 14px;
      color: #2d3436;
    }
  }
  .model_2 {
    padding: 78px 0 65px;
    h2 {
      font-size: 40px;
      text-align: center;
      margin-bottom: 58px;
    }
    .model_tab {
      font-size: 24px;
      color: #2d3436;
      position: relative;
      top: 80px;
      display: inline-block;
      > div {
        // width: 238px;
        height: 60px;
        padding: 0 20px;
        margin-bottom: 20px;
        font-weight: bold;
        border-radius: 8px;
        line-height: 60px;
        cursor: pointer;
      }
      .model_tab-active {
        // width: 230px;
        color: #2963a4;
        border: 1px solid #2963a4;
      }
    }
  }
  .model_3 {
    padding: 95px 0;
    .model_3_col {
      padding-top: 55px;
    }
    .model_3_text {
      color: #2d3436;
      margin-bottom: 29px;
      h4 {
        font-size: 24px;
        line-height: 41px;
        margin-bottom: 5px;
      }
      p {
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
  .model_4 {
    padding: 86px 0;
    .model_3_text {
      color: #2d3436;
      margin-bottom: 29px;
      h4 {
        font-size: 24px;
        line-height: 41px;
        margin-bottom: 5px;
      }
      p {
        font-size: 14px;
        line-height: 22px;
      }
    }
    .model_4_table {
      padding: 17px 64px 0;
      p {
        font-size: 20px;
        color: #2d3436;
        text-align: center;
        line-height: 32px;
      }
    }
  }
}
</style>
