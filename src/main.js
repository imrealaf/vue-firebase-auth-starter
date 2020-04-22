import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import { LOADING_DELAY } from './constants';
import vuetifyOptions from './config/vuetify';

import App from './App.vue';
import router from './router';
import store from './store';
import { auth } from './services/firebase';

import './styles/main.scss';
import './filters';
import './plugins';
import './layouts';

Vue.config.productionTip = false;

Vue.use(Vuetify);

auth.onAuthStateChanged(async (user) => {
  console.log(user);
  if (user) {
    let profile = await store.dispatch('user/getProfile', user.uid);
    if (!profile) store.dispatch('user/updateProfile', user.uid);
  }

  store.dispatch('user/setUser', user);

  const app = new Vue({
    router,
    store,
    vuetify: new Vuetify(vuetifyOptions),
    render: (h) => h(App)
  });

  if (!app._isMounted) {
    app.$mount('#app');
  }
});
