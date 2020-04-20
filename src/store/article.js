import { articles } from '@/services/firebase';
import { transformData } from '@/utils';

/**
 * -------------------------------------------------------------------
 *  State
 * -------------------------------------------------------------------
 */
const state = () => ({
  data: null,
  temp: {},
  notFound: false
});

/**
 * -------------------------------------------------------------------
 *  Mutations
 * -------------------------------------------------------------------
 */
const mutations = {
  /**
   * SET_ARTICLE
   * @description sets the article data
   * @param {Object} state - the current state
   * @param {Object} data - the data object
   */
  SET_ARTICLE(state, data) {
    state.data = data;
  },

  /**
   * SET_TEMP_ARTICLE
   * @description sets the temporary article data
   * @param {Object} state - the current state
   * @param {Object} data - the data object
   */
  SET_TEMP(state, data) {
    state.temp = data;
  },

  /**
   * SET_NOT_FOUND
   * @description sets the article data
   * @param {Object} state - the current state
   */
  SET_NOT_FOUND(state) {
    state.notFound = true;
  }
};

/**
 * -------------------------------------------------------------------
 *  Actions
 * -------------------------------------------------------------------
 */
const actions = {
  saveTemp({ commit }, data) {
    commit('SET_TEMP', data);
  },
  clearTemp({ commit }) {
    commit('SET_TEMP', {});
  },

  async getById({ commit }, id) {
    try {
      let doc = await articles.doc(id).get();
      if (doc.exists) {
        const data = doc.data();
        commit('SET_ARTICLE', data);
        return data;
      } else {
        commit('SET_NOT_FOUND');
        return null;
      }
    } catch (error) {
      console.log('Error getting documents: ', error);
    }
  },

  async create({ state }, data) {
    try {
      let doc = await articles.add(transformData(data));
      return doc;
    } catch (error) {
      console.log(error);
    }
  },

  async update({ state }, payload) {
    const { id, data } = payload;
    try {
      let doc = await articles.doc(id).set(data);
      return doc;
    } catch (error) {
      console.log(error);
    }
  },

  async delete({ state }, id) {
    try {
      return await articles.doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
