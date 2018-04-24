<template>
    <form class="form-register text-center">
        <img class="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please register</h1>
        <label for="email" class="sr-only">Email address</label>
        <input
                type="email"
                id="email"
                v-model="email"
                class="form-control"
                placeholder="Email" required autofocus>
        <label for="password" class="sr-only">Password</label>
        <input
                type="password"
                id="password"
                v-model="password"
                class="form-control"
                placeholder="Password" required>
        <div class="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <button
            class="btn btn-lg btn-primary btn-block"
            type="submit"
            @click.prevent="register">
            Register
        </button>
        <p class="mt-3">or go back to <router-link to="/login">login</router-link>.</p>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'register',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    register() {
      console.log(this.email, this.password);
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
        console.log(user);
        alert('user created successfully!');
      });
    },
  },
};
</script>

<style scoped>
body {
    font-size: 14px;
    color: #444;
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-align: center;
    -ms-flex-pack: center;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
}

.form-register {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 200px auto 0 auto;
}
.form-register .checkbox {
    font-weight: 400;
}
.form-register .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
.form-register .form-control:focus {
    z-index: 2;
}
.form-register input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-register input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
