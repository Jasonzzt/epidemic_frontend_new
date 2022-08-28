<template>
  <dv-active-ring-chart :config="BtObj" style="float:left; width: 400px; height: 300px"/>
</template>

<script>
export default {
  name: "ring.vue",
  data() {
    return {
      BtObj: {
        radious: 80,
        activeRadius: 88,
        lineWidth: 40,
        animationCurve: "easeInBack",
        animationFrame: 200,
        activeTimeGap: 2000,
        data: [],
        color: ["#C23531", "#0F8A61"]//表示自定义颜色值,和上面的数据是一一对应的关系
      },
    }
  },

  methods: {
    setData(dataList) {

      this.BtObj = {
        radious: 80,
        activeRadius: 88,
        lineWidth: 40,
        animationCurve: "easeInBack",
        animationFrame: 200,
        activeTimeGap: 2000,
        data: dataList,
        // color: ["#C23531", "#0F8A61"]//表示自定义颜色值,和上面的数据是一一对应的关系
        digitalFlopToFixed:3
      }

      console.log(this.BtObj.data,123)
    }
  },
  mounted() {
    // this.getData()
  }


}
</script>

<style scoped>

</style>
