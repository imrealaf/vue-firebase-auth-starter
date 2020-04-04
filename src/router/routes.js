import { Login, Home } from '../views';
import { Dashboard, About } from '../views/protected';

/**
 *  Route paths
 */
export const PATH_HOME = '/';
export const PATH_LOGIN = '/login';
export const PATH_DASHBOARD = '/dashboard';
export const PATH_ABOUT = '/about';

/**
 *  Routes
 */
export const routes = [
  {
    path: PATH_HOME,
    name: 'home',
    component: Home,
    meta: { layout: 'default', requiresAuth: false }
  },
  {
    path: PATH_LOGIN,
    name: 'login',
    component: Login,
    meta: { layout: 'auth', requiresAuth: false }
  },
  {
    path: PATH_DASHBOARD,
    name: 'dashboard',
    component: Dashboard,
    meta: { layout: 'protected', requiresAuth: true }
  },
  {
    path: PATH_ABOUT,
    name: 'about',
    component: About,
    meta: { layout: 'protected', requiresAuth: true }
  }
];
