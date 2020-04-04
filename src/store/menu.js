/**
 * -------------------------------------------------------------------
 *  State
 * -------------------------------------------------------------------
 */
const state = () => ({
  open: false,
  isMini: false
});

/**
 * -------------------------------------------------------------------
 *  Mutations
 * -------------------------------------------------------------------
 */
const mutations = {
  /**
   * toggleMenu
   * @description toggles the visibility state of the menu
   * @param {Object} state - the current state
   * @param {Boolean} value - the current value
   */
  SET_OPEN(state, value) {
    state.open = value;
  },

  /**
   * toggleMiniMenu
   * @description toggles the state of the menu being mini
   * @param {Object} state - the current state
   * @param {Boolean} value - the current value
   */
  SET_MINI(state, value) {
    state.isMini = value;
  }
};

/**
 * -------------------------------------------------------------------
 *  Actions
 * -------------------------------------------------------------------
 */
const actions = {
  /**
   * toggleMenu
   * @description toggles the visibility state of the menu
   */
  toggleMenu({ commit, state }) {
    commit('SET_OPEN', !state.open);
  },

  /**
   * toggleMiniMenu
   * @description toggles the state of the menu being mini
   */
  toggleMiniMenu({ commit, state }) {
    commit('SET_MINI', !state.isMini);
  },

  setMenu({ commit }, data = {}) {
    if (data.open) commit('SET_OPEN', data.open);
    if (data.isMini) commit('SET_MINI', data.isMini);
  },

  menuIsClosed({ commit }, isMobile) {
    if (!isMobile) commit('SET_OPEN', false);
  }
};

/**
 * -------------------------------------------------------------------
 *  Getters
 * -------------------------------------------------------------------
 */
const getters = {
  open(state) {
    return state.open;
  },
  isMini(state) {
    return state.isMini;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
