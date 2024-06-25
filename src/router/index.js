import TeacherCard from '@/components/TeacherCard.vue'
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
    name: 'TeacherCard',
    component: TeacherCard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
