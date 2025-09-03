import { createRouter, createWebHashHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import ToDoListView from '../views/ToDoListView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/signup',
    },
    {
      path: '/login',
      component: LoginView,
    },
    {
      path: '/signup',
      component: SignUpView,
    },
    {
      path: '/todo',
      component: ToDoListView,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/signup',
    },
  ],
})

// 路由守衛
router.beforeEach((to, from, next) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)mycookie\s*=\s*([^;]*).*$)|^.*$/, '$1')

  if (to.meta.requiresAuth && !token) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/signup') && token) {
    next('/todo')
  } else {
    next()
  }
})

export default router
