import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rowData:{}
  },
  mutations: {
    saveData(state,payload){
      state.rowData=payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
