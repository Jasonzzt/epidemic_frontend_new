<template>
  <dv-active-ring-chart :config="BtObj" style="float:left; width: 400px; height: 300px"/>
</template>

<script>
export default {
  name: "ring",
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

  watch:{
    setData() {
      var BtObj = {
        radious: 80,
        activeRadius: 88,
        lineWidth: 40,
        animationCurve: "easeInBack",
        animationFrame: 200,
        activeTimeGap: 2000,
        data: this.$store.state.nowData,
        // color: ["#C23531", "#0F8A61"]//表示自定义颜色值,和上面的数据是一一对应的关系
        digitalFlopToFixed:3
      }
      this.BtObj=BtObj

      console.log(this.BtObj.data,123)
    }
  },
  methods: {
    setData(nowData) {
      let arr=[]
      for (let i=0;i<nowData.length;i++){
        arr.push({'name':nowData[i].name,'value':nowData[i].value})
      }
      var BtObj = {
        radious: 80,
        activeRadius: 88,
        lineWidth: 40,
        animationCurve: "easeInBack",
        animationFrame: 200,
        activeTimeGap: 2000,
        data: arr,
        // color: ["#C23531", "#0F8A61"]//表示自定义颜色值,和上面的数据是一一对应的关系
        digitalFlopToFixed:3
      }
      this.BtObj=BtObj

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
