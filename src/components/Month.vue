<template>
  <div class="com-container">
    <div ref="month_ref" class="com-chart"></div>
  </div>
</template>

<style lang="less">
</style>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      dateArr: [],
      valueArr: [],
      startValue: 0,
      endValue: 9,
      setTimeId: null,
    }
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.month_ref)
      const initOption = {
        xAxis: {
          type: 'category',
          axisLabel: {
            color: '#fff',
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
          },
        },
        yAxis: {
          type: 'value',
          scale: true,
          axisLabel: {
            show: true,
            color: '#fff',
          },
          splitLine: {
            show: false,
          },
        },
        tooltip: {
          show: true,
        },
        grid: {
          top: '10%',
          left: '1%',
          right: '1%',
          bottom: '5%',
          containLabel: true,
        },
        series: [
          {
            type: 'bar',
            label: {
              show: true,
              position: 'top',
              color: 'white',
              rotate: 30,
            },
          },
        ],
      }
      this.chartInstance.setOption(initOption)
      this.chartInstance.on('mouseover', () => {
        clearInterval(this.setTimeId)
      })

      this.chartInstance.on('mouseout', () => {
        this.startInterval()
      })
    },
    async getData() {
      const api =
        'https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=chinaDayList,chinaDayAddList,nowConfirmStatis,provinceCompare'
      const monthObj = await this.$http.post(api)
      const totalObj = monthObj.data.data.chinaDayList
      this.allData = totalObj.map((item) => {
        this.dateArr.push(item.date)
        this.valueArr.push(item.nowConfirm)
        return {
          name: item.date,
          value: item.nowConfirm,
        }
      })
      this.updateChart()
      this.startInterval()
    },
    updateChart() {
      const color = [
        ['#5052ee', '#ab6ee5'],
        ['#2e72bf', '#23e5e5'],
        ['#0ba82c', '#4ff778'],
      ]
      const dataOption = {
        xAxis: {
          data: this.dateArr,
        },
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue,
        },

        series: [
          {
            data: this.valueArr,
            itemStyle: {
              color: (arg) => {
                let targetColor = null
                if (arg.value > 600) {
                  targetColor = color[0]
                } else if (arg.value > 500) {
                  targetColor = color[1]
                } else {
                  targetColor = color[2]
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColor[0],
                  },
                  {
                    offset: 1,
                    color: targetColor[1],
                  },
                ])
              },
            },
          },
        ],
      }
      this.chartInstance.setOption(dataOption)
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.month_ref.offsetWidth / 100) * 3.6
      const adapterOption = {
        series: [
          {
            type: 'bar',
            barWidth: titleFontSize,
            itemStyle: {
              barBorderRadius: [titleFontSize / 2, titleFontSize / 2, 0, 0],
            },
          },
        ],
      }
      this.chartInstance.setOption(adapterOption)
      this.chartInstance.resize()
    },
    startInterval() {
      this.setTimeId && clearInterval(this.setTimeId)
      this.setTimeId = setInterval(() => {
        this.startValue++
        this.endValue++
        this.updateChart()
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0
          this.endValue = 9
        }
      }, 2000)
    },
  },
  created() {
    this.getData()
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed() {
    clearInterval(this.setTimeId)
    window.removeEventListener('resize', this.screenAdapter)
  },
}
</script>

<style scoped>
/* @import url();*/
</style>