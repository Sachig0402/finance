<template>
  <div>
    <el-row type="flex" justify="center">
      <el-card class="wrap">
        <div slot="header" class="clearfix">
          <h2 style="text-align: center">后台管理系统</h2>
        </div>
        <div>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
            ><!--整体必须绑定到一个表单对象,不能外层不绑只让里层双向绑定,
          因为文档里就是这么写的,是组件自带的model属性-->
            <el-form-item label="用户名：" prop="username" label-width="100px">
              <el-input
                v-model="ruleForm.username"
                placeholder="请输入用户名"
                size="medium"
                style="width: 300px"
              ></el-input>
            </el-form-item>

            <el-form-item
              label="密码："
              prop="userpassword"
              label-width="100px"
            >
              <el-input
                v-model="ruleForm.userpassword"
                placeholder="请输入密码"
                type="password"
                size="medium"
                style="width: 300px"
              ></el-input>
            </el-form-item>

            <el-form-item label-width="100px">
              <el-button type="primary" style="width: 300px" @click="login"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
// import service from "@/utils/service"
import { post } from "@/utils/http";
import { setToken } from "@/utils/auth";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        var reg = /^[\w]{4,8}$/;
        if (!reg.test(value)) {
          callback(new Error("用户名为4-8位数字、字母或下划线的组合"));
        } else {
          callback(); //验证通过也要callback
        }
      }
    };

    return {
      ruleForm: {
        //ruleForm里的名字是后端定的,要根据后端需要什么名字,前端就要写什么
        //但是外层这个ruleForm大框架必须有
        // username: "",
        // userpassword: "",
        // 不写也行,前面双向绑定v-model会自动添加一个ruleForm.username和ruleForm.userpassword
      },
      rules: {
        username: [{ validator: validatePass, trigger: "blur" }],

        userpassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // this.$axios
          //   .post("localhost:8080/login", this.ruleForm)
          //   .then((res) => {
          //     console.log("res", res);
          //   });
          post("/login", this.ruleForm)
            .then((res) => {
              console.log(res);
              setToken(res.token);
              sessionStorage.setItem("nickname",res.nickname)
              this.$router.push("/");
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    },
    // 还可以用下面的写法,推荐这个,表单名是个变量,不固定
    // login(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert("登陆成功");
    //     }
    //   });
    // },
  },
};
</script>

<style scoped>
.wrap {
  width: 500px;
  margin-top: 200px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>