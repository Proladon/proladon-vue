import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { createRouterGuards } from './guard'
import type { IModuleType } from './types'
import { baseRoutes } from './modules/base'

const modules = import.meta.glob<IModuleType>('./modules/**/*.ts', { eager: true })

const routeModuleList: RouteRecordRaw[] = Object.keys(modules).reduce(
  (list: RouteRecordRaw[], key) => {
    const mod = modules[key].default ?? {}
    const modList = Array.isArray(mod) ? [...mod] : [mod]
    return [...list, ...modList]
  },
  []
)

export const asyncRoutes = [...routeModuleList]
export const constantRoutes: RouteRecordRaw[] = [...baseRoutes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes]
})

createRouterGuards(router)

export default router
