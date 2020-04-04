import store from '../store';

export default (to, from, next) => {
  /**
   * Auth is required ..
   */
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    // If user is not logged in ..
    if (!store.state.user.isAuthenticated) {
      // Redirect to login
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });

      // User is authenticated
    } else {
      next();
    }

    /**
     * No auth required ...
     */
  } else {
    // If user is logged in and on login page ..
    if (store.state.user.isAuthenticated && to.name === 'login') {
      // Redirect to dashboard
      next({
        name: 'dashboard'
      });
    } else {
      next();
    }
  }
};
