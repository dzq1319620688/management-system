<template>
  <div class="table-wrapper">
    <div  style="width:50%;display:inline-block;">
      <div ref="analysis" style="height: 400px"></div>
    </div>
    <div  style="width:50%;display:inline-block;">
      <div ref="macarons" style="height: 400px"></div>
    </div>
    <div style="margin-top:40px">
      <div  style="width:50%;display:inline-block;">
        <div ref="chartPie" style="height: 400px"></div>
      </div>
      <div  style="width:50%;display:inline-block;">
        <div ref="chartBar" style="height: 400px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {orderData} from "@/api/order"
  export default {
    data() {
      return {
        chart: null,
        chart2:null,
        chart3:null,
        chart4:null,
        chartData:[],
        chartData2:[],
        chartData3:[]
      };
    },
    created() {
      this.getDataList();
    },
    mounted() {
    },
    beforeDestroy() {
      if (!this.chart||!this.chart2) {
        return;
      }
      this.chart2.dispose();
      this.chart.dispose();
      this.chart2 = null;
      this.chart = null;
    },
    methods: {
      getDataList() {
        orderData().then(res=>{
          if(res.code==200){
            this.chartData=res.data.sumList
            this.chartData2=res.data.rateList
            this.chartData3=res.data.rateList2
            this.chartData4=res.data.sumList2
          console.log(789,this.chartData)
            this.initChart();
            this.initChart2();
            this.initChart3();
            this.initChart4();
          }
        })
      },
      initChart2() {
      this.chart2 = this.$echarts.init(this.$refs["macarons"]);
        this.chart2.setOption({
          title: {
            text: '本周订单进度',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['已完成', '待付款', '待发货', '已发货', '已取消']
          },
          calculable: true,
          series: [
            {
              name: '本周订单进度',
              type: 'pie',
              roseType: 'radius',
              data: [
                { value: this.chartData2[0], name: '已完成' },
                { value: this.chartData2[1], name: '待付款' },
                { value: this.chartData2[2], name: '待发货' },
                { value: this.chartData2[3], name: '已发货' },
                { value: this.chartData2[4], name: '已取消' }
              ]
            }
          ]
        });
      },
      initChart() {
      this.chart = this.$echarts.init(this.$refs["analysis"]);
        this.chart.setOption({
          title: {
            text: '本周成交订单数',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '已完成',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: this.chartData[0]
          }, {
            name: '待付款',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: this.chartData[1]
          }, {
            name: '待发货',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: this.chartData[2]
          }]
        });
      },
      initChart3(){
      this.chart3 = this.$echarts.init(this.$refs["chartPie"]);
      this.chart3.setOption({
            title : {
              text: '客户访问来源',
              x:'center'
            },
            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series : [
              {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data:[
                      {value:this.chartData3[0], name:'搜索引擎'},
                      {value:this.chartData3[1], name:'直接访问'},
                      {value:this.chartData3[2], name:'邮件营销'},
                      {value:this.chartData3[3], name:'联盟广告'},
                      {value:this.chartData3[4], name:'视频广告'}
                ],
            itemStyle: {
                emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }

          }
          ]
      })
      },
      initChart4(){
      this.chart4 = this.$echarts.init(this.$refs["chartBar"]);
      this.chart4.setOption({
                    title: {
                        text: '近三月各地的销售量',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['3月', '4月','5月']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: ['湖北', '湖南', '广东', '浙江', '四川', '江苏']
                    },
                    series: [
                        {
                            name: '3月',
                            type: 'bar',
                            data: this.chartData4[0]
                        },
                        {
                            name: '4月',
                            type: 'bar',
                            data: this.chartData4[1]
                        },
                        {
                            name: '5月',
                            type: 'bar',
                            data: this.chartData4[2]
                        }
                    ]
                });
      }
    }
  };
</script>
