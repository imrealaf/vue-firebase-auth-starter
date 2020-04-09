/**
 * -------------------------------------------------------------------
 *  State
 * -------------------------------------------------------------------
 */
const state = () => ({
  article: {}
});

/**
 * -------------------------------------------------------------------
 *  Mutations
 * -------------------------------------------------------------------
 */
const mutations = {
  /**
   * SET_TEMP_ARTICLE
   * @description sets the temporary article data
   * @param {Object} state - the current state
   * @param {Object} data - the data object
   */
  SET_TEMP_ARTICLE(state, data) {
    state.article = data;
  }
};

/**
 * -------------------------------------------------------------------
 *  Actions
 * -------------------------------------------------------------------
 */
const actions = {
  saveTempArticle({ commit }, data) {
    commit('SET_TEMP_ARTICLE', data);
  },
  clearTempArticle({ commit }) {
    commit('SET_TEMP_ARTICLE', {});
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
