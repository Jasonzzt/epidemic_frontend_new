<template>
  <div id="app1">
    <div class="bg1"></div>
    <div class="bg2"></div>
    <div class="bg3"></div>
    <button style="font-size: 30px;border-radius: 12px;" v-wave="{ color: 'blue' }">Click me too!</button>

  </div>
</template>

<script>
export default {
  name: "frontPage"
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@font-face {
  font-family: electronicFont;
  src: url(../assets/font/DS-DIGIT.TTF);
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
  background: url(../assets/image/map.png);
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
  height: 566px;
  width: 566px;
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
</style>