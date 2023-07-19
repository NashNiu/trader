<template>
  <div>
    <div class="price">
      <h1>PC liquidityProvider 新客户定价</h1>
      <div class="price_table">
        <div class="price_table-title">佣金</div>
        <div class="price_table-tr">
          <div>股票</div>
          <div>免费</div>
        </div>
        <div class="price_table-tr">
          <div></div>
          <div>交易价值的3%或每笔交易14.95美元（取两者中较低者）</div>
        </div>
        <div class="price_table-tr">
          <div>加密货币</div>
          <div>
            <p>
              交易价值的0.12%到0.18%*，每笔委托单最低1.75美元，最高不超过交易价值的1%。
            </p>
            <p>查看加密货币佣金</p>
            <p>*交易价值的0.08&</p>
          </div>
        </div>
      </div>
      <div class="price_table">
        <div class="price_table-title">所有其它费用</div>
        <div class="price_table-tr">
          <div>存款</div>
          <div>免费</div>
        </div>
        <div class="price_table-tr">
          <div>数字币取款</div>
          <div>代收矿工费</div>
        </div>
        <div class="price_table-tr">
          <div>法币取款</div>
          <div>根据您所处国家和地区，以及币种，收取一定的提现费用</div>
        </div>
      </div>
    </div>
    <Model_4 />
  </div>
</template>
<script setup>
import Model_4 from '../model_4.vue';
</script>
<style lang="less" scoped>
.price {
  max-width: 1270px;
  margin: 0 auto;
  padding: 30px 0 51px;
  h1 {
    font-size: 40px;
    font-weight: 800;
    line-height: 46px;
    margin-bottom: 25px;
  }
  .price_table {
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
    > div {
      border-bottom: 1px solid #e4eaed;
    }
    .price_table-title {
      font-size: 26px;
      font-weight: 600;
      line-height: 42px;
      padding-bottom: 30px;
    }
    .price_table-tr {
      padding: 16px 0;
      display: flex;
      > div {
        font-size: 16px;
        line-height: 25px;
        &:nth-child(1) {
          font-weight: bold;
          width: 22%;
        }
      }
    }
  }
}
</style>
