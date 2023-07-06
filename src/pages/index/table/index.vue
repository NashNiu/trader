<template>
  <div>
    <div class="table_view">
      <el-row :gutter="10">
        <el-col :md="6">
          <div class="banner_tab">
            <div
              v-for="item in data.tabList"
              :key="item.id"
              :class="data.bannerTab === item.id ? 'banner_tab_active' : ''"
              @click="
                () => {
                  data.bannerTab = item.id;
                }
              "
            >
              {{ item.text }}
            </div>
          </div>
        </el-col>
        <el-col :md="18">
          <div class="banner_list">
            <img src="../../../assets/img/newIndex/T_banner.png" />
            <div class="banner_title">
              <p>FORMS AND DISCLOSURES</p>
              <h4>Client Agreements</h4>
            </div>
          </div>
        </el-col>
      </el-row>
      <p class="p_style">
        The following forms are samples of the documents presented in our
        Account Registration System and may not be submitted to Interactive
        Brokers.
      </p>
      <div class="table_down">
        <h4>IB LLC</h4>
        <div>
          <div class="down_list">
            <div>
              AMEX Card Supplement to Interactive Brokers LLC Client Agreement
            </div>
            <div>Download</div>
          </div>
          <div class="down_list">
            <div>
              AMEX Card Supplement to Interactive Brokers LLC Client Agreement
            </div>
            <div>Download</div>
          </div>
          <div class="down_list">
            <div>
              AMEX Card Supplement to Interactive Brokers LLC Client Agreement
            </div>
            <div>Download</div>
          </div>
          <div class="down_list">
            <div>
              AMEX Card Supplement to Interactive Brokers LLC Client Agreement
            </div>
            <div>Download</div>
          </div>
          <div class="down_list">
            <div>
              AMEX Card Supplement to Interactive Brokers LLC Client Agreement
            </div>
            <div>Download</div>
          </div>
          <div class="down_list">
            <div>
              AMEX Card Supplement to Interactive Brokers LLC Client Agreement
            </div>
            <div>Download</div>
          </div>
          <div class="down_list">
            <div>
              AMEX Card Supplement to Interactive Brokers LLC Client Agreement
            </div>
            <div>Download</div>
          </div>
          <div class="down_list">
            <div>
              AMEX Card Supplement to Interactive Brokers LLC Client Agreement
            </div>
            <div>Download</div>
          </div>
          <div class="down_list">
            <div>
              AMEX Card Supplement to Interactive Brokers LLC Client Agreement
            </div>
            <div>Download</div>
          </div>
          <div class="down_list">
            <div>
              AMEX Card Supplement to Interactive Brokers LLC Client Agreement
            </div>
            <div>Download</div>
          </div>
          <div class="down_list">
            <div>
              AMEX Card Supplement to Interactive Brokers LLC Client Agreement
            </div>
            <div>Download</div>
          </div>
          <div class="down_list">
            <div>
              AMEX Card Supplement to Interactive Brokers LLC Client Agreement
            </div>
            <div>Download</div>
          </div>
        </div>
      </div>
    </div>
    <Model_4 />
  </div>
</template>
<script setup>
import { reactive } from 'vue';
import Model_4 from '../model_4.vue';
const data = reactive({
  bannerTab: '1',
  tabList: [
    {
      text: 'Client Agreements',
      id: '1',
    },
    {
      text: 'Model Marketplace Agreements',
      id: '2',
    },
    {
      text: 'Disclosures',
      id: '3',
    },
    {
      text: 'Tax Forms',
      id: '4',
    },
    {
      text: 'Client Service Forms',
      id: '5',
    },
    {
      text: 'Market Data Agreements',
      id: '6',
    },
  ],
});
</script>
<style lang="less" scoped>
.table_view {
  max-width: 1270px;
  margin: 0 auto;
  padding: 40px 0 37px;
  .banner_tab {
    > div {
      height: 50px;
      background-color: #f7f8f8;
      font-size: 16px;
      line-height: 25px;
      padding: 0 20px;
      line-height: 50px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .banner_tab_active {
      background-color: #e2e4e5;
    }
  }
  .banner_list {
    position: relative;
    background-color: rgba(0, 0, 0, 0.5);
    img {
      width: 100%;
      height: 350px;
      position: relative;
      z-index: -1;
    }
    .banner_title {
      color: #fff;
      position: absolute;
      top: 80px;
      left: 50px;
      p {
        font-size: 16px;
        line-height: 25px;
      }
      h4 {
        font-size: 36px;
        line-height: 57px;
      }
    }
  }
  .p_style {
    font-size: 16px;
    line-height: 25px;
    padding: 39px 0 38px;
  }
  .table_down {
    > h4 {
      font-size: 26px;
      line-height: 41px;
      margin-bottom: 8px;
    }
    .down_list {
      height: 45px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 40px 0 19px;
      &:nth-child(odd) {
        background-color: #eff1f1;
      }
      > div {
        font-size: 14px;
        &:nth-child(2) {
          color: #2963a4;
        }
      }
    }
  }
}
</style>
