import { auth, profiles, facebook, google } from '@/services/firebase';

/**
 * -------------------------------------------------------------------
 *  State
 * -------------------------------------------------------------------
 */
const state = () => ({
  data: null,
  profile: null,
  isAuthenticated: false
});

/**
 * -------------------------------------------------------------------
 *  Mutations
 * -------------------------------------------------------------------
 */
const mutations = {
  SET_USER(state, payload) {
    state.data = payload;
  },
  SET_PROFILE(state, payload) {
    state.profile = payload;
  },
  SET_LOGGED_IN(state, value) {
    state.isAuthenticated = value;
  },
  SET_LOADED(state) {
    state.loaded = true;
  }
};

/**
 * -------------------------------------------------------------------
 *  Actions
 * -------------------------------------------------------------------
 */
const actions = {
  setUser({ commit }, user) {
    if (user) {
      commit('SET_LOGGED_IN', true);
      commit('SET_USER', user);
    } else {
      commit('SET_USER', null);
      commit('SET_LOGGED_IN', false);
      sessionStorage.clear();
    }
  },

  async getProfile({ commit }, id) {
    try {
      let profile = await profiles.doc(id).get();
      if (profile.exists) {
        commit('SET_PROFILE', profile.data());
        return profile.data();
      }
    } catch (error) {
      console.log('Error getting documents: ', error);
      return false;
    }
  },

  async createProfile({ commit }, user) {
    try {
      const profileData = {
        firstName: '',
        lastName: '',
        photo: user.photoURL
      };
      await profiles.doc(user.uid).set(profileData);
      commit('SET_PROFILE', profileData);
    } catch (error) {
      console.log('Error getting documents: ', error);
      return error;
    }
  },

  async signInWithEmail({ commit }, data) {
    try {
      let response = await auth.signInWithEmailAndPassword(
        data.email,
        data.password
      );
      return response;
    } catch (error) {
      return error;
    }
  },

  async signInWithFacebook({ dispatch }) {
    return dispatch('signInWithProvider', facebook);
  },

  async signInWithGoogle({ dispatch }) {
    return dispatch('signInWithProvider', google);
  },

  async signInWithProvider({ commit }, provider) {
    auth.useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.log(error);
    }
  },

  async logout() {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
};

/**
 * -------------------------------------------------------------------
 *  Getters
 * -------------------------------------------------------------------
 */
const getters = {
  userData(state) {
    return { ...JSON.parse(JSON.stringify(state.data)), ...state.profile };
  },
  displayName(state) {
    return state.data ? state.data.displayName : null;
  },
  fullName(state) {
    return state.profile && state.profile.firstName
      ? `${state.profile.firstName} ${state.profile.lastName}`
      : null;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
