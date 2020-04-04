import firebase from 'firebase';
import { vuexfireMutations } from 'vuexfire';
import { getUserData } from '../utils';

function createNewAccount(user) {
  return firebase
    .database()
    .ref(`accounts/${user.uid}`)
    .set({
      displayName: user.displayName || user.email.split('@')[0], // use part of the email as a username
      email: user.email,
      image: user.newImage || '/images/default-profile.png' // supply a default profile image for all users
    });
}

const state = () =>
  getUserData
    ? getUserData()
    : {
        data: null,
        isAuthenticated: null
      };

const mutations = {
  ...vuexfireMutations,
  SET_USER(state, payload) {
    state.data = payload;
  },
  SET_LOGGED_IN(state, value) {
    state.isAuthenticated = value;
  },
  SET_LOADED(state) {
    state.loaded = true;
  }
};

const actions = {
  fetchUser({ commit }, user) {
    if (user) {
      commit('SET_LOGGED_IN', true);
      commit('SET_USER', {
        displayName: user.displayName,
        email: user.email
      });
    } else {
      commit('SET_USER', null);
      commit('SET_LOGGED_IN', false);
    }
  },
  resetUser({ state }) {
    state.data = null;
  },
  userCreate({ state }, account) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(account.email, account.password)
      .then(({ user }) => {
        return createNewAccount(user);
      });
  },
  userGoogleLogin({ commit }) {
    firebase.auth().useDeviceLanguage();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    provider.setCustomParameters({
      login_hint: 'user@example.com'
    });
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        createNewAccount({
          newImage: result.additionalUserInfo.profile.picture, // just use their existing user image to start
          ...result.user
        });
        return commit('setUser', result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  userGithubLogin({ commit }) {
    firebase.auth().useDeviceLanguage();
    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('user:email');
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        createNewAccount({
          newImage: result.additionalUserInfo.profile.avatar_url, // just use their existing user image to start
          ...result.user
        });
        return commit('setUser', result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  login({ commit, state }, account) {
    console.log(state);
    return firebase
      .auth()
      .signInWithEmailAndPassword(account.email, account.password)
      .then((user) => {
        commit('SET_LOGGED_IN', true);
        commit('SET_USER', user);
      });
  },

  async logout({ commit }) {
    try {
      await firebase.auth().signOut();

      commit('SET_LOGGED_IN', false);
      commit('SET_USER', null);

      sessionStorage.clear();
    } catch (error) {
      console.log(error);
    }
  },

  userUpdate({ state }, newData) {
    return firebase
      .database()
      .ref(`accounts/${state.data.uid}`)
      .update({
        displayName: newData.displayName
      });
  },
  userUpdateImage({ state }, image) {
    return firebase
      .database()
      .ref(`accounts/${state.data.uid}`)
      .update({
        image
      });
  }
};

const getters = {
  isAuthenticated(state) {
    return !!state.data;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
