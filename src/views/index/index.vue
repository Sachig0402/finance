<template>
  <div>
    <el-row :gutter="24" style="margin-bottom: 20px">
      <el-col :span="6">
        <el-card shadow="hover" class="in">
          <div style="float: left">
            <p>本月进件</p>
            <p style="font-weight: bold">6588</p>
            <p>+20.12%<span>与上月同比</span></p>
          </div>
          <i class="el-icon-tickets ico"></i>
          <div style="clear: both"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="out">
          <div style="float: left">
            <p>本月放款</p>
            <p style="font-weight: bold">121000000</p>
            <p>+1.25%<span>与上月同比</span></p>
          </div>
          <i class="el-icon-money ico"></i>
          <div style="clear: both"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="allin">
          <div style="float: left">
            <p>累计进件</p>
            <p style="font-weight: bold">128700</p>
            <p>+11.48%<span>与去年同比</span></p>
          </div>
          <i class="el-icon-date ico"></i>
          <div style="clear: both"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="allout">
          <div style="float: left">
            <p>累计放款</p>
            <p style="font-weight: bold">6588</p>
            <p>-2.06%<span>与去年同比</span></p>
          </div>
          <i class="el-icon-coin ico"></i>
          <div style="clear: both"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="12">
      <el-col :span="18">
        <el-card>
          <div style="height: 240px" ref="analysis"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div style="height: 240px" ref="analysis2"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row style="margin-top: 20px" class="time" :gutter="24">
      <el-col :span="12">
        <el-card body-style="height:500px">
          <el-timeline>
            <el-timeline-item timestamp="2020/07/01" placement="top">
              <el-card>
                <h4>审核订单</h4>
                <p>李红 操作于 08:54</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/07/01" placement="top">
              <el-card>
                <h4>新增贷款</h4>
                <p>王小虎 操作于11:24</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/07/01" placement="top">
              <el-card>
                <h4>新增渠道</h4>
                <p>张浩 操作于15:23</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card body-style="height:500px">
          <el-calendar></el-calendar>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    drawLine() {
      // 初始化容器
      var myChart = this.$echarts.init(this.$refs["analysis"]);
      var myChart2 = this.$echarts.init(this.$refs["analysis2"]);
      // 初始化图表配置选项
      var option = {
        title: {
          text: "产品销售情况",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      var option2 = {
        // legend: {
        //   top: "auto",
        // },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: false, readOnly: true },
            restore: { show: true },
            saveAsImage: { show: false },
          },
        },
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [35, 75],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 3,
            },
            data: [
              { value: 40, name: "a" },
              { value: 38, name: "b" },
              { value: 32, name: "c" },
              { value: 30, name: "d" },
              { value: 28, name: "e" },
              { value: 26, name: "f" },
              { value: 22, name: "g" },
              { value: 18, name: "h" },
            ],
          },
        ],
      };
      // 设置成功
      myChart.setOption(option);
      myChart2.setOption(option2);
    },
  },
  mounted() {
    //要用mounted,不要用created,因为要依赖于页面中的元素,即页面里的元素都mounted挂载之后才能加载图表,而不是页面创建之后
    this.drawLine();
  },
};
</script>

<style scoped>
.in {
  background: #4f88ff;
}
p {
  line-height: 30px;
  color: #fff;
  font-size: 16px;
}
.out {
  background: #f26075;
}
.allin {
  background: #5050ff;
}
.allout {
  background: #f49b3b;
}
.ico {
  float: right;
  font-size: 90px;
  color: rgba(255, 255, 255, 0.3);
}
.time p {
  color: #666666;
}
</style>