<template>
  <div class="footer">
    <div class="footer_menu">
      <el-row>
        <el-col :md="6" class="logo_col hidden-sm-and-down">
          <div>
            <img src="../../assets/img/newIndex/logo_icon.png" />
          </div>
          <p>{{ t('index.reliant') }}</p>
        </el-col>
        <el-col :xs="8" :sm="8" :md="5">
          <div class="menu_ul">
            <div class="menu_li">MCLP</div>
            <div class="menu_li" @click="goPage('/Feature')">
              {{ t('index.feature') }}
            </div>
            <div class="menu_li" @click="goPage('/Product')">
              {{ t('index.product') }}
            </div>
            <div class="menu_li" @click="goPage('/FixPrice')">
              {{ t('index.price') }}
            </div>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="5">
          <div class="menu_ul">
            <div class="menu_li">{{ t('index.service') }}</div>
            <div class="menu_li" @click="goPage('/teach')">
              {{ t('index.teach') }}
            </div>
            <div class="menu_li" @click="goPage('/Support')">
              {{ t('index.support') }}
            </div>
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :md="5">
          <div class="menu_ul">
            <div class="menu_li">{{ t('index.term') }}</div>
            <div class="menu_li" @click="goPage('/table')">
              {{ t('index.disclosure') }}
            </div>
            <div class="menu_li" @click="goPage('/agreement/1')">
              {{ t('index.privacy') }}
            </div>
            <div class="menu_li" @click="goPage('/agreement/2')">{{ t('index.risk') }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer_text">
      <strong>
        {{ t('index.ensure') }}
      </strong>
      <div>
        {{ t('index.greatLoss') }}
        <br />
        {{ t('index.attention', { site: `lp.mcgrp.com/info` }) }}
        <br />
        {{ t('index.tradingFee', { site: `lp.mcgrp.com/info2323` }) }}
        <br />
        {{ t('index.ODD') }}
      </div>
    </div>
    <div class="footer_bottom">
      <p>{{ t('index.LTD') }}</p>
      <p>
        {{ t('index.CFTC') }}
      </p>
      <p>{{ t('index.address') }}</p>
      <p>{{ t('index.website') }}：https://www.magiccompass.com/</p>
      <p>{{ t('index.other') }}>></p>
    </div>
  </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
const router = useRouter();
const { t } = useI18n();
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
