import Vue from 'vue';
import Vuetify from 'vuetify';

import { LOADING_DELAY } from './constants';
import vuetifyOptions from './config/vuetify';

import App from './App.vue';
import router from './router';
import store from './store';
import { auth } from './services/firebase';

import 'vuetify/dist/vuetify.min.css';
import './styles/main.scss';
import './layouts';

Vue.config.productionTip = false;

Vue.use(Vuetify);

auth.onAuthStateChanged((user) => {
  if (!store.state.loaded) {
    setTimeout(() => {
      store.dispatch('onAppLoad');
    }, LOADING_DELAY);
  }

  store.dispatch('user/fetchUser', user);

  console.log(user);

  new Vue({
    router,
    store,
    vuetify: new Vuetify(vuetifyOptions),
    render: (h) => h(App)
  }).$mount('#app');
});
