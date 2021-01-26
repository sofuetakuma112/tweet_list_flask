import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import LandingPage from "@/components/LandingPage.vue";
import Top from "@/components/Top.vue";
import HelloWorld from "@/components/HelloWorld.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: LandingPage
  },
  { path: "/top",
    component: Top
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
