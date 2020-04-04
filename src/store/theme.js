import vuetify from '@/config/vuetify';

export const state = () => ({
  dark: vuetify.theme.dark
});

export const mutations = {
  toggle(state) {
    state.dark = !state.dark;
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
