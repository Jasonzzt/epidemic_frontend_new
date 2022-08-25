<template>
  <div class="screen-page">

    <header>
      <!-- 全国疫情地图页面的数据显示标题栏 -->
<!--      <div ref="a" class="header-box">
        <ul @click="handClick" class="left-ul">
          <li :class="{ active: isActive === 0 }" data-index="0">现存确诊</li>
          <li :class="{ active: isActive === 1 }" data-index="1">累计确诊</li>
          <li :class="{ active: isActive === 2 }" data-index="2">今日新增</li>
          <li :class="{ active: isActive === 3 }" data-index="3">累计死亡</li>
        </ul>
      </div>-->
      <h1 class="title">新冠疫情数据可视化</h1>
      <!--切换四个页面的标题栏-->
<!--      <div ref="a" class="header-box">
        <ul @click="clickIndex" class="right-ul">
          &lt;!&ndash; 疫情地图页面&ndash;&gt;
          <a
              @click="pushto1"
              :class="{ active: isActive === 4 }"
              data-index="4"
          >
            疫情预测
          </a>
          &lt;!&ndash; 人口流动页面 &ndash;&gt;
          &lt;!&ndash; PopulationPage&ndash;&gt;
          <a
              @click="pushto2"
              :class="{ active: isActive === 5 }"
              data-index="5"
          >人口流动</a
          >
          &lt;!&ndash; 防疫政策页面 &ndash;&gt;
          &lt;!&ndash; PolicyPage&ndash;&gt;
          <a
              @click="pushto3"
              :class="{ active: isActive === 6 }"
              data-index="6"
          >防疫政策</a>
          &lt;!&ndash; 核酸检测页面 &ndash;&gt;
          &lt;!&ndash; CovidDetectionPage &ndash;&gt;
          <a
              @click="pushto4"
              :class="{ active: isActive === 7 }"
              data-index="7"
          >核酸检测</a>

        </ul>
      </div>-->
    </header>


    <div class="content">
      <aside class="flex-column">
        <!-- 确诊人数 -->
        <div class="total bgc-size flex">
          <div class="total_tip p_tip">
            <p>地区：中国</p>
            <p>{{ data }}</p>
          </div>

          <bar class="bar"></bar>
          <column></column>
<!--          <div class="show_box total_box">
            &lt;!&ndash; 累计确诊数据 chinaTotal.confirm&ndash;&gt;
            <div v-if=show1 class="flex-column total_item">
              <p>累计确诊</p>
              <h3>{{ this.chinaTotal.confirm }}</h3>
              &lt;!&ndash; 与昨日相比情况（无变化/新增/减少） &ndash;&gt;
              <h4>较昨日</h4>
              <p class="total_bottom">
                <img
                    v-if="parseInt(this.chinaAdd.confirm) === 0"
                    src=""
                    alt=""
                />
                <img
                    v-else-if="parseInt(this.chinaAdd.confirm) > 0"
                    src="../../public/static/img/iconup.png"
                    alt=""
                />
                <img v-else src="../../public/static/img/icondown.png" alt="" />
                <span>{{ this.chinaAdd.confirm }}</span>
              </p>
            </div>
            &lt;!&ndash; 现存确诊数据 chinaTotal.nowConfirm&ndash;&gt;
            <div v-if="show1" class="flex-column total_item">
              <p>现存确诊</p>
              <h3>{{ this.chinaTotal.nowConfirm }}</h3>
              <h4>较昨日</h4>
              <p class="total_bottom">
                <img
                    v-if="parseInt(this.chinaAdd.nowConfirm) === 0"
                    src=""
                    alt=""
                />
                <img
                    v-else-if="parseInt(this.chinaAdd.nowConfirm) > 0"
                    src="../../public/static/img/iconup.png"
                    alt=""
                />
                <img v-else src="../../public/static/img/icondown.png" alt="" />
                <span>{{ this.chinaAdd.nowConfirm }}</span>
              </p>
            </div>
            &lt;!&ndash; 现存确诊数据 chinaTotal.nowConfirm&ndash;&gt;
            <div v-if="show1" class="flex-column total_item">
              <p>境外输入</p>
              <h3>{{ this.chinaTotal.importedCase }}</h3>
              <h4>较昨日</h4>
              <p class="total_bottom">
                <img
                    v-if="parseInt(this.chinaAdd.importedCase) === 0"
                    src=""
                    alt=""
                />
                <img
                    v-else-if="parseInt(this.chinaAdd.importedCase) > 0"
                    src="../../public/static/img/iconup.png"
                    alt=""
                />
                <img v-else src="../../public/static/img/icondown.png" alt="" />
                <span>{{ this.chinaAdd.importedCase }}</span>
              </p>
            </div>
            <div v-if="show1" class="flex-column total_item">
              <p>累计死亡</p>
              <h3>{{ this.chinaTotal.dead }}</h3>
              <h4>较昨日</h4>
              <p class="total_bottom">
                <img v-if="parseInt(this.chinaAdd.dead) === 0" src="" alt="" />
                <img
                    v-else-if="parseInt(this.chinaAdd.dead) > 0"
                    src="../../public/static/img/iconup.png"
                    alt=""
                />
                <img v-else src="../../public/static/img/icondown.png" alt="" />
                <span>{{ this.chinaAdd.dead }}</span>
              </p>
            </div>
          </div>-->
        </div>

      </aside>
      <!-- 中间栏 -->
      <div class="middle-box flex-column">
        <!-- 地图 -->
        <div class="map bgc-size flex">
          <p class="p p_tip">地图可视化</p>
<!--          <div
              :class="[
              fullScreenStatus.map ? 'show_box h fullscreen' : 'show_box h',
            ]"
          >-->
            <myMap ref="map" v-if="show3"></myMap>
<!--            <div
                @click="changeSize('map')"
                :class="[fullScreenStatus.map ? 'compress' : 'expand']"
            ></div>-->
          </div>
        </div>
      </div>
      <!-- 右边栏 -->
      <div class="right-asside flex-column">

        <!-- 疫情趋势变化 -->
        <div class="trend bgc-size">
          <p class="p_tip1">各省市确诊情况</p>
        </div>
<!--          <div
              :class="[fullScreenStatus.top ? 'show_box fullscreen' : 'show_box']"
          >-->
            <countrytop ref="top" v-if="show1"></countrytop>
<!--            <div
                @click="changeSize('top')"
                :class="[fullScreenStatus.top ? 'compress' : 'expand']"
            ></div>-->


      </div>
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

.p_tip {
  margin-bottom: -15px;
  font-size: 20px;
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
  width: 100%;
  height: 100%;
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
    margin-top: 20px;
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
  margin-top:15px;
}

.h {
  height: 90%;
}

.right-asside {
  position: relative;
  height:640px;
  width: 25%;
  // flex: 1;
  float: right;
  top:-635px;
  left: -23px;
}

.broadcast {
  flex: 2;
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
  margin-top: 5px;
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
.bar{
  margin-left: -20px;
}
</style>

<script>
import myMap from '../components/Map'
import router from "@/router";
import bar from "../components/bar";
import column from "../components/column";
export default {
  components: {
    myMap,
    bar,
    column,
  },
  data() {
    return {
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
      allDataList: null,
      allDeadList: null,
      allNowDataList: null,
      allTodayCreadList: null,
      chinaTotal: null,
      chinaAdd: null,
    }
  },
  methods: {
    getDate() {
      const now = new Date()
      let year = now.getFullYear(),
          month = now.getMonth() + 1,
          date = now.getDate()
      this.data = `${year}/${month}/${date}`
    },
    getTime() {
      const now = new Date()
      let hour = (now.getHours() + '').padStart(2, '0'),
          minute = (now.getMinutes() + '').padStart(2, '0'),
          second = (now.getSeconds() + '').padStart(2, '0')
      this.time = `${hour}:${minute}:${second}`
    },
    getNowTime() {
      setInterval(this.getTime, 1000)
    },
    getNewsTime(time) {
      const now = Math.floor(new Date() / 1000)
      let hour = Math.floor((now - parseInt(time)) / 60 / 60)
      hour = hour > 0 ? hour + '' : ''
      let minute = (
          Math.floor(((now - parseInt(time)) / 60) % 60) + ''
      ).padStart(2, '0')
      return hour ? `${hour}小时${minute}` : `${minute}`
    },
    changeKeyframe() {
      const styleObj = {
        'update-item-box': 'rolling',
        'hot-box': 'hotRolling',
        'science-box': 'scienceRolling',
      }
      const style = document.styleSheets[0]
      for (let [key, val] of Object.entries(styleObj)) {
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

    resizeChangekeyFrame() {
      let timer = null
      return () => {
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
          this.changeKeyframe()
        }, 1000)
      }
    },

    pushto1() {
      router.push('/prediction')
    },
    pushto2() {
      router.push('/population')
    },
    pushto3() {
      router.push('/policy')
    },
    pushto4() {
      router.push('/coviddetect')
    },

    async getCountryData() {
      const url = 'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5',
          params = {name: 'disease_h5'}
      // const res = await this.$jsonp(url, params)
      const res = await this.$http.get(url)
      const obj = JSON.parse(res.data)

      this.allDataList = obj.areaTree[0].children.map((item) => ({
        name: item.name,
        value: item.total.confirm,
      }))
      this.allNowDataList = obj.areaTree[0].children.map((item) => ({
        name: item.name,
        value: item.total.nowConfirm,
      }))
      this.allDeadList = obj.areaTree[0].children.map((item) => ({
        name: item.name,
        value: item.total.dead,
      }))
      this.allTodayCreadList = obj.areaTree[0].children.map((item) => ({
        name: item.name,
        value: item.today.confirm,
      }))
      this.chinaTotal = {
        confirm: obj.chinaTotal.confirm,
        nowConfirm: obj.chinaTotal.nowConfirm,
        importedCase: obj.chinaTotal.importedCase,
        dead: obj.chinaTotal.dead,
      }
      this.chinaAdd = {
        confirm:
            obj.chinaAdd.confirm > 0
                ? '+' + obj.chinaAdd.confirm
                : obj.chinaAdd.confirm,
        nowConfirm:
            obj.chinaAdd.nowConfirm > 0
                ? '+' + obj.chinaAdd.nowConfirm
                : obj.chinaAdd.nowConfirm,
        importedCase:
            obj.chinaAdd.importedCase > 0
                ? '+' + obj.chinaAdd.importedCase
                : obj.chinaAdd.importedCase,
        dead:
            obj.chinaAdd.dead > 0 ? '+' + obj.chinaAdd.dead : obj.chinaAdd.dead,
      }
      // this.updateChart('现有确诊', this.allNowDataList)
      this.pushData()
    },
    pushData() {
      const val = {
        allDataList: this.allDataList,
        allDeadList: this.allDeadList,
        allNowDataList: this.allNowDataList,
        allTodayCreadList: this.allTodayCreadList,
        chinaTotal: this.chinaTotal,
        chinaAdd: this.chinaAdd,
      }
      this.$store.commit('initData', val)
      this.show1 = true
    },
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
    clickIndex(e) {
      this.isActive = parseInt(e.target.dataset.index)
    },
    handClick(e) {
      this.isActive = parseInt(e.target.dataset.index)
      if (this.isActive === 0) {
        this.$refs.map.updateChart(e.target.innerText, this.allNowDataList)
      } else if (this.isActive === 1) {
        this.$refs.map.updateChart(e.target.innerText, this.allDataList)
      } else if (this.isActive === 2) {
        this.$refs.map.updateChart(e.target.innerText, this.allTodayCreadList)
      } else {
        this.$refs.map.updateChart(e.target.innerText, this.allDeadList)
      }
    },
    changeSize(type) {
      this.fullScreenStatus[type] = !this.fullScreenStatus[type]
      this.$nextTick(() => {
        this.$refs[type].screenAdapter()
      })
    },
    changeSize1(type) {
      this.fullScreenStatus[type] = !this.fullScreenStatus[type]
      this.$nextTick(() => {
        this.$refs[type].screenAdapter()
      })
    },
  },
  watch: {
    news() {
      this.$nextTick(() => {
        this.show2 = true
        this.changeKeyframe()
      })
    },
  },
  created() {
    this.getChinaNews()
    this.getCountryData()
    this.getDate()
    this.getNowTime()
  },

  mounted() {
    window.addEventListener('resize', this.resizeChangekeyFrame())
  },
}
</script>
