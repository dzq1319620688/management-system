<template>
  <div>
    <el-row :gutter="24" class="top mt">
      <el-col :span="6">
        <el-card shadow="always" class="in">
          <div class="fl">
            <p>本周订单数量</p>
            <p>{{proportionData[0].num}}</p>
            <p>
              +{{proportionData[0].ratio}}%
              <span>与上周同比</span>
            </p>
          </div>
          <i class="el-icon-money ico fr"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="allin">
          <div class="fl">
            <p>本周成交金额</p>
            <p>{{proportionData[1].num}}</p>
            <p>
              +{{proportionData[1].ratio}}%
              <span>与上周同比</span>
            </p>
          </div>
          <i class="el-icon-money ico fr"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="allout">
          <div class="fl">
            <p>累计订单数</p>
            <p>{{proportionData[2].num}}</p>
            <p>
              +{{proportionData[2].ratio}}%
              <span>与上月同比</span>
            </p>
          </div>
          <i class="el-icon-money ico fr"></i>
          <div class="clear"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="always" class="out">
          <div class="fl">
            <p>累计成交金额</p>
            <p>{{proportionData[3].num}}</p>
            <p>
              +{{proportionData[3].ratio}}%
              <span>与上月同比</span>
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
            <span>订单数统计分析</span>
          </div>
          <div ref="analysis" style="height: 240px"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div slot="header">
            <span>商品类型占比</span>
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
      listData:[],
      proportionData:[
        {
            num:"",
            ratio:""
        },
        {
            num:"",
            ratio:""
        },
        {
            num:"",
            ratio:""
        },
        {
            num:"",
            ratio:""
        },
      ],
      value: new Date(),
    };
  },
  mounted() {
    this.loadData().then(() => {
      this.loadLine();
      this.drawpie();
    });
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
        this.listData=res.data.list2
        this.proportionData=res.data.proportionData
        this.xdata = res.data.list.xdata;
        this.ydata = res.data.list.ydata;
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
              { value: this.listData[0], name: "食品" },
              { value: this.listData[1], name: "日用" },
              { value: this.listData[2], name: "服装" },
              { value: this.listData[3], name: "电子" },
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