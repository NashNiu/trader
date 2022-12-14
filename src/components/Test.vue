<script setup>
import { ref } from 'vue';
import { NModal } from 'naive-ui';
import { onMounted, reactive } from 'vue';
import { getInfo } from '../api/commonapi'; //引入接口方法
// const message = useMessage();
const showModalRef = ref(false);
const showModal = showModalRef;
const onNegativeClick = () => {
  // message.success('Cancel');
  showModalRef.value = false;
};
const onPositiveClick = () => {
  // message.success('Submit');
  showModalRef.value = false;
};
defineProps({});
const userInfo = reactive({
  userName: 'XXX',
  age: 'XX',
});
onMounted(() => {
  //调接口，处理返回结果
  getInfo({ gugeid: '3348847743', password: '123456' }).then((res) => {
    userInfo.userName = res.userName;
    userInfo.age = res.age;
  });
});
</script>
<template>
  <h1>333</h1>
  <!-- <h1>{{ userInfo.userName }}---{{ userInfo.age }}</h1> -->
  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>
  <n-button @click="showModal = true"> 来吧 </n-button>
  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="确认"
    content="你确认"
    positive-text="确认"
    negative-text="算了"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
  />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
