<script setup>
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/index.js';
import { computed, reactive, ref } from 'vue';
import { configConst } from '@/config/index.js';
import { ElMessage } from 'element-plus';
import { userApi } from '@/api';
const { t } = useI18n();
const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);
const isEdit = computed(() => !!userInfo.value.phone); // 是：修改  否：绑定
const title = isEdit.value ? t('uc.changePhone') : t('uc.bindPhone');
const visible = ref(false);
const submitting = ref(false);
const sendCodeDisabled = ref(false);
const sendCodeText = ref(t('uc.sendCode'));
const sendingCode = ref(false);
const countDown = ref(30);
const newContDown = ref(30);
const sendNewCodeDisabled = ref(false);
const sendNewCodeText = ref(t('uc.sendCode'));
const sendingNewCode = ref(false);
const formRef = ref();
const formData = reactive({
  phone: '',
  code: '',
  newCode: '',
  newPhone: '',
  areaCode: '86',
});
const formRules = reactive({
  code: [{ required: true, message: t('uc.enterVerifyCode'), trigger: 'blur' }],
  newCode: [
    { required: true, message: t('uc.enterVerifyCode'), trigger: 'blur' },
  ],
  phone: [{ required: true, message: t('uc.inputPhone'), trigger: 'blur' }],
  newPhone: [{ required: true, message: t('uc.inputPhone'), trigger: 'blur' }],
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
  const phone = isEdit.value
    ? formData.phone
    : formData.areaCode + formData.phone;
  const res = await userApi.sendPhoneCode(phone);
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
  const res = await userApi.sendPhoneCode(
    formData.areaCode + formData.newPhone
  );
  sendingNewCode.value = false;
  if (res.data.status === 0) {
    ElMessage({
      message: t('login.codeSuccess'),
      type: 'success',
    });
    startNewCount();
  }
};
const submit = () => {
  let params = {};
  if (isEdit.value) {
    params = {
      phone: formData.areaCode + formData.newPhone,
      newPhoneVerifyCode: formData.newCode,
      oldPhoneVerifyCode: formData.code,
    };
  } else {
    params = {
      phone: formData.areaCode + formData.phone,
      newPhoneVerifyCode: formData.code,
    };
  }
  formRef.value.validate((valid) => {
    if (valid) {
      submitting.value = true;
      userApi
        .changePhone(params)
        .then((res) => {
          if (res.data.status === 0) {
            ElMessage.success(t('uc.phoneChangeSuccess'));
            userStore.setUserInfo({
              ...userStore.userInfo,
              phone: params.phone,
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
const close = () => {
  visible.value = false;
  formRef.value?.resetFields();
  submitting.value = false;
  sendingCode.value = false;
  sendingNewCode.value = false;
};
const onDialogOpen = () => {
  formData.phone = userInfo.value.phone;
};
const show = () => {
  visible.value = true;
};
defineExpose({
  show,
});
</script>
<template>
  <el-dialog
    v-model="visible"
    :width="680"
    class="changePhoneContainer"
    @close="close"
    @open="onDialogOpen"
  >
    <template #header>
      <span class="title">{{ title }}</span>
    </template>
    <el-form
      ref="formRef"
      label-position="top"
      :model="formData"
      :rules="formRules"
    >
      <el-form-item class="formItem" prop="phone">
        <template #label>
          <span class="label">{{ t('uc.phone') }}</span>
        </template>
        <el-space alignment="flex-end">
          <el-input
            v-model="formData.phone"
            :disabled="isEdit"
            class="codeInput input"
          >
            <template v-if="!isEdit" #prepend>
              <el-select
                v-model="formData.areaCode"
                style="width: 100px; --el-component-size: 50px"
              >
                <el-option
                  v-for="item in configConst.phoneAreaCode"
                  :key="item.code"
                  :label="`+${item.code}`"
                  :value="item.code"
                />
              </el-select>
            </template>
          </el-input>
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
      <el-form-item v-if="isEdit" class="formItem" prop="newPhone">
        <template #label>
          <span class="label">{{ t('uc.newPhone') }}</span>
        </template>
        <el-space alignment="flex-end">
          <el-input v-model="formData.newPhone" class="codeInput input">
            <template #prepend>
              <el-select
                v-model="formData.areaCode"
                style="width: 100px; --el-component-size: 50px"
              >
                <el-option
                  v-for="item in configConst.phoneAreaCode"
                  :key="item.code"
                  :label="`+${item.code}`"
                  :value="item.code"
                />
              </el-select>
            </template>
          </el-input>
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
      <el-form-item v-if="isEdit" class="formItem" prop="newCode">
        <template #label>
          <span class="label">{{ t('uc.inputNewPhoneCode') }}</span>
        </template>
        <el-input
          v-model="formData.newCode"
          class="input"
          :placeholder="t('uc.inputNewPhoneCode')"
        />
      </el-form-item>
    </el-form>
    <el-button class="submit" :loading="submitting" @click="submit">
      {{ t('uc.submit') }}
    </el-button>
  </el-dialog>
</template>
<style scoped lang="less">
.changePhoneContainer {
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
