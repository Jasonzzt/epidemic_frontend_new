<template>
  <div id="app1">

<!--    旋转背景图-->
    <div style="">
      <div class="bg1"></div>
      <div class="bg2"></div>
      <div class="bg3"></div>
    </div>

<!--    导航栏-->
    <div style="z-index:999">
      <div class="pos1" @click="push1">
        <dv-border-box-8 style="width: 130px">
          <i class="el-icon-d-arrow-left" style="font-size: 25px"></i>
          <button class="demo" style="font-size: 20px;color: #f5f6f6;padding: 5px 10px; border-color: #02093f" v-wave="{ color: 'white', }">疫情数据</button>
        </dv-border-box-8>

      </div>
      <div class="pos2" @click="push2">
        <dv-border-box-8 style="width: 130px">
          <i class="el-icon-d-arrow-left" style="font-size: 25px"></i>
          <button  class="demo" style="font-size: 20px;color: #f5f6f6;padding: 5px 10px;border-color: #02093f" v-wave="{ color: 'white', }">人口流动</button>
        </dv-border-box-8>

      </div>
      <div class="pos3" @click="push3">
        <dv-border-box-8 style="width: 130px">
          <i class="el-icon-d-arrow-left" style="font-size: 25px"></i>
          <button  class="demo" style="font-size: 20px;color: #f5f6f6;padding: 5px 10px;border-color: #02093f" v-wave="{ color: 'white', }">疫情预测</button>
        </dv-border-box-8>

      </div>
      <div class="pos4" @click="push4">
        <dv-border-box-8 :reverse="true">
          <button class="demo" style="font-size: 20px;color: #f5f6f6;padding: 5px 10px;border-color: #02093f" v-wave="{ color: 'white', }">防疫政策</button>
          <i class="el-icon-d-arrow-right" style="font-size: 25px"></i>
        </dv-border-box-8>

      </div>
      <div class="pos5" @click="push5">
        <dv-border-box-8 :reverse="true">
          <button class="demo" style="font-size: 20px;color: #f5f6f6;padding: 5px 10px;border-color: #02093f" v-wave="{ color: 'white', }">核酸检测</button>
          <i class="el-icon-d-arrow-right" style="font-size: 25px"></i>
        </dv-border-box-8>

      </div>
      <div class="pos6" @click="push6">
        <dv-border-box-8 :reverse="true">
          <button class="demo" style="font-size: 20px;color: #f5f6f6;padding: 5px 10px;border-color: #02093f" v-wave="{ color: 'white', }">出行建议</button>
          <i class="el-icon-d-arrow-right" style="font-size: 25px"></i>
        </dv-border-box-8>

      </div>
    </div>

<!--    标题-->
    <dv-decoration-7 class="" style="width:1500px;height:300px;font-size: 50px;position: relative;margin-left: 500px;width:540px;margin-top: 50px">疫情大数据分析平台</dv-decoration-7>
    <dv-decoration-8 class="decr1" style="width:300px;height:50px;" />
    <dv-decoration-8 class="decr2" :reverse="true" style="width:300px;height:50px;" />

  </div>
</template>

<script>
import router from "@/router";
export default {
  name: "FrontPage",

  methods:{
    push1(){
      router.push('/screenpage')
    },

    push2(){
      router.push('/population1')
    },

    push3(){
      router.push('/prediction')
    },

    push4(){
      router.push('/policy')
    },

    push5(){
      router.push('/coviddetect')
    },

    push6(){
      router.push('/advicepage')
    },
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family:'宋体';
}

li {
  list-style: none;
}

#app1 {
  /* height: 100vh; */
  width: calc(100vw - 17px);
  /* height: 100vh; */
  background: url(../assets/image/bg.jpg) top center;
}

.bg1{
  height: 480px;
  width: 480px;
  background: url(../assets/image/map.png);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  opacity: 0.3;
}

.bg2{
  height: 510px ;
  width: 510px ;
  background: url(../assets/image/lbx.png);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  opacity: 0.6;
  animation: rotate1 15s linear infinite;
}

.bg3{
  height: 510px;
  width: 510px;
  background: url(../assets/image/jt.png);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  opacity: 0.8;
  animation: rotate2 15s linear infinite;
}

@keyframes rotate1{
  from{transform: translate(-50%, -50%) rotate(0deg);}
  to{transform: translate(-50%, -50%) rotate(360deg);}
}

@keyframes rotate2{
  from{transform: translate(-50%, -50%) rotate(0deg);}
  to{transform: translate(-50%, -50%) rotate(-360deg);}
}

.demo{
  background: url(../../public/static/img/bntactive.png) no-repeat center !important;
}

.pos1{
  position: relative;
  left: 10px;
  top: 200px;
}

.pos2{
  position: relative;
  left: 10px;
  top: 250px;
}

.pos3{
  position: relative;
  left: 10px;
  top: 300px;
}

.pos4{
  float: right;
  position: relative;
  right: 10px;
  top:95px;
}

.pos5{
  float: right;
  position: relative;
  right: -120px;
  top:185px;
}

.pos6{
  float: right;
  position: relative;
  right: -250px;
  top:275px;
}

.decr1{
  position: relative;
  left: 0px;
  top: 180px;
}

.decr2{
  float: right;
  position: relative;
  right: 0px;
  top: 130px;
}
</style>
