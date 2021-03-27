import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { $axios } from '../util/$axios.util';
import Home from '../views/Home.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';

Vue.use(VueRouter);

export enum ROUTE_NAME {
  HOME = 'HOME',
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: ROUTE_NAME.HOME,
    component: Home,
    beforeEnter(_from, _to, next) {
      $axios
        .get('me')
        .then(() => next())
        .catch(() => next({ name: ROUTE_NAME.SIGN_IN }));
    },
  },
  {
    path: '/signin',
    name: ROUTE_NAME.SIGN_IN,
    component: SignIn,
  },
  {
    path: '/signup',
    name: ROUTE_NAME.SIGN_UP,
    component: SignUp,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
