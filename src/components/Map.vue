<template>
  <div class="com-container">
    <div class="com-chart" ref="map_ref"></div>
<!--     <div class="button">-->
<!--      <span-->
<!--        data-index="0"-->
<!--        :class="{ current: isActive == 0 }"-->
<!--        @click="handClick('现有确诊', allNowDataList, $event)"-->
<!--        >现有确诊</span-->
<!--      >-->
<!--      <span-->
<!--        data-index="1"-->
<!--        :class="{ current: isActive == 1 }"-->
<!--        @click="handClick('累计确诊', allDataList, $event)"-->
<!--        >累计确诊</span-->
<!--      >-->
<!--    </div>-->
  </div>
</template>

<script>
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
    }
  },
  methods: {
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref)
      const ret = await this.$http.get('../static/lib/china.json')
      this.$echarts.registerMap('china', ret.data)

      const initOption = {
        tooltip: {
          triggerOn: 'mousemove',
          backgroundColor: 'rgba(50,50,50,0.7)',
          formatter: function (e) {
            return e.seriesName + '<br />' + e.name + '：' + (e.value || 0)
          },
          borderColor: 'rgba(255,255,255,0.2)',
          textStyle: {
            color: '#fff',
          },
        },
        geo: {
          map: 'china',
          roam: !1,
          zoom: 1.2,
          label: {
            normal: {
              show: !0,
              color: 'rgba(0,0,0,0.7)',
            },
          },
          itemStyle: {
            normal: {
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            emphasis: {
              areaColor: '#f2d5ad',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0,
            },
          },
        },
      }
      this.chartInstance.setOption(initOption)
    },
    updateChart(type, data) {
      const updateOption = {
        series: [
          {
            name: type,
            data: data,
            type: 'map',
            geoIndex: 0,
          },
        ],
      }
      this.chartInstance.setOption(updateOption)
    },
    screenAdapter() {
      const size = (this.$refs.map_ref.offsetWidth / 100) * 3.6
      const adaptOption = {
        geo: {
          label: {
            normal: {
              fontSize: size / 3,
            },
          },
        },
        visualMap: {
          min: 0,
          max: 1000,
          itemGap: size / 4,
          itemWidth: size / 2,
          itemHeight: size / 2,
          left: '2%',
          bottom: '2%',
          showLabel: !0,
          text: ['高', '低'],
          textStyle: {
            fontSize: size / 2,
            color: '#98999A',
          },
          pieces: [
            {
              gt: 10000,
              label: '> 1000 人',
              color: '#de1f05',
            },
            {
              gte: 1000,
              lte: 9999,
              label: '1000 - 9999 人',
              color: '#ff2736',
            },
            {
              gte: 500,
              lte: 999,
              label: '500 - 999 人',
              color: '#ff6341',
            },
            {
              gte: 100,
              lte: 499,
              label: '100 - 499 人',
              color: '#ffa577',
            },
            {
              gte: 10,
              lte: 99,
              label: '10 - 99 人',
              color: '#ffcea0',
            },
            {
              gte: 1,
              lte: 9,
              label: '1 - 9 人',
              color: '#ffe7b2',
            },
            {
              value: 0,
              label: '0 人',
              color: '#e2ebf4',
            },
          ],
          show: !0,
        },
      }
      this.chartInstance.setOption(adaptOption)
      this.chartInstance.resize()
    },
    // handClick(type, d, e) {
    //   this.isActive = parseInt(e.currentTarget.dataset.index)
    //   this.updateChart(type, d)
    // },
    getData() {
      let obj = this.$store.state
      this.allDataList = obj.allDataList
      this.allDeadList = obj.allDeadList
      this.allNowDataList = obj.allNowDataList
      this.allTodayCreadList = obj.allTodayCreadList
      this.chinaTotal = obj.chinaTotal
      this.chinaAdd = obj.chinaAdd
    },
  },

  created() {
    this.getData()
    // console.log(this.allDataList)
  },
  mounted() {
    this.initChart()
    this.updateChart('现有确诊', this.allNowDataList)
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    window.removeEventListener('resize', this.screenAdapter)
  },
}
</script>

<style scoped>
.com-container {
  position: relative;
}

 .button {
  position: absolute;
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
.current {
  background-color: #ccdeff;
  border-color: #ccdeff;
  color: #222;
}
</style>
