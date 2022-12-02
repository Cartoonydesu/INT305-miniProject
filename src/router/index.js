import { createRouter, createWebHistory } from 'vue-router'
import ListMenu from '../views/ListMenu.vue'
import SetMenu from '../views/SetMenu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/menu',
      name: 'menu',
      component: ListMenu
    },
    {
      path: '/set-menu',
      name: 'set-menu',
      component: SetMenu
    }
  ]
})

export default router