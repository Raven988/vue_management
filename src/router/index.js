import PersonalCard from '@/components/PersonalCard.vue'
import MainTable from '@/pages/TablePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'MainTable',
    component: MainTable
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
