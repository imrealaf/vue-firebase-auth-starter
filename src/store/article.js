import { articles } from '@/services/firebase';

/**
 * -------------------------------------------------------------------
 *  State
 * -------------------------------------------------------------------
 */
const state = () => ({
  data: null,
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
  async getById({ commit }, id) {
    try {
      console.log('id', id);
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
