<template>
  <dv-active-ring-chart :config="BtObj" style="float:left; width: 400px; height: 300px" />
</template>

<script>
export default {
  name: "ring.vue",
  data() {
    return {
      BtObj:{
        radious:80,
        activeRadius:88,
        lineWidth:40,
        animationCurve:"easeInBack",
        animationFrame:200,
        activeTimeGap:2000,
        data:[
            {
          name: '周口',
          value: 55,
        },
          {
            name: '南阳',
            value: 120,
          }],
        color:["#C23531","#0F8A61"]//表示自定义颜色值,和上面的数据是一一对应的关系
      },
      msg:[],
      }
    },

  methods: {
    async getData() {
      let _this = this
      this.$axios.post('http://114.115.211.47/getAllProvinceEpidemicData').then(res => {
        _this.msg = res.data.msg;
        // console.log(this.msg)
        _this.BtObj.data = [
          {
            name:_this.msg[10]['provinceName'],
            value: _this.msg[10]['confirm']
          },
          {
            name:_this.msg[11]['provinceName'],
            value: _this.msg[11]['confirm']
          },
        ]
      })

    }
  },
  mounted() {
    this.getData()
  }


}
</script>

<style scoped>

</style>
