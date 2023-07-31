<template>
  <el-dialog
    v-model="dialogVisible"
    class="changePassContainer"
    :width="680"
    @close="close"
  >
    <template #header>
      <span class="title">{{ t('uc.changeLoginPass') }}</span>
    </template>
    <el-form
      ref="formRef"
      label-position="top"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item class="formItem">
        <template #label>
          <span class="label">{{ t('uc.email') }}</span>
        </template>
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
        <template #label>
          <span class="label">{{ t('uc.verifyCode') }}</span>
        </template>
        <el-input
          v-model="formData.code"
          class="input"
          :placeholder="t('uc.enterVerifyCode')"
        />
      </el-form-item>
      <el-form-item class="formItem" prop="password">
        <template #label>
          <span class="label">{{ t('uc.newPass') }}</span>
        </template>
        <el-input
          v-model="formData.password"
          type="password"
          show-password
          class="input"
          :placeholder="t('uc.passReq')"
        />
      </el-form-item>
      <el-form-item class="formItem" prop="repeatPass">
        <template #label>
          <span class="label">{{ t('uc.confirmPass') }}</span>
        </template>
        <el-input
          v-model="formData.repeatPass"
          type="password"
          show-password
          class="input"
          :placeholder="t('uc.passReq')"
        />
      </el-form-item>
    </el-form>
    <el-button class="submit" :loading="submitting" @click="submit">
      {{ t('uc.submit') }}
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
import { configConst } from '@/config/index.js';
const { t } = useI18n();
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const dialogVisible = ref(false);
const sendCodeDisabled = ref(false);
const sendCodeText = ref(t('uc.sendCode'));
const submitting = ref(false);
const formRef = ref();
const countDown = ref(30);
const sendingCode = ref(false);
const formData = reactive({
  code: '',
  password: '',
  repeatPass: '',
});
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(t('uc.passErr1')));
  } else if (!configConst.passCheckRegex.test(value)) {
    callback(new Error(t('uc.passErr2')));
  } else {
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(t('uc.passAgain')));
  } else if (value !== formData.password) {
    callback(new Error(t('uc.notMatch')));
  } else {
    callback();
  }
};
const formRules = reactive({
  code: [{ required: true, message: t('uc.enterVerifyCode'), trigger: 'blur' }],
  password: [
    { validator: validatePass, trigger: 'blur' },
    { required: true, message: t('uc.passErr1'), trigger: 'blur' },
  ],
  repeatPass: [
    { required: true, message: t('uc.passErr1'), trigger: 'blur' },
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
    sendCodeText.value = t('uc.sendCode');
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
            ElMessage.success(t('uc.passChangeSuccess'));
            close();
            tools.clearAndLogout();
          }
        })
        .finally(() => {
          submitting.value = false;
        });
    } else {
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
