import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';

import { STORAGE_KEY_NAME } from '@/constants';
import modules from './modules';

/**
 *  Persist config
 */
const persistConfig = {
  key: STORAGE_KEY_NAME,
  storage: window.sessionStorage,
  modules: ['menu', 'temp']
};

/**
 *  State
 */
const state = () => ({
  loaded: false
});

/**
 *  Mutations
 */
const mutations = {
  SET_LOADED(state) {
    state.loaded = true;
  }
};

/**
 *  Actions
 */
const actions = {
  onAppLoad({ commit }) {
    commit('SET_LOADED');
  }
};

/**
 *  Export
 */
Vue.use(Vuex);
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
  plugins: [new VuexPersistence(persistConfig).plugin]
});
