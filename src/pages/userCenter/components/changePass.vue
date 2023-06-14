<template>
  <el-dialog
    v-model="dialogVisible"
    class="changePassContainer"
    :width="680"
    @close="close"
  >
    <template #header>
      <span class="title">Change Login Password</span>
    </template>
    <el-form
      ref="formRef"
      label-position="top"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item class="formItem">
        <template #label><span class="label">E-mail address</span></template>
        <el-space alignment="flex-end">
          <el-input :value="userInfo?.email" disabled class="codeInput input" />
          <el-button
            class="sendBtn"
            :disabled="sendCodeDisabled"
            :loading="sendingCode"
            @click="sendCode"
          >
            {{ sendCodeText }}
          </el-button>
        </el-space>
      </el-form-item>
      <el-form-item class="formItem" prop="code">
        <template #label><span class="label">Verification Code</span></template>
        <el-input
          v-model="formData.code"
          class="input"
          placeholder="Please enter verification code"
        />
      </el-form-item>
      <el-form-item class="formItem" prop="password">
        <template #label><span class="label">New Password</span></template>
        <el-input
          v-model="formData.password"
          type="password"
          show-password
          class="input"
          placeholder="Password including case symbols greater than 8 digits"
        />
      </el-form-item>
      <el-form-item class="formItem" prop="repeatPass">
        <template #label>
          <span class="label">Confirm New Password</span>
        </template>
        <el-input
          v-model="formData.repeatPass"
          type="password"
          show-password
          class="input"
          placeholder="Password including case symbols greater than 8 digits"
        />
      </el-form-item>
    </el-form>
    <el-button class="submit" :loading="submitting" @click="submit">
      Submit
    </el-button>
  </el-dialog>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { computed } from 'vue';
import { useUserStore } from '@/store/index.js';
import { commonApi, userApi } from '@/api';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
import { tools } from '@/utils/index.js';
const { t } = useI18n();
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const dialogVisible = ref(false);
const sendCodeDisabled = ref(false);
const sendCodeText = ref('Send Code');
const submitting = ref(false);
const formRef = ref();
const countDown = ref(30);
const sendingCode = ref(false);
const formData = reactive({
  code: '',
  password: '',
  repeatPass: '',
});
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password again'));
  } else if (value !== formData.password) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};
const formRules = reactive({
  code: [{ required: true, message: 'Please input code', trigger: 'blur' }],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
  ],
  repeatPass: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' },
  ],
});
const startCount = () => {
  sendCodeDisabled.value = true;
  countDown.value--;
  sendCodeText.value = countDown.value + 's';
  if (countDown.value > 0) {
    setTimeout(startCount, 1000);
  } else {
    sendCodeDisabled.value = false;
    sendCodeText.value = 'Send Code';
    countDown.value = 30;
  }
};
const sendCode = async () => {
  sendingCode.value = true;
  const res = await commonApi.getCodeInterface(userInfo.value.email);
  sendingCode.value = false;
  if (res.data.status === 0) {
    ElMessage({
      message: t('login.codeSuccess'),
      type: 'success',
    });
    startCount();
  } else {
    ElMessage.error(t('login.codefail'));
  }
};
const submit = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      submitting.value = true;
      userApi
        .changePass({
          email: userInfo.value.email,
          verifyCode: formData.code,
          password: formData.password,
        })
        .then((res) => {
          if (res.data.status === 0) {
            ElMessage.success('密码修改成功,请重新登录');
            close();
            tools.clearAndLogout();
          } else {
            ElMessage.error('操作失败');
          }
        })
        .finally(() => {
          submitting.value = false;
        });
      console.log('submit!');
    } else {
      console.log('error submit!');
      return false;
    }
  });
};
const show = () => {
  dialogVisible.value = true;
};
const close = () => {
  dialogVisible.value = false;
  formRef.value?.resetFields();
  sendCodeDisabled.value = false;
  submitting.value = false;
  sendingCode.value = false;
};
defineExpose({
  show,
});
</script>
<style scoped lang="less">
.changePassContainer {
  .title {
    font-family: MicrosoftYaHei-Bold;
    font-size: 22px;
    color: #333333;
  }
  .formItem {
    .label {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      font-weight: bold;
      color: #666666;
    }
    .input {
      width: 620px;
      height: 52px;
      background-color: #f6f6f6;
      border-radius: 8px;
      border: solid 1px #eeeeee;
      font-size: 20px;
      color: #666666;
      &.codeInput {
        width: 426px;
      }
    }
    .sendBtn {
      width: 182px;
      height: 52px;
      background-color: #266fe8;
      border-radius: 8px;
      font-family: MicrosoftYaHei;
      font-size: 20px;
      font-weight: bold;
      color: #ffffff;
    }
  }
  .submit {
    margin-top: 25px;
    width: 620px;
    height: 52px;
    background-color: #0c3d93;
    border-radius: 8px;
    font-family: MicrosoftYaHei;
    font-size: 20px;
    color: #ffffff;
  }
}
</style>
