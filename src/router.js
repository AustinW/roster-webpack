import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Roster from './views/Roster.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'roster',
      component: Roster,
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { currentUser } = firebase.auth();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('roster');
  else next();
});

export default router;
