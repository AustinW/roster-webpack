import Vue from 'vue';
import Router from 'vue-router';
import Roster from './views/Roster.vue';

import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'roster',
      component: Roster,
      props: {
        columns: [
          'active',
          'usag_id',
          'first_name',
          'last_name',
          'gender',
          'birthdate',
          'age',
          'tra_level',
          'dmt_level',
          'tum_level',
        ],
      },
    },

    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
  ],
});
