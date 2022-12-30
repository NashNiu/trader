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
          <el-tab-pane label="注册" name="first">
            <el-form
              :label-position="labelPosition"
              label-width="100px"
              :model="registerFrom"
              style="max-width: 460px"
              :rules="rules"
            >
              <el-form-item prop="email" label="邮箱：">
                <el-input
                  v-model="registerFrom.email"
                  placeholder="请输入邮箱地址"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="region" label="验证码：">
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
              <el-form-item prop="password" label="密码：">
                <el-input
                  v-model="registerFrom.password"
                  type="password"
                  placeholder="请输入密码"
                  clearable
                  show-password
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmitRegister"
                  >创建</el-button
                >
                <el-button @click="resetForm(formRef)">取消</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="登录" name="second">
            <el-form
              ref="formRef"
              :label-position="labelPosition"
              label-width="100px"
              :model="loginFrom"
              style="max-width: 460px"
              :rules="rules"
            >
              <el-form-item prop="email" label="邮箱：">
                <el-input
                  v-model="loginFrom.email"
                  placeholder="请输入邮箱地址"
                  clearable
                />
              </el-form-item>
              <el-form-item prop="password" label="密码：">
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
} from '../../api/commonapi.js';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter();
const isSend = ref(false);
const emit = defineEmits(['hide']);
const formRef = ref();
const activeName = ref('first');
const handleClick = (tab, event) => {
  console.log(tab, event);
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
  console.log(tims);
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
      if (res.status == 200) {
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
      console.log(res);
      if (res.data.status == 0) {
        ElMessage({
          message: '注册成功！',
          type: 'success',
        });
        GOlogin(registerFrom.email, registerFrom.password);
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
    loginInterface({
      username: loginFrom.email,
      password: loginFrom.password,
      type: 3,
    }).then((res) => {
      if (res.data.status == 0) {
        ElMessage({
          message: '登录成功！',
          type: 'success',
        });
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('userid', res.data.userid);
        sessionStorage.setItem('username', res.data.username);
        sessionStorage.setItem('account', res.data.mtaccr);
        sessionStorage.setItem('password', loginFrom.password);
        router.push({
          path: '/Trade',
          query: {},
        });
      } else {
        ElMessage.error('登录失败！');
      }
    });
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
const GOlogin = (username, password) => {
  loginInterface({ username: username, password: password, type: 3 }).then(
    (res) => {
      console.log(res);
      if (res.data.status == 0) {
        ElMessage({
          message: '登录成功！',
          type: 'success',
        });
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('userid', res.data.userid);
        sessionStorage.setItem('username', res.data.username);
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
  width: 480px;
  height: 290px;
  position: fixed;
  top: 50%;
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
  opacity: 0;
  -webkit-transition: all 300ms ease-in-out;
  -moz-transition: all 300ms ease-in-out;
  transition: all 300ms ease-in-out;
  opacity: 1;
}
.login {
  .box-card {
    width: 480px;
    .demo-tabs > .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;
    }
    :deep(.el-tabs__nav) {
      width: 100% !important;
      .el-tabs__active-bar {
        width: 50px;
      }
      .el-tabs__item {
        padding: 0 96px;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
  .sendEMail {
    border: none;
    padding: 0;
  }
}
</style>
