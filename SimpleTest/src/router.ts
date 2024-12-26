import { createRouter, createWebHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes'

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

if (import.meta.hot) { 
  handleHotUpdate(router) 
}

const whiteList = ['/login/pwd-login', '/login/register', '/login/reset-pwd']

router.beforeEach((to, _, next) => {
  const isLoggedIn = !!localStorage.getItem('userLoginToken')

  if (isLoggedIn) {
    next()
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login/pwd-login')
    }
  }
})

