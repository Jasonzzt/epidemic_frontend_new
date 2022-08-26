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
  // //
  // //     xData: ["湖北省", "上海市", "广东省", "吉林省", "北京市"], //横坐标
  // //     yData: [53000, 24000,13000, 12000, 5000], //数据
  // //     myChartStyle: { float: "left", width: "100%", height: "400px" }, //图表样式
  //      curPage: 1,
  //      totalPage: 1,
  //      itemNumPerPage: 10,//每页显示条数，自己调整
     };
   },
  mounted() {
   // this.myEcharts();
    // let that=this;
    // const timer = setInterval(() => {
    //   let curPage=that.curPage==that.totalPage?1:that.curPage+1;
    //   that.curPage=curPage;
    //   that.myEcharts();
    // }, 5000)//设置时间
    // //销毁定时器
    // this.$once('hook:beforeDestroy', () => {
    //   clearInterval(timer)
    // });

   this.initEcharts();
  },
  methods: {
    initEcharts() {
      // 基本柱状图
      // this.totalPage = Math.ceil(this.dataList / this.itemNumPerPage)
      // this.totalPage = this.totalPage < 1 ? 1 : this.totalPage;
      // let chartDom = document.getElementById("main");
      // let myChart = echarts.init(chartDom);
      // let option;
      const option = {
      //   tooltip: {
      //     trigger: "axis",
      //     axisPointer: {
      //       type: "shadow",
      //     },
      //   },
      //   updateData:5,
      //   grid: {
      //     left: "3%",
      //     right: "4%",
      //     bottom: "6%",
      //     containLabel: true,
      //   },
      //   legend: [
      //     {
      //       top: "8.3%",
      //       left: "50%",
      //       textStyle: {
      //         color: "#DBE2FD",
      //         fontSize: 14,
      //         fontFamily: "微软雅黑",
      //       },
      //       itemStyle: {
      //         color: "#00FFFF",
      //       },
      //       itemWidth: 16,
      //       itemHeight: 8,
      //       data: [
      //         {
      //           name: "2019",
      //         },
      //       ],
      //     },
      //
      //   ],
      //   xAxis: {
      //     type: "value",
      //
      //     splitLine: {
      //       show: false,
      //     },
      //     axisLine: {
      //       show: false,
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     show: true,
      //     axisLabel: {
      //       formatter: "{value}",
      //       color: "#ffffff",
      //     },
      //   },
      //   yAxis: {
      //     type: "category",
      //     //   inverse: true,
      //     name: "单位：亿元",
      //     nameTextStyle: {
      //       color: "#ffffff",
      //     },
      //     data: [
      //       "xx", "xx", "xx", "xx",
      //       "xx", "xx", "xx", "xx",
      //       "xx", "xx", "xx", "xx",
      //       "xx", "xx","xx", "xx",
      //     ],
      //     axisLine: {
      //       show: false,
      //     },
      //     axisTick: {
      //       show: false,
      //     },
      //     axisLabel: {
      //       color: "#FEFEFF",
      //       formatter: function (params) {
      //         var newParamsName = ""; // 最终拼接成的字符串
      //         var paramsNameNumber = params.length; // 实际标签的个数
      //         var provideNumber = 3; // 每行能显示的字的个数
      //         var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
      //         /**
      //          * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
      //          */
      //         // 条件等同于rowNumber>1
      //         if (paramsNameNumber > provideNumber) {
      //           /** 循环每一行,p表示行 */
      //           for (var p = 0; p < rowNumber; p++) {
      //             var tempStr = ""; // 表示每一次截取的字符串
      //             var start = p * provideNumber; // 开始截取的位置
      //             var end = start + provideNumber; // 结束截取的位置
      //             // 此处特殊处理最后一行的索引值
      //             if (p == rowNumber - 1) {
      //               // 最后一次不换行
      //               tempStr = params.substring(start, paramsNameNumber);
      //             } else {
      //               // 每一次拼接字符串并换行
      //               tempStr = params.substring(start, end) + "\n";
      //             }
      //             newParamsName += tempStr; // 最终拼成的字符串
      //           }
      //         } else {
      //           // 将旧标签的值赋给新标签
      //           newParamsName = params;
      //         }
      //         //将最终的字符串返回
      //         return newParamsName;
      //       },
      //     },
      //   },
      //   series: [
      //     {
      //       name: "2019",
      //       type: "bar",
      //       data: [1092.68, 135.21, 109.43, 104.41, 37.13, 70.04, 7.979,1092.68, 135.21, 109.43, 104.41, 1092.68, 135.21, 109.43, 104.41, 111],
      //       label: {
      //         normal: {
      //           //   show: true,
      //           //   position: 'right',
      //           //   textBorderWidth: 3,
      //           //     fontSize:18
      //         },
      //       },
      //       barWidth: 10,
      //       //  max:5000,
      //       color: "#00FFFF",
      //       itemStyle: {
      //         normal: {
      //           color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
      //             { offset: 0, color: "#007EFF" }, //柱图渐变色               //柱图渐变色
      //             { offset: 1, color: "#3FFFEA" }, //柱图渐变色
      //           ]),
      //         },
      //       },
      //     },
      //   ],
      // };


     // const option = {
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
                params[0].seriesName + ' : ' + Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() + ' 万元<br/>'
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
      //dataZoom的自动播放

      // const option = {
      //   xAxis: {
      //     data: this.xData
      //   },
      //   yAxis: {
      //
      //   },
      //   grid: [{
      //     left: '20%',//因旋转导致名字太长的类目造成遮蔽，可以配合这两个属性
      //     bottom:'10%'// 分别表示：距离左边距和底部的距离，具体数值按实际情况调整
      //   }],
      //
      //   series: [
      //     {
      //       type: "bar", //形状为柱状图
      //       data: this.yData,
      //       itemStyle:{
      //         color:'#188cef',
      //         shadowColor: '#5470c6',
      //
      //       }
      //     }
      //   ]
      // };
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