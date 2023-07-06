<template>
  <div class="model_3">
    <el-row :gutter="40">
      <el-col :sm="12" :md="6" class="row_col_style">
        <div>
          <img src="../../assets/img/newIndex/icon_1.png" />
        </div>
        <h4>快速入门</h4>
        <p>只需一分钟便可完成开户并开始交易</p>
      </el-col>
      <el-col :sm="12" :md="6" class="row_col_style">
        <div>
          <img src="../../assets/img/newIndex/icon_2.png" />
        </div>
        <h4>交易全球股票</h4>
        <p>直达美国、加拿大、欧洲和亚洲90多个股票市场。</p>
      </el-col>
      <el-col :sm="12" :md="6" class="row_col_style">
        <div>
          <img src="../../assets/img/newIndex/icon_3.png" />
        </div>
        <h4>交易全球期权</h4>
        <p>交易全球数字币，交易全球主流数字货币合约</p>
      </el-col>
      <el-col :sm="12" :md="6" class="row_col_style">
        <div>
          <img src="../../assets/img/newIndex/icon_4.png" />
        </div>
        <h4>实力与安全</h4>
        <p>
          MC LiquidityProvider有着超100亿美元
          <br />
          的权益资本，深受来自200多个国家和地区
          <br />
          的180多万投资者信赖。
        </p>
      </el-col>
    </el-row>
    <div class="model_text">
      <h4>股票合约玩法</h4>
      <p>
        加入-->我们将每一只股票做成标准合约供您选择投资。不论股价是多少，你都可以通过交易标准合约持有股票。
      </p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.model_3 {
  max-width: 1270px;
  margin: 0 auto;
  padding: 89px 0 216px;
  overflow: hidden;
  .row_col_style {
    text-align: center;
    margin-bottom: 36px;
    img {
      margin-bottom: 15px;
    }
    h4 {
      font-size: 16px;
      margin-bottom: 5px;
    }
    p {
      font-size: 14px;
      line-height: 22px;
    }
  }
  .model_text {
    h4 {
      font-size: 40px;
      margin-bottom: 25px;
    }
    p {
      font-size: 14px;
    }
  }
}
@media (max-width: 768px) {
  .model_3 {
    padding: 36px 0 37px;
    .row_col_style {
      margin-bottom: 26px;
    }
    .model_text {
      text-align: center;
      h4 {
        font-size: 24px;
        margin-bottom: 14px;
      }
      p {
        font-size: 14px;
        padding: 0 20px;
        line-height: 22px;
      }
    }
  }
}
</style>
