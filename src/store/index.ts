import Vue from 'vue'
import Vuex from 'vuex'
import Tool from '@/classes/tools/tool';
import Board from '@/classes/board/board';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeTool: Tool,
    activeBoard: Board,
    latestColors: [] as String[],
    maxLatestColors: 30
  },

  getters: {
    getActiveTool (s) { return s.activeTool },
    getActiveBoard (s) { return s.activeBoard },
    getLatestColors (s) { return s.latestColors }
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
    },

    addLatestColor (state, { color, index }) {
      if (state.latestColors[0] === color) return;

      if (index !== -1) {
        state.latestColors.splice(index, 1);
      }

      state.latestColors.unshift(color);

      let result = Array.from(new Set(state.latestColors.map(el => el)));
      const length = result.length;

      if (length > state.maxLatestColors) {
        result = result.slice(0, state.latestColors.length - 1);
      }

      state.latestColors = result;
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
    },

    addLatestColor (context, payload: { color: string, index: number }) {
      context.commit('addLatestColor', payload);
    }
  }
})
