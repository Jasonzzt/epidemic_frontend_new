<template>
  <div class="screen-page">
    <!--    返回-->
    <el-page-header @back="goBack" content=" "></el-page-header>
    <!--    选择模式-->
    <header>
      <h1 class="title" style="margin-top: -50px">新冠疫情数据可视化</h1>
      <div ref="a" class="header-box" style="width: 500px;position: relative;margin-right: -530px">
        <ul @click="handClick" class="left-ul">
          <li :class="{ active: isActive === 0 }" data-index="0">新增确诊</li>
          <li :class="{ active: isActive === 1 }" data-index="1">累计确诊</li>
          <li :class="{ active: isActive === 2 }" data-index="2">累计治愈</li>
          <li :class="{ active: isActive === 3 }" data-index="3">累计死亡</li>
        </ul>
      </div>
    </header>

    <div class="content">
      <!--      左边栏-->
      <aside class="flex-column">
        <!--      动态环图-->
        <div class="total bgc-size flex">
          <div class="total_tip p_tip"><p>地区：中国</p>
            <p>{{ data }}</p></div>
          <ring class="bar" ref="ring">123</ring>
        </div>
        <!--       实时新闻-->
        <div class="broadcast bgc-size">
          <p class="p_tip">实时播报</p>
          <div class="data">
            <p>状态：已更新</p>
            <p>{{ data }} - {{ time }}</p>
          </div>
          <div class="show_box h">
            <ul :class="[{ roll: show2 }, 'update-item-box']">
              <li class="update-item" v-for="(item, key) in news" :key="key">
                <a :href="item.eventUrl" target="_blank">
                  <p class="update-content">
                    <b class="t">{{ item.siteName }}</b>
                    <span class="c">{{ item.eventDescription }}</span>
                  </p>
                  <p class="last">
                    {{ getNewsTime(item.eventTime) }}分钟前更新
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
      <!-- 中间栏 -->
      <div class="middle-box flex-column">
        <!-- 地图 -->
        <div class="map bgc-size flex">
          <CenterTop class="centerTop" ref="centerTop"></CenterTop>
          <myMap ref="map" v-if="show3"></myMap>
        </div>
      </div>
    </div>
    <!-- 右边栏 -->
    <div class="right-asside flex-column">
      <div class="trend bgc-size">
        <p class="p_tip1">各省市{{ title }}情况</p>
        <!--          <div
                      :class="[fullScreenStatus.top ? 'show_box fullscreen' : 'show_box']">-->
        <vue-scroll :ops="ops" style="width:550px;height:550px">
          <provincebar class="bar" style="margin-left: -5px" ref="provincebar">123</provincebar>
        </vue-scroll>
      </div>

    </div>
  </div>
</template>

<script>
import myMap from '../components/Map'
import router from "@/router";
import ring from "../components/Ring"
import CenterTop from "../components/CenterTop";
import Provincebar from "../components/ProvinceBar";
export default {
  name: "screenpage",

  components: {
    Provincebar,
    myMap,
    ring,
    CenterTop,
  },

  data() {
    return {
      title: '新增确诊',
      fullScreenStatus: {
        map: false,
        month: false,
        top: false,
      },

      isActive: 0,
      show1: false,
      show2: false,
      show3: true,
      news: null,
      hot: null,
      data: '',
      time: '',

      confirmList: [],
      deadList: [],
      confirmIncreaseList: [],
      cureList: [],

      chinaTotal: null,
      chinaAdd: null,
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          background: '#b1bcff',
          opacity: 0,
          size: '10px',
          specifyBorderRadius: false,
          gutterOfEnds: null,    //轨道距 x 和 y 轴两端的距离
          gutterOfSide: '0',   //距离容器的距离
          keepShow: false,   //是否即使 bar 不存在的情况下也保持显示
          border: 'none',  //边框
          padding: true
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
          background: '#b1bcff',   //颜色
        }
      },
    }
  },

  methods: {
    // 获取日期
    getDate() {
      const now = new Date()
      let year = now.getFullYear(),
          month = now.getMonth() + 1,
          date = now.getDate()
      this.data = `${year}/${month}/${date}`
    },
    // 获取时间
    getTime() {
      const now = new Date()
      let hour = (now.getHours() + '').padStart(2, '0'),
          minute = (now.getMinutes() + '').padStart(2, '0'),
          second = (now.getSeconds() + '').padStart(2, '0')
      this.time = `${hour}:${minute}:${second}`
    },
    // 获取当前时间
    getNowTime() {
      setInterval(this.getTime, 1000)
    },
    //获取新闻时间
    getNewsTime(time) {
      const now = Math.floor(new Date() / 1000)
      let hour = Math.floor((now - parseInt(time)) / 60 / 60)
      hour = hour > 0 ? hour + '' : ''
      let minute = (
          Math.floor(((now - parseInt(time)) / 60) % 60) + ''
      ).padStart(2, '0')
      return hour ? `${hour}小时${minute}` : `${minute}`
    },
    // 改变关键帧
    changeKeyframe() {
      const styleObj = {
        'update-item-box': 'rolling',
        'hot-box': 'hotRolling',
        'science-box': 'scienceRolling',
      }
      const style = document.styleSheets[0]
      for (let [key, val] of Object.entries(styleObj)) {
        // console.log(style.cssRules)
        let n = style.cssRules.length
        try {
          const childNode = document.getElementsByClassName(key)[0],
              pNode = childNode.parentNode
          const ownheight = childNode.offsetHeight,
              parentNodeHeight = pNode.offsetHeight
          const styleText = `@keyframes ${val} {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateY(${-(ownheight - parentNodeHeight)}px);
                  }
                }`
          style.insertRule(styleText, n)
        } catch (error) {
        }
      }
    },
    // 重置关键帧
    resizeChangekeyFrame() {
      let timer = null
      return () => {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
          this.changeKeyframe()
        }, 1000)
      }
    },

    goBack() {
      router.push('/')
    },
    // 获取新闻
    async getChinaNews() {
      const url = 'https://opendata.baidu.com/data/inner'
      const prarms = {
        tn: 'reserved_all_res_tn',
        dspName: 'iphone',
        from_sf: 1,
        dsp: 'iphone',
        resource_id: 28565,
        alr: 1,
        query: '国内新型肺炎最新动态',
        callbackQuery: 'cb',
        callbackName: 'homenews',
      }
      let res = await this.$jsonp(url, prarms)
      let newsObj = res.Result[0].DisplayData.result.items.slice(0, 16)
      this.news = newsObj.map((item) => ({
        eventDescription: item.eventDescription,
        eventTime: item.eventTime,
        eventUrl: item.eventUrl,
        siteName: item.siteName,
      }))
      let hotObj = res.Result[0].DisplayData.result.items.slice(16)
      this.hot = hotObj.map((item) => ({
        eventDescription: item.eventDescription,
        eventTime: item.eventTime,
        eventUrl: item.eventUrl,
        siteName: item.siteName,
      }))
    },

    // 切换模式
    handClick(e) {
      this.isActive = parseInt(e.target.dataset.index)
      if (this.isActive === 0) {
        // this.$refs.map.setData('新增确诊', this.confirmIncreaseList)
        this.title = '新增确诊'
        this.$refs.ring.setData(this.confirmIncreaseList)
        this.$refs.provincebar.setData(this.confirmIncreaseList)
      } else if (this.isActive === 1) {
        // this.$refs.map.setData('累计确诊', this.confirmList)
        this.title = '累计确诊'
        this.$refs.ring.setData(this.confirmList)
        this.$refs.provincebar.setData(this.confirmList)
      } else if (this.isActive === 2) {
        // this.$refs.map.setData('累计治愈', this.cureList)
        this.title = '累计治愈'
        this.$refs.ring.setData(this.cureList)
        this.$refs.provincebar.setData(this.cureList)
      } else {
        // this.$refs.map.setData('累计死亡', this.deadList)
        this.title = '累计死亡'
        this.$refs.ring.setData(this.deadList)
        this.$refs.provincebar.setData(this.deadList)
      }
    },

    // 获取中国数据
    getChinaData() {
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.$axios.post('http://116.62.153.183/getChinaEpidemicDataByDate', {"date": "2022-08-30"}, config).then(res => {
        let msg = res.data.msg;
        let deadListNum = 0
        let confirmIncreaseNum = 0
        let cureListNum = 0
        let confirmListNum = 0
        for (let i = 0; i < 2; i++) {
          confirmIncreaseNum += msg[i].confirmIncrease
          confirmListNum += msg[i].confirm
          cureListNum += msg[i].cured
          deadListNum += msg[i].death
        }
        this.$store.commit('setBasicData', {
          'increase': confirmIncreaseNum,
          'confirm': confirmListNum,
          'cured': cureListNum,
          'dead': deadListNum
        })
        this.confirmList = []
        this.confirmIncreaseList = []
        this.deadList = []
        this.cureList = []
        for (let item of msg) {
          this.deadList.push({
            name: item["provinceName"],
            value: item["death"]
          })
          this.confirmIncreaseList.push({
            name: item["provinceName"],
            value: item["confirmIncrease"]
          })
          this.cureList.push({
            name: item["provinceName"],
            value: item["cured"]
          })
          this.confirmList.push({
            name: item["provinceName"],
            value: item["confirm"]
          })
        }
        this.$refs.ring.setData(this.confirmIncreaseList)
        this.$refs.provincebar.setData(this.confirmIncreaseList)
        this.$store.commit('setAllData', {
          'dead': this.deadList,
          'cread': this.cureList,
          'nowdata': this.confirmIncreaseList,
          'dataList': this.confirmList
        })
      })
    },

    // 获取省份数据
    getProvinceData(provinceName) {
      console.log(provinceName)
      let config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      this.$axios.post('http://116.62.153.183/getProvinceEpidemicDataByNameAndDate', {
        'provinceName': provinceName,
        "date": "2022-08-30"
      }, config).then(res => {
        let msg = res.data.msg;
        this.confirmList = []
        this.confirmIncreaseList = []
        this.deadList = []
        this.cureList = []
        for (let item of msg) {
          if (item['cityName'] === provinceName) continue
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

        // this.$refs.map.setData('新增确诊', this.confirmIncreaseList)
        this.$refs.ring.setData(this.confirmIncreaseList)
        this.$refs.provincebar.setData(this.confirmIncreaseList)
        this.$store.commit('setAllData', {
          'dead': this.deadList,
          'cread': this.cureList,
          'nowdata': this.confirmIncreaseList,
          'dataList': this.confirmList
        })
      })

    },

    // 获取数据
    getData(areaName) {
      if (areaName == 'china') {
        this.getChinaData()
      } else {
        this.getProvinceData(areaName)
      }
    }
  },

  watch: {
    // 监控新闻
    news() {
      this.$nextTick(() => {
        this.show2 = true
        this.changeKeyframe()
      })
    },
    // 监控模式
    isActive(newVal) {
      this.$refs.map.setData(newVal)
    }
  },

  created() {
    this.getChinaNews()
    this.getDate()
    this.getNowTime()
  },

  mounted() {
    this.getChinaData()
    window.addEventListener('resize', this.resizeChangekeyFrame())
  },
}
</script>

<style lang="less">

.centerTop {
  margin-top: -27px;
}

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

.p_tip {
  margin-bottom: -15px;
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.p_tip1 {
  position: relative;
  margin-top: 23px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.show_box {
  position: relative;
  border-radius: 0 0 10px 10px;
  overflow: auto;
  height: 85%;
  width: 100%;
}

.show_box::-webkit-scrollbar {
  width: 0 !important;
}

.bgc-size {
  width: 99%;
  padding: 5px 5%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: top center;
  overflow: hidden;
}

.screen-page {
  width: 99.9%;
  height: 99.9%;
  background-image: url(../../public/static/img/bg.jpg);
  background-size: 100% 100%;
}

.roll {
  animation: rolling 40s infinite 0s linear alternate;
  -webkit-animation: rolling 40s infinite 0s linear alternate;
}

.roll:hover {
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}

.hotBoxRoll {
  animation: hotRolling 60s infinite 0s linear alternate;
  -webkit-animation: hotRolling 60s infinite 0s linear alternate;
}

.hotBoxRoll:hover {
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}

.scienceBoxRoll {
  animation: scienceRolling 50s infinite 0s linear alternate;
  -webkit-animation: scienceRolling 50s infinite 0s linear alternate;
}

.scienceBoxRoll:hover {
  animation-play-state: paused;
  -webkit-animation-play-state: paused;
}

// Start 标题栏
header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 9%;
}

.title {
  width: 33.33%;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  letter-spacing: 8px;
  white-space: nowrap;
  overflow: hidden;
}

.header-box {
  width: 33.33%;
  padding-top: 20px;
  font-weight: 700;

  ul {
    display: flex;
    align-items: center;

    li,
    a {
      width: 18%;
      height: 33px;
      margin-left: 1%;
      font-size: 12px;
      line-height: 33px;
      text-align: center;
      background: url(../../public/static/img/bnt.png) no-repeat center;
      background-size: 100% 100%;
      overflow: hidden;
      cursor: pointer;
    }
  }

  .left-ul {
    padding-left: 10%;
    position: relative;
    margin-top: -30px;
  }

  .right-ul {
    justify-content: flex-end;
    padding-right: 10%;
  }
}

.active {
  background: url(../../public/static/img/bntactive.png) no-repeat center !important;
}

// End 标题栏
// Start 内容框
.content {
  display: flex;
  flex: 1;
  height: 87%;
  padding: 0 2%;
}

// Start 侧边栏
aside {
  width: 25%;
  // flex: 1;
  text-align: center;
}

.total {
  cursor: default;
  background-image: url(../../public/static/img/aleftboxtmidd.png);

  .total_tip {
    margin-top: 4px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .total_box {
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    white-space: nowrap;

    .total_item {
      width: 25%;
      margin: 0 1%;
      background-color: rgba(1, 202, 217, 0.2);
      font-size: 10px;
      font-weight: 700;
    }

    h3 {
      margin: 20% 0;
      font-size: 16px;
    }

    .total_bottom {
      margin-top: 10px;

      img {
        // vertical-align: middle;
        height: 12px;
        margin-right: 5px;
      }
    }
  }
}

.hot-news {
  margin: 5px 0;
  cursor: pointer;
  background-image: url(../../public/static/img/aleftboxtmidd.png);
}

.hot-item {
  position: relative;
  padding: 8px 15px 8px 25px;
  font-size: 12px;
  font-weight: 500;
  text-align: left;
  line-height: 16px;
  background-color: rgba(0, 255, 255, 0.4);

  .hot-item-title {
    letter-spacing: 1px;
    line-height: 20px;
  }

  .hot-item-title::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 11px;
    width: 13px;
    height: 13px;
    border-radius: 2px;
    background: #fff url(../../public/static/img/hot.png) no-repeat;
    background-size: contain;
  }

  .pub {
    margin-top: 3px;
    // font-size: 16px;
    font-weight: 600;
    text-align: right;
  }
}

.hot-item:nth-child(even) {
  background: rgba(0, 255, 255, 0.2);
}

.science {
  cursor: default;
  background-image: url(../../public/static/img/aleftboxtmidd.png);
}

.scitence-item {
  padding: 10px 10%;
  color: rgba(255, 255, 255, 1);
  font-size: 12px;
  font-weight: normal;
  text-align: left;
  background: rgba(1, 202, 217, 0.2) url(../../public/static/img/icosjx.png) no-repeat top left;
}

.middle-box {
  // flex: 2;
  width: 50%;
}

.map {
  background-image: url(../../public/static/img/amiddboxttop.png);
}

.expand,
.compress {
  position: absolute;
  width: 20px;
  height: 20px;
  background-image: url(../../public/static/img/expand.png);
  background-size: 100%;
  right: 0;
  top: 0;
  cursor: pointer;
}

.compress {
  background-image: url(../../public/static/img/compress.png);
}

.compare {
  margin-top: 5px;
  background-image: url(../../public/static/img/amiddboxttop.png);
}

.p {
  margin-top: 15px;
}

.h {
  height: 90%;
}

.right-asside {
  position: relative;
  height: 640px;
  width: 25%;
  // flex: 1;
  float: right;
  top: -635px;
  left: -23px;
}

.broadcast {
  flex: 1;
  background-image: url(../../public/static/img/arightboxtop.png);
  cursor: pointer;

  .data {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4px;
    padding-right: 5px;
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;

    p:last-child {
      display: inline-block;
      width: 120px;
      color: rgba(255, 255, 255, 0.6);
    }
  }

  .h {
    height: 87%;
  }

  .update-item {
    position: relative;
    padding: 5px 8%;
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: normal;
    background: rgba(0, 255, 255, 0.4) url(../../public/static/img/icosjx.png) no-repeat top left;

    .update-content {
      display: flex;
      flex-direction: column;

      .t {
        color: rgba(255, 255, 255, 1);
      }

      .c {
        margin-top: 5px;
        letter-spacing: 1px;
        line-height: 16px;
      }
    }

    .last {
      position: absolute;
      right: 10px;
      top: 5px;
    }
  }

  .update-item:nth-child(even) {
    background-color: rgba(1, 202, 217, 0.2);
  }
}

.trend {
  flex: 1;
  background-image: url(../../public/static/img/aleftboxtmidd.png);
  margin-top: 0px;
}

.fullscreen {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
  z-index: 1000;
  background-color: rgba(16, 24, 129, 0.8);
}

.bar {
  margin-left: -20px;
}
</style>
