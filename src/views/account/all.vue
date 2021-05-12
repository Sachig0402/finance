<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="index">{{
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
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="delete1(scope.row)"
              >删除</el-button
            >
            <template v-if="scope.row.status == 1">
              <el-button size="mini" @click="forbidden(scope.row)"
                >禁用</el-button
              >
            </template>
            <template v-else>
              <el-button size="mini" @click="start(scope.row)">启用</el-button>
            </template>
            <!-- <el-button size="mini">{{
              scope.row.status == 1 ? "禁用" : "启用"
            }}</el-button> -->
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
          <el-button @click="cancel1">取消</el-button>
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
      dialogFormVisible: false,
      selected: [],
      form: {
        character: "",
        remark: "",
        reason: "",
      },
      rules: {
        character: [
          { required: true, message: "请选择角色", trigger: "change" },
        ],
        remark: [{ required: true, message: "请输入备注", trigger: "change" }],
        reason: [
          { required: true, message: "请输入创建原因", trigger: "change" },
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
        console.log(2, this.tableData);
      });
    },
    handleSelectionChange(selection) {
      this.selected = selection.map((item) => {
        return item.account;
      });
    },
    create() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["forms"].resetFields();
        /* this.form.character = "";
        this.form.remark = "";
        this.form.reason = ""; */
      });
    },
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.form = {
          character: row.character,
          remark: row.remark,
          reason: row.reason,
        };
      });
      console.log(row);
    },
    onOk() {
      this.$refs["forms"].validate((valid) => {
        if (valid) {
          this.$message.success("创建成功");
          this.list();
          this.dialogFormVisible = false;
          this.$nextTick(() => {
            this.$refs["forms"].resetFields();
            /* this.form.character = "";
            this.form.remark = "";
            this.form.reason = ""; */
          });
        }
      });
    },
    cancel1() {
      this.dialogFormVisible = false;
      this.$nextTick(() => {
        this.$refs["forms"].resetFields();
        /* this.form.character = "";
        this.form.remark = "";
        this.form.reason = ""; */
        // console.log("清空弹出框的数据了");
      });
    },
    operate(type) {
      this.$notify({
        title: "成功",
        message: JSON.stringify(this.selected) + type + "成功",
        type: "success",
      });
    },
    forbidden(row) {
      // console.log(row);
      row.status = 2;
      this.$notify({
        title: "成功",
        message: row.account + "已禁用",
        type: "success",
      });
    },
    start(row) {
      // console.log(row);
      row.status = 1;
      this.$notify({
        title: "成功",
        message: row.account + "已启用",
        type: "success",
      });
    },
    delete1(row) {
      this.$notify({
        title: "成功",
        message: row.account + "已删除",
        type: "success",
      });
      this.list();
    },
  },
};
</script>

<style scoped>
</style>