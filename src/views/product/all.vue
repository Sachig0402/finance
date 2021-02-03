<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, index) in breadlist" :key="index">{{
        item
      }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="mt">
      <el-row :gutter="16">
        <el-col :span="6">
          <el-input
            placeholder="产品名称"
            v-model.trim="searchValue"
          ></el-input>
        </el-col>
        <el-col :span="6">
          <el-select
            placeholder="利率"
            v-model="searchValue2"
            style="width: 100%"
          >
            <el-option label="3.8%" value="3.8">3.8</el-option>
            <el-option label="3.9%" value="3.9">3.9</el-option>
            <el-option label="4.1%" value="4.1">4.1</el-option>
            <el-option label="4.3%" value="4.3">4.3</el-option>
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="date1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="width: 100%"
          >
          </el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="reset">重置</el-button>

          <span class="el-dropdown-link" @click="expand" v-show="!advanced">
            展开
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <span class="el-dropdown-link" @click="expand" v-show="advanced">
            收起
            <i class="el-icon-arrow-up el-icon--right"></i>
          </span>
        </el-col>
      </el-row>
      <el-row :gutter="16" v-show="advanced" style="margin-top: 20px">
        <el-col :span="6">
          <el-input placeholder="产品类别" v-model.trim="leibie" />
        </el-col>
        <el-col :span="6">
          <el-input placeholder="最高分期数" v-model.trim="fenqi" />
        </el-col>
        <el-col :span="6">
          <el-input placeholder="状态" v-model.trim="status" />
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-table
        :data="tableData"
        style="width: 100%"
        
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="产品名称"></el-table-column>
        <el-table-column prop="type" label="产品类别"></el-table-column>
        <el-table-column prop="rate" label="利率"></el-table-column>
        <el-table-column prop="date" label="开放日期"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status == 1" effect="dark"
              >已启用</el-tag
            >
            <el-tag type="danger" v-else effect="dark">已禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="highest"
          label="最高分期数(月)"
        ></el-table-column>
        <el-table-column prop="number" label="申请客户数量"></el-table-column>
        <el-table-column prop="total" label="累计签约金额"></el-table-column>
        <el-table-column prop="average" label="件均"></el-table-column>
        <el-table-column prop="remark" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" v-if="scope.row.status == 2"
              >启用</el-button
            >
            <el-button type="danger" size="mini" v-else>禁用</el-button>
            <el-button
              type="primary"
              size="mini"
              @click="detail(scope.row.name)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import breadCrumb from "@/mixins/breadCrumb.js";
import "@/common/common.css";
import { get } from "@/utils/http.js";
export default {
  mixins: [breadCrumb],
  data() {
    return {
      searchValue: "",
      searchValue2: "",
      //   value1: "",
      leibie: "",
      fenqi: "",
      status: "",
      advanced: false,
      date1: "",
      params: {},
      tableData: [],
      total: 50,
      currentPage:1,
      pageSize:10,
    };
  },
  methods: {
    expand() {
      this.advanced = !this.advanced;
    },
    search() {
      this.params.date = [
        this.$moment(this.date1[0]).format("YYYY-MM-DD"),
        this.$moment(this.date1[1]).format("YYYY-MM-DD"),
      ];
      console.log(this.params.date);
      this.params.shijianchuo = [
        this.$moment(this.date1[0]).valueOf(),
        this.$moment(this.date1[1]).valueOf(),
      ];
      console.log(this.params.shijianchuo);
    },
    reset() {
      this.searchValue = "";
      this.searchValue2 = "";
      this.date1 = "";
      this.leibie = "";
      this.fenqi = "";
      this.status = "";
    },
    list() {
      get("/productList").then((res) => {
        // console.log(res);
        this.total = res.data.total;
        this.tableData = res.data.list;
      });
    },
    // handleSelectionChange() {},
    // handleCurrentChange(currentPage){
    //   this.currentPage=currentPage;
    // },
    // handleSizeChange(){
    //   this.size=this.pageSize;
    // },
    detail(name1) {
      sessionStorage.setItem("name", name1);
      this.$router.push("/product/detail");
    },
  },
  mounted() {
    this.list();
  },
};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
  margin-left: 10px;
}
</style>