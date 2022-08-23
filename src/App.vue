<template>

  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
<!--    <VmHeader></VmHeader>
    <div id="content">
      <VmLeft class='left'
              :option1 = 'option1'
              :option3 = 'option3'
              :option5 = 'option5'></VmLeft>
      <VmCenter class='center'
                :centerTop ='centerTop'
                :foreignData = 'foreignData'>
      </VmCenter>
      <VmRight class='right'
               :option2 = 'option2'
               :option4 = 'option4'
               :option6 = 'option6'></VmRight>
    </div>-->
<!--    <div class="bg1"></div>
    <div class="bg2"></div>
    <div class="bg3"></div>-->
  </div>
</template>

<script>
// import VmHeader from 'components/VmHeader.vue'
// import VmLeft from 'components/VmLeft.vue'
// import VmCenter from 'components/VmCenter.vue'
// import VmRight from 'components/VmRight.vue'
//
// import {
//   getForeinData,
// } from 'commonfun/charts.js'

export default {
  name: 'app',
  data(){
    return {
      transitionName:''
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        //设置动画名称
        this.transitionName = 'slide-left';
      } else {
        this.transitionName = 'slide-right';
      }
    }
  },
  mounted() {
/*    getForeinData().then(res => {
      this.option1 = res.option1;
      this.option2 = res.option2;
      this.option3 = res.option3;
      this.option4 = res.option4;
      this.option5 = res.option5;
      this.option6 = res.option6;
      this.centerTop = res.centerTop;
      this.foreignData = res.foreignData;
    })*/
  }
}
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}



li {
  list-style: none;
}
#app {
  /* height: 100vh; */
  width: calc(100vw - 17px);
  /* height: 100vh; */
  background: url(assets/image/bg.jpg) top center;
}
#content {
  /* width: 100vw; */
  /* height: 100px; */
  /* background-color: pink; */
  padding: 10px 10px 0;
  display: flex;
}
#content .left {
  flex: 3
}
#content .center {
  flex: 5
}
#content .right {
  flex: 3
}
.bg1{
  height: 518px;
  width: 518px;
  background: url(./assets/image/map.png);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  opacity: 0.3;
}

.bg2{
  height: 643px ;
  width: 643px ;
  background: url(./assets/image/lbx.png);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-size: 100% 100%;
  opacity: 0.6;
  animation: rotate1 15s linear infinite;
}
.bg3{
  height: 566px;
  width: 566px;
  background: url(./assets/image/jt.png);
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
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

</style>
