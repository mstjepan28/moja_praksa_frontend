import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/Projects',
    name: 'Projects',
    component: () => import('../views/Projects.vue')
  },
  {
    path: '/ProjectInfo/:id',
    name: 'ProjectInfo',
    component: () => import('../views/ProjectInfo.vue')
  },
  {
    path: '/Partners',
    name: 'Partners',
    component: () => import('../views/Partners.vue')
  },
  {
    path: '/PartnersInfo/:id',
    name: 'PartnersInfo',
    component: () => import('../views/PartnersInfo.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,

  scrollBehavior(){
    return { x: 0, y: 0 }
  }
})

export default router
