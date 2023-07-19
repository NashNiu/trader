<template>
  <div>
    <div class="support">
      <h1>支持</h1>
      <div class="chat">
        <div class="left">
          <h4>还有问题？</h4>
          <p>快来联系我们！我们很高兴为您提供帮助！</p>
        </div>
        <div class="right">
          <div>聊天</div>
          <div>支持咨询单</div>
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
.support {
  max-width: 1270px;
  margin: 0 auto;
  padding: 30px 0 41px;
  h1 {
    font-size: 40px;
    line-height: 46px;
    margin-bottom: 25px;
  }
  .chat {
    background: #f6f8f9;
    padding: 26px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px;
    .left {
      h4 {
        font-size: 26px;
        line-height: 41px;
        margin-bottom: 3px;
      }
      p {
        font-size: 14px;
        line-height: 22px;
      }
    }
    .right {
      > div {
        display: inline-block;
        font-size: 14px;
        padding: 0 20px;
        height: 44px;
        line-height: 48px;
        border-radius: 100px;
        cursor: pointer;
        &:nth-child(1) {
          border: 1px solid #2963a4;
          color: #2963a4;
          margin-right: 20px;
        }
        &:nth-child(2) {
          border: 1px solid #2963a4;
          background-color: #2963a4;
          color: #fff;
        }
      }
    }
  }
}
</style>
