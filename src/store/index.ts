import Vue from 'vue'
import Vuex from 'vuex'
import Tool from '@/classes/tools/tool';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTool: Tool
  },

  getters: {
    getActiveTool (s) { return s.activeTool }
  },

  mutations: {
    setActiveTool (state, payload) {
      state.activeTool = payload;
    }
  },

  actions: {
    setActiveTool (context, payload) {
      context.commit('setActiveTool', payload);
    }
  }
})
