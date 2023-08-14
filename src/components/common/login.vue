<template>
  <div class="positionBox">
    <div class="login">
      <el-card class="box-card">
        <img
          v-if="!forgotShow"
          src="../../assets/img/header/close.png"
          class="close_style"
          @click="resetForm(formRef)"
        />
        <img
          v-else
          src="../../assets/img/newIndex/arrow.png"
          class="back_style"
          @click="backTo"
        />
        <template v-if="!forgotShow">
          <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane :label="t('login.loginTabs')" name="second">
              <el-form
                ref="formRef"
                :label-position="labelPosition"
                :model="loginFrom"
                :rules="rules"
              >
                <el-form-item prop="email">
                  <el-input
                    v-model="loginFrom.email"
                    :placeholder="t('login.emailadress')"
                    clearable
                  />
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="loginFrom.password"
                    type="password"
                    :placeholder="t('login.pPassword')"
                    clearable
                    show-password
                  />
                </el-form-item>
                <div class="forgot" @click="goForgot">{{t('common.forgotPassword')}}</div>
                <el-form-item>
                  <el-button type="primary" @click="onSubmitLogin">
                    {{ t('login.login') }}
                  </el-button>
                  <!-- <el-button @click="resetForm(formRef)">
                  {{ t('login.cancal') }}
                </el-button> -->
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane :label="t('login.regTabs')" name="first">
              <el-form
                :label-position="labelPosition"
                :model="registerFrom"
                :rules="rules"
              >
                <el-form-item prop="email">
                  <el-input
                    v-model="registerFrom.email"
                    :placeholder="t('login.pEmail')"
                    clearable
                  />
                </el-form-item>
                <el-form-item prop="region">
                  <el-input
                    v-model="registerFrom.region"
                    :placeholder="t('login.pExa')"
                    clearable
                  >
                    <template #append>
                      <button
                        class="sendEMail"
                        style="cursor: pointer"
                        :disabled="isSend"
                        @click="getCode"
                      >
                        {{ getCodeInfo }}
                      </button>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    v-model="registerFrom.password"
                    type="password"
                    :placeholder="t('login.pLeight')"
                    clearable
                    show-password
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmitRegister">
                    {{ t('login.reg') }}
                  </el-button>
                  <!-- <el-button @click="resetForm(formRef)">
                  {{ t('login.cancal') }}
                </el-button> -->
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
          <div class="line">
            <p class="title">
              <span>{{ t('login.orP') }}</span>
            </p>
          </div>
          <div id="g_id_signin" class="g_id_signin" @click="googleBtn">
            <img :src="googleImg" class="googleImg" alt="" />
            <span>Google</span>
          </div>
        </template>
        <!-- 忘记密码窗口 -->
        <template v-else>
          <div class="forgotView">
            <div class="F_title">{{t('common.forgotPassword')}}</div>
            <el-form
              ref="forgotForm"
              :label-position="labelPosition"
              :model="forgotFrom"
              :rules="forgotRules"
            >
              <el-form-item prop="email">
                <el-input
                  v-model="forgotFrom.email"
                  :placeholder="t('login.pEmail')"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="region">
                <el-input
                  v-model="forgotFrom.region"
                  :placeholder="t('login.pExa')"
                  clearable
                >
                  <template #append>
                    <button
                      class="sendEMail"
                      style="cursor: pointer"
                      :disabled="isSend"
                      @click="getCode"
                    >
                      {{ getCodeInfo }}
                    </button>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="forgotFrom.password"
                  type="password"
                  :placeholder="t('login.rLeight')"
                  clearable
                  show-password
                />
              </el-form-item>
              <el-form-item prop="passwordOK">
                <el-input
                  v-model="forgotFrom.passwordOK"
                  type="password"
                  :placeholder="t('login.rLeight2')"
                  clearable
                  show-password
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmitForgot">
                  {{ t('common.confirm') }}
                </el-button>
                <div class="backButton">
                  {{ t('login.backButtonText') }}<span @click="backTo">{{ t('login.backLogin') }}</span>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-card>
    </div>
  </div>
  <div class="positionBoxWindowMaing"></div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import {
  getCodeInterface,
  registerInterface,
  registerGoogleInterface,
  loginInterface,
} from '@/api/commonapi.js';
import { postChpwd } from '@/api/user';
import { useI18n } from 'vue-i18n';
import googleImg from '@/assets/img/sidebar/google_icon.png';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { nextTick } from 'vue';
import { configConst } from '@/config/index.js';
const { t } = useI18n();
const router = useRouter();
const isSend = ref(false);
const forgotShow = ref(false);
const emit = defineEmits(['hide']);
const formRef = ref();
const activeName = ref('second');
const forgotForm = ref();
const goForgot = () => {
  forgotShow.value = true;
};
const backTo = () => {
  forgotForm.value.resetFields();
  forgotShow.value = false;
};
const handleClick = (tab) => {
  // nextTick(() => {
  //   let ele = document.getElementsByClassName('el-tabs__active-bar')[0];
  //   let distance = tab.index === 0 ? 0 : tab.index * 200 + 'px';
  //   ele.style.transform = 'translateX(' + distance + ')';
  // });
};
const tims = ref(30);
const labelPosition = ref('left');
const getCodeInfo = ref(t('login.code'));
const registerFrom = reactive({
  email: '',
  region: '',
  password: '',
});
const loginFrom = reactive({
  email: '',
  password: '',
});
const forgotFrom = reactive({
  email: '',
  region: '',
  password: '',
  passwordOK: '',
});
const timsGO = () => {
  tims.value--;
  getCodeInfo.value = tims.value + 's';
  if (tims.value > 0) {
    setTimeout(timsGO, 1000);
    isSend.value = true;
  } else {
    isSend.value = false;
    getCodeInfo.value = t('login.code');
    tims.value = 30;
  }
};
const getCode = () => {
  if (registerFrom.email || forgotFrom.email) {
    isSend.value = true;
    getCodeInterface(forgotFrom.email).then((res) => {
      if (res.status === 200) {
        ElMessage({
          message: t('login.codeSuccess'),
          type: 'success',
        });
        timsGO();
      } else {
        ElMessage.error(t('login.codefail'));
      }
    });
  } else {
    ElMessage({
      message: t('login.pEmail'),
      type: 'warning',
    });
  }
};
const onSubmitForgot = () => {
  forgotForm.value.validate((valid) => {
    if (valid) {
      postChpwd(forgotFrom).then((res) => {
        if (res.data.status) {
          forgotForm.value.resetField();
          backTo();
        }
      });
    }
  });
};

// 注册表单提交
const onSubmitRegister = () => {
  if (registerFrom.email && registerFrom.region && registerFrom.password) {
    registerInterface(registerFrom.region, {
      email: registerFrom.email,
      password: registerFrom.password,
    }).then((res) => {
      if (res.data.status === 0) {
        ElMessage({
          message: t('login.regSuccess'),
          type: 'success',
        });
        GoLogin(registerFrom.email, registerFrom.password);
      }
    });
  } else {
    ElMessage({
      message: t('login.tips'),
      type: 'warning',
    });
  }
};
// 邮箱验证方法
const checkEmail = (rule, value, callback) => {
  const mailReg = /^([.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  if (!value) {
    return callback(new Error(t('login.emailBlank')));
  }
  setTimeout(() => {
    if (mailReg.test(value)) {
      callback();
    } else {
      callback(new Error(t('login.emailRight')));
    }
  }, 100);
};
const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
  emit('hide');
};
// 登录表单提交
const onSubmitLogin = () => {
  if (loginFrom.email && loginFrom.password) {
    GoLogin(loginFrom.email, loginFrom.password);
  } else {
    ElMessage({
      message: t('login.tips'),
      type: 'warning',
    });
  }
};
// 表单验证
const rules = reactive({
  email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
  region: [{ required: true, message: t('login.pExa'), trigger: 'blur' }],
  password: [
    { required: true, message: t('login.passwordBlank'), trigger: 'blur' },
  ],
});
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error(t('login.rLeight2')));
  } else if (value !== forgotFrom.password) {
    callback(new Error(t('login.rErrorTip')));
  } else {
    callback();
  }
};
// 忘记密码表单验证
const forgotRules = reactive({
  email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
  region: [{ required: true, message: t('login.pExa'), trigger: 'blur' }],
  password: [
    { required: true, message: t('login.passwordBlank'), trigger: 'blur' },
  ],
  passwordOK: [{ validator: validatePass2, trigger: 'blur' }],
});
const GoLogin = (username, password) => {
  loginInterface({ username: username, password: password, type: 3 }).then(
    (res) => {
      if (res.data.status === 0) {
        ElMessage({
          message: t('login.loginSuccess'),
          type: 'success',
        });
        localStorage.setItem(configConst.TOKEN, res.data.token);
        router.push({
          path: '/t/trade',
          query: {},
        });
      }
    }
  );
};
//google登录
const googleBtn = () => {
  window?.google?.accounts?.id.initialize({
    client_id:
      '220895073527-03c9s50caos81us2sahvjpcpa7q11iu8.apps.googleusercontent.com',
    callback: handleCredentialResponse,
  });
  window?.google?.accounts?.id.renderButton(
    document.getElementById('g_id_signin'),
    { theme: 'outline', size: 'large' } // customization attributes
  );
  window?.google?.accounts?.id.prompt(); // also display the One Tap dialog
};
const handleCredentialResponse = (response) => {
  const responsePayload = JSON.parse(
    decodeURIComponent(
      encodeURI(window.atob(response.credential.split('.')[1]))
    )
  );
  const googleSub = responsePayload.sub;
  loginInterface({ username: googleSub, type: 1 }, true).then((res) => {
    if (res.data.status === 0) {
      ElMessage({
        message: t('login.loginSuccess'),
        type: 'success',
      });
      localStorage.setItem(configConst.TOKEN, res.data.token);
      router.push({
        path: '/t/trade',
        query: {},
      });
    } else {
      //ElMessage.error('登录失败！');
      if (res.data.status === 3) {
        const RandomWord = '@Qwer' + Math.random().toString(36).slice(2, 6);
        registerGoogleInterface({
          gugeid: googleSub,
          password: RandomWord,
          email: responsePayload.email,
        }).then((res) => {
          if (res.data.status === 0) {
            ElMessage({
              message: t('login.regSuccess'),
              type: 'success',
            });
            loginInterface({ username: googleSub, type: 1 }).then((res) => {
              if (res.data.status === 0) {
                ElMessage({
                  message: t('login.loginSuccess'),
                  type: 'success',
                });
                localStorage.setItem(configConst.TOKEN, res.data.token);
                router.push({
                  path: '/t/trade',
                  query: {},
                });
              }
            });
          }
        });
      }
    }
  });
};
// googleBtn();
onMounted(() => {
  googleBtn();
});
</script>

<style scoped lang="less">
.backButton {
  font-size: 14px;
  text-align: center;
  width: 100%;
  span {
    color: #2963A4;
    cursor: pointer;
  }
}
.positionBox {
  width: 600px;
  height: 290px;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;
}
.positionBoxWindowMaing {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  -webkit-transition: all 300ms ease-in-out;
  -moz-transition: all 300ms ease-in-out;
  transition: all 300ms ease-in-out;
  opacity: 1;
}
:deep(.el-form-item) {
  width: 443px;
  margin: 0 auto 30px;
}
:deep(.el-card__body) {
  padding-top: 50px;
  padding-bottom: 74px;
}
:deep(.el-input__wrapper) {
  width: 443px;
  padding: 0;
  background-color: unset;
  box-shadow: unset;
}
:deep(.el-form-item.is-error) {
  .el-input__wrapper {
    box-shadow: none;
  }
}
.login {
  .box-card {
    width: 687px;
    position: relative;
    .close_style {
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
    }
    .back_style {
      position: absolute;
      left: 20px;
      top: 20px;
      cursor: pointer;
    }
    .forgotView {
      width: 443px;
      margin: 0 auto;
      .F_title {
        display: inline-block;
        padding: 0 20px;
        width: auto;
        height: 40px;
        line-height: 40px;
        background-color: #f1f4f6;
        border-radius: 5px;
        font-size: 18px;
        color: #2d3436;
        text-align: center;
        margin-bottom: 38px;
        margin-top: 27px;
      }
    }
    .forgot {
      margin: -17px auto 28px;
      width: 443px;
      font-size: 16px;
      color: #2963a4;
      line-height: 19.36px;
      text-align: right;
      cursor: pointer;
    }
    .demo-tabs > .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
    }
    :deep(.el-tabs__nav-scroll) {
      // overflow: visible;
    }
    :deep(.el-tabs__nav) {
      width: 100% !important;
      margin: 0 auto;
      .el-tabs__active-bar {
        width: 52px !important;
        height: 4px;
        background-color: #2963a4;
        border-radius: 4px;
        margin-left: 40px;
        margin-top: 10px;
      }
      .el-tabs__item {
        padding: 0 96px;
        font-size: 20px;
        // font-weight: 600;
        width: 50%;
        color: #000;
        padding-bottom: 50px;
        text-align: center;
      }
    }
  }
  :deep(.el-tabs__header) {
    margin: 0 0 45px;
  }
  :deep(.el-tabs__nav-wrap) {
    &::after {
      background-color: transparent;
    }
  }
  :deep(.el-input__inner) {
    // width: 443px;
    height: 40px;
    padding: 0 20px;
    border-radius: 5px;
    border: 1px solid #eee;
  }

  :deep(.el-tabs__item.is-active) {
    // color: #0c3d93 !important;
  }
  :deep(.el-tabs__item:hover) {
    color: #0c3d93 !important;
  }
  .sendEMail {
    border: none;
    padding: 0;
    background: #0c3d93 !important;
    color: #fff;
  }
  :deep(.el-input-group__append) {
    background: #0c3d93 !important;
  }
  .el-button {
    width: 268px;
    height: 60px;
    background: #dddddd;
    border: none;
    border-radius: unset;
  }
  .el-button--primary {
    width: 400px;
    height: 40px;
    border-radius: 100px;
    background: linear-gradient(270deg, #0e305d 0.44%, #239ffe 99.88%);
    color: #fff;
    margin: 0 auto 30px;
    // background: #0c3d93 !important;
    // color: #fff;
    // margin-right: 10px;
  }
  .line {
    margin-bottom: 38px;
    width: 443px;
    margin: 0 auto 20px;
    .title {
      margin-bottom: 10px;
      color: var(--placeholdColor);
      text-align: center;
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
    .title::before,
    .title::after {
      background: #e9ebf2;
      content: '';
      flex: 1;
      height: 1px;
    }
  }
  #g_id_signin {
    width: 50px;
    margin: 0 auto;
    text-align: center;
    .googleImg {
      width: 50px;
      height: 50px;
      cursor: pointer;
    }
    span {
      font-size: 14px;
      color: #000;
      font-weight: bold;
    }
  }
}
</style>
