import { PATH_DASHBOARD, PATH_ABOUT } from '@/router/routes';

export const protectedNav = [
  {
    icon: 'mdi-apps',
    title: 'Dashboard',
    to: PATH_DASHBOARD
  },
  {
    icon: 'mdi-chart-bubble',
    title: 'About',
    to: PATH_ABOUT
  }
];
