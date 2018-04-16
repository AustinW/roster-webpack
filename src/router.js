import Vue from 'vue';
import Router from 'vue-router';
import Roster from './views/Roster.vue';
import About from './views/About.vue';

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
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});
