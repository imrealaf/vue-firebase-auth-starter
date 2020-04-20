import firebase from 'firebase';
import { auth, profiles, facebook, google } from '@/services/firebase';

function createProfile(user) {
  console.log(user);
  return profiles.doc(user.email).set({
    displayName: user.displayName || user.email.split('@')[0],
    email: user.email,
    image: null
  });
}

function getProfile(user) {
  const docRef = profiles.doc(user.email);
  return docRef.get().then((doc) => {
    return doc.data();
  });
}

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
  setUser({ commit, dispatch }, user) {
    if (user) {
      commit('SET_LOGGED_IN', true);
      commit('SET_USER', user);
      dispatch('getProfile', user.uid);
    } else {
      commit('SET_USER', null);
      commit('SET_LOGGED_IN', false);
      sessionStorage.clear();
    }
  },

  async getProfile({ state, commit }, id) {
    try {
      let profile = await profiles.doc(id).get();
      if (profile.exists) {
        commit('SET_PROFILE', profile.data());
      }
    } catch (error) {
      console.log('Error getting documents: ', error);
    }
  },

  createUser({ state }, account) {
    return auth
      .createUserWithEmailAndPassword(account.email, account.password)
      .then(({ user }) => {
        console.log(user);
      });
  },

  async signUpWithFacebook({ dispatch }) {
    return dispatch('signUpwithProvider', facebook);
  },

  async signUpWithGoogle({ dispatch }) {
    return dispatch('signUpwithProvider', google);
  },

  async signUpwithProvider({ commit }, provider) {
    auth.useDeviceLanguage();
    try {
      let result = await auth.signInWithPopup(provider);
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
    // return auth
    //   .signInWithPopup(provider)
    //   .then((result) => {
    //     createProfile({
    //       newImage: result.additionalUserInfo.profile.picture, // just use their existing user image to start
    //       ...result.user
    //     });
    //     return commit('setUser', result.user);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
