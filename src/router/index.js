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
  {
    path: '/AddProject',
    name: 'AddProject',
    component: () => import('../views/AddProject.vue')
  },
  {
    path: '/SelectedProjects',
    name: 'SelectedProjects',
    component: () => import('../views/SelectedProjects.vue')
  },
  {
    path: '/ApprovedProject',
    name: 'ApprovedProject',
    component: () => import('../views/ApprovedProject.vue')
  },
  {
    path: '/Instructions',
    name: 'Instructions',
    component: () => import('../views/Instructions.vue')
  },
  {
    path: '/FillApplicationForm',
    name: 'FillApplicationForm',
    component: () => import('../views/FillApplicationForm.vue')
  },
  {
    path: '/ApplicationForm/:id',
    name: 'ApplicationForm',
    component: () => import('../views/ApplicationForm.vue')
  },
  {
    path: '/Journal',
    name: 'Journal',
    component: () => import('../views/Journal.vue')
  },
  {
    path: '/UserInfo',
    name: 'UserInfo',
    component: () => import('../views/UserInfo.vue')
  },
  {
    path: '/Students',
    name: 'Students',
    component: () => import('../views/Students.vue')
  },
  {
    path: '/AllocateStudent',
    name: 'AllocateStudent',
    component: () => import('../views/AllocateStudent.vue')
  },
  {
    path: '/TableOfStudents',
    name: 'TableOfStudents',
    component: () => import('../views/TableOfStudents.vue')
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
