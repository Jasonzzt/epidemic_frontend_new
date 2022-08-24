<template>
  <div class="com-container">
    <!-- 返回中国地图 -->
    <div class="button" v-show="isReturnChina" @click="returnChinaFn" style="float:top;margin-top: 0px">返回中国地图</div>
    <div class="com-chart" ref="map_ref" style="float:top;margin-top: -5px"></div>
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

      allDataList: null,
      allDeadList: null,
      allNowDataList: null,
      allTodayCreadList: null,

      chinaTotal: null,
      chinaAdd: null,
      mapData: [ //自己做的模拟数据 后续根据业务展示
        {name: '湖北', value: 88},
        {name: '广东', value: 24},
        {name: '上海', value: 5},
        {name: '山东', value: 15},
        {name: '湖南', value: 14},
        {name: '重庆', value: 0},
        {name: '四川', value: 65},
        {name: '新疆', value: 36},
        {name: '黑龙江', value: 12},
        {name: '西藏', value: 68},
        {name: '青海', value: 31},
        {name: '内蒙古', value: 28},
        {name: '陕西', value: 12},
        {name: '辽宁', value: 88},
        {name: '云南', value: 23},
      ],

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
      isReturnChina: false, //是否显示返回中国地图
      options: null,   //echarts 存数据
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
      this.isReturnChina = name !== 'china';
      console.log(name)
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
          animation: false
        },
        geo: {
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
            emphasis: { // 移入背景颜色
              // areaColor: '#ff00ff',
              areaColor: '#F9D92E',
              show: true,
              textStyle: {
                color: '#000',
                fontSize: "12px"
              }
            },
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
              emphasis: {//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                label: {show: true}
              }
            },
            label: {
              normal: {
                show: true, //显示省份标签
                textStyle: {color: "#696969"},//省份标签字体颜色
              },
              emphasis: {
                show: true,
                textStyle: {}
              }
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
    },
    returnChinaFn() {
      this.chinaMaprsult('china');
    },
  },

  created() {
    // this.getData()
    // console.log(this.allDataList)
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
