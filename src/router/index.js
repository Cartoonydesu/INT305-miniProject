import { createRouter, createWebHistory } from 'vue-router'
import ListMenu from '../views/ListMenu.vue'
import ListSetMenu from '../views/ListSetMenu.vue'
import ListOrder from '../views/ListOrder.vue'

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
      component: ListSetMenu
    },
    {
      path: '/order',
      name: 'order',
      component: ListOrder
    }
  ]
})

export default router