<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
    <div class="row">
      <registration-autofill></registration-autofill>
    </div>
    <div class="row">
      <level-autofill></level-autofill>
    </div>
  </div>
</template>

<script>
import Roster from './views/Roster.vue';
import RegistrationAutofill from './components/RegistrationAutofill.vue';
import LevelAutofill from './components/LevelAutofill.vue';
import Navbar from './components/Navbar.vue';

export default {
  name: 'app',

  data() {
    return {};
  },

  components: {
    Roster, RegistrationAutofill, LevelAutofill, Navbar,
  },
};
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap';
@import '~bootstrap-vue/dist/bootstrap-vue.min.css';

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

body {
  font-size: 14px;
  color: #444;
}
</style>
