<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in breadlist" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="手机号、姓名、角色类型">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="8" :offset="8">
          <el-button type="primary" @click="create">新建角色</el-button>
          <el-button :disabled="!selected.length" @click="operate('启动')"
            >启动</el-button
          >
          <el-button :disabled="!selected.length" @click="operate('冻结')"
            >冻结</el-button
          >
          <el-button :disabled="!selected.length" @click="operate('删除')"
            >删除</el-button
          >
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" width="50" label="序号">
        </el-table-column>
        <el-table-column prop="account" label="账户"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="character" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="reason" label="创建原因"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status == 1 ? "已启用" : "未启用" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250px">
          <template slot-scope="scope">
            <el-button size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
            <el-button size="mini">{{
              scope.row.status == 1 ? "禁用" : "启用"
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="提示" :visible.sync="dialogFormVisible" width="30%">
      <el-form ref="forms" :model="form" :rules="rules">
        <el-form-item label="角色" label-width="100px" prop="character">
          <el-select
            placeholder="请选择角色"
            style="width: 100%"
            v-model="form.character"
          >
            <el-option label="业务人员" value="1"></el-option>
            <el-option label="审核人员" value="2"></el-option>
            <el-option label="风控经理" value="3"></el-option>
            <el-option label="管理员" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" label-width="100px" prop="remark">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="创建原因" label-width="100px" prop="reason">
          <el-input
            type="textarea"
            v-model="form.reason"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onOk">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb.js";
import { get } from "@/utils/http.js";
export default {
  mixins: [breadCrumb],
  data() {
    return {
      tableData: [],
      selected: [],
      dialogFormVisible: false,
      form: {
        character: "",
        remark: "",
        reason: "",
      },
      rules: {
        character: [
          { required: true, message: "请选择角色", trigger: "change" },
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }],
        reason: [
          { required: true, message: "请输入创建原因", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.list();
  },
  methods: {
    list() {
      get("/all").then((res) => {
        this.tableData = res.data.list;
      });
    },
    handleSelectionChange(selection) {
      // console.log(selection)
      this.selected = selection.map((item) => {
        return item.account;
      });
    },
    operate(type) {
      this.$notify({
        title: "成功",
        message: JSON.stringify(this.selected) + type + "成功",
        type: "success",
      });
    },
    create() {
      this.dialogFormVisible = true;
    },
    onOk() {
      this.$refs["forms"].validate((valid) => {
        if (valid) {
          console.log(this.form.character);
          this.$message.success("创建成功");
          this.list();
          this.dialogFormVisible = false;
          this.$refs["forms"].resetFields()
        }
      });
    },
  },
};
</script>

<style scoped>
</style>