import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allDataList: null,
    allDeadList: null,
    allNowDataList: null,
    allTodayCreadList: null,
    chinaTotal: null,
    chinaAdd: null,
  },
  mutations: {
    initData(state, val) {
      state.allDataList = val.allDataList;
      state.allDeadList = val.allDeadList;
      state.allNowDataList = val.allNowDataList;
      state.allTodayCreadList = val.allTodayCreadList;
      state.chinaTotal = val.chinaTotal;
      state.chinaAdd = val.chinaAdd;
    }
  },
  actions: {},
  modules: {}
})
