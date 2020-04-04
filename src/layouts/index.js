import Vue from 'vue';

import AuthLayout from './AuthLayout';
import ProtectedLayout from './ProtectedLayout';
import DefaultLayout from './DefaultLayout';

Vue.component('auth-layout', AuthLayout);
Vue.component('protected-layout', ProtectedLayout);
Vue.component('default-layout', DefaultLayout);
