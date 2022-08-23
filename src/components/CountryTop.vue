<template>
  <div class="com-container">
    <div ref="top_ref" class="com-chart"></div>
  </div>
</template>
<style lang="less">
</style>
<script>
export default {
  data() {
    return {
      chartInstance: null,
      allDate: this.$store.state.allNowDataList.filter(
        (item) => item.value > 0
      ),
      currentIndex: 0,
      timerId: null,
    };
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.top_ref);
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    updateChart() {
      const centerArr = [
        ["18%", "30%"],
        ["50%", "30%"],
        ["82%", "30%"],
        ["34%", "75%"],
        ["66%", "75%"],
      ];
      const colorArr = [
        ["#E8821C", "#E55445"],
        ["#E5DD45", "#E8B11C"],
        ["#5052EE", "#AB6EE5"],
        ["#23E5E5", "#2E72BF"],
        ["#4FF778", "#0BA82C"],
      ];
      const start = this.currentIndex * 5,
        end = (this.currentIndex + 1) * 5;
      const showDate = this.allDate.slice(start, end);
      const seriesArr = showDate.map((item, index) => ({
        type: "pie",
        center: centerArr[index],
        hoverAnimation: false,
        labelLine: {
          show: false,
        },
        label: {
          position: "center",
          color: colorArr[index][1],
        },
        data: [
          {
            name: item.name + "\n" + item.value + "人",
            value: item.value,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                {
                  offset: 0,
                  color: colorArr[index][0],
                },
                {
                  offset: 1,
                  color: colorArr[index][1],
                },
              ]),
            },
          },
        ],
      }));
      const dataOption = {
        series: seriesArr,
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.top_ref.offsetWidth / 100) * 3.6;
      const innerRadius = titleFontSize * 2.8;
      const outterRadius = innerRadius * 1.2;
      const adapterOption = {
        series: [
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize * 1.4,
            },
          },
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize * 1.4,
            },
          },
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize * 1.4,
            },
          },
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize * 1.4,
            },
          },
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize * 1.4,
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    startInterval() {
      this.timerId && clearInterval(this.timerId);
      this.timerId = setInterval(() => {
        this.currentIndex++;
        if ((this.currentIndex > this.allDate.length / 5) | 0)
          this.currentIndex = 0;
        this.updateChart();
      }, 5000);
    },
  },
  mounted() {
    this.initChart();
    this.updateChart();
    this.startInterval();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    clearInterval(this.timerId);
  },
};
</script>