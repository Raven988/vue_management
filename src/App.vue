<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, provide } from 'vue'
import axios from 'axios'
import SideBar from '@/components/SideBar.vue'

const router = useRouter()

const departments = ref([])
const availableGrades = ref([])

async function fetchFiltersData() {
  try {
    const [departmentsResponse, gradesResponse] = await Promise.all([
      axios.get('http://127.0.0.1:8000/departments/'),
      axios.get('http://127.0.0.1:8000/grades/')
    ])
    departments.value = departmentsResponse.data
    availableGrades.value = gradesResponse.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchFiltersData()
})
provide('departments', departments)
provide('availableGrades', availableGrades)

const personData = ref([])
async function getPerson(idPerson) {
  try {
    const personResponse = await axios.get(`http://127.0.0.1:8000/${idPerson}`)
    personData.value = personResponse.data
    router.push({ name: 'editPersonalCard', params: { type_and_id: `${idPerson}` } })
  } catch (error) {
    console.error(error)
  }
}
provide('personData', personData)
provide('getPerson', getPerson)

const persons = ref([])
const query = {
  departments: [],
  firstName: '',
  lastName: ''
}
async function fetchPersonsData(type, filter = query) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/${type}/?page=1&size=40`)
    persons.value = response.data
    if (filter.firstName) {
      persons.value = persons.value.filter((name) => {
        return name.first_name.toLowerCase().includes(filter.firstName.toLowerCase())
      })
    }
    if (filter.lastName) {
      persons.value = persons.value.filter((name) => {
        return name.last_name.toLowerCase().includes(filter.lastName.toLowerCase())
      })
    }
    if (filter.departments.length != 0) {
      persons.value = persons.value.filter((name) => {
        return filter.departments.some((department) => {
          return name.department_name === department
        })
      })
    }
  } catch (error) {
    console.error(error)
  }
}

provide('fetchPersonsData', fetchPersonsData)
provide('persons', persons)
</script>

<template>
  <SideBar />
  <div class="main_content">
    <router-view />
  </div>
</template>
