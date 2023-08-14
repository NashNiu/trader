<template>
  <div>
    <div class="support">
      <h1>{{ t('support.support') }}</h1>
      <div class="chat">
        <div class="left">
          <h4>{{ t('support.question') }}？</h4>
          <p>{{ t('support.contact') }}！</p>
        </div>
        <div class="right">
          <div>{{ t('support.chat') }}</div>
          <div @click="showDialog">{{ t('support.consult') }}</div>
        </div>
      </div>
    </div>
    <Model_4 />
    <!-- 支持咨询单 -->
    <el-dialog
      v-model="data.dialogVisible"
      :before-close="handleClose"
      width="40%"
    >
      <h4 class="dialog-h4">{{ t('common.feedback.title') }}</h4>
      <el-form
        ref="form"
        :model="data.form"
        :rules="data.rules"
        label-width="80px"
      >
        <el-form-item label="t('common.feedback.form.type')" prop="type">
          <el-select v-model="data.form.type" placeholder="请选择问题类型">
            <el-option label="注册" value="1"></el-option>
            <el-option label="开户" value="2"></el-option>
            <el-option label="提现" value="3"></el-option>
            <el-option label="交易" value="4"></el-option>
            <el-option label="充值" value="5"></el-option>
            <el-option label="KYC" value="6"></el-option>
            <el-option label="系统问题" value="7"></el-option>
            <el-option label="其他" value="8"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="t('common.feedback.form.title')" prop="title">
          <el-input v-model="data.form.title"></el-input>
        </el-form-item>
        <el-form-item label="t('common.feedback.form.content')" prop="content">
          <el-input type="textarea" v-model="data.form.content"></el-input>
        </el-form-item>
        <el-form-item label="t('common.feedback.form.upload')">
          <el-upload
            ref="uploadImg"
            action="/lpapi/api/users/user/uploadFile?expire=620000000"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="t('common.feedback.form.contacts')" prop="contacts">
          <el-input v-model="data.form.contacts"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleSubmin">{{ t('common.submit') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import Model_4 from '../model_4.vue';
import { saveAndFlush } from '@/api/commonapi';
import { ElMessage } from 'element-plus';
const { t } = useI18n();
const form = ref();
const uploadImg = ref();
const data = reactive({
  dialogVisible: false,
  imagesList: [],
  form: {
    type: '',
    title: '',
    content: '',
    contacts: '',
    images: '',
  },
  rules: {
    type: [{ required: true, message: '请选择问题类型', trigger: 'change' }],
    title: [{ required: true, message: '请输入问题标题', trigger: 'blur' }],
    content: [{ required: true, message: '请输入问题描述', trigger: 'blur' }],
    contacts: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
  },
});
const showDialog = () => {
  data.dialogVisible = true;
};
const handleClose = () => {
  data.dialogVisible = false;
  data.imagesList = [];
  uploadImg.value.clearFiles(); 
  form.value.resetFields();
};
const handleSubmin = () => {
  form.value?.validate((valid) => {
    if (valid) {
      saveAndFlush(data.form).then((res) => {
        if (res.data.status === 0) {
          ElMessage({
            message: t('common.operateSuccess'),
            type: 'success',
          });
          handleClose();
        }
      });
    }
  });
};
const handlePictureCardPreview = (file) => {
  console.log(file);
};
const handleRemove = (file, fileList) => {
  data.imagesList = fileList;
  data.form.images = data.imagesList.join(';');
};
const handleAvatarSuccess = (res, file) => {
  data.imagesList.push(res.data);
  data.form.images = data.imagesList.join(';');
};
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
.dialog-h4 {
  font-size: 30px;
  color: #333;
  margin-bottom: 25px;
}
.dialog-footer {
  display: inline-block;
  width: 100%;
  text-align: right;
}
</style>
