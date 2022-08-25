<template>
  <div class="echart" id="mychart" :style="myChartStyle"></div>
</template>

<script>
import 'echarts' // 核心文件
const echarts = require("echarts");
export default {
  name: "provincebar",
  // data() {
  //    return {
  // //
  // //     xData: ["湖北省", "上海市", "广东省", "吉林省", "北京市"], //横坐标
  // //     yData: [53000, 24000,13000, 12000, 5000], //数据
  // //     myChartStyle: { float: "left", width: "100%", height: "400px" }, //图表样式
  //      curPage: 1,
  //      totalPage: 1,
  //      itemNumPerPage: 10,//每页显示条数，自己调整
  //    };
  //  },
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
        height:600
      });
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