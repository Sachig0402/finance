<template>
  <div>
    详情页
    <el-button @click="return0()">返回</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    return0() {
      this.$router.push("/product/all");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>