<template>
  <div class="sidebar">
    <button
      @click="toggleFilter('instructors')"
      :class="{ 'transparent-btn': !filters.instructors }"
      class="sidebar-btn"
    >
      Преподаватели
    </button>
    <div v-show="filters.instructors" class="filter-content">
      <button @click="toggleFilter('department')" class="sidebar-btn">Кафедра</button>
      <div v-show="filters.department" class="filter">
        <div v-for="department in departments.departments" :key="department.id">
          <input v-model="selectedDepartments" type="checkbox" :value="department" />
          {{ department }}<br />
        </div>
      </div>
      <button @click="toggleFilter('group')" class="sidebar-btn">Группы</button>
      <div v-show="filters.group" class="filter"></div>
      <input v-model="firstName" class="input_text" type="text" placeholder="Имя" />
      <input v-model="lastName" class="input_text" type="text" placeholder="Фамилия" />
      <button @click="filterPersons('instructors')" class="sidebar-btn-accept">Применить</button>
    </div>

    <button
      @click="toggleFilter('students')"
      :class="{ 'transparent-btn': !filters.students }"
      class="sidebar-btn"
    >
      Студенты
    </button>
    <div v-show="filters.students" class="filter-content">
      <button @click="toggleFilter('department')" class="sidebar-btn">Кафедра</button>
      <div v-show="filters.department" class="filter">
        <div v-for="department in departments.departments" :key="department.id">
          <input v-model="selectedDepartments" type="checkbox" :value="department" /> {{ department
          }}<br />
        </div>
      </div>
      <button @click="toggleFilter('group')" class="sidebar-btn">Группа</button>
      <div v-show="filters.group" class="filter"></div>
      <input v-model="firstName" class="input_text" type="text" placeholder="Имя" />
      <input v-model="lastName" class="input_text" type="text" placeholder="Фамилия" />
      <button @click="filterPersons('students')" class="sidebar-btn-accept">Применить</button>
    </div>
  </div>
</template>

<script setup>
import '../assets/styles/sidebar.css'
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const departments = inject('departments')

const filters = ref({
  instructors: false,
  students: false,
  department: false,
  group: false
})

function toggleFilter(filterId) {
  if (filterId === 'instructors') {
    clearFilters()
    filters.value.students = false
    router.push({ name: 'Instructors' })
  } else if (filterId === 'students') {
    clearFilters()
    filters.value.instructors = false
    router.push({ name: 'Students' })
  }
  filters.value[filterId] = !filters.value[filterId]
}
function clearFilters() {
  filters.value.department = false
  filters.value.group = false
  selectedDepartments.value = []
  firstName.value = ''
  lastName.value = ''
}

const selectedDepartments = ref([])
const firstName = ref('')
const lastName = ref('')
const fetchPersonsData = inject('fetchPersonsData')
function filterPersons(filterId) {
  const query = {
    departments: selectedDepartments.value,
    firstName: firstName.value,
    lastName: lastName.value
  }
  fetchPersonsData(filterId, query)
}
</script>
