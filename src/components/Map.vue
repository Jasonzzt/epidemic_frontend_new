<template>
  <div class="com-container">
<!-- 返回中国地图 -->
    <div class="button" v-show="isReturnChina" @click="returnChinaFn" style="float:top;margin-top: 70px;cursor: pointer">返回中国地图</div>
<!--  地图组件 -->
    <div class="com-chart" ref="map_ref" style="float:top;margin-top: -10px;"></div>
  </div>
</template>

<script>
import 'echarts/map/js/china.js' // 核心文件
require('echarts/theme/macarons')
import {provinces, provinces2, provinces3} from '../assets/common/constant'
export default {
  name: 'myMap',

  data() {
    return {
      chinaMap:null,
      isReturnChina: false, //是否显示返回中国地图
      options:{},
      nowProvince:"china",
      styleStr:"新增确诊",

      confirmList: [],
      deadList: [],
      confirmIncreaseList: [],
      cureList: [],
    }
  },

  watch:{
      //监控nowProvinceData,调用父组件方法，更改为相应省份或国家数据
      nowProvince(newVal) {
        this.$parent.getData(provinces2[newVal])
      }
  },

  methods: {
    // 添加点击事件，地图下钻到相应的省份地图
    toProvince() {
      let that = this
      that.chinaMap.off('click')
      that.chinaMap.on('click', async function (params) {
        console.log(provinces)
        if (params.name in provinces) {
          let s = await import('echarts/map/js/province/'+provinces[params.name]+'.js');
          if (s) {
            await that.chinaMaprsult(params.name)
          }
        }
      })
    },

    // 更改地图显示的数据
    setData(style){
      let dataList =[]
      let styleStr
      switch (style) {
        case 0:dataList = this.confirmIncreaseList; styleStr='新增确诊';break;
        case 1:dataList = this.confirmList;styleStr='累计确诊';break;
        case 2:dataList = this.cureList;styleStr='累计治愈';break;
        case 3:dataList = this.deadList;styleStr='累计死亡';break;
      }
      this.styleStr = styleStr
      this.options = {
        geo: {
          zoom: this.isReturnChina ? 0.80 : 1,
          map: this.nowProvince ? this.nowProvince : "china",
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
            roam: true,
            data: dataList, // 地图显示的数据
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
                },
                rich: {
                  cnNum: {
                    fontSize: 16,
                    color: '#081727',
                    lineHeight: 28,
                  }
                }
              },
              data: [],
            },
            symbol: 'roundRect',
            symbolSize: [40, 28],
            data: [],
            zlevel: 1,
          }
        ],
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
          formatter(params) {
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
                styleStr +
                '<span style="color:#11ee7d;margin:0 6px;">' +
                params.value +
                "</span>" +
                "个" +
                "</p>" +
                "</div>" +
                "</div>";
            return tipHtml;
          },
          animation: true
        },
      }
      this.chinaMap.setOption(this.options)
    },

    // 初始化注册地图
    async chinaMaprsult(name) {
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      if (name === 'china') {
        // 获取数据
        this.$axios.post('http://116.62.153.183/getChinaEpidemicDataByDate', {"date": "2022-08-30"}, config).then(async res => {
          let msg = res.data.msg
          this.confirmList = []
          this.confirmIncreaseList = []
          this.deadList = []
          this.cureList = []
          for (let item of msg) {
            this.deadList.push({
              name: provinces3[item["provinceName"]],
              value: item["death"]
            })
            this.confirmIncreaseList.push({
              name: provinces3[item["provinceName"]],
              value: item["confirmIncrease"]
            })
            this.cureList.push({
              name: provinces3[item["provinceName"]],
              value: item["cured"]
            })
            this.confirmList.push({
              name: provinces3[item["provinceName"]],
              value: item["confirm"]
            })
          }

          let dataList=[]
          switch (this.styleStr){
            case '新增确诊':dataList = this.confirmIncreaseList; break;
            case '累计确诊':dataList = this.confirmList;break;
            case '累计治愈':dataList = this.cureList;break;
            case '累计死亡':dataList = this.deadList;break;
          }
          // 注册地图
          this.nowProvince = name
          this.isReturnChina = name !== 'china';
          this.chinaMap = this.$echarts.init(this.$refs.map_ref)
          const ret = await this.$http.get('../static/lib/' + provinces[name] + '.json')
          this.$echarts.registerMap(name, ret.data)
          let sty = this.styleStr
          // 重置数据
          this.options = {
            geo: {
              zoom: this.isReturnChina ? 0.80 : 1,
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
                roam: true,
                data: dataList,
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
                  data: [],
                },
                symbol: 'roundRect',
                // symbolRotate: 20,
                symbolSize: [40, 28],
                data: [],
                zlevel: 1,
              }
            ],
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
              formatter(params) {
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
                     sty +
                    '<span style="color:#11ee7d;margin:0 6px;">' +
                    params.value +
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
          }
          this.chinaMap.setOption(this.options)
          this.toProvince()
        })
      }
      // 省份数据
      else{
        this.$axios.post('http://116.62.153.183/getProvinceEpidemicDataByNameAndDate', {"provinceName":provinces2[name],"date": "2022-08-30"}, config).then(async res => {
          let msg = res.data.msg
          this.confirmList = []
          this.confirmIncreaseList = []
          this.deadList = []
          this.cureList = []
          for (let item of msg) {
            this.deadList.push({
              name: item["cityName"],
              value: item["death"]
            })
            this.confirmIncreaseList.push({
              name: item["cityName"],
              value: item["confirmIncrease"]
            })
            this.cureList.push({
              name: item["cityName"],
              value: item["cured"]
            })
            this.confirmList.push({
              name: item["cityName"],
              value: item["confirm"]
            })
          }
          let dataList=[]
          switch (this.styleStr){
            case '新增确诊':dataList = this.confirmIncreaseList; break;
            case '累计确诊':dataList = this.confirmList;break;
            case '累计治愈':dataList = this.cureList;break;
            case '累计死亡':dataList = this.deadList;break;
          }
          let sty = this.styleStr

          this.nowProvince = name
          this.isReturnChina = name !== 'china';
          this.chinaMap = this.$echarts.init(this.$refs.map_ref)
          const ret = await this.$http.get('../static/lib/' + provinces[name] + '.json')
          this.$echarts.registerMap(name, ret.data)
          this.options = {
            geo: {
              zoom: this.isReturnChina ? 0.80 : 1,
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
                },
                label: {
                  normal: {
                    show: true, //显示省份标签
                    textStyle: {color: "#4b4646"},//省份标签字体颜色
                  },
                },
                roam: true,
                data: dataList,
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
                    },
                    rich: {
                      cnNum: {
                        fontSize: 16,
                        color: '#081727',
                        lineHeight: 28,
                      }
                    }
                  },
                  data: [],
                },
                symbol: 'roundRect',
                symbolSize: [40, 28],
                data: [],
                zlevel: 1,
              }
            ],
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
              formatter(params) {
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
                    sty +
                    '<span style="color:#11ee7d;margin:0 6px;">' +
                    params.value +
                    "</span>" +
                    "个" +
                    "</p>" +
                    "</div>" +
                    "</div>";
                // console.log(tipHtml)
                return tipHtml;
              },
              animation: true
            },
          }
          this.chinaMap.setOption(this.options)
          this.toProvince()
        })
      }
    },

    // 返回到全国地图
    returnChinaFn() {
      this.chinaMaprsult('china');
    },
  },

  mounted() {
    // 初始化为中国地图
    this.$nextTick(_ => {
      this.chinaMaprsult('china')
    })
  },
}
</script>

<style scoped>
.com-container {
  position: relative;
  z-index: 1;
}

.button {
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
