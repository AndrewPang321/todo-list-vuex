import Vue from 'vue';
import Router from 'vue-router';
import { auth } from '@/api/firebase';
import Home from './components/Home.vue';
import Login from './components/Login.vue';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: auth
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    auth.onAuthStateChanged(user => {
      if (user) {
        next();
      } else {
        next('/login');
      }
    });
  } else {
    auth.onAuthStateChanged(user => {
      if (user) {
        next('/');
      } else {
        next();
      }
    });
  }
})

export default router;
