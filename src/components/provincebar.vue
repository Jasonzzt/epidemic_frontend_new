<template>
  <div class="echart" id="mychart" ></div>
</template>

<script>
import 'echarts' // 核心文件
// const echarts = require("echarts");
import { loopShowTooltip } from "../tooltip-auto-show-vue.js";
export default {
  name: "provincebar",
  data() {
     return {
       tootipTimer:"",
       updateData:5,
  // //     xData: ["湖北省", "上海市", "广东省", "吉林省", "北京市"], //横坐标
  // //     yData: [53000, 24000,13000, 12000, 5000], //数据
  // //     myChartStyle: { float: "left", width: "100%", height: "400px" }, //图表样式
       options:{},
       myChart :null
     };
   },
  mounted() {
    this.myChart = echarts.init(document.getElementById("mychart"));
    this.updateChart([])
  },
  methods: {
    updateChart(dataList) {
      let xdata=[]
      let ydata=[]
      let zdata=[]
      let m =0 ;
      for(let item of dataList){
        if(item["name"]!="台湾省"&&item["name"]!="香港特别行政区") {
          xdata.push(item["name"])
          ydata.push(item["value"])
          m = Math.max(m,item["value"])
        }
      }
      for(let i = 0;i<ydata.length;++i){
        zdata.push(m)
      }

      this.options = {

        grid: {
          left: '5%',
          right: '5%',
          bottom: '5%',
          top: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function(params) {
            return params[0].name + '<br/>' +
                "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                params[0].seriesName + ' : ' + Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() + ' 万人<br/>'
          }
        },
        // backgroundColor: 'rgb(20,28,52)',
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: [{
          type: 'category',
          inverse: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#d9deff'
            },
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: xdata
        }, {
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
            textStyle: {
              color: '#b1bcff',
              fontSize: '12'
            },
            formatter: function(value) {
              if (value >= 10000) {
                return (value / 10000).toLocaleString() + '万';
              } else {
                return value.toLocaleString();
              }
            },
          },
          data: ydata
        }],
        series: [{
          name: '确诊',
          type: 'bar',
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'rgb(57,89,255,1)'
              }, {
                offset: 1,
                color: 'rgb(46,200,207,1)'
              }]),
            },
          },
          barWidth: 20,
          data: ydata
        },
          {
            name: '背景',
            type: 'bar',
            barWidth: 20,
            barGap: '-100%',
            data: zdata,
            itemStyle: {
              normal: {
                // color: 'rgba(24,31,68,1)',
                barBorderRadius: 30,
              }
            },
          },
        ]
      };
      this.myChart.setOption(this.options)
      this.myChart.resize({
        width: 370,
        height:xdata.length*30
      });
    },
  }
}
</script>

<style scoped>

</style>
