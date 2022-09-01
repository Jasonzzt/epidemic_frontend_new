<template>
  <div class="echart" id="mychart"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "provincebar",

  data() {
    return {
      tootipTimer: "",
      updateData: 5,
      options: {},
      myChart: null
    };
  },

  mounted() {
    this.myChart = echarts.init(document.getElementById("mychart"));
  },

  methods: {
    setData(dataList) {
      // 横轴
      let xdata = []
      // 纵轴
      let ydata = []
      // 侧面数据显示
      let zdata = []
      // 背景值
      let m = 0;

      for (let i = 0; i < dataList.length; ++i) {
        if (dataList[i].name !== "台湾省" && dataList[i].name !== "香港特别行政区") {
          xdata.push(dataList[i]["name"])
          ydata.push(dataList[i]["value"])
          m = Math.max(m, dataList[i]["value"])
        }
      }
      // 最大值作为背景
      m = Math.max(m, 1)
      for (let i = 0; i < ydata.length; ++i) {
        zdata.push(m)
      }
      this.options = {
        grid: {
          left: '3%',
          right: '5%',
          bottom: '3%',
          top: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return params[0].name + '<br/>' +
                "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                params[0].seriesName + ' : ' + Number((params[0].value.toFixed(4))).toLocaleString() + ' 人<br/>'
          }
        },
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: [
          {
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
          },
          {
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
              formatter: function (value) {
                if (value >= 10000) {
                  return (value / 10000).toLocaleString() + '万';
                } else {
                  return value.toLocaleString();
                }
              },
            },
            data: ydata
          }],
        series: [
          {
            name: '数量',
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
                barBorderRadius: 30,
              }
            },
          },
        ]
      };
      this.myChart.setOption(this.options)
      this.myChart.resize({
        width: 370,
        height: xdata.length * 40
      });
    }
  }
}
</script>

<style scoped>

</style>
