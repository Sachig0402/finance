<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in breadlist" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb.js"
export default {
    mixins:[breadCrumb]
};
</script>

<style scoped>
</style>