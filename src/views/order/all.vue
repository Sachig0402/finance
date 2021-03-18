<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in breadlist" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- <el-radio-group v-model="radio1" @change="change">
        <el-radio-button label="北京"></el-radio-button>
        <el-radio-button label="上海"></el-radio-button>
        <el-radio-button label="广州"></el-radio-button>
        <el-radio-button label="深圳"></el-radio-button>
      </el-radio-group> -->
      <!-- 一般是给后端传数字,所以按下面的写 -->
      <el-radio-group v-model="radio1" @change="change">
        <el-radio-button :label="1">待审核</el-radio-button>
        <el-radio-button :label="2">审核中</el-radio-button>
        <el-radio-button :label="3">审核通过</el-radio-button>
        <el-radio-button :label="4">审核拒绝</el-radio-button>
        <el-radio-button :label="5">已放款</el-radio-button>
        <!-- 用冒号是传number,不加冒号传的是字符串 -->
      </el-radio-group>
      <keep-alive>
        <component :is="currentTabComponent" class="tab"></component>
        <!-- :is是指显示哪个组件 -->
      </keep-alive>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb.js";
import myTabs1 from "@/views/order/tabs1.vue";
import myTabs2 from "@/views/order/tabs2.vue";
export default {
  mixins: [breadCrumb],
  data() {
    return {
      radio1: 2,
    };
  },
  computed: {
    currentTabComponent() {
      return "myTabs" + this.radio1;
    },
  },
  methods: {
    change(val) {
      console.log(val);
    },
  },
  components: {
    myTabs1,
    myTabs2,
  },
};
</script>

<style scoped>
</style>