<template>
  <div class="echart" id="mychart" :style="myChartStyle"></div>
</template>

<script>

export default {
  name:'zhuzhuangtu',
  data() {
    return {

      xData: ["湖北省", "上海市", "广东省", "吉林省", "北京市"], //横坐标
      yData: [53000, 24000,13000, 12000, 5000], //数据
      myChartStyle: { float: "left", width: "100%", height: "400px" } //图表样式
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      // 基本柱状图
      const option = {
        xAxis: {
          data: this.xData
        },
        yAxis: {

        },
        grid: [{
          left: '20%',//因旋转导致名字太长的类目造成遮蔽，可以配合这两个属性
          bottom:'10%'// 分别表示：距离左边距和底部的距离，具体数值按实际情况调整
        }],

        series: [
          {
            type: "bar", //形状为柱状图
            data: this.yData,
            itemStyle:{
              color:'#188cef',
              shadowColor: '#5470c6',

            }
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart"));
      myChart.setOption(option);
      myChart.resize({
        width: 350,
        height:250
      });
      //随着屏幕大小调节图表
/*      window.addEventListener("resize", () => {
        myChart.resize();
      });*/
    }
  }
};
</script>

