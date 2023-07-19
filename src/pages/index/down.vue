<template>
  <div class="download">
    <el-row class="row_center">
      <el-col :xs="24" :sm="24" :md="12">
        <div class="left">
          <div class="left_title">可靠！值得信赖！全面！</div>
          <p>
            覆盖全球包括NYSE、NASDAQ、LSE
            和HKSE品种覆盖全球包括NYSE、NASDAQ、LSE和HKSE在内的90多个股票市场，外加期权以及比特币、比特币现金、以太坊和莱特币等加密货币和原油、指数、贵金属、外汇等品种--所有这些从您的移动设备即可直达在内的90多个股票市场，外加期权以及比特币、比特币现金、以太坊和莱特币等加密货币——所有这些从您的移动设备即可直达。
          </p>
          <div class="down_text hidden-xs-only">马上下载应用程序。</div>
          <div class="down_view hidden-xs-only">
            <div class="down_view_button">
              <div class="down_view_button-flex">
                <img src="../../assets/img/newIndex/Andriod.png" />
                <img src="../../assets/img/newIndex/IOS.png" />
              </div>
              <div class="down_view_button_2">登录网页版</div>
            </div>
            <div class="down_view_ewm">
              <img src="../../assets/img/newIndex/ewm.png" />
            </div>
          </div>
          <div class="down_text hidden-xs-only">
            点击按钮开始下载交易平台或手机扫描二维码下载
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12">
        <div class="right">
          <img src="../../assets/img/newIndex/down_img.png" />
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
    margin-top: 85px;
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
      .down_view_button {
        margin-right: 40px;
        .down_view_button-flex {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          cursor: pointer;
        }
        .down_view_button_2 {
          width: 365px;
          height: 45px;
          border-radius: 5px;
          border: 1px solid #2963a4;
          text-align: center;
          line-height: 45px;
          font-family: Roboto;
          font-size: 14px;
          font-weight: 400;
          color: #2963a4;
          cursor: pointer;
        }
      }
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
