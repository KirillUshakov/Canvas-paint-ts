import Vue from 'vue'
import Vuex from 'vuex'
import Tool from '@/classes/tools/tool';
import Board from '@/classes/board/board';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTool: Tool,
    activeBoard: Board
  },

  getters: {
    getActiveTool (s) { return s.activeTool },
    getActiveBoard (s) { return s.activeBoard }
  },

  mutations: {
    setActiveTool (state, payload) {
      state.activeTool = payload;
    },

    setActiveBoard (state, payload) {
      state.activeBoard = payload;
    },

    resetActiveTool (state, payload) {
      state.activeTool = payload;
    }
  },

  actions: {
    setActiveTool (context, payload) {
      context.commit('setActiveTool', payload);
    },

    setActiveBoard (context, payload) {
      context.commit('setActiveBoard', payload);
    },

    resetActiveTool (context, payload) {
      context.commit('resetActiveTool', payload);
    }
  }
})
