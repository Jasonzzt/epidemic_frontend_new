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
      }
    },
  methods: {
    get_data:{

    }
  }

  }
</script>

<style scoped>

</style>
