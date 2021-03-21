<template>
  <b-navbar toggleable="lg">
    <b-navbar-brand to="/">Simple Twitter Clone</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav> -->

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right v-if="isAuthenticated">
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{ user.username }}&nbsp;</em>
          </template>
          <!-- <b-dropdown-item href="#">Profile</b-dropdown-item> -->
          <b-dropdown-item href="#" @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item :to="{ name: ROUTE_NAME.SIGN_IN }" v-else
          >Sign In</b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useAuth, useLogout } from '../hooks/auth.hook';
import { ROUTE_NAME } from '../router';

export default defineComponent({
  setup() {
    const { isAuthenticated, user } = useAuth();
    const { error: logoutError, logout } = useLogout();
    return { isAuthenticated, user, logoutError, logout, ROUTE_NAME };
  },
});
</script>

<style module lang="scss"></style>
