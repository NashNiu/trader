<template>
  <div>
    <div class="teach">
      <div class="teach_video">
        <h1>{{ t('teach.teach') }}</h1>
        <div class="teach_video_list">
          <div>
            <div class="video_img">
              <img src="../../../assets/img/newIndex/video_b.png" />
              <img src="../../../assets/img/newIndex/play.png" />
            </div>
            <p>{{ t('teach.learn') }}</p>
            <el-button type="primary" color="#2963a4" size="large" round>
              {{ t('teach.video') }}
            </el-button>
          </div>
          <div>
            <div class="video_img">
              <img src="../../../assets/img/newIndex/video_b2.png" />
              <img src="../../../assets/img/newIndex/play.png" />
            </div>
            <p>{{ t('teach.learn') }}</p>
            <el-button type="primary" color="#2963a4" size="large" round>
              {{ t('teach.video') }}
            </el-button>
          </div>
        </div>
      </div>
      <div class="introduce">
        <div class="introduce_1">
          <div class="introduce_text">
            <h4>{{ t('teach.smart') }}</h4>
            <p>
              {{ t('teach.course') }}
            </p>
            <div class="urlButton" @click="goHref('https://www.youtube.com/watch?v=RXbst0uYS1I')">
              <span>{{ t('teach.visit') }}</span>
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
            <h4>{{ t('teach.daily') }}</h4>
            <p>{{ t('teach.reviews') }}</p>
            <div class="urlButton" @click="goHref('https://www.youtube.com/watch?v=RXbst0uYS1I')">
              <span>{{ t('teach.trader') }}</span>
              <img src="../../../assets/img/newIndex/vector.png" />
            </div>
          </div>
        </div>
        <div class="introduce_3">
          <div class="introduce_text">
            <h4>{{ t('teach.listen') }}</h4>
            <p>
              {{ t('teach.free') }}
            </p>
            <div class="urlButton" @click="goHref('https://www.youtube.com/watch?v=RXbst0uYS1I')">
              <span>{{ t('teach.research') }}</span>
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
            <h4>{{ t('teach.discuss') }}</h4>
            <p>
              {{ t('teach.subscribe') }}
            </p>
            <div class="urlButton" @click="goHref('https://mc-liquidityprovider.blogspot.com/')">
              <span>{{ t('teach.blog') }}</span>
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
import { useI18n } from 'vue-i18n';
import Model_4 from '../model_4.vue';
const { t } = useI18n();
const goHref = (url) => {
  window.location.href = url
}
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
