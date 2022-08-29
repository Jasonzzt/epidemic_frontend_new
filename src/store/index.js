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
  },
  mutations: {
    setAllData(state, val) {
      state.allDataList = val.dataList;
      state.allDeadList = val.dead;
      state.allNowDataList = val.nowdata;
      state.allTodayCreadList = val.cread;
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
      console.log(state.nowData)

      let arr1=state.nowData
      ring.methods.setData(arr1)
    }
  },
  actions: {},
  modules: {}
})
