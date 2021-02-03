<template>
  <div>
    <div class="head">
      <el-dropdown @command="fn">
        <span class="el-dropdown-link">
          欢迎您，{{ info }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">个人中心</el-dropdown-item>
          <el-dropdown-item command="b">修改密码</el-dropdown-item>
          <el-dropdown-item command="c">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <p class="data">今天是你在xxx的第<span class="tips">{{days}}</span>天</p>
    <div style="clear: both"></div>
  </div>
</template>

<script>
import {get} from "@/utils/http.js"
import {removeToken} from "@/utils/auth.js"
export default {
  data() {
    return {
      info: sessionStorage.getItem("nickname"),
      time: "",
    };
  },
  mounted(){
      get("/in").then((res)=>{
          this.time=res.time
      })
  },
  methods:{
      fn(m) {
          if(m=='c'){
              console.log(m)
              removeToken();
              this.$router.push("/login")
          }
      }
  },
  computed: {
    days() {
      let target = new Date(this.time);
      let now = new Date();
      return Math.floor((now-target)/1000/60/60/24)
    },
  },
  
};
</script>

<style scoped>
.head {
  float: right;
}
.data {
  float: right;
  margin-right: 50px;
}
.tips{
    color: #40a9ff;
    font-size: 24px;
}
</style>