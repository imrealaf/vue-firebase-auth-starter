import { PATH_ADMIN_DASHBOARD, PATH_ADMIN_ARTICLES } from '@/router/routes';

export const protectedNav = [
  {
    icon: 'mdi-apps',
    title: 'Dashboard',
    to: PATH_ADMIN_DASHBOARD
  },
  {
    icon: 'mdi-newspaper',
    title: 'Articles',
    to: PATH_ADMIN_ARTICLES
  },
  {
    icon: 'mdi-format-list-bulleted-square',
    title: 'Cateogies',
    to: PATH_ADMIN_ARTICLES
  }
];
