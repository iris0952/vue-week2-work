import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/review',
      component: () => import('../views/ReviewView.vue')
    },
    {
      path: '/async',
      component: () => import('../views/AsyncView.vue')
    },
    {
      path: '/todo',
      component: () => import('../views/TodoView.vue')
    },
    {
      path: '/week2',
      component: () => import('../views/Week2View.vue')
    }
  ]
})

export default router
