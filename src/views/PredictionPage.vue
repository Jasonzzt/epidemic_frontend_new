<template>
  <!--  <div :style="background" class="bgBackground">-->
  <!--  </div>-->
  <div class="com-page1">
    <el-page-header @back="goBack" content=" ">
    </el-page-header>
    <el-header style="font-size: 35px;font-family:新宋体">
      <dv-decoration-7 style="width:350px;height:18px;">疫情预测数据<i class="el-icon-s-data"></i></dv-decoration-7>
    </el-header>
    <dv-decoration-5  :dur="dur" style="width:1000px;margin-left: 300px;height:30px;"  />

    <div style="width: 500px">
      <el-container>
        <el-aside style="width: 900px;height: 600px">
          <earth style="height: 100%;width: 100%"></earth>
        </el-aside>
        <el-aside style="width: 650px">
        <div id="myChart" :style="{backgroundColor: '#1a2550', width: '650px', height: '600px'}"></div>
      </el-aside>

      </el-container>

    </div>
    <div>
    </div>
  </div>


</template>



<script>
import router from "@/router";
import earth from "../components/myEarth";
export default {
  components:{
    earth
  },
  data() {
    return {
      dur: 4,

      TimeArr: [], // 年份数组（横坐标）
      ConfirmArr: [], // 确诊数组（纵坐标）
      PredictArr: [],
      country: '中国',//默认中国，实则根据左侧地球点击显示对应国家数据
      options: {},
      myChart:null,
    }
  },
  mounted(){

    this.drawLine();
  },
  methods:{
    async drawLine(){
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById('myChart'));
      // 绘制图表
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      let timeArr = []
      let confirmArr = []
      let predictArr = []
      await this.$axios.post('http://116.62.153.183/getEpidemicDataPr',{"country":"中国"}, config).then(res => {

        let zzData = res.data.msg
        //alert(zzData[0].time)
        for(let i=0;i<zzData.length; i++) {
          timeArr.push(zzData[i].time)
          if(zzData[i].isPredicted ==0){
            confirmArr.push(zzData[i].confirmIncrease)
            predictArr.push("-")
          }else{
            confirmArr.push("-")
            predictArr.push(zzData[i].confirmIncrease)
          }

        }

        this.TimeArr=timeArr
        this.ConfirmArr=confirmArr
        this.PredictArr=predictArr
      })
      this.options ={
        title: {
          text: this.country+'新增疫情确诊数据',
          textStyle:{
            color: "#bdc4fc",
            fontFamily:"新宋体",
            fontSize:"20px"
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
        color:"#11eecd",
        legend: {
          data:['新增', '确诊', '治愈','死亡'],
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
            magicType: {type: ['line', 'bar']},
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis:  {
          type: 'category',
          boundaryGap: false,
          data:this.TimeArr
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
          start: 50,
          end: 100,
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
          // },
          {
            name:'新增确诊',
            type:'line',
            lineStyle:{
              color:"#11eecd"
            },
            itemStyle: {
              normal: {
                color: "#3f498d",
              }
            },
            data: this.ConfirmArr,
            smooth: true
          },
          {
            name:'预测新增',
            type:'line',
            lineStyle:{
              color:"rgba(255,40,73,0.89)"
            },
            itemStyle: {
              normal: {
                color: "#f5b065",
              }
            },
            data:this.PredictArr,
            smooth: true
          },

        ]
      }
      this.myChart.setOption(this.options);
    },
    setData(conuntryName) {
      this.country = conuntryName
      // 基于准备好的dom，初始化echarts实例
      // 绘制图表
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      let timeArr = []
      let confirmArr = []
      let predictArr = []
      this.$axios.post('http://116.62.153.183/getEpidemicDataPr', {"country": this.country}, config).then(res => {

        let zzData = res.data.msg
        //alert(zzData[0].time)
        for (let i = 0; i < zzData.length; i++) {
          timeArr.push(zzData[i].time)
          if(zzData[i].isPredicted ==0){
            confirmArr.push(zzData[i].confirmIncrease)
            predictArr.push("-")
          }else{
            confirmArr.push("-")
            predictArr.push(zzData[i].confirmIncrease)
          }

          // timeArr.push(zzData[i].time)
          // confirmArr.push(zzData[i].confirmIncrease)
        }
        console.log(timeArr)
        console.log(confirmArr)
        this.TimeArr = timeArr
        this.ConfirmArr = confirmArr
        this.PredictArr = predictArr
        this.options = {
          title: {
            text: this.country + '疫情新增确诊数据',
            textStyle: {
              color: "#bdc4fc",
              fontFamily: "新宋体",
              fontSize: "20px"
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
          //color: "#11eecd",
          // legend: {
          //   data: ['新增', '确诊', '治愈', '死亡'],
          //   textStyle: {
          //     color: "rgba(255, 255, 255, 0.7)",
          //     fontFamily: "新宋体",
          //     fontSize: "18px"
          //   },
          // },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              // dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.TimeArr
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
            {
              name: '新增确诊',
              type: 'line',
              lineStyle: {
                color: "#11eecd"
              },
              itemStyle: {
                normal: {
                  color: "#3f498d",
                }
              },
              data: this.ConfirmArr,
              smooth: true
            },
            {
              name:'预测新增',
              type:'line',
              lineStyle:{
                color:"rgba(255,45,77,0.85)"
              },
              itemStyle: {
                normal: {
                  color: "#f5b065",
                }
              },
              data:this.PredictArr,
              smooth: true
            },


          ]
        }
        this.myChart.setOption(this.options);
      })

    },
    goBack() {
      router.push('/')
    },
  },


};

</script>
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
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}
</style>
