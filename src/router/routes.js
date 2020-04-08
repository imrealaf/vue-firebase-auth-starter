import { Login, Home } from '../views';
import {
  Dashboard,
  ViewAccount,
  Articles,
  EditArticle,
  CreateArticle
} from '../views/protected';

/**
 *  Route paths
 */
export const PATH_HOME = `/`;
export const PATH_ADMIN = `/u`;
export const PATH_LOGIN = `/login`;
export const PATH_ABOUT = `/about`;
export const PATH_ADMIN_DASHBOARD = `${PATH_ADMIN}/dashboard`;
export const PATH_ADMIN_SETTINGS = `${PATH_ADMIN}/settings`;
export const PATH_ADMIN_ACCOUNT = `${PATH_ADMIN}/account`;
export const PATH_ADMIN_ARTICLES = `${PATH_ADMIN}/articles`;
export const PATH_ADMIN_ARTICLE_EDIT = `${PATH_ADMIN}/articles/edit/:id`;
export const PATH_ADMIN_ARTICLE_CREATE = `${PATH_ADMIN}/articles/create`;

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
    path: PATH_ADMIN_DASHBOARD,
    name: 'dashboard',
    component: Dashboard,
    meta: { layout: 'protected', requiresAuth: true }
  },

  /////////// Profile
  {
    path: PATH_ADMIN_ACCOUNT,
    name: 'admin-account',
    component: ViewAccount,
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
  },

  /////////// Catch all
  {
    path: `${PATH_ADMIN}/*`,
    redirect: PATH_ADMIN_DASHBOARD
  }
];
