<template>
  <div v-loading="loadingData" class="contentBox">
    <div v-if="showStatus" class="statusBox">
      <span class="label s1">
        Status:
        <span v-if="auditStatus === 0 || auditStatus === 1" class="s2">
          Not Submitted
        </span>
        <span v-if="auditStatus === 2" class="s2">To be Verified</span>
        <span v-if="auditStatus === 3" class="s2">Verified</span>
        <span v-if="auditStatus === 4" class="s2">Application failed</span>
      </span>
      <span v-if="auditStatus === 4" class="label">
        Reason for failure:
        <span class="s2">{{ failReason }}</span>
      </span>
    </div>
    <div class="container">
      <el-scrollbar max-height="380px">
        <div class="formContainer">
          <template v-if="showTitle">
            <div class="title">Verification</div>
            <div v-if="step === 1" class="desc">
              In the event your details change, level one verification can be
              updated at a later date
            </div>
            <div v-if="step === 2" class="desc">
              last step before starting.
              <br />
              <span>
                Please upload your proof of identity. All documents must be
                laying on a flat surface with all 4 corners inside the frame.
                All information should be clear and identifiable.
              </span>
            </div>
            <div class="divided"></div>
          </template>

          <el-form
            ref="formRef"
            label-position="top"
            :model="formData"
            :rules="formRules"
            :disabled="!ifCanEdit"
          >
            <el-row v-if="step === 1" :gutter="20">
              <!--            first name-->
              <el-col :span="12">
                <el-form-item label="First Name" prop="firstname">
                  <el-input
                    v-model="formData.firstname"
                    placeholder="first name"
                  />
                </el-form-item>
              </el-col>
              <!--            last name-->
              <el-col :span="12">
                <el-form-item label="Last Name" prop="lastname">
                  <el-input
                    v-model="formData.lastname"
                    placeholder="lastName"
                  />
                </el-form-item>
              </el-col>
              <!--            date of birth-->
              <el-col :span="24">
                <el-form-item label="Date of Birth" prop="birthday">
                  <el-date-picker
                    v-model="formData.birthday"
                    type="date"
                    placeholder="Pick a day"
                    value-format="YYYY-MM-DD"
                  />
                </el-form-item>
              </el-col>
              <!--            country-->
              <el-col :span="24">
                <el-form-item label="country" prop="country">
                  <!--                <el-select style="width: 100%" />-->
                  <el-input v-model="formData.country" placeholder="country" />
                </el-form-item>
              </el-col>
              <!--            address-->
              <el-col :span="24">
                <el-form-item label="Residential Address" prop="address">
                  <el-input v-model="formData.address" placeholder="address" />
                </el-form-item>
              </el-col>
              <!--            city-->
              <el-col :span="12">
                <el-form-item label="city" prop="city">
                  <el-input v-model="formData.city" placeholder="city" />
                </el-form-item>
              </el-col>
              <!--            Postal Code *-->
              <el-col :span="12">
                <el-form-item label="Postal Code" prop="postcode">
                  <el-input
                    v-model="formData.postcode"
                    placeholder="Postal Code"
                  />
                </el-form-item>
              </el-col>
              <!--            Occupation (Your job/work) *-->
              <el-col :span="24">
                <el-form-item label="Occupation (Your job/work)" prop="job">
                  <el-input v-model="formData.job" placeholder="job" />
                </el-form-item>
              </el-col>
            </el-row>
            <template v-if="step === 2">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="Identity Number" prop="documentnum">
                    <el-input
                      v-model="formData.documentnum"
                      placeholder="documentnum"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item
                label="Proof of Identity (Front)"
                prop="documentfront"
              >
                <el-upload
                  ref="frontUploadRef"
                  v-model:file-list="frontUploadList"
                  action="/lpapi/api/users/user/uploadFile"
                  :headers="uploadHeaders"
                  :limit="1"
                  :show-file-list="false"
                  accept="image/*"
                  :on-exceed="frontExceed"
                  :auto-upload="false"
                  :disabled="!ifCanEdit"
                  @change="frontUploadChange"
                >
                  <div :class="`uploadBox ${ifCanEdit ? '' : 'noSelect'}`">
                    <div v-loading="frontUploading" class="uploadContainer">
                      <div>
                        <span class="select">select file</span>
                        <span v-if="!frontUploadList.length" class="noSelected">
                          No file selected
                        </span>
                      </div>
                      <img :src="uploadImg" alt="" />
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
              <el-form-item
                label="Proof of Identity (Back)"
                prop="documentback"
              >
                <el-upload
                  ref="backUploadRef"
                  v-model:file-list="backUploadList"
                  action="/lpapi/api/users/user/uploadFile"
                  :headers="uploadHeaders"
                  :limit="1"
                  :show-file-list="false"
                  accept="image/*"
                  :on-exceed="backExceed"
                  :auto-upload="false"
                  :disabled="!ifCanEdit"
                  @change="backUploadChange"
                >
                  <div :class="`uploadBox ${ifCanEdit ? '' : 'noSelect'}`">
                    <div v-loading="backUploading" class="uploadContainer">
                      <div>
                        <span class="select">select file</span>
                        <span v-if="!backUploadList.length" class="noSelected">
                          No file selected
                        </span>
                      </div>
                      <img :src="uploadImg" alt="" />
                    </div>
                  </div>
                </el-upload>
              </el-form-item>
              <div class="lint">
                Following file types are accepted: .png, .jpg, .pdf
              </div>
              <div class="imgViewContainer">
                <div class="title">
                  <span class="bold">Preview:</span>
                  <span>Proof of Identity (Front)</span>
                </div>
                <div v-loading="frontUploading" class="imgContainer">
                  <el-image
                    style="width: 570px; height: 180px"
                    :src="frontUploadList[0]?.response?.data"
                    :zoom-rate="1.2"
                    fit="contain"
                    :preview-src-list="[frontUploadList[0]?.response?.data]"
                  />
                </div>
              </div>
              <div class="imgViewContainer">
                <div class="title">
                  <span class="bold">Preview:</span>
                  <span>Proof of Identity (Back)</span>
                </div>
                <div v-loading="backUploading" class="imgContainer">
                  <el-image
                    style="width: 570px; height: 180px"
                    :src="backUploadList[0]?.response?.data"
                    :zoom-rate="1.2"
                    fit="contain"
                    :preview-src-list="[backUploadList[0]?.response?.data]"
                  />
                </div>
              </div>
            </template>
          </el-form>
        </div>
      </el-scrollbar>
      <div class="line"></div>
      <div class="footer">
        <span v-if="step === 1" class="info">
          All data is safely stored and encrypted.
        </span>
        <span v-if="step === 2" class="back" @click="step = 1">Back</span>
        <el-button
          :loading="submitting"
          type="primary"
          class="submitBtn"
          :disabled="step === 2 && !ifCanEdit"
          @click="submitClick"
        >
          {{ step === 1 ? 'Next' : 'Submit' }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref, onMounted, computed } from 'vue';
import uploadImg from '@/assets/img/header/upload.png';
import { configConst } from '@/config/index.js';
import { genFileId, ElMessage } from 'element-plus';
import { userApi } from '@/api';
const props = defineProps({
  // 是否展示标题提示
  showTitle: {
    type: Boolean,
    default: true,
  },
  // 是否展示状态
  showStatus: {
    type: Boolean,
    default: false,
  },
  // 父组件
  parent: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['finish']);
const loadingData = ref(false);
const formRef = ref();
const uploadHeaders = {
  Authorization: `Bearer ${localStorage.getItem(configConst.TOKEN)}`,
};
const initFormData = {
  lastname: '',
  firstname: '',
  birthday: '',
  country: '',
  city: '',
  postcode: '',
  address: '',
  addressimg: '',
  job: '',
  documenttype: 1,
  documentnum: '',
  documentfront: '',
  documentback: '',
};
const formData = ref(initFormData);
const formRules = reactive({
  lastname: [
    { required: true, message: 'Please input lastname', trigger: 'blur' },
  ],
  firstname: [
    { required: true, message: 'Please input firstname', trigger: 'blur' },
  ],
  birthday: [
    { required: true, message: 'Please pick a date', trigger: 'blur' },
  ],
  city: [{ required: true, message: 'Please input a city', trigger: 'blur' }],
  postcode: [
    { required: true, message: 'Please input a postcode', trigger: 'blur' },
  ],
  address: [
    { required: true, message: 'Please input a address', trigger: 'blur' },
  ],
  country: [
    { required: true, message: 'Please input a country', trigger: 'blur' },
  ],
  job: [{ required: true, message: 'Please input a job', trigger: 'blur' }],
  documentnum: [
    {
      required: true,
      message: 'Please input  Identity Number',
      trigger: 'blur',
    },
  ],
});
const frontUploadList = ref([]);
const backUploadList = ref([]);
const frontUploadRef = ref();
const backUploadRef = ref();
const frontUploading = ref(false);
const backUploading = ref(false);
const submitting = ref(false);
// 审核状态(0未提交/1第一页提交/2全提交(待审核)/3审核通过/4审核失败)
const auditStatus = ref(0);
const step = ref(1);
const failReason = ref('');
const ifCanEdit = computed(() => {
  if (step.value === 1) {
    return auditStatus.value === 0 || auditStatus.value === 4;
  } else {
    return (
      auditStatus.value === 0 ||
      auditStatus.value === 1 ||
      auditStatus.value === 4
    );
  }
});
const frontUploadChange = (file) => {
  if (file?.response?.status === 0) {
    formData.value.documentfront = file.response.message;
    frontUploading.value = false;
  } else {
    frontUploading.value = true;
    frontUploadRef.value?.submit();
  }
};
const frontExceed = (files) => {
  frontUploadRef.value.clearFiles();
  formData.value.documentfront = '';
  const file = files[0];
  file.uid = genFileId();
  frontUploadRef.value.handleStart(file);
};

const backUploadChange = (file) => {
  if (file?.response?.status === 0) {
    formData.value.documentback = file.response.message;
    backUploading.value = false;
  } else {
    backUploading.value = true;
    backUploadRef.value?.submit();
  }
};
const backExceed = (files) => {
  backUploadRef.value.clearFiles();
  formData.value.documentback = '';
  const file = files[0];
  file.uid = genFileId();
  backUploadRef.value.handleStart(file);
};

const submitClick = async () => {
  if (step.value === 1) {
    if (ifCanEdit.value) {
      formRef.value.validateField(
        [
          'lastname',
          'firstname',
          'birthday',
          'country',
          'city',
          'postcode',
          'address',
          'job',
        ],
        async (isValid) => {
          if (isValid) {
            submitting.value = true;
            const {
              lastname,
              firstname,
              birthday,
              country,
              city,
              postcode,
              address,
              job,
            } = formData.value;
            const res = await userApi.updateCertificate({
              lastname,
              firstname,
              birthday,
              country,
              city,
              postcode,
              address,
              job,
              auditstatus: 1,
            });
            submitting.value = false;
            if (res.data.status === 0) {
              step.value = 2;
              auditStatus.value = 1;
            }
          }
        }
      );
    } else {
      step.value = 2;
    }
  } else {
    formRef.value.validateField(['documentnum'], async (isvalid) => {
      if (isvalid) {
        if (formData.value.documentback && formData.value.documentfront) {
          submitting.value = true;
          const { documentnum, documentfront, documentback } = formData.value;
          const res = await userApi.updateCertificate({
            documentnum,
            documentfront,
            documentback,
            auditstatus: 2,
          });
          submitting.value = false;
          if (res.data.status === 0) {
            ElMessage.success('提交成功');
            auditStatus.value = 2;
            emit('finish');
          }
        } else {
          ElMessage.error('请先上传身份证');
        }
      }
    });
  }
};
// const clearData = () => {
//   step.value = 1;
//   formData.value = initFormData;
//   frontUploadList.value = [];
//   backUploadList.value = [];
//   frontUploading.value = false;
//   backUploading.value = false;
// };
const getUserInfo = async () => {
  loadingData.value = true;
  const res = await userApi.getCertificate();
  loadingData.value = false;
  if (res.data.status === 0) {
    if (props.parent !== 'userVerify') {
      // 不校验
      if (res.data.message === '5') {
        emit('finish');
        return;
      }
    }
    auditStatus.value = res.data?.data?.auditstatus ?? 0;
    const data = res.data.data;
    // 审核状态(0未提交/1第一页提交/2全提交(待审核)/3审核通过/4审核失败)
    switch (auditStatus.value) {
      case 0:
        step.value = 1;
        break;
      case 1:
        step.value = 2;
        formData.value = {
          lastname: data.lastname,
          firstname: data.firstname,
          birthday: data.birthday,
          country: data.country,
          city: data.city,
          postcode: data.postcode,
          address: data.address,
          addressimg: data.addressimg,
          job: data.job,
          documenttype: 1,
          documentnum: '',
          documentfront: '',
          documentback: '',
        };
        break;
      case 2:
      case 3:
        step.value = 1;
        formData.value = {
          lastname: data.lastname,
          firstname: data.firstname,
          birthday: data.birthday,
          country: data.country,
          city: data.city,
          postcode: data.postcode,
          address: data.address,
          addressimg: data.addressimg,
          job: data.job,
          documenttype: data.documenttype,
          documentnum: data.documentnum,
          documentfront: data.documentfront,
          documentback: data.documentback,
        };
        frontUploadList.value = [
          {
            response: {
              data: data.documentfront,
            },
          },
        ];
        backUploadList.value = [
          {
            response: {
              data: data.documentback,
            },
          },
        ];
        break;
      case 4:
        step.value = 1;
        failReason.value = data.remark;
        break;
    }
  }
};
onMounted(() => {
  getUserInfo().then();
});
</script>
<style scoped lang="less">
.contentBox {
  width: 620px;
  margin: 0 auto;
  .statusBox {
    margin: 10px auto 15px;
    width: 620px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eeeeee;
    .label {
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      color: #333333;
      &.s1 {
        margin-right: 20px;
      }
      .s2 {
        color: #0c3d93;
      }
    }
  }
}
.container {
  width: 620px;
  //height: 747px;
  box-sizing: border-box;
  background-color: #fafafa;
  border-radius: 8px;
  border: solid 1px #eeeeee;
  margin: 0 auto;
  .formContainer {
    padding: 25px;
    box-sizing: border-box;
    .title {
      font-family: MicrosoftYaHei-Bold;
      font-size: 24px;
      color: #333333;
    }
    .desc {
      font-family: MicrosoftYaHei;
      font-size: 16px;
      color: #333333;
      margin: 20px 0;
      span {
        word-break: break-word;
        margin-top: 15px;
        line-height: 18px;
        display: inline-block;
      }
    }
    .divided {
      width: 560px;
      height: 1px;
      background-color: #eaeaea;
      border-radius: 1px;
      margin-bottom: 20px;
    }
    .uploadBox {
      width: 570px;
      height: 40px;
      &.noSelect {
        cursor: not-allowed;
        .uploadContainer {
          background-color: #f5f7fa;
        }
      }
      .uploadContainer {
        display: flex;
        justify-content: space-between;
        width: 570px;
        height: 40px;
        background-color: #ffffff;
        border-radius: 8px;
        border: solid 1px #eaeaea;
        box-sizing: border-box;
        align-items: center;
        padding: 0 18px;
        .select {
          font-size: 16px;
          color: #666666;
          margin-right: 10px;
        }
        .noSelected {
          font-size: 18px;
          color: #666666;
        }
      }
    }
    .imgViewContainer {
      margin-top: 15px;
      .title {
        font-size: 16px;
        color: #333333;
        span {
          margin-right: 5px;
        }
      }
      .imgContainer {
        width: 570px;
        height: 180px;
        background-color: #ffffff;
        border-radius: 8px;
        border: solid 1px #eaeaea;
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .lint {
      font-size: 16px;
      font-style: italic;
      color: #999999;
      display: flex;
      justify-content: flex-end;
    }
  }
  .line {
    width: 620px;
    height: 1px;
    background-color: #eaeaea;
  }
  .footer {
    width: 100%;
    height: 92px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;
    .info {
      font-family: MicrosoftYaHei;
      font-size: 20px;
      color: #666666;
    }
    .back {
      font-family: MicrosoftYaHei;
      font-size: 20px;
      color: #666666;
      cursor: pointer;
    }
    .submitBtn {
      width: 154px;
      height: 52px;
      border-radius: 8px;
      font-size: 20px;
    }
  }
}
</style>
