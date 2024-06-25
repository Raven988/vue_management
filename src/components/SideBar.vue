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
      <button @click="toggleFilter('subject')" class="sidebar-btn">Предмет</button>
      <div v-show="filters.subject" class="filter">
        <input type="checkbox" /> Предмет 1<br />
        <input type="checkbox" /> Предмет 2<br />
        <input type="checkbox" /> Предмет 3<br />
        <input type="checkbox" /> Предмет 4<br />
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
    filters.value.subject = false
    filters.value.groups = false
  } else if (filterId === 'students') {
    filters.value.teachers = false
    filters.value.department = false
    filters.value.subject = false
    filters.value.groups = false
  }
  filters.value[filterId] = !filters.value[filterId]
}
</script>

<style scoped>
.sidebar {
  background-image: url('/src/assets/background.png');
  width: 256px;
  padding: 20px;
  padding-top: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.sidebar-btn,
.sidebar-btn-accept {
  min-height: 33px;
  min-width: 190px;
  margin-top: 4px;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  text-align: left;
  float: right;
  transition: transform 0.2s ease-in-out;
}

.sidebar-btn-accept {
  background-color: green;
  text-align: center;
  color: white;
  border: 1px solid black;
}

.filter {
  max-height: 100px;
  width: 150px;
  border: 1px solid #7e7d7d;
  overflow-y: scroll;
  padding: 10px;
  float: right;
  font-size: small;
}

.input_text {
  height: 33px;
  width: 180px;
  border-radius: 10px;
  float: right;
  margin-top: 4px;
  transition: transform 0.2s ease-in-out;
}

.input_text:hover,
.sidebar-btn-accept:hover,
.sidebar-btn:hover {
  transform: translateY(-2px);
}
</style>
