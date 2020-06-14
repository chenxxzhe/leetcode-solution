// import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import Vue from 'vue'
import Router, { RouteConfig } from 'vue-router'
import MainLayout from '@/views/MainLayout.vue'

Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        name: 'home',
        path: '',
        component: () => import('@/views/Home.vue'),
      },
      {
        name: 'problems',
        path: 'problems/:level/:id',
        component: () => import('@/views/Problems.vue'),
        props: true,
      },
    ],
  },
  {
    path: '*',
    component: () => import('@/views/404.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
]

// const router = createRouter({
//   history: createWebHashHistory(),
//   strict: true,
//   routes,
// })

const router = new Router({
  mode: 'hash',
  routes,
})

export default router
