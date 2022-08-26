<template>
  <div class="com-container">
    <!-- 返回中国地图 -->
    <div class="button" v-show="isReturnChina" @click="returnChinaFn" style="float:top;margin-top: 70px;">返回中国地图</div>
    <div class="com-chart" ref="map_ref" style="float:top;margin-top: -10px;"></div>


  </div>
</template>

<script>
import 'echarts/map/js/china.js' // 核心文件
require('echarts/theme/macarons')
export default {
  name: '',
  data() {
    return {
      isActive: 0,
      chartInstance: null,

      allDataList: [],
      allDeadList: [],
      allNowDataList: [],
      allTodayCreadList: [],

      chinaTotal: null,
      chinaAdd: null,

      provinces: {   //数据
        china: 'china',
        台湾: 'taiwan',
        河北: 'hebei',
        山西: 'shanxi',
        辽宁: 'liaoning',
        吉林: 'jilin',
        黑龙江: 'heilongjiang',
        江苏: 'jiangsu',
        浙江: 'zhejiang',
        安徽: 'anhui',
        福建: 'fujian',
        江西: 'jiangxi',
        山东: 'shandong',
        河南: 'henan',
        湖北: 'hubei',
        湖南: 'hunan',
        广东: 'guangdong',
        海南: 'hainan',
        四川: 'sichuan',
        贵州: 'guizhou',
        云南: 'yunnan',
        陕西: 'shanxi1',
        甘肃: 'gansu',
        青海: 'qinghai',
        新疆: 'xinjiang',
        广西: 'guangxi',
        内蒙古: 'neimenggu',
        宁夏: 'ningxia',
        西藏: 'xizang',
        北京: 'beijing',
        天津: 'tianjin',
        上海: 'shanghai',
        重庆: 'chongqing',
        香港: 'xianggang',
        澳门: 'aomen'
      },
      provinces2: {   //数据
        台湾:"台湾省",
        河北:"河北省",
        山西:"山西省",
        辽宁:"辽宁省",
        吉林:"吉林省",
        黑龙江:"黑龙省",
        江苏:"江苏省",
        浙江:"浙江省",
        安徽:"安徽省",
        福建:"福建省",
        江西:"江西省",
        山东:"山东省",
        河南:"河南省",
        湖北:"湖北省",
        湖南:"湖南省",
        广东:"广东省",
        海南:"海南省",
        四川:"四川省",
        贵州:"贵州省",
        云南:"云南省",
        陕西:"陕西省",
        甘肃:"甘肃省",
        青海:"青海省",
        新疆:"新疆自治区",
        广西:"广西自治区",
        内蒙古:"内蒙古自治区",
        宁夏:"宁夏自治区",
        西藏:"西藏自治区",
        北京:"北京市",
        天津:"天津市",
        上海:"上海市",
        重庆:"重庆市",
        香港:"香港特别行政区",
        澳门:"澳门特别行政区",
      },
      isReturnChina: false, //是否显示返回中国地图
      options:{

      },
      nowProvince:"",
      title:"",
    }
  },
  methods: {
    chinaMapHidden(chinaMap) {
      let that = this
      //这里解决多次触发点击事件 但是还会执行2次  引用echarts地图，点击各个省份时，点击一个调用两次接口，再点击一次，调用四次接口，再点击调用八次。。。。依次叠加，问题在于，没有将地图上的点击事件清空
      chinaMap.off('click')
      chinaMap.on('click', async function (params) {
        if (params.name in that.provinces) {
          let s = await import(`echarts/map/js/province/${that.provinces[params.name]}.js`);
          if (s) {
            await that.chinaMaprsult(params.name)
          }
        }
      })
    },

    async chinaMaprsult(name) {
      let _this = this;
      this.nowProvince = name
      this.isReturnChina = name !== 'china';
      // console.log(name)
      let chinaMap = this.$echarts.init(this.$refs.map_ref)
      const ret = await this.$http.get('../static/lib/' + this.provinces[name] + '.json')

      this.$echarts.registerMap(name, ret.data)
      this.options = {
        tooltip: { // 鼠标移到图里面的浮动提示框
          show: true,
          padding: 0,
          enterable: true,
          transitionDuration: 1,
          backgroundColor: "", // 背景
          textStyle: {
            color: "#000",
            decoration: "none"
          },
          trigger: 'item',  //数据项图形触发
          // triggerOn: 'click',
          formatter: function (params) {
            // console.log(params)
            let tipHtml =
                '<div style="width:180px;height:100px;background:rgba(22,80,158,0.8);border:1px solid rgba(7,166,255,0.7);padding:0 0 0 0">' +
                '<div style="width:100%;height:40px;line-height:40px;border-bottom:2px solid rgba(7,166,255,0.7);padding:0 10px">' +
                '<i style="display:inline-block;width:8px;height:8px;background:#16d6ff;border-radius:40px;">' +
                "</i>" +
                '<span style="margin-left:10px;color:#fff;font-size:16px;">' +
                params.name +
                "</span>" +
                "</div>" +
                '<div style="padding:1px">' +
                '<p style="color:#fff;font-size:12px;">' +
                '<i style="display:inline-block;width:10px;height:10px;background:#16d6ff;border-radius:40px;margin:0 4px">' +
                "</i>" +
                "确诊人数：" +
                '<span style="color:#11ee7d;margin:0 6px;">' +
                params.stuNum +
                "</span>" +
                "个" +
                "</p>" +
                "</div>" +
                "</div>";
            // console.log(tipHtml)
            return tipHtml;
          },
          // borderColor: 'rgba(255,255,255,0.2)',
          // textStyle: {
          //   color: '#fff',
          // },
          animation: true
        },
        geo: {
          zoom: this.isReturnChina?0.80:1,
          map: name ? name : "china", // 核心
          roam: false,
          label: { // 页面初始化加载的文字
            normal: {
              show: true,
              textStyle: {
                color: "#ccc", // 页面初始化的地图文字颜色
                fontSize: 10// // 页面初始化的地图文字大小
              },
            },
          },
          itemStyle: { //设置样式
            normal: {
              borderWidth: .5, //区域边框宽度
              borderColor: 'rgba(119, 156, 255, 1)',
              areaColor: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#073684' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#061E3D' // 100% 处的颜色
                }],
              },
            },
            emphasis: {
              borderWidth: .5, //区域边框宽度
              borderColor: 'rgb(241,158,63)',
              areaColor: {
                x: 0,
                y: 0,
                x2: 1,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#707bbb' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#707bbb' // 100% 处的颜色
                }],
              },

              //   show: true,
              //   textStyle: {}
              }
          },
        },
        series: [
          {
            type: "map",
            geoIndex: 0,
            itemStyle: {//地图区域的多边形 图形样式
              normal: {//是图形在默认状态下的样式
                label: {
                  show: true,//是否显示标签
                  textStyle: {
                    color: "black"
                  }
                }
              },

              zoom: 1.5,  //地图缩放比例,默认为1
              // emphasis: {//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
              //   label: {show: true}
              // }
            },
            label: {
              normal: {
                show: true, //显示省份标签
                textStyle: {color: "#4b4646"},//省份标签字体颜色
              },
              // emphasis: {
              //   show: true,
              //   textStyle: {}
              // }
            },
            data: [ // 地图数据
            ],
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              brushType: 'fill',
              scale: 0
            },
            showEffectOn: 'render',
            label: {
              lineHeight: 30,
              normal: {
                show: true,
                color: '#081727',
                position: 'inside',
                padding: [5, 0, 0, 0],
                verticalAlign: 'middle',
                formatter: function (para) {
                  return '{cnNum|' + para.data.value[2] + '}'
                  // return para.data.value[2]
                },
                rich: {
                  cnNum: {
                    fontSize: 16,
                    color: '#081727',
                    lineHeight: 28,
                  }
                }
              },
            },
            symbol: 'roundRect',
            // symbolRotate: 20,
            symbolSize: [40, 28],
            data: [],
            zlevel: 1,
          }
        ],
      }
      chinaMap.setOption(this.options)
      this.chinaMapHidden(chinaMap)
      // {
      //   let count = null;
      //   let zoom = function (per) {
      //     if (!count) count = per;
      //     count = count + per;
      //     // console.log(per,count);
      //     chinaMap.setOption({
      //       geo: {
      //         zoom: count
      //       }
      //     });
      //     if (count < 0.8) window.requestAnimationFrame(function () {
      //       zoom(0.1);
      //     });
      //   };
      //
      //   window.requestAnimationFrame(function () {
      //     zoom(0.1);
      //   });
      // }
    },
    returnChinaFn() {
      this.chinaMaprsult('china');
    },
    updateChart(name) {
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      console.log(this.nowProvince)
      if(this.nowProvince==='china'){
        this.$axios.post('http://114.115.211.47/getChinaEpidemicDataByDate',{"date":"2022-08-19"},config).then(res => {
          let msg = res.data.msg;
          for(let item of msg){
            this.allDeadList.push({
              name:item["provinceName"],
              value:item["death"]
            })
            this.allTodayCreadList.push({
              name:item["provinceName"],
              value:item["confirmIncrease"]
            })
            this.allNowDataList.push({
              name:item["provinceName"],
              value:item["nowConfirm"]
            })
            this.allDataList.push({
              name:item["provinceName"],
              value:item["confirm"]
            })
          }
        })
      }
      else {
        this.$axios.post('http://114.115.211.47/getProvinceEpidemicDataByNameAndDate',{"provinceName":this.nowProvince,"date":"2022-08-19"},config).then(res => {
          this.allDataList = res.data.msg;
          // console.log(this.allDataList)
          for(let item of this.allDataList){
            this.allDeadList.push({
              name:item["cityName"],
              value:item["death"]
            })
            this.allTodayCreadList.push({
              name:item["cityName"],
              value:item["confirmIncrease"]
            })
            this.allNowDataList.push({
              name:item["cityName"],
              value:item["nowConfirm"]
            })
            this.allDataList.push({
              name:item["cityName"],
              value:item["confirm"]
            })
          }
          // console.log(this.allDataList)
        })
      }
      if(name==="现存确诊"){
        return this.allNowDataList
      }else if(name==="累计确诊"){
        return this.allDataList
      }else if(name==="今日新增"){
        return this.allTodayCreadList
      }else if(name==="累计死亡"){
        return this.allDeadList
      }
      // console.log(dataList)
    }
  },

  mounted() {
    this.$nextTick(_ => {
      this.chinaMaprsult('china')
    })
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  }
}
</script>

<style scoped>

.com-container {
  position: relative;
  z-index: 1;
}

.button {
  /*position: absolute;*/
  left: 2%;
  top: 2%;
  width: 140px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border: 1px solid #efefef;
  border-radius: 6px;
  overflow: hidden;
}

span {
  flex: 1;
  padding: 0 5px;
  cursor: pointer;
}
</style>
