import Vue from 'vue';
import VueRouter from 'vue-router';

import authMiddleware from '../middleware/auth';

import { Login, Home } from '../views';
import { Dashboard, About } from '../views/admin';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: { layout: 'auth', requiresAuth: false }
  },
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: { layout: 'admin', requiresAuth: true }
  },
  {
    path: '/admin/about',
    name: 'about',
    component: About,
    meta: { layout: 'admin', requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach(authMiddleware);

export default router;
