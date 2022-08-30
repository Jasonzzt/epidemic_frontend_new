import Vue from 'vue'
import Vuex from 'vuex'
import ring from '../components/ring'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allDataList: [],
    allDeadList: [],
    allNowDataList: [],
    allTodayCreadList: [],
    chinaTotal: [],
    chinaAdd: [],
    nowData:[],
    xData:[],
    yData:[],
    increase:0,
    dead:0,
    cured:0,
    confirm:0,
    increaseSug:0,
    deadSug:0,
    curedSug:0,
    confirmSug:0,
    asymptomaticIncrease:0,
    asymptomatic:0,
    riskAreaNumber:0,
  },
  mutations: {
    setBasicData(state,val){
      state.increase=val.increase
      state.confirm=val.confirm
      state.cured=val.cured
      state.dead=val.dead
    },
    setAllData(state, val) {
      state.allDataList = val.dataList;
      state.allDeadList = val.dead;
      state.allNowDataList = val.nowdata;
      state.allTodayCreadList = val.cread;

      state.increase=0
      state.confirm=0
      state.cured=0
      state.dead=0
      for(let i=0;i<val.dataList.length;i++){
        state.increase+=val.nowdata[i].value
        state.confirm+=val.dataList[i].value
        state.cured+=val.cread[i].value
        state.dead+=val.dead[i].value
      }
      // alert(state.increase)
    },
    setNowData(state,val){
      if(val.mode===0)state.nowData=state.allNowDataList
      if(val.mode===1)state.nowData=state.allDataList
      if(val.mode===2)state.nowData=state.allTodayCreadList
      if(val.mode===3)state.nowData=state.allDeadList

      let arr=[]
      for (let i=0;i<state.nowData.length;i++){
        arr.push({'name':state.nowData[i].name,'value':state.nowData[i].value})
      }
      state.nowData=arr

      let arr1=[]
      let arr2=[]
      for(let i=0;i<state.nowData.length;i++){
        arr1.push(state.nowData[i].name)
        arr2.push(state.nowData[i].value)
      }
      state.xData=arr1;
      state.yData=arr2;
    },
    setSugData(state,val){
      state.increaseSug=val.increase
      state.confirmSug=val.confirm
      state.curedSug=val.cured
      state.deadSug=val.dead
      state.asymptomaticIncrease=val.asymptomaticIncrease
      state.asymptomatic=val.asymptomatic
      state.riskAreaNumber=val.riskAreaNumber
    },
    clear(state,val){
      state.increaseSug=0
      state.deadSug=0
      state.curedSug=0
      state.confirmSug=0
      state.asymptomaticIncrease=0
      state.asymptomatic=0
      state.riskAreaNumber=0
    }
  },
  actions: {},
  modules: {}
})
