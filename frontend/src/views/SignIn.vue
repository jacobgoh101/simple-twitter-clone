<template>
  <div class="row mt-5 pt-5">
    <div class="col"></div>
    <div class="col">
      <h1 class="text-center pb-5">Sign In</h1>
      <b-alert :show="!!error" variant="danger">
        Invalid username and/or password
      </b-alert>
      <form @submit.prevent="handleFormSubmit">
        <div class="form-group">
          <label for="email">Username:</label>
          <input
            type="text"
            class="form-control"
            placeholder="Enter username"
            id="username"
            v-model="username"
          />
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input
            type="password"
            class="form-control"
            placeholder="Enter password"
            id="pwd"
            v-model="password"
          />
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>

      <p class="pt-4 text-center">
        Don't have an account yet?
        <router-link :to="{ name: ROUTE_NAME.SIGN_UP }">Sign Up</router-link>
      </p>
    </div>
    <div class="col"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { useAuthenticatedUserHandler, useLogin } from '../hooks/auth.hook';
import { ROUTE_NAME } from '../router';

export default defineComponent({
  setup() {
    const username = ref('');
    const password = ref('');

    useAuthenticatedUserHandler();
    const { error, login } = useLogin();

    const handleFormSubmit = () =>
      login({
        username: username.value,
        password: password.value,
      });

    return { username, password, handleFormSubmit, error, ROUTE_NAME };
  },
});
</script>
