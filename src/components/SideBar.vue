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
        <input type="checkbox" /> Кафедра 1<br />
        <input type="checkbox" /> Кафедра 2<br />
        <input type="checkbox" /> Кафедра 3<br />
        <input type="checkbox" /> Кафедра 4<br />
      </div>
      <button @click="toggleFilter('groups')" class="sidebar-btn">Группы</button>
      <div v-show="filters.groups" class="filter">
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
import { ref } from 'vue'
import '../assets/styles/sidebar.css'

const filters = ref({
  teachers: false,
  students: false,
  department: false,
  subject: false,
  groups: false
})

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
</script>
