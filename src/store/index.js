import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import modules from './modules';

const persistConfig = {
  key: 'my_app',
  storage: window.sessionStorage,
  modules: ['menu', 'user']
};

const state = () => ({
  loaded: false
});

const mutations = {
  SET_LOADED(state) {
    state.loaded = true;
  }
};

const actions = {
  onAppLoad({ commit }) {
    commit('SET_LOADED');
  }
};

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  plugins: [new VuexPersistence(persistConfig).plugin]
});
