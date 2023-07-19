<template>
  <div class="footer">
    <div class="footer_menu">
      <el-row>
        <el-col :md="6" class="logo_col hidden-sm-and-down">
          <div>
            <img src="../../assets/img/newIndex/logo_icon.png" />
          </div>
          <p>备受全球投资者信赖的流动性供应商</p>
        </el-col>
        <el-col :xs="8" :sm="8" :md="5">
          <div class="menu_ul">
            <div class="menu_li">MCLP</div>
            <div class="menu_li" @click="goPage('/Feature')">功能</div>
            <div class="menu_li" @click="goPage('/Product')">产品</div>
            <div class="menu_li" @click="goPage('/FixPrice')">定价</div>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="5">
          <div class="menu_ul">
            <div class="menu_li">服务</div>
            <div class="menu_li" @click="goPage('/teach')">教学</div>
            <div class="menu_li" @click="goPage('/Support')">支持</div>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="5">
          <div class="menu_ul">
            <div class="menu_li">条款说明</div>
            <div class="menu_li" @click="goPage('/table')">表格与披露</div>
            <div class="menu_li" @click="goPage('/agreement')">隐私政策</div>
            <div class="menu_li">风险声明</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer_text">
      <strong>
        保证金融资只适合风险承受能力较高的有经验的投资者。您的损失可能会超过您的初始投资。
      </strong>
      <div>
        在线交易股票、期权、期货、货币、外国股票和固定收益产品可能存在巨大损失风险。
        <br />
        请注意，账户申请者均须在摩石证券有限公司开立一个MCLP
        Lite版账户。该账户类型仅限于交易美国交易所挂牌股票和ETF。更多信息，请参见lp.mcgrp.com/info。MCLP之所以能够支持某些产品免佣金交易是因为我们可以就这类委托单的单流从做市商那里获得一定报酬。
        <br />
        所有卖单都需缴纳一小笔费用以补偿监管机构向我司收取的交易费。更多信息，请参见lp.mcgrp.com/info
        <br />
        期权交易涉及风险，并不适合所有投资者。更多信息，请阅读标准期权的特征和风险（也称“期权披露文件（ODD）”）。或者，也可以致电+357
        25023880索要ODD副本。开始交易之前，客户必须阅读我们警告和披露页面上的相关风险披露声明。保证金交易只适合风险承受能力较高的有经验的投资者。您的损失可能会超过您的初始投资。有关保证金借贷利率的详细信息，请参见保证金贷款利率页面。证券期货具有高风险，并不适合所有投资者。您的损失可能会超过您的初始投资。开始交易证券期货之前，请阅读证券期货风险披露声明。结构性产品和固定收益产品（如债券）属于复杂产品，风险较高，并不适合所有投资者。开始交易前，请阅读风险警告和披露声明。
      </div>
    </div>
    <div class="footer_bottom">
      <p>摩石有限责任公司（MAGIC COMPASS LTD）的MC LiquityProvider</p>
      <p>
        是NYSE - FINRA - SIPC的成员，受塞浦路斯和商品期货交易委员会（Commodity
        Futures Trading Commission）监管。
      </p>
      <p>总部地址：Sarlo 9, Ayios Athanasios, 4106 Limassol, Cyprus</p>
      <p>网站：https://www.magiccompass.com/</p>
      <p>有关其他摩石证券MCLP联属公司的信息>></p>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const goPage = (url) => {
  router.push({
    path: url,
  });
};
</script>
<style lang="less" scoped>
a {
  text-decoration: none;
  color: #000;
}
.footer {
  max-width: 1270px;
  margin: 0 auto;
  .footer_menu {
    margin-bottom: 26px;
    padding-top: 38px;
    .logo_col {
      img {
        margin-bottom: 15px;
      }
    }
    .menu_ul {
      text-align: center;
      .menu_li {
        margin-bottom: 17px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .footer_text {
    font-size: 14px;
    margin-bottom: 31px;
    > div {
      line-height: 22px;
    }
    strong {
      margin-bottom: 14px;
      display: block;
    }
  }
  .footer_bottom {
    margin: 0 auto;
    border-top: 1px solid #e4e4e4;
    padding: 30px 0 42px;
    text-align: center;
    line-height: 30px;
    p {
      font-size: 14px;
      &:nth-child(1) {
        font-size: 18px;
        font-weight: bold;
      }
      &:nth-child(5) {
        font-size: 16px;
        font-weight: bold;
      }
    }
  }
}
@media (max-width: 768px) {
  .footer {
    .footer_text {
      margin-bottom: 18px;
    }
    .footer_bottom {
      text-align: left;
      padding-top: 20px;
      p {
        &:nth-child(1) {
          line-height: 21px;
          margin-bottom: 10px;
        }
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
          line-height: 16px;
          margin-bottom: 12px;
        }
      }
    }
  }
}
@media (max-width: 1270px) {
  .footer {
    padding: 0 20px;
  }
}
</style>
