import PersonalCard from '@/components/PersonalCard.vue'
import MainWindow from '@/components/MainHeader.vue'
import EditPersonalCard from '@/components/EditPersonCard.vue'
import HomePage from '@/components/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/instructors',
    name: 'Instructors',
    component: MainWindow,
    props: { type: 'instructors', add: 'Нанять', del: 'Уволить' }
  },
  {
    path: '/students',
    name: 'Students',
    component: MainWindow,
    props: { type: 'students', add: 'Зачислить', del: 'Отчислить' }
  },
  {
    path: '/instructors_card',
    name: 'instructorsCard',
    component: PersonalCard,
    props: { type: 'instructors' }
  },
  {
    path: '/students_card',
    name: 'studentsCard',
    component: PersonalCard,
    props: { type: 'students' }
  },
  {
    path: '/edit_card:type_and_id',
    name: 'editPersonalCard',
    component: EditPersonalCard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
