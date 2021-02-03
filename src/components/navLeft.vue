<template>
  <div>
    <h1 class="title">管理系统</h1>
    <el-menu
      background-color="#001529"
      text-color="#fff"
      :router="true"
      active-text-color="#ddbb88"
    >
      <menus
        v-for="(item, index) in menuData"
        :menu="item"
        :key="index"
      ></menus>
    </el-menu>
  </div>
</template>

<script>
import { get } from "@/utils/http.js";
import menus from "@/components/menu.vue";
export default {
  data() {
    return {
      menuData: [],
    };
  },
  mounted() {
    get("/menu").then((res) => {
      // console.log(res.data);
      this.menuData = res.data;
    });
  },
  components: {
    menus,
  },
};
</script>

<style scoped>
.title {
  line-height: 50px;
  color: #fff;
  text-align: center;
}
.el-menu {
  border: none;
}
</style>