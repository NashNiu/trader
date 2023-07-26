<script setup>
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/index.js';
import { computed, reactive, ref } from 'vue';
import { configConst } from '@/config/index.js';
import { ElMessage } from 'element-plus';
import { commonApi, userApi } from '@/api';
const { t } = useI18n();
const sendCodeDisabled = ref(false);
const sendCodeText = ref(t('uc.sendCode'));
const sendingCode = ref(false);
const sendNewCodeDisabled = ref(true);
const sendNewCodeText = ref(t('uc.sendCode'));
const sendingNewCode = ref(false);
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const visible = ref(false);
const countDown = ref(30);
const newContDown = ref(30);
const submitting = ref(false);
const formRef = ref();
const formData = reactive({
  code: '',
  email: '',
  newCode: '',
});
const validateEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(t('uc.emailErr')));
  } else if (!configConst.emailCheckRegex.test(value)) {
    callback(new Error(t('uc.emailErr2')));
  } else {
    callback();
  }
};
const emailChange = (value) => {
  if (value) {
    sendNewCodeDisabled.value = !configConst.emailCheckRegex.test(value);
  } else {
    sendNewCodeDisabled.value = true;
  }
};
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
const startNewCount = () => {
  sendNewCodeDisabled.value = true;
  newContDown.value--;
  sendNewCodeText.value = newContDown.value + 's';
  if (newContDown.value > 0) {
    setTimeout(startNewCount, 1000);
  } else {
    sendNewCodeDisabled.value = false;
    sendNewCodeText.value = t('uc.sendCode');
    newContDown.value = 30;
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
const sendNewCode = async () => {
  sendingNewCode.value = true;
  const res = await commonApi.getCodeInterface(formData.email);
  sendingNewCode.value = false;
  if (res.data.status === 0) {
    ElMessage({
      message: t('login.codeSuccess'),
      type: 'success',
    });
    startNewCount();
  }
};
const formRules = reactive({
  code: [{ required: true, message: t('uc.enterVerifyCode'), trigger: 'blur' }],
  newCode: [
    { required: true, message: t('uc.enterVerifyCode'), trigger: 'blur' },
  ],
  email: [
    { validator: validateEmail, trigger: 'blur' },
    { required: true, message: t('uc.emailErr'), trigger: 'blur' },
  ],
});
const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      submitting.value = true;
      userApi
        .changeEmail({
          email: formData.email,
          newEmailVerifyCode: formData.newCode,
          oldEmailVerifyCode: formData.code,
        })
        .then((res) => {
          if (res.data.status === 0) {
            ElMessage.success(t('uc.emailChangeSuccess'));
            userStore.setUserInfo({
              ...userStore.userInfo,
              email: formData.email,
            });
            close();
          }
        })
        .finally(() => {
          submitting.value = false;
        });
    }
  });
};
const show = () => {
  visible.value = true;
};
const close = () => {
  visible.value = false;
  formRef.value?.resetFields();
  sendCodeDisabled.value = false;
  submitting.value = false;
  sendingCode.value = false;
  sendNewCodeDisabled.value = true;
  sendingNewCode.value = false;
};
defineExpose({
  show,
});
</script>
<template>
  <el-dialog
    v-model="visible"
    :width="680"
    class="changeEmailContainer"
    @close="close"
  >
    <template #header>
      <span class="title">{{ t('uc.changeEmail') }}</span>
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
      <el-form-item class="formItem" prop="email">
        <template #label>
          <span class="label">{{ t('uc.newEmail') }}</span>
        </template>
        <el-space alignment="flex-end">
          <el-input
            v-model="formData.email"
            :placeholder="t('uc.emailErr')"
            class="codeInput input"
            @input="emailChange"
          />
          <el-button
            class="sendBtn"
            :disabled="sendNewCodeDisabled"
            :loading="sendingNewCode"
            @click="sendNewCode"
          >
            {{ sendNewCodeText }}
          </el-button>
        </el-space>
      </el-form-item>
      <el-form-item class="formItem" prop="newCode">
        <template #label>
          <span class="label">{{ t('uc.newEmailCode') }}</span>
        </template>
        <el-input
          v-model="formData.newCode"
          class="input"
          :placeholder="t('uc.newEmailCode')"
        />
      </el-form-item>
    </el-form>
    <el-button class="submit" :loading="submitting" @click="submit">
      {{ t('uc.submit') }}
    </el-button>
  </el-dialog>
</template>
<style scoped lang="less">
.changeEmailContainer {
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
