<template>
  <div class="extensionlink">
    <div class="customerTitle">
      <h3 class="title">{{ t('menu.extensionlink') }}</h3>
    </div>
    <div class="center-view">
      <el-form label-width="0px">
        <el-row :gutter="20">
          <template v-for="item in data.spreadUrlList">
            <div
              v-if="item.url !== '' && item.url !== undefined"
              :key="item.name"
            >
              <el-col :span="16">
                <el-form-item :label="item.name" label-width="120px">
                  <el-input
                    :id="item.name"
                    :value="item.url"
                    readonly
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item>
                  <el-button type="primary" @click="onCopy(item.name)">
                    {{ t('extensionlink.copy') }}
                  </el-button>
                  <span style="margin-left: 20px">
                    {{ t('extensionlink.promocode') }}: {{ item.promotionNum }}
                  </span>
                  <el-popover
                    placement="top-start"
                    width="200"
                    trigger="hover"
                    :content="item.tip"
                  >
                    <template #reference>
                      <i
                        class="el-icon-warning-outline"
                        style="
                          font-size: 20px;
                          margin-left: 20px;
                          cursor: pointer;
                        "
                      ></i>
                    </template>
                  </el-popover>
                </el-form-item>
              </el-col>
            </div>
          </template>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script setup>
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { onMounted, reactive } from 'vue';
import { getPromotionNumber } from '@/api/agency.js';
import { useUserStore } from '@/store/index.js';
const { t } = useI18n();
const userStore = useUserStore();
const data = reactive({
  spreadUrlList: [],
});
onMounted(() => {
  getData();
});
const onCopy = (name) => {
  var Url2 = document.getElementById(name);
  Url2.select(); // 选择对象
  document.execCommand('Copy'); // 执行浏览器复制命令
  ElMessage.success(t('extensionlink.copysucc'));
};
const getData = async () => {
  const params = {
    account: userStore.userInfo?.mtaccr,
    platform: userStore.platform,
  };
  const res = await getPromotionNumber(params);
  if (res.data.IsSuccess) {
    let dataList = [];
    for (let i = 0; i < 8; i++) {
      let listItem = {
        promotionNum: res.data.Data['promotionNum-' + i],
        name: formatIsNoLoad(i),
        url: res.data.Data['url-' + i],
        tip: formatTip(i),
      };
      dataList.push(listItem);
    }
    console.log(dataList);
    data.spreadUrlList = [...dataList];
  }
};
const formatIsNoLoad = (val) => {
  switch (+val) {
    case 0:
      return 'S0';
    case 1:
      return 'S10';
    case 2:
      return 'S20';
    case 3:
      return 'S30';
    case 4:
      return 'S40';
    case 5:
      return 'S50';
    case 6:
      return 'S502';
    case 7:
      return 'E10';
  }
};
const formatTip = (val) => {
  switch (+val) {
    case 0:
      return t('extensionlink.stpnocom');
    case 1:
      return t('extensionlink.stp10usd');
    case 2:
      return t('extensionlink.stp20usd');
    case 3:
      return t('extensionlink.stp30usd');
    case 4:
      return t('extensionlink.stp40usd');
    case 5:
      return t('extensionlink.stp50usd');
    case 6:
      return t('extensionlink.stp50usd');
    case 7:
      return t('extensionlink.ecnlowspread');
  }
};
</script>
<style lang="less" scoped>
.extensionlink {
  padding: 20px;
  box-sizing: border-box;
  background-color: #f3f3f3;
  display: flex;
  flex-direction: column;
  height: 100%;
  .customerTitle {
    padding-left: 15px;
    .title {
      font-size: 22px;
      color: #0c3d93;
      margin-bottom: 15px;
    }
  }
  .center-view {
    margin-top: 15px;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 6px;
    background-color: #ffffff;
    flex: 1;
    display: flex;
    flex-direction: column;
    height: calc(100% - 80px);
  }
}
</style>
