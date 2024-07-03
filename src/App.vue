<template>
  <SideBar />
  <div class="main_content">
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted, provide } from 'vue'
import axios from 'axios'
import SideBar from '@/components/SideBar.vue'

const API_BASE_URL = 'http://127.0.0.1:8000'

const router = useRouter()

const departments = ref([])
const availableGrades = ref([])
const personData = ref([])
const persons = ref([])

const query = {
  departments: [],
  firstName: '',
  lastName: ''
}

async function fetchFiltersData() {
  try {
    const [departmentsResponse, gradesResponse] = await Promise.all([
      axios.get(`${API_BASE_URL}/departments/`),
      axios.get(`${API_BASE_URL}/grades/`)
    ])
    departments.value = departmentsResponse.data
    availableGrades.value = gradesResponse.data
  } catch (error) {
    console.error(error)
  }
}

async function getPerson(idPerson) {
  try {
    const personResponse = await axios.get(`${API_BASE_URL}/${idPerson}`)
    personData.value = personResponse.data
    router.push({ name: 'editPersonalCard', params: { type_and_id: `${idPerson}` } })
  } catch (error) {
    console.error(error)
  }
}

async function fetchPersonsData(type, filter = query, page = 1) {
  try {
    const response = await axios.get(`${API_BASE_URL}/${type}/?page=${page}&size=100`)
    persons.value = response.data
    applyFilters(filter)
  } catch (error) {
    console.error(error)
  }
}

function applyFilters(filter) {
  persons.value = persons.value.filter((person) => {
    const matchesFirstName = filter.firstName
      ? person.first_name.toLowerCase().includes(filter.firstName.toLowerCase())
      : true

    const matchesLastName = filter.lastName
      ? person.last_name.toLowerCase().includes(filter.lastName.toLowerCase())
      : true

    const matchesDepartment =
      filter.departments.length > 0 ? filter.departments.includes(person.department_name) : true

    return matchesFirstName && matchesLastName && matchesDepartment
  })
}

onMounted(() => {
  fetchFiltersData()
})

provide('departments', departments)
provide('availableGrades', availableGrades)
provide('personData', personData)
provide('getPerson', getPerson)
provide('fetchPersonsData', fetchPersonsData)
provide('persons', persons)
</script>
