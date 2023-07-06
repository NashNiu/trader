<template>
  <div>
    <div class="teach">
      <div class="teach_video">
        <h1>教学</h1>
        <div class="teach_video_list">
          <div>
            <div class="video_img">
              <img src="../../../assets/img/newIndex/video_b.png" />
              <img src="../../../assets/img/newIndex/play.png" />
            </div>
            <p>了解如何一步步使用MCLP全球CFD分析器工具筛选全球股票。</p>
            <el-button type="primary" color="#2963a4" size="large" round>
              观看视频
            </el-button>
          </div>
          <div>
            <div class="video_img">
              <img src="../../../assets/img/newIndex/video_b2.png" />
              <img src="../../../assets/img/newIndex/play.png" />
            </div>
            <p>了解如何一步步使用MCLP全球CFD分析器工具筛选全球股票。</p>
            <el-button type="primary" color="#2963a4" size="large" round>
              观看视频
            </el-button>
          </div>
        </div>
      </div>
      <div class="introduce">
        <div class="introduce_1">
          <div class="introduce_text">
            <h4>聪明的投资者从不停止学习</h4>
            <p>
              超过50门免费的在线课程，主题涵盖交易、股票、期权、期货、加密货币、技术分析
              <br />
              等，助您提升市场知识、学习投资。
            </p>
            <div class="urlButton">
              <span>访问交易者大学</span>
              <img src="../../../assets/img/newIndex/vector.png" />
            </div>
          </div>
          <div class="introduce_img">
            <img src="../../../assets/img/newIndex/introduce_img_1.png" />
          </div>
        </div>
        <div class="introduce_2">
          <div class="introduce_img">
            <img src="../../../assets/img/newIndex/introduce_img_2.png" />
          </div>
          <div class="introduce_text">
            <h4>每日市场洞察</h4>
            <p>访问交易员睿智，阅读来自70多位行业专业人士的每日市场评论。</p>
            <div class="urlButton">
              <span>访问交易员睿智</span>
              <img src="../../../assets/img/newIndex/vector.png" />
            </div>
          </div>
        </div>
        <div class="introduce_3">
          <div class="introduce_text">
            <h4>听、学、问</h4>
            <p>
              免费的实时网研会和丰富的录制网研会资源库助您掌握最新市场动向。
            </p>
            <div class="urlButton">
              <span>访问网研会</span>
              <img src="../../../assets/img/newIndex/vector.png" />
            </div>
          </div>
          <div class="introduce_img">
            <img src="../../../assets/img/newIndex/introduce_img_3.png" />
          </div>
        </div>
        <div class="introduce_4">
          <div class="introduce_img">
            <img src="../../../assets/img/newIndex/introduce_img_4.png" />
          </div>
          <div class="introduce_text">
            <h4>值得一听的讨论</h4>
            <p>
              订阅MC LiquidityProvider播客收听围绕全球金融市场的访谈和讨论。
            </p>
            <div class="urlButton">
              <span>访问博客</span>
              <img src="../../../assets/img/newIndex/vector.png" />
            </div>
          </div>
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
.teach {
  max-width: 1270px;
  margin: 0 auto;
  padding: 40px 0 114px;
  .teach_video {
    h1 {
      font-size: 40px;
      line-height: 46px;
      margin-bottom: 35px;
    }
    .teach_video_list {
      display: flex;
      justify-content: space-around;
      padding-bottom: 95px;
      .video_img {
        position: relative;
        margin-bottom: 17px;
        img {
          &:nth-child(2) {
            position: absolute;
            top: 79px;
            left: 179px;
            cursor: pointer;
          }
        }
      }
      p {
        margin-bottom: 16px;
        font-size: 14px;
        line-height: 22px;
      }
    }
  }
  .introduce {
    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 152px;
      &:last-child {
        margin-bottom: 0;
      }
      .introduce_text {
        h4 {
          font-size: 26px;
          line-height: 41px;
          margin-bottom: 8px;
        }
        p {
          font-size: 16px;
          line-height: 25px;
          margin-bottom: 14px;
        }
        .urlButton {
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #fff;
          padding: 0 20px;
          background-color: #2963a4;
          border-radius: 100px;
          cursor: pointer;
          span {
            margin-right: 14px;
          }
        }
      }
    }
  }
}
</style>
