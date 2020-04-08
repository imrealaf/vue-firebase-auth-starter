import { Login, Home } from '../views';
import {
  Dashboard,
  About,
  Articles,
  EditArticle,
  CreateArticle
} from '../views/protected';

/**
 *  Route paths
 */
export const PATH_HOME = '/';
export const PATH_LOGIN = '/login';
export const PATH_DASHBOARD = '/u/dashboard';
export const PATH_ADMIN_ARTICLES = '/u/articles';
export const PATH_ADMIN_ARTICLE_EDIT = '/u/articles/edit/:id';
export const PATH_ADMIN_ARTICLE_CREATE = '/u/articles/create';
export const PATH_ABOUT = '/about';

/**
 *  Routes
 */
export const routes = [
  /********************
   * Public
   *******************/
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

  /********************
   * Protected
   *******************/
  {
    path: PATH_DASHBOARD,
    name: 'dashboard',
    component: Dashboard,
    meta: { layout: 'protected', requiresAuth: true }
  },

  /////////// Articles
  {
    path: PATH_ADMIN_ARTICLES,
    name: 'admin-articles',
    component: Articles,
    meta: { layout: 'protected', requiresAuth: true }
  },
  {
    path: PATH_ADMIN_ARTICLE_EDIT,
    name: 'admin-edit-article',
    component: EditArticle,
    meta: { layout: 'protected', requiresAuth: true }
  },
  {
    path: PATH_ADMIN_ARTICLE_CREATE,
    name: 'admin-create-article',
    component: CreateArticle,
    meta: { layout: 'protected', requiresAuth: true }
  }
];
