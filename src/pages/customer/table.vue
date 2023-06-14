<template>
  <div class="custom-table">
    <el-table
      style="width: 100%"
      size="small"
      class="table-style"
      :data="treeData"
      :row-key="getRowKeys"
      :expand-row-keys="expandedKey"
      :row-class-name="_getRowClass"
      :show-header="childrenNode"
      @expand-change="_toggleRowExpansion"
    >
      <el-table-column type="expand" width="30">
        <template #default="props">
          <new-table
            :children-node="false"
            :tree-data="props.row.childrens"
            @expand="_toggleRowExpansion"
            @collapse="_toggleRowExpansion"
          ></new-table>
        </template>
      </el-table-column>
      <el-table-column
        :label="t('customer.tracc')"
        prop="account"
        width="200"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="t('customer.acctype')"
        prop="agentType"
        width="180"
        align="center"
      >
        <template #default="scope">
          <span :class="'tree' + scope.row.account"></span>
          <span :style="scope.row.agentType == 1 ? 'color:#5171e2' : ''">
            {{
              scope.row.agentType == 1
                ? t('customer.inscustom')
                : t('customer.ordcustom')
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        :label="t('customer.Group')"
        prop="isNoLoad"
        width="85"
        align="center"
      >
        <template #default="scope">
          {{ getIsNoLoad(scope.row.isNoLoad) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="t('customer.groper')"
        prop="haveGroups"
        width="210"
        align="center"
      >
        <template #default="scope">
          {{ getIsNoLoad(scope.row.haveGroups) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="joinDailiTime"
        align="center"
        :label="t('customer.regdate')"
      >
        <template #default="scope">
          <span>
            {{
              getDate(
                new Date(scope.row.joinDailiTime).getTime() / 1000,
                'year'
              )
            }}
          </span>
        </template>
      </el-table-column>
      <el-table-column :label="t('customer.operation')" width="140">
        <template #default="scope">
          <el-tooltip :content="t('customer.tinfom')" placement="top">
            <el-button
              type="success"
              :icon="Message"
              circle
              @click="_handleDetails(scope.row)"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            v-if="scope.row.agentType == '1'"
            placement="top"
            :content="t('customer.lowlevel')"
          >
            <el-button
              type="primary"
              :icon="Edit"
              circle
              @click="_handleEdit(scope.$index, scope.row, 'edit')"
            ></el-button>
          </el-tooltip>
          <el-tooltip
            v-if="
              scope.row.agentType != '1' && accountId == scope.row.dailiAccount
            "
            :content="t('customer.cgrade')"
            placement="top"
          >
            <el-button
              type="danger"
              :icon="Upload"
              circle
              @click="_handleEdit(scope.$index, scope.row, 'up')"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <template #empty>
        <div>{{ t('customer.nodate') }}</div>
      </template>
    </el-table>
    <!-- 修改下级返佣和升级下级 -->
    <el-dialog
      v-model="dialogFormVisible"
      width="820px"
      class="dialogFormVisible"
      center
      :title="titleText"
    >
      <el-alert
        type="error"
        :title="t('customer.rebate')"
        :closable="false"
      ></el-alert>
      <el-form
        ref="form1"
        label-width="150px"
        :model="states.form"
        :inline="true"
        :rules="states.rules"
      >
        <el-form-item
          class="formName"
          label-width="100px"
          :label="t('customer.cname')"
        >
          <span>{{ states.form.name }}</span>
        </el-form-item>
        <!-- 返佣权限 -->
        <div class="basic-left-free">
          <el-form-item label="" prop="haveGroups">
            <el-checkbox-group
              v-model="states.form.haveGroups"
              style="width: 800px"
              @change="setNoLoad"
            >
              <el-checkbox
                v-for="item in isNoLoad"
                :key="item.value"
                :label="item.value"
              >
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </div>
        <!-- ECN/STP设置 -->
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane :label="t('customer.stpset')" name="0">
            <div class="basic-left-free">
              <span class="basic-bold">{{ t('customer.frebate2') }}</span>
              <el-form-item
                label=""
                prop="exchangeFreeCommission"
                style="margin-left: 65px"
              >
                <el-input
                  v-model.number="states.form.exchangeFreeCommission"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentExchangeFreeCommission }}
                {{ t('customer.ulot') }}
              </span>
            </div>
            <div class="basic-left-free">
              <span class="basic-bold">{{ t('customer.srebtae2') }}</span>
              <el-form-item
                label=""
                prop="stockFreeCommission"
                style="margin-left: 65px"
              >
                <el-input
                  v-model.number="states.form.stockFreeCommission"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentStockFreeCommission }}
                {{ t('customer.ulot') }}
              </span>
            </div>
            <div class="basic-left-free">
              <span class="basic-bold">{{ t('customer.indexc') }}</span>
            </div>
            <div>
              <el-form-item
                :label="t('customer.chinar300s')"
                prop="china300FreeCommission"
              >
                <el-input
                  v-model.number="states.form.china300FreeCommission"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentChina300FreeCommission }}
                {{ t('customer.ulot') }}
              </span>
              <el-form-item
                :label="t('customer.chinar50s')"
                prop="china50FreeCommission"
              >
                <el-input
                  v-model.number="states.form.china50FreeCommission"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentChina50FreeCommission }}
                {{ t('customer.ulot') }}
              </span>
              <el-form-item
                :label="t('customer.rebates2')"
                prop="indexFreeCommission"
              >
                <el-input
                  v-model.number="states.form.indexFreeCommission"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentIndexFreeCommission }}
                {{ t('customer.ulot') }}
              </span>
            </div>
            <div class="basic-left-free">
              <span class="basic-bold">{{ t('customer.comclass2') }}</span>
            </div>
            <div>
              <el-form-item
                :label="t('customer.lgrebate2')"
                prop="goldFreeCommission"
              >
                <el-input
                  v-model.number="states.form.goldFreeCommission"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentGoldFreeCommission }}
                {{ t('customer.ulot') }}
              </span>

              <el-form-item
                :label="t('customer.lsrebate2')"
                prop="silverFreeCommission"
              >
                <el-input
                  v-model.number="states.form.silverFreeCommission"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentSilverFreeCommission }}
                {{ t('customer.ulot') }}
              </span>

              <el-form-item
                :label="t('customer.usoilrebate2')"
                prop="crudeOilFreeCommission"
              >
                <el-input
                  v-model.number="states.form.crudeOilFreeCommission"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentCrudeOilFreeCommission }}
                {{ t('customer.ulot') }}
              </span>

              <el-form-item
                :label="t('customer.ukoilrebate2')"
                prop="britainOilFreeCommission"
              >
                <el-input
                  v-model.number="states.form.britainOilFreeCommission"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentBritainOilFreeCommission }}
                {{ t('customer.ulot') }}
              </span>
            </div>
            <div class="basic-left-free">
              <span class="basic-bold">{{ t('customer.cryrebates2') }}</span>
            </div>
            <div>
              <el-form-item
                :label="t('customer.otherrebates2')"
                prop="btcsFreeCommission"
              >
                <el-input
                  v-model="states.form.btcsFreeCommission"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'') ? this.value.replace(/[^\d.]/g,'') : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentBtcsFreeCommission }}
                {{ t('customer.ulot') }}
              </span>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="t('customer.ecnset')" name="1">
            <div class="basic-left-free">
              <span class="basic-bold">{{ t('customer.frebate2') }}</span>
              <el-form-item
                label=""
                prop="exchangeFreeCommissionEcn"
                style="margin-left: 65px"
              >
                <el-input
                  v-model.number="states.form.exchangeFreeCommissionEcn"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentExchangeFreeCommissionEcn }}
                {{ t('customer.ulot') }}
              </span>
            </div>
            <div class="basic-left-free">
              <span class="basic-bold">{{ t('customer.srebtae2') }}</span>
              <el-form-item
                label=""
                prop="stockFreeCommissionEcn"
                style="margin-left: 65px"
              >
                <el-input
                  v-model.number="states.form.stockFreeCommissionEcn"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentStockFreeCommissionEcn }}
                {{ t('customer.ulot') }}
              </span>
            </div>
            <div class="basic-left-free">
              <span class="basic-bold">{{ t('customer.indexc') }}</span>
            </div>
            <div>
              <el-form-item
                :label="t('customer.chinar300s')"
                prop="china300FreeCommissionEcn"
              >
                <el-input
                  v-model.number="states.form.china300FreeCommissionEcn"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentChina300FreeCommissionEcn }}
                {{ t('customer.ulot') }}
              </span>
              <el-form-item
                :label="t('customer.chinar50s')"
                prop="china50FreeCommissionEcn"
              >
                <el-input
                  v-model.number="states.form.china50FreeCommissionEcn"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentChina50FreeCommissionEcn }}
                {{ t('customer.ulot') }}
              </span>
              <el-form-item
                :label="t('customer.rebates2')"
                prop="indexFreeCommissionEcn"
              >
                <el-input
                  v-model.number="states.form.indexFreeCommissionEcn"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentIndexFreeCommissionEcn }}
                {{ t('customer.ulot') }}
              </span>
            </div>
            <div class="basic-left-free">
              <span class="basic-bold">{{ t('customer.comclass2') }}</span>
            </div>
            <div>
              <el-form-item
                :label="t('customer.lgrebate2')"
                prop="goldFreeCommissionEcn"
              >
                <el-input
                  v-model.number="states.form.goldFreeCommissionEcn"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentGoldFreeCommissionEcn }}
                {{ t('customer.ulot') }}
              </span>

              <el-form-item
                :label="t('customer.lsrebate2')"
                prop="silverFreeCommissionEcn"
              >
                <el-input
                  v-model.number="states.form.silverFreeCommissionEcn"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentSilverFreeCommissionEcn }}
                {{ t('customer.ulot') }}
              </span>

              <el-form-item
                :label="t('customer.usoilrebate2')"
                prop="crudeOilFreeCommissionEcn"
              >
                <el-input
                  v-model.number="states.form.crudeOilFreeCommissionEcn"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentCrudeOilFreeCommissionEcn }}
                {{ t('customer.ulot') }}
              </span>

              <el-form-item
                :label="t('customer.ukoilrebate2')"
                prop="britainOilFreeCommissionEcn"
              >
                <el-input
                  v-model.number="states.form.britainOilFreeCommissionEcn"
                  onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentBritainOilFreeCommissionEcn }}
                {{ t('customer.ulot') }}
              </span>
            </div>
            <div class="basic-left-free">
              <span class="basic-bold">{{ t('customer.cryrebates2') }}</span>
            </div>
            <div>
              <el-form-item
                :label="t('customer.otherrebates2')"
                prop="btcsFreeCommissionEcn"
              >
                <el-input
                  v-model="states.form.btcsFreeCommissionEcn"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'') ? this.value.replace(/[^\d.]/g,'') : ''"
                ></el-input>
              </el-form-item>
              <span class="basic-agent-free">
                {{ states.form.agentBtcsFreeCommissionEcn }}
                {{ t('customer.ulot') }}
              </span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="medium" @click="dialogFormVisible = false">
            {{ t('customer.cancel') }}
          </el-button>
          <el-button type="primary" size="medium" @click="submitAgentFn">
            {{ t('customer.confirm') }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue';
import { Message, Edit, Upload } from '@element-plus/icons-vue';
import { useI18n } from 'vue-i18n';
import { useUserStore } from '@/store/index.js';
import { getDate } from '@/utils/tools.js';
import { getAgentUpdateInfo, postAgentUpdate } from '@/api/agency.js';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
const router = useRouter();
const { t } = useI18n();
const prop = defineProps({
  treeData: {
    type: Array,
    default: () => {
      return [];
    },
  },
  childrenNode: {
    type: Boolean,
    default: true,
  },
  loadingTable: Boolean,
  expandedKey: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
const userStore = useUserStore();
const emit = defineEmits(['expand', 'collapse', 're-get-lsit']);
const accountId = userStore.userInfo?.mtaccr;
const isNoLoad = userStore.NoLoadList;
const titleText = ref(t('customer.lowlevel'));
const dialogFormVisible = ref(false);
const activeName = ref('0');
const getRowKeys = (row) => {
  return row.account;
};
const validateDaili = (rule, value, callback) => {
  if (
    parseInt(value) <= states.form[rule.dailiNumber] ||
    states.form[rule.dailiNumber] == -1
  ) {
    callback();
  } else {
    callback(new Error());
  }
};
const form1 = ref();
const states = reactive({
  form: {},
  rules: {
    britainOilFreeCommission: [
      {
        type: 'number',
        required: true,
        message: t('customer.ukoilrab'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.correbate'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentBritainOilFreeCommission',
        message: t('customer.ukoilrebate'),
        trigger: 'blur',
      },
    ],
    china300FreeCommission: [
      {
        type: 'number',
        required: true,
        message: t('customer.entcha300'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorcha300'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentChina300FreeCommission',
        message: t('customer.chi300'),
        trigger: 'blur',
      },
    ],
    china50FreeCommission: [
      {
        type: 'number',
        required: true,
        message: t('customer.entcha50'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorcha50'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentChina50FreeCommission',
        message: t('customer.chi50'),
        trigger: 'blur',
      },
    ],
    crudeOilFreeCommission: [
      {
        type: 'number',
        required: true,
        message: t('customer.entusoilr'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.encortusoilr'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentCrudeOilFreeCommission',
        message: t('customer.usoilrebate'),
        trigger: 'blur',
      },
    ],
    exchangeFreeCommission: [
      {
        type: 'number',
        required: true,
        message: t('customer.entfxr'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorfx'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentExchangeFreeCommission',
        message: t('customer.fxrebate'),
        trigger: 'blur',
      },
    ],
    goldFreeCommission: [
      {
        type: 'number',
        required: true,
        message: t('customer.entxauusd'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorxauusd'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentGoldFreeCommission',
        message: t('customer.xauusdrebate'),
        trigger: 'blur',
      },
    ],
    indexFreeCommission: [
      {
        type: 'number',
        required: true,
        message: t('customer.entothindex'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorindex'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentIndexFreeCommission',
        message: t('customer.indexrebates'),
        trigger: 'blur',
      },
    ],
    silverFreeCommission: [
      {
        type: 'number',
        required: true,
        message: t('customer.entxagusdr'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorxagusd'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentSilverFreeCommission',
        message: t('customer.xagusdreabage'),
        trigger: 'blur',
      },
    ],
    stockFreeCommission: [
      {
        type: 'number',
        required: true,
        message: t('customer.stockrebate'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorstock'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentStockFreeCommission',
        message: t('customer.stockrebates'),
        trigger: 'blur',
      },
    ],
    btcFreeCommission: [
      {
        type: 'number',
        required: true,
        message: t('customer.btc100rebate'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.btc100cor'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentBtcFreeCommission',
        message: t('customer.btc100rebates'),
        trigger: 'blur',
      },
    ],
    btcsFreeCommission: [
      {
        type: 'number',
        required: true,
        message: t('customer.otherrebate'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.corofcrypt'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentBtcsFreeCommission',
        message: t('customer.cryptos'),
        trigger: 'blur',
      },
    ],
    britainOilFreeCommissionEcn: [
      {
        type: 'number',
        required: true,
        message: t('customer.ukoilrab'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.correbate'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentBritainOilFreeCommissionEcn',
        message: t('customer.ukoilrebate'),
        trigger: 'blur',
      },
    ],
    china300FreeCommissionEcn: [
      {
        type: 'number',
        required: true,
        message: t('customer.entcha300'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorcha300'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentChina300FreeCommissionEcn',
        message: t('customer.chi300'),
        trigger: 'blur',
      },
    ],
    china50FreeCommissionEcn: [
      {
        type: 'number',
        required: true,
        message: t('customer.entcha50'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorcha50'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentChina50FreeCommissionEcn',
        message: t('customer.chi50'),
        trigger: 'blur',
      },
    ],
    crudeOilFreeCommissionEcn: [
      {
        type: 'number',
        required: true,
        message: t('customer.entusoilr'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.encortusoilr'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentCrudeOilFreeCommissionEcn',
        message: t('customer.usoilrebate'),
        trigger: 'blur',
      },
    ],
    exchangeFreeCommissionEcn: [
      {
        type: 'number',
        required: true,
        message: t('customer.entfxr'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorfx'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentExchangeFreeCommissionEcn',
        message: t('customer.fxrebate'),
        trigger: 'blur',
      },
    ],
    goldFreeCommissionEcn: [
      {
        type: 'number',
        required: true,
        message: t('customer.entxauusd'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorxauusd'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentGoldFreeCommissionEcn',
        message: t('customer.xauusdrebate'),
        trigger: 'blur',
      },
    ],
    indexFreeCommissionEcn: [
      {
        type: 'number',
        required: true,
        message: t('customer.entothindex'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorindex'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentIndexFreeCommissionEcn',
        message: t('customer.indexrebates'),
        trigger: 'blur',
      },
    ],
    silverFreeCommissionEcn: [
      {
        type: 'number',
        required: true,
        message: t('customer.entxagusdr'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorxagusd'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentSilverFreeCommissionEcn',
        message: t('customer.xagusdreabage'),
        trigger: 'blur',
      },
    ],
    stockFreeCommissionEcn: [
      {
        type: 'number',
        required: true,
        message: t('customer.stockrebate'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.entcorstock'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentStockFreeCommissionEcn',
        message: t('customer.stockrebates'),
        trigger: 'blur',
      },
    ],
    btcFreeCommissionEcn: [
      {
        type: 'number',
        required: true,
        message: t('customer.btc100rebate'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.btc100cor'),
        trigger: 'blur',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentBtcFreeCommissionEcn',
        message: t('customer.btc100rebates'),
        trigger: 'blur',
      },
    ],
    btcsFreeCommissionEcn: [
      {
        type: 'number',
        required: true,
        message: t('customer.otherrebate'),
        trigger: 'blur',
      },
      {
        pattern: /^\d+(.?\d+)?$/,
        message: t('customer.corofcrypt'),
        trigger: 'change',
      },
      {
        validator: validateDaili,
        dailiNumber: 'agentBtcsFreeCommissionEcn',
        message: t('customer.cryptos'),
        trigger: 'blur',
      },
    ],
  },
});
const getIsNoLoad = (status) => {
  if (status !== '' && status) {
    const Data = status.split(',').map(Number);
    let listItem = [];
    userStore.NoLoadList.forEach((item) => {
      if (Data.indexOf(item.value) !== -1) {
        listItem.push(item.label);
      }
    });
    return listItem.join(',');
  } else {
    return '--';
  }
};
const setNoLoad = (value) => {
  states.form.haveGroups = value;
};
const _toggleRowExpansion = (row) => {
  if (prop.expandedKey.indexOf(row.account) < 0) {
    emit('expand', row);
  } else {
    emit('collapse', row);
  }
};
const _getRowClass = (row) => {
  if (row.row.childrens.length > 0) {
    return '';
  } else {
    return 'hide-expand';
  }
};
const _handleDetails = (row) => {
  router.push({
    path: '/t/details',
    query: {
      account: row.account,
    },
  });
};
// 修改下级返佣方法
const _handleEdit = (index, row, type) => {
  if (type == 'up') {
    titleText.value = t('customer.lowlevels');
  } else {
    titleText.value = t('customer.lowlevel');
  }
  dialogFormVisible.value = true; //打开弹窗
  postAgentUpdateInfo(row);
  // form.username = row.username;
};
//修改返佣
const submitAgentFn = () => {
  form1.value.validate((valid) => {
    console.log(valid);
    if (valid) {
      const params = {
        account: states.form.account,
        platform: userStore.platform,
        goldFreeCommission: states.form.goldFreeCommission,
        silverFreeCommission: states.form.silverFreeCommission,
        crudeOilFreeCommission: states.form.crudeOilFreeCommission,
        britainOilFreeCommission: states.form.britainOilFreeCommission,
        exchangeFreeCommission: states.form.exchangeFreeCommission,
        stockFreeCommission: states.form.stockFreeCommission,
        indexFreeCommission: states.form.indexFreeCommission,
        china300FreeCommission: states.form.china300FreeCommission,
        china50FreeCommission: states.form.china50FreeCommission,
        btcsFreeCommission: states.form.btcsFreeCommission,
        goldFreeCommissionEcn: states.form.goldFreeCommissionEcn,
        silverFreeCommissionEcn: states.form.silverFreeCommissionEcn,
        crudeOilFreeCommissionEcn: states.form.crudeOilFreeCommissionEcn,
        britainOilFreeCommissionEcn: states.form.britainOilFreeCommissionEcn,
        exchangeFreeCommissionEcn: states.form.exchangeFreeCommissionEcn,
        stockFreeCommissionEcn: states.form.stockFreeCommissionEcn,
        indexFreeCommissionEcn: states.form.indexFreeCommissionEcn,
        china300FreeCommissionEcn: states.form.china300FreeCommissionEcn,
        china50FreeCommissionEcn: states.form.china50FreeCommissionEcn,
        btcsFreeCommissionEcn: states.form.btcsFreeCommissionEcn,
        haveGroups: states.form.haveGroups.join(','),
      };
      postAgentUpdate(params).then((res) => {
        if (res.data.IsSuccess) {
          ElMessage.success(res.data.Data);
          emit('re-get-lsit');
          dialogFormVisible.value = false;
        }
      });
    } else {
      console.log(valid);
    }
  });
};
const setNumber = (value) => {
  if (value !== '') {
    return value;
  } else {
    return 0;
  }
};
const postAgentUpdateInfo = async (row) => {
  const res = await getAgentUpdateInfo({
    account: row.account,
    platform: userStore.platform,
  });
  if (res.data.IsSuccess) {
    const Data = res.data.Data;
    states.form = { ...Data };
    if (Data.haveGroups !== '') {
      states.form.haveGroups = Data.haveGroups.split(',').map(Number);
    }
  }
};
</script>
<script>
export default {
  name: 'newTable',
};
</script>
<style lang="less">
.formName {
  margin-bottom: 15px;
  margin-left: -15px;
  .el-form-item__label {
    font-size: 16px;
  }
  span {
    font-size: 16px;
  }
}
</style>
<style lang="less" scoped>
.custom-table {
  .el-form--inline {
    .el-form-item__content {
      width: 300px;
    }
  }
}
.basic-left-free {
  overflow: hidden;
  display: flex;
  .basic-bold {
    font-weight: bold;
    display: block;
    line-height: 32px;
  }
  .basic-agent-free {
    line-height: 32px;
  }
}
</style>
