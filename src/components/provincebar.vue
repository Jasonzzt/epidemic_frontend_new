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
     };
   },
  mounted() {
   this.initEcharts();
  },
  methods: {
    initEcharts() {
      const option = {

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
          data: ['xx', 'xx', 'xx', 'xx', 'xx','xx', 'xx', 'xx', 'xx', 'xx','xx', 'xx', 'xx', 'xx', 'xx',]
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
          data: [50000000, 22000000, 10000000, 5000000, 1,50000000, 22000000, 10000000, 5000000, 1,50000000, 22000000, 10000000, 5000000, 1,]
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
          data: [50000000, 22000000, 10000000, 5000000, 1,50000000, 22000000, 10000000, 5000000, 1,50000000, 22000000, 10000000, 5000000, 1,]
        },
          {
            name: '背景',
            type: 'bar',
            barWidth: 20,
            barGap: '-100%',
            data: [50000000, 50000000, 50000000, 50000000, 50000000,50000000, 50000000, 50000000, 50000000, 50000000,50000000, 50000000, 50000000, 50000000, 50000000,],
            itemStyle: {
              normal: {
                // color: 'rgba(24,31,68,1)',
                barBorderRadius: 30,
              }
            },
          },
        ]
      };

      const myChart = echarts.init(document.getElementById("mychart"));
      myChart.setOption(option);
      myChart.resize({
        width: 370,
        height:700
      });
      // this.tootipTimer && this.tootipTimer.clearLoop(); // this.tootipTimer 在data里定义
      // this.tootipTimer = 0;
      // // 调用轮播的方法
      // this.tootipTimer = loopShowTooltip(myChart, option, {
      //   interval: 1000, // 轮播间隔时间
      //   loopSeries: true, // 是否开启轮播循环
        // loopSeries: boolean类型，默认为false。true表示循环所有series的tooltip；false则显示指定seriesIndex的tooltip。
        // seriesIndex: 默认为0，指定某个系列（option中的series索引）循环显示tooltip，当loopSeries为true时，从seriesIndex系列开始执行。
      // });
      //随着屏幕大小调节图表
      /*      window.addEventListener("resize", () => {
              myChart.resize();
            });*/
    },
    // getCurPageContent: function (numberArr, curPage, itemNumPerPage) {
    //   return numberArr.filter(function (element, index) {
    //     if (index >= (curPage - 1) * itemNumPerPage && index < curPage * itemNumPerPage) {
    //       return true
    //     } else {
    //       return false
    //     }
    //   })
    // },
  }
}
</script>

<style scoped>

</style>