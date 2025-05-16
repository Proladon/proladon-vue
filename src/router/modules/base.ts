import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

export const baseRoutes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/about', name: 'about', component: () => import('@/views/AboutView.vue') }
  // {
  //   path: '/404',
  //   name: 'Notfound',
  //   component: () => import('@/views/NotFound/NotFound.vue'),
  //   meta: {
  //     layout: routerLayouts.fullPage,
  //     hidden: true,
  //     isPublic: true,
  //   },
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404',
  //   meta: {
  //     layout: layoutType.fullPage,
  //     hidden: true,
  //     isPublic: true
  //   }
  // }
]
