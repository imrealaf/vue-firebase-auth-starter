import vuetify from '../config/vuetify';

export const state = () => ({
  dark: vuetify.theme.dark,
  menu: {
    isMini: true
  }
});

export const mutations = {
  toggle(state, theme) {
    state.dark = !state.dark;
    theme.dark = state.dark;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
