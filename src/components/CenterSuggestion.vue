<template>
  <div id="vmcentertop">
    <div class="tophd">
      <ul>
        <li>{{this.$store.state.increaseSug}}</li>
        <li>{{this.$store.state.confirmSug}}</li>
        <li>{{this.$store.state.asymptomaticIncrease}}</li>
        <li>{{this.$store.state.curedSug}}</li>
        <li>{{this.$store.state.deadSug}}</li>
        <li>{{this.$store.state.riskAreaNumber}}</li>

      </ul>
    </div>
    <div class="topbd">
      <ul>
        <li>新增确诊</li>
        <li>累计确诊</li>
        <li>新增无症状</li>
        <li>累计治愈</li>
        <li>累计死亡</li>
        <li>风险区</li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name:'centertop',
  data() {
    return {
      confirm: 0,
      confirmIncrease:0,
      cure:0,
      death:0,
    }
  },
  methods:{
    setData(confirm,
            confirmIncrease,
            cure,
            death){
      this.confirm = confirm
      this.confirmIncrease = confirmIncrease
      this.cure = cure
      this.death = death
    }
  },
}
</script>
<style scoped>
@font-face {
  font-family: "electronicFont";
  src: url('../assets/font/DS-DIGIT.TTF');
  font-weight: normal;
  font-style: normal;
}
#vmcentertop{
  background-color: rgba(101, 132, 226, 0.1);
  padding: 15px;
  height:20px
}
.tophd{
  position: relative;
  border: 1px solid rgba(25, 186, 139, 0.17);
  height: 50px;
}
.tophd:before{
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  width: 30px;
  height: 60px;
  border-top: 2px solid #02a6b5;
  border-left: 2px solid #02a6b5;
}
.tophd:after{
  position: absolute;
  bottom: 0;
  right: 0;
  content: "";
  width: 30px;
  height: 60px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
}

.tophd ul{
  display: flex;
}
.tophd li{
  position: relative;
  flex: 1;
  height: 80px;
  font-size: 45px;
  line-height: 80px;
  color: #ffeb7b;
  text-align: center;
  font-family:electronicFont;
}
.tophd lI:after{
  content: '';
  position: absolute;
  top:25%;
  right: 0;
  height: 50%;
  width: 1px;
  background-color: rgba(255, 255, 255, 0.2);

}


.topbd ul{
  display: flex;
}
.topbd ul li{
  flex: 1;
  height: 40px;
  font-size:15px;
  padding-top: 10px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

</style>
