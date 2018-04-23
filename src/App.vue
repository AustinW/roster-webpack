<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import Roster from './views/Roster.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'app',

  data() {
    return {};
  },

  components: {
    Roster, Navbar,
  },
};
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap';
@import '~bootstrap-vue/dist/bootstrap-vue.min.css';

html, body {
  height: 100%;
}

body {
  font-size: 14px;
  color: #444;
}

.navbar-laravel {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
