<template>
    <form class="form-login mt-4 text-center">
        <img class="mb-4" src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="email" class="sr-only">Email address</label>
        <input type="email" id="email" class="form-control" placeholder="Email" required autofocus>
        <label for="password" class="sr-only">Password</label>
        <input type="password" id="password" class="form-control" placeholder="Password" required>
        <div class="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" @click="login">Login</button>
        <p class="mt-3">
            Don't have an account? You can <router-link to="register">create one</router-link>.
        </p>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
</template>

<script>
export default {
  name: 'login',

  methods: {
    login() {
      this.$router.replace('roster');
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

.form-login {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
}
.form-login .checkbox {
    font-weight: 400;
}
.form-login .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}
.form-login .form-control:focus {
    z-index: 2;
}
.form-login input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}
.form-login input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
</style>
