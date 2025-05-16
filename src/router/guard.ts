import type { Router } from 'vue-router'

export const createRouterGuards = async (router: Router) => {
  router.beforeEach((to, from) => {})

  router.afterEach((to, from) => {})
}
