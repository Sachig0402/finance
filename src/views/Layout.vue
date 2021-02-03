<template>
  <div>
    <el-container>
      <el-aside width="240px">
        <nav-left></nav-left>
      </el-aside>
      <el-container>
        <el-header>
          <headers></headers>
        </el-header>
        <el-main>
          <!-- <keep-alive>
            在router-view外面加<keep-alive></keep-alive>可以让所有大组件缓存
            <router-view></router-view>
          </keep-alive> -->

          <!-- 改进 -->
          <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavLeft from "@/components/navLeft";
import Headers from "@/components/header";
export default {
  components: {
    NavLeft,
    Headers,
  },
};
</script>

<style scoped>
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
}
.el-container {
  height: 100vh;
}

.el-aside {
  background-color: #001529;
  color: #333;
  text-align: left;
  line-height: 60px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
  /* height: 100vh; */
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}
</style>