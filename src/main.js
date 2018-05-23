import Vue from 'vue';
import firebase from 'firebase';

import App from './App.vue';
import router from './router';
import { store } from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

// Initialize Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyBJyceqmdMLQPv6Qlok49o5QeHJrd-NIb0',
  authDomain: 'roster-198418.firebaseapp.com',
  databaseURL: 'https://roster-198418.firebaseio.com',
  projectId: 'roster-198418',
  storageBucket: 'roster-198418.appspot.com',
  messagingSenderId: '804043831823',
});

firebase.auth().onAuthStateChanged(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});

require('./plugins');
