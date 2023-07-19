<template>
  <div class="download">
    <el-row class="row_center">
      <el-col :xs="24" :sm="24" :md="12">
        <div class="left">
          <div class="left_title_top">MC LiquidityProvide</div>
          <div class="left_title">可靠！值得信赖！全面！</div>
          <p>
            正式开户前，您可在几秒钟内开立一个模拟交易账户试用一下MC
            LiquidityProvider。
            <br />
            <br />
            即刻获取1万美元模拟资金。
            <br />
            在模拟交易环境下进行模拟交易。
            <br />
            如果准备好开立真实账户，只需填写开户申请、入金账户便可开始全球交易
          </p>
          <div class="down_view hidden-xs-only">
            <div class="down_view_ewm">
              <img src="../../../assets/img/newIndex/F_ewm.png" />
            </div>
          </div>
          <div class="down_text hidden-xs-only">
            扫描二维码下载MC LiquidityProvider应用程序
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12">
        <div class="right">
          <img src="../../../assets/img/newIndex/down_img_2.png" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import 'element-plus/theme-chalk/display.css';
</script>
<style lang="less" scoped>
.download {
  background: #f1f4f6;
  .row_center {
    max-width: 1270px;
    margin: 0 auto;
  }
  .left {
    margin-top: 80px;
    .left_title_top {
      font-size: 34px;
      margin-bottom: 16px;
    }
    .left_title {
      font-family: Roboto;
      font-size: 44px;
      font-weight: 800;
      line-height: 52px;
      letter-spacing: 0em;
      text-align: left;
      margin-bottom: 20px;
    }
    p {
      font-family: Roboto;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
      color: #2d3436;
      margin-bottom: 17px;
    }
    .down_text {
      font-family: Roboto;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: 0em;
      text-align: left;
      color: #2d3436;
    }
    .down_view {
      display: flex;
      align-items: center;
      margin-top: 20px;
      margin-bottom: 15px;
    }
  }
  .right {
    text-align: right;
    margin-top: 77px;
    margin-bottom: 77px;
  }
}
@media (max-width: 768px) {
  .row_center {
    .el-col-xs-24 {
      padding: 0 20px;
      .left {
        margin-top: 0;
        .left_title {
          font-size: 24px;
          margin-bottom: 8px;
          line-height: 28px;
          margin-top: 30px;
        }
        p {
          margin-bottom: 26px;
        }
      }
      .right {
        margin-top: 0;
        margin-bottom: 25px;
        text-align: center;
        img {
          width: 260px;
        }
      }
    }
  }
}
@media (max-width: 992px) and (min-width: 768px) {
  .row_center {
    .right {
      text-align: center;
    }
  }
}
</style>
