<template>
  <div class="positionBox">
    <div class="login">
      <el-card class="box-card">
        <!-- <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div> -->
        <el-tabs
          v-model="activeName"
          class="demo-tabs"
          @tab-click="handleClick"
        >
          <el-tab-pane label="登录" name="second">
            <el-form
              ref="formRef"
              :label-position="labelPosition"
              :model="loginFrom"
              :rules="rules"
            >
              <el-form-item prop="email">
                <el-input
                  v-model="loginFrom.email"
                  placeholder="邮箱地址"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  v-model="loginFrom.password"
                  type="password"
                  placeholder="请输入密码"
                  clearable
                  show-password
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmitLogin"
                  >登录</el-button
                >
                <el-button @click="resetForm(formRef)">取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="first">
            <el-form
              :label-position="labelPosition"
              :model="registerFrom"
              :rules="rules"
            >
              <el-form-item prop="email">
                <el-input
                  v-model="registerFrom.email"
                  placeholder="请输入邮箱地址"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="region">
                <el-input
                  v-model="registerFrom.region"
                  placeholder="请输入验证码"
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
                  placeholder="密码必须同时包含大小写字母、数字、字符且大于8位"
                  clearable
                  show-password
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmitRegister"
                  >注册</el-button
                >
                <el-button @click="resetForm(formRef)">取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
  <div class="positionBoxWindowMaing"></div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import {
  getCodeInterface,
  registerInterface,
  loginInterface,
} from '@/api/commonapi.js';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { nextTick } from 'vue';
const router = useRouter();
const isSend = ref(false);
const emit = defineEmits(['hide']);
const formRef = ref();
const activeName = ref('second');
const handleClick = (tab) => {
  nextTick(() => {
    let ele = document.getElementsByClassName('el-tabs__active-bar')[0];
    let distance = tab.index === 0 ? 0 : tab.index * 200 + 'px';
    ele.style.transform = 'translateX(' + distance + ')';
  });
};
const tims = ref(30);
const labelPosition = ref('left');
const getCodeInfo = ref('获取验证码');
const registerFrom = reactive({
  email: '',
  region: '',
  password: '',
});
const loginFrom = reactive({
  email: '',
  password: '',
});
const timsGO = () => {
  tims.value--;
  getCodeInfo.value = tims.value + 's';
  if (tims.value > 0) {
    setTimeout(timsGO, 1000);
    isSend.value = true;
  } else {
    isSend.value = false;
    getCodeInfo.value = '获取验证码';
    tims.value = 30;
  }
};
const getCode = () => {
  if (registerFrom.email) {
    isSend.value = true;
    getCodeInterface(registerFrom.email).then((res) => {
      if (res.status === 200) {
        ElMessage({
          message: '验证码发送成功！',
          type: 'success',
        });
        timsGO();
      } else {
        ElMessage.error('验证码获取失败！');
      }
    });
  } else {
    ElMessage({
      message: '请输入邮箱！',
      type: 'warning',
    });
  }
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
          message: '注册成功！',
          type: 'success',
        });
        GoLogin(registerFrom.email, registerFrom.password);
      } else {
        ElMessage.error(res.data.message);
      }
    });
  } else {
    ElMessage({
      message: '请输入正确的邮箱、密码、验证码！',
      type: 'warning',
    });
  }
};
// 邮箱验证方法
const checkEmail = (rule, value, callback) => {
  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
  if (!value) {
    return callback(new Error('邮箱不能为空'));
  }
  setTimeout(() => {
    if (mailReg.test(value)) {
      callback();
    } else {
      callback(new Error('请输入正确的邮箱格式'));
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
      message: '请输入正确的邮箱和密码！',
      type: 'warning',
    });
  }
};
// 表单验证
const rules = reactive({
  email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
  region: [{ required: true, message: '请输入验证码！', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空！', trigger: 'blur' }],
});
const GoLogin = (username, password) => {
  loginInterface({ username: username, password: password, type: 3 }).then(
    (res) => {
      if (res.data.status === 0) {
        ElMessage({
          message: '登录成功！',
          type: 'success',
        });
        localStorage.setItem('token', res.data.token);
        router.push({
          path: '/Trade',
          query: {},
        });
      } else {
        ElMessage.error('登录失败！');
      }
    }
  );
};
</script>

<style scoped lang="less">
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
:deep(.el-card__body) {
  padding-top: 50px;
}
:deep(.el-input__wrapper) {
  padding: 0;
  background-color: unset;
  box-shadow: unset;
}
.login {
  .box-card {
    width: 600px;
    .demo-tabs > .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
    }
    :deep(.el-tabs__nav) {
      width: 560px !important;
      .el-tabs__active-bar {
        width: 50px !important;
        background-color: #0c3d93;
      }
      .el-tabs__item {
        padding: 0 96px;
        font-size: 24px;
        font-weight: 600;
        width: 50%;
        color: #888888;
      }
    }
  }
  :deep(.el-tabs__header) {
    margin: 0 0 20px;
  }
  :deep(.el-input__inner) {
    background: #f4f4f4;
    height: 60px;
    padding: 0 20px;
  }

  :deep(.el-tabs__item.is-active) {
    color: #0c3d93 !important;
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
    background: #0c3d93 !important;
    color: #fff;
    margin-right: 10px;
  }
}
</style>
