<template>
  <div class="row mt-5 pt-5">
    <div class="col"></div>
    <div class="col">
      <h1 class="text-center pb-5">Sign Up</h1>
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
          <label for="email">Email address:</label>
          <input
            type="email"
            class="form-control"
            placeholder="Enter email"
            id="email"
            v-model="email"
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
        Already have an account?
        <router-link :to="{ name: ROUTE_NAME.SIGN_IN }">Sign In</router-link>
      </p>
    </div>
    <div class="col"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { useSignup } from '../hooks/auth.hook';
import { ROUTE_NAME } from '../router';

export default defineComponent({
  setup() {
    const username = ref('');
    const email = ref('');
    const password = ref('');

    const { error, signup } = useSignup();

    const handleFormSubmit = () =>
      signup({
        username: username.value,
        email: email.value,
        password: password.value,
      });

    return { username, email, password, handleFormSubmit, error, ROUTE_NAME };
  },
});
</script>
