import PersonalCard from '@/components/PersonalCard.vue'
import TablePage from '@/pages/TablePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'TablePage',
    component: TablePage
  },
  {
    path: '/card',
    name: 'PersonalCard',
    component: PersonalCard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
