import Vue from 'vue';
import VueRouter from 'vue-router';

import { routes } from './routes';
import authMiddleware from './middleware';

Vue.use(VueRouter);

/**
 *  Create router
 */
const router = new VueRouter({
  mode: 'history',
  routes
});

/**
 *  Attach middleware
 */
router.beforeEach(authMiddleware);

/**
 *  Export
 */
export default router;
