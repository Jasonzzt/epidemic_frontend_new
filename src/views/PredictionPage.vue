<template>
  <!--  <div :style="background" class="bgBackground">-->
  <!--  </div>-->
  <div class="com-page1">
    <el-page-header @back="goBack" content=" ">
    </el-page-header>
    <el-header style="font-size: 35px;font-family:新宋体">
      <dv-decoration-7 style="width:350px;height:20px;">疫情预测数据<i class="el-icon-s-data"></i></dv-decoration-7>
    </el-header>
    <dv-decoration-5  style="width:1000px;margin-left: 300px;height:30px;" :dur="dur" />

        <el-main style="font-size: 22px">

          <el-row :gutter="20">
            <el-col :span="10" style="font-size: 19px;margin-left: 90px">
<!--              地球位置（分栏左侧）-->
            </el-col>
            <el-col :span="10" style="font-size: 19px;margin-left: 50px" >
<!--              分栏右侧：折线图-->
              <div id="myChart" :style="{backgroundColor: '#1a2550', width: '750px', height: '550px'}"></div>
            </el-col>
          </el-row>

        </el-main>

<!--        </el-main>-->
<!--      </el-container>-->
<!--    </el-container>-->
    <earth></earth>
  </div>

</template>

<style lang="less">
.flex {
  flex: 1;
}
.flex-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.bgc-size {
  width: 99%;
  padding: 5px 5%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  overflow: hidden;
}
.com-page1 {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background: #00065b url(../../public/static/img/bg1.jpg) no-repeat 0 0;
}
.el-header {
  color: oldlace;
  text-align: center;
  line-height: 50px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.el-main {
  text-align: center;
  line-height: 40px;
}

</style>

<script>

import router from "@/router";
import myMap from "../components/Map";
// import earth from "../components/earth";

let echarts = require('echarts/lib/echarts');
// 引入柱状图组件
require('echarts/lib/chart/bar');
// 引入提示框和title组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
import earth from "../components/myEarth";
export default {
  components: {
    earth,
  },
  name: "DataCount",
  data: {
    dur: 4,
    zzData: {}, // 著作数据
    TimeArr: [], // 年份数组（横坐标）
    ConfirmArr: [], // 确诊数组（纵坐标）
    country: '中国',//默认中国，实则根据左侧地球点击显示对应国家数据
    options: {},
  },

  mounted() {
    // this.$axios.post('http://116.62.153.183/getChinaEpidemicDataByDate', "").then(res => {
    //   let msg = res.data.msg;
    //   for (let i = 0; i < msg.length; i++) {
    //     let word = msg[i].country.replace("省", "")
    //     word = word.replace("市", "")
    //     word = word.replace("特别行政区", "")
    //     word = word.replace("自治区", "")
    //     let a = {name: word, stuNum: msg[i].nowConfirm}
    //     this.dataProvince.push(a)
    //   }

    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'));
      // 绘制图表
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      let country = this.country
      let timeArr = []
      let confirmArr = []
      this.$axios.post('http://116.62.153.183/getEpidemicDataPr', {"country": "英国"}, config).then(res => {

        this.zzData = res.data
        for (let i = 0; i < this.zzData.length; i++) {
          this.TimeArr[i] = this.zzData.time
          this.ConfirmArr[i] = this.zzData.msg[i].confirmIncrease
        }
        timeArr = this.TimeArr
        confirmArr = this.ConfirmArr
        console.log(this.zzData);

      })
      this.options = {
        title: {
          text: country + '疫情确诊数据',
          textStyle: {
            color: "#bdc4fc",
            fontFamily: "新宋体",
            fontSize: "25px"
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            textStyle: {
              color: "#fff"
            }
          },
        },
        color: "#11eecd",
        legend: {
          data: ['新增', '确诊', '治愈', '死亡'],
          textStyle: {
            color: "rgba(255, 255, 255, 0.7)",
            fontFamily: "新宋体",
            fontSize: "18px"
          },
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: timeArr
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 10,
          start: 10,
          end: 80,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: "rgba(177,188,255,0.83)",
          },
          textStyle: {
            color: "#fff"
          },
          borderColor: "#90979c"
        }, {
          type: "inside",
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: [
          // {
          //   name:'新增',
          //   type:'line',
          //   data:[11, 11, 15, 13, 12, 11, 11, 15, 13, 12, ],
          //   // markPoint: {
          //   //   data: [
          //   //     {type: 'max', name: '最大值'},
          //   //     {type: 'min', name: '最小值'}
          //   //   ]
          //   // },
          //   // markLine: {
          //   //   data: [
          //   //     {type: 'average', name: '平均值'}
          //   //   ]
          //   // }
          // },
          {
            name: '确诊',
            type: 'line',
            lineStyle: {
              color: "#11eecd"
            },
            data: confirmArr,
            // markPoint: {
            //   data: [
            //     {name: '周最低', value: 2, xAxis: 1, yAxis: 1.5}
            //   ]
            // },
            // markLine: {
            //   data: [
            //     {type: 'average', name: '平均值'},
            //     [{
            //       symbol: 'none',
            //       x: '90%',
            //       yAxis: 'max'
            //     }, {
            //       symbol: 'circle',
            //       label: {
            //         normal: {
            //           position: 'start',
            //           formatter: '最大值'
            //         }
            //       },
            //       type: 'max',
            //       name: '最高点'
            //     }]
            //   ]
            // }
          },
          // {
          //   name:'治愈',
          //   type:'line',
          //   data:[2, 2, 2, 4, 4, 2, 2, 2, 4, 4, ],
          //   // markPoint: {
          //   //   data: [
          //   //     {name: '周最低', value: 2, xAxis: 1, yAxis: 1.5}
          //   //   ]
          //   // },
          // },  {
          //   name:'死亡',
          //   type:'line',
          //   data:[0, 1, 1, 1, 2, 2, 1, 1, 1, 1, ],
          //   // markPoint: {
          //   //   data: [
          //   //     {name: '周最低', value: 2, xAxis: 1, yAxis: 1.5}
          //   //   ]
          //   // },
          // }
        ]
      }
      myChart.setOption(this.options);
    },
    goBack() {
      router.push('/')
    },
  },

}


</script>
