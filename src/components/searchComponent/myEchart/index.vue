<template>
  <div style="background:#ffffff">
    <div id="income" style="height:80vh;width:100%"></div>
    <div style="height: 70px; margin-left: 18%">
      <!-- 选择图例 -->
      <el-checkbox-group
        v-model="lengendList"
        @change="lengendChange"
        size="mini"
        :min="0"
        :max="2"
      >
        <el-checkbox
          v-for="city in lengendData"
          border
          :label="city"
          :key="city"
          >{{ city }}</el-checkbox
        >
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts/core";
import { LineChart, BarChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
} from "echarts/components";

echarts.use([
  CanvasRenderer,
  LineChart,
  BarChart,
  TooltipComponent,
  GridComponent,
  TitleComponent,
  LegendComponent,
  ToolboxComponent,
]);

export default {
    name: 'myEchart',
  props: ['listData','title'],//传入的数据和表名

  data() {
    return {
      // 图表的数据
      incomeChartData: {
        xAxis: [],
        reqSmt: [],
        resSmt:[],
        uniShowSmt:[],
        uniClkSmt:[],
        auctionPrice:[],
        winPrice:[],
        profit:[],
      },
      //图例的选项
      lengendData: [
        "请求数",
        "填充数",
        "展示数",
        "点击数",
        "支出",
        "收入",
        "利润",
      ],
      //默认选择的图例
      lengendList: ["展示数"],

      //图例的显示与否
      lengendList2: {
        请求数: false,
        填充数: false,
        展示数: true,
        点击数: false,
        支出: false,
        收入: false,
        利润: false,
      },
      timer: undefined,
    };
  },
  watch: {
    listData () {
      this.initIncomeChar();
    }
  },
  mounted() {
    //图表的大小随浏览器的大小变化而变化
    window.onresize = () => {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.incomeChart.resize();
      }, 100);
    };
  },
  methods: {
    initIncomeChar() {
      var chartDom = document.getElementById("income");
      this.incomeChart = echarts.init(chartDom);
      this.getIncomeData(this.listData);
    },
    incomeSetOption() {
      const option = {
        title: {
          text: this.title,
          left: "center",
          textStyle: {
            color: "#333",
            lineHeight: 50,
          },
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.lengendList,
          selected: this.lengendList2,
          top: "50",
          textStyle: {
            fontSize: 16,
          },
          itemHeight: 15,
          bottom: "20",
          height: "30",
        },
        grid: {
          top: "100",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          itemSize: 20,
          right: "3%",
          top: "2%",
          feature: {
            dataZoom:[{
            type:"inside"
            }],
            magicType: {
              type: ['line', 'bar']
            },
            dataView:{
              readOnly:true,
              optionToContent: function(opt) {
                  var axisData = opt.xAxis[0].data;
                  var series = opt.series;
                  var table = '<table style="width:100%;text-align:center"><tbody><tr>'
                              + '<td>时间</td>'
                              + '<td>' + series[0].name + '</td>'
                              + '<td>' + series[1].name + '</td>'
                              + '<td>' + series[2].name + '</td>'
                              + '<td>' + series[3].name + '</td>'
                              + '<td>' + series[4].name + '</td>'
                              + '<td>' + series[5].name + '</td>'
                              + '<td>' + series[6].name + '</td>'
                              + '</tr>';
                  for (var i = 0, l = axisData.length; i < l; i++) {
                      table += '<tr>'
                              + '<td>' + axisData[i] + '</td>'
                              + '<td>' + series[0].data[i] + '</td>'
                              + '<td>' + series[1].data[i] + '</td>'
                              + '<td>' + series[2].data[i] + '</td>'
                              + '<td>' + series[3].data[i] + '</td>'
                              + '<td>' + series[4].data[i] + '</td>'
                              + '<td>' + series[5].data[i] + '</td>'
                              + '<td>' + series[6].data[i] + '</td>'
                              + '</tr>';
                  }
                  table += '</tbody></table>';
                  return table;
              }
            },
            saveAsImage: {}
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.incomeChartData.xAxis,
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              show: true,
            },
          },
          {
            type: "value",
            axisLine: {
              show: true,
            },
          },
        ],
        series: [
          {
            name: "请求数",
            type: "line",
            yAxisIndex:
              this.lengendList.indexOf("请求数") == -1
                ? 0
                : this.lengendList.indexOf("请求数"),
            data: this.incomeChartData.reqSmt,
          },
          {
            name: "填充数",
            type: "line",
            yAxisIndex:
              this.lengendList.indexOf("填充数") == -1
                ? 0
                : this.lengendList.indexOf("填充数"),
            data: this.incomeChartData.resSmt,
          },
          {
            name: "展示数",
            type: "line",
            yAxisIndex:
              this.lengendList.indexOf("展示数") == -1
                ? 0
                : this.lengendList.indexOf("展示数"),
            data: this.incomeChartData.uniShowSmt,
          },
          {
            name: "点击数",
            type: "line",
            yAxisIndex: 1,
            yAxisIndex:
              this.lengendList.indexOf("点击数") == -1
                ? 0
                : this.lengendList.indexOf("点击数"),
            data: this.incomeChartData.uniClkSmt,
          },
          {
            name: "支出",
            type: "line",
            yAxisIndex: 1,
            yAxisIndex:
              this.lengendList.indexOf("支出") == -1
                ? 0
                : this.lengendList.indexOf("支出"),

            data: this.incomeChartData.auctionPrice,
          },
          {
            name: "收入",
            type: "line",
            yAxisIndex:
              this.lengendList.indexOf("收入") == -1
                ? 0
                : this.lengendList.indexOf("收入"),
            data: this.incomeChartData.winPrice,
          },
          {
            name: "利润",
            type: "line",
            yAxisIndex:
              this.lengendList.indexOf("利润") == -1
                ? 0
                : this.lengendList.indexOf("利润"),
            data: this.incomeChartData.profit,
          },
        ],
      };
      option && this.incomeChart.setOption(option);
    },

    getIncomeData(data) {
      this.incomeChartData = {
        xAxis: [],
        reqSmt: [],
        resSmt: [],
        uniShowSmt: [],
        uniClkSmt: [],
        auctionPrice: [],
        winPrice: [],
        profit: [],
      };
      data.reverse().forEach((item) => {
        this.incomeChartData.xAxis.push(item.reportTime);
        this.incomeChartData.reqSmt.push(item.reqSmt);
        this.incomeChartData.resSmt.push(item.resSmt);
        this.incomeChartData.uniShowSmt.push(item.uniShowSmt);
        this.incomeChartData.uniClkSmt.push(item.uniClkSmt);
        this.incomeChartData.auctionPrice.push(item.auctionPrice);
        this.incomeChartData.winPrice.push(item.winPrice);
        this.incomeChartData.profit.push(item.profit);
      });
      data.reverse();
      this.incomeSetOption();
    },
    lengendChange() {
      // 将图例的显示确定先全部设为false，再将选择的图例设为true
      for (let i = 0; i < this.lengendData.length; i++) {
        this.lengendList2[this.lengendData[i]] = false;
      }
      for (let i = 0; i < 2; i++) {
        this.lengendList2[this.lengendList[i]] = true;
      }
      this.incomeSetOption();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>