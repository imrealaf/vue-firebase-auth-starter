import store from '../store';

export default (to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    console.log(store.state.user.isAuthenticated);
    if (!store.state.user.isAuthenticated) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
    //next();
  } else {
    next(); // make sure to always call next()!
  }
};
