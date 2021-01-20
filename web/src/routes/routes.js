import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../view/Home'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../view/CreateAccount')

  },
  {
    path: '/completeProfile',
    name: 'completeProfile',
    component: () => import('../view/CompleteProfile')
  }
]
const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL), ssr路由
  history: createWebHashHistory(process.env.BASE_URL), // hash 路由
  routes
})

export default router
