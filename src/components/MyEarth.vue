<template>
  <div class="all">
<!--    初始化地球-->
    <div id="globeViz" style="margin-left: -300px;margin-top:-70px;position: relative"></div>
  </div>
</template>

<script>
import * as d3 from "d3";
import Globe from "globe.gl";
import {WORLD_COUNTRIES} from '../assets/common/constant.js'
export default {
  name: "earth",

  data() {
    return {
      world:null,
      countries:[],
      featureCollection:[],
      colorScale:null,
      CN_COUNTRIES:{},
      countryName:'',
    }
  },

  methods: {
    // 初始化地球
    initE() {
      const globeContainer = document.getElementById('globeViz');
      this.colorScale = d3.scaleSequentialPow(d3.interpolateYlOrRd).exponent(1 / 4);
      // 获取严重程度
      const getVal = (feat) => {
        return feat.covidData.confirmed / feat.properties.POP_EST;
      };
      this.world = Globe()(globeContainer)
          .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
          // .backgroundImageUrl("../../public/static/img/bg.jpg")
          .backgroundColor('rgba(0,35,100,0.05)')
          .showGraticules(false)
          .polygonAltitude(0.06)
          .polygonCapColor((feat) => this.colorScale(getVal(feat)))
          .polygonSideColor(() => 'rgba(0, 100, 0, 0.05)')
          .polygonStrokeColor(() => '#111')
          .polygonLabel(({properties: d, covidData: c}) => {
            return `
        <div class="card">
          <div class="container">
             <span class="card-title"><b>${d.CNNAME}</b></span> <br />
             <div class="card-spacer"></div>
             <hr />
             <div class="card-spacer"></div>
             <span>确诊: ${c.confirmed}</span>  <br />
          </div>
        </div>
      `;
          })
          .onPolygonClick((polygon) =>{
            this.countryName = polygon.properties.CNNAME
            this.$parent.$parent.$parent.setData(this.countryName)
          })
          .onPolygonHover((hoverD) => {
            this.world
                .polygonAltitude((d) => (d === hoverD ? 0.12 : 0.06))
                .polygonCapColor((d) =>
                    d === hoverD ? 'steelblue' : this.colorScale(getVal(d))
                )
          })
          .polygonsTransitionDuration(200);
      // 翻译
      WORLD_COUNTRIES.forEach(element => {
        this.CN_COUNTRIES[element.name.toUpperCase()]=element.translation;
      });
    },
    // 获取数据
    async getCases() {
      await this.$axios.post('http://116.62.153.183/getTodayEpidemicPrData', "").then(res => {
        this.countries = res.data.msg
      })

      this.featureCollection = await this.$http.get('../static/lib/global.json').then(res=>{
        return res.data.features
      })

      this.featureCollection.forEach(element => {
        element.properties.CNNAME=this.toChina(element.properties.NAME);
      });
      this.updatePolygonsData();
      await this.updatePointOfView();
    },
    // 翻译
    toChina(name) {
      let uname=name.toUpperCase();
      if(this.CN_COUNTRIES.hasOwnProperty(uname)) {
        return this.CN_COUNTRIES[uname];
      }
      else{
        return name;
      }
    },

    // 地球旋转到当前位置
    async updatePointOfView() {
      try {
        const {latitude, longitude} = await this.getCoordinates();
        this.world.pointOfView(
            {
              lat: latitude,
              lng: longitude,
            },
            1000
        );
      } catch (e) {
        console.log('Unable to set point of view.');
      }
    },

    // 获取当前坐标
    async request(url) {
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (e) {
      throw e;
    }
  },
    async getCoordinates() {
      try {
        const {latitude, longitude} = await this.request(
            'https://geolocation-db.com/json/'
        );
        return {
          latitude,
          longitude,
        };
      } catch (e) {
        throw e;
      }
    },

    // 更新数据
    updatePolygonsData() {
      // 获取到的数据赋值给featureCollection
      for (let x = 0; x < this.featureCollection.length; x++) {
        const country = this.featureCollection[x].properties.CNNAME;
        let data = this.countries.filter((element)=>{
          return element.country===country
        })
        if (data.length===1) {
          this.featureCollection[x].covidData = {
            confirmed: data[0].confirmIncrease
          };
        } else {
          this.featureCollection[x].covidData = {
            confirmed: 0,
          };
        }
      }
      const getVal = (feat) => {
        return feat.covidData.confirmed / feat.properties.POP_EST;
      };
      const maxVal = Math.max(...this.featureCollection.map(getVal))
      // 设置覆盖物的样式
      this.colorScale.domain([0, maxVal]);
      this.world.polygonsData(this.featureCollection);
    },
  },

  mounted() {
    // 初始化地球
    this.initE()
    // 获取数据
    this.getCases()
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Space Mono', monospace;
  overflow: hidden;
  background: black;
}

.card {
  font-family: 'Space Mono', monospace;
  transition: 0.3s;
  background-color: black;
  width: 190px;
  border: 2px solid steelblue;
  border-radius: 10px;
  z-index: 2;
}

.container {
  padding-top: 1px;
  padding-bottom: 8px;
  padding-left: 12px;
  padding-right: 12px;
  text-align: left;
}

.card-title {
  font-weight: bold;
}

.card-spacer {
  height: 5px;
}
</style>
