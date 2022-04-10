<template>
  <div>
    <el-row :gutter="24" class="top mt">
      <el-col :span="6">
        <el-card shadow="always" class="in">
          <div class="fl">
            <p>本月数量</p>
            <p>121</p>
            <p>
              +20.25%
              <span>与上月同比</span>
            </p>
          </div>
          <i class="el-icon-money ico fr"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="allin">
          <div class="fl">
            <p>本月放款（元）</p>
            <p>1210000</p>
            <p>
              +1.25%
              <span>与上月同比</span>
            </p>
          </div>
          <i class="el-icon-money ico fr"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="allout">
          <div class="fl">
            <p>累计数量</p>
            <p>153555</p>
            <p>
              +16.25%
              <span>与去年同比</span>
            </p>
          </div>
          <i class="el-icon-money ico fr"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="out">
          <div class="fl">
            <p>累计放款</p>
            <p>5320000</p>
            <p>
              +4.25%
              <span>与去年同比</span>
            </p>
          </div>
          <i class="el-icon-money ico fr"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-bottom: 20px">
      <el-col :span="18">
        <el-card>
          <div slot="header">
            <span>产品统计分析</span>
          </div>
          <div ref="analysis" style="height: 240px"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <span>产品产品占比</span>
          </div>
          <div ref="percent" style="height: 240px"></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="24">
      <el-col :span="12">
        <el-card>
          <el-timeline style="height: 378px">
            <el-timeline-item timestamp="2018/4/12" placement="top">
              <el-card>
                <h4>更新</h4>
                <p>dzq 提交于 2021/12/12 20:46</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/3" placement="top">
              <el-card>
                <h4>更新</h4>
                <p>dzq 提交于 2021/12/30 17:20</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2018/4/2" placement="top">
              <el-card>
                <h4>更新</h4>
                <p>dzq 提交于 2021/2/22 10:35</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <el-timeline>
            <el-calendar v-model="value" class="test"></el-calendar>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { post } from "@/utils/http.js";
export default {
  data() {
    return {
      xdata: [],
      ydata: [],
      value: new Date(),
    };
  },
  mounted() {
    this.loadData().then(() => {
      this.loadLine();
    });
    this.drawpie();
  },
  methods: {
    loadLine() {
      let myChart = this.$echarts.init(this.$refs["analysis"]);
      myChart.setOption({
        xAxis: {
          data: this.xdata,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: this.ydata,
            type: "line",
            smooth: true,
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#4f88ff",
                  },
                  {
                    offset: 1,
                    color: "white",
                  },
                ],
                global: false,
              },
            },
          },
        ],
      });
    },
    loadData() {
      return post("/load").then((res) => {
        this.xdata = res.data.xdata;
        this.ydata = res.data.ydata;
      });
    },
    drawpie() {
      let myChart = this.$echarts.init(this.$refs["percent"]);
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{d}",
        },
        series: [
          {
            name: "来源",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "汽车消费" },
              { value: 735, name: "房产消费" },
              { value: 580, name: "抵押贷款" },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style lang="less" scoped>
.ico {
  font-size: 90px;
  color: rgba(255, 255, 255, 0.3);
}
.in {
  background: #4f88ff;
}
.top p {
  line-height: 30px;
  color: #fff;
  font-size: 16px;
}
.allin {
  background: #5050ff;
}
.allout {
  background: #f49b3b;
}
.out {
  background: #f26075;
}
.time p {
  color: #666;
}
.test /deep/ .el-calendar-table .el-calendar-day {
  width: 40px;
  height: 45px;
}
.el-calendar /deep/ .el-calendar__body{
  padding: 5px 10px 1px;
}
</style>