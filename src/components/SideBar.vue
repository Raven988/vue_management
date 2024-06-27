<template>
  <div class="sidebar">
    <button
      @click="toggleFilter('teachers')"
      :class="{ 'transparent-btn': !filters.teachers }"
      class="sidebar-btn"
    >
      Преподаватели
    </button>
    <div v-show="filters.teachers" class="filter-content">
      <button @click="toggleFilter('department')" class="sidebar-btn">Кафедра</button>
      <div v-show="filters.department" class="filter">
        <div v-for="department in departments" :key="department.id">
          <input type="checkbox" :value="department.name" /> {{ department.name }}<br />
        </div>
      </div>
      <button @click="toggleFilter('groups')" class="sidebar-btn">Группы</button>
      <div v-show="filters.groups" class="filter">
        <div v-for="group in groups" :key="group.id">
          <input type="checkbox" :value="group.name" /> {{ group.name }}<br />
        </div>
      </div>
      <input class="input_text" type="text" placeholder="Имя" />
      <input class="input_text" type="text" placeholder="Фамилия" />
      <input class="input_text" type="text" placeholder="Отчество" />
      <button class="sidebar-btn-accept">Применить</button>
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
        <input type="checkbox" /> Кафедра 1<br />
        <input type="checkbox" /> Кафедра 2<br />
        <input type="checkbox" /> Кафедра 3<br />
        <input type="checkbox" /> Кафедра 4<br />
      </div>
      <button @click="toggleFilter('groups')" class="sidebar-btn">Группа</button>
      <div v-show="filters.groups" id="groups-filter" class="filter">
        <input type="checkbox" /> Группа 1<br />
        <input type="checkbox" /> Группа 2<br />
        <input type="checkbox" /> Группа 3<br />
        <input type="checkbox" /> Группа 4<br />
      </div>
      <input class="input_text" type="text" placeholder="Имя" />
      <input class="input_text" type="text" placeholder="Фамилия" />
      <input class="input_text" type="text" placeholder="Отчество" />
      <button class="sidebar-btn-accept">Применить</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import '../assets/styles/sidebar.css'

const filters = ref({
  teachers: false,
  students: false,
  department: false,
  groups: false
})

const departments = ref([])
const groups = ref([])

function toggleFilter(filterId) {
  if (filterId === 'teachers') {
    filters.value.students = false
    filters.value.department = false
    filters.value.groups = false
  } else if (filterId === 'students') {
    filters.value.teachers = false
    filters.value.department = false
    filters.value.groups = false
  }
  filters.value[filterId] = !filters.value[filterId]
}
async function fetchFiltersData() {
  try {
    // const [departmentsResponse, groupsResponse] = await Promise.all([
    const [departmentsResponse] = await Promise.all([
      axios.get('http://127.0.0.1:8000/departments/')
      // axios.get('http://127.0.0.1:8000/groups/')
    ])
    departments.value = departmentsResponse.data
    // groups.value = groupsResponse.data
  } catch (error) {
    console.error('Error fetching filter data:', error)
  }
}

onMounted(() => {
  fetchFiltersData()
})
</script>
