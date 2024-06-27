<template>
  <div class="person_card">
    <h2 class="lable">Личная карточка</h2>
    <div class="form-container">
      <div :class="['photo', { error: errors.photo }]">
        <img :src="imageUrl" v-if="imageUrl" class="preview" />
        <input type="file" @change="onFileChange" class="file-input" />
      </div>
      <div :class="['form-group', { error: errors.last_name }]">
        <label class="form-label">Фамилия:</label>
        <input type="text" id="last_name" v-model="teacher.last_name" class="form-input" />
      </div>
      <div :class="['form-group', { error: errors.first_name }]">
        <label class="form-label">Имя:</label>
        <input type="text" id="first_name" v-model="teacher.first_name" class="form-input" />
      </div>
      <div :class="['form-group', { error: errors.birth_date }]">
        <label class="form-label">Дата рождения:</label>
        <input type="date" id="birth_date" v-model="teacher.birth_date" class="form-input" />
      </div>
      <div :class="['form-group', { error: errors.department_name }]">
        <label class="form-label">Кафедра:</label>
        <select class="form-input" v-model="teacher.department_name">
          <option v-for="department in departments" :key="department" :value="department.name">
            {{ department.name }}
          </option>
        </select>
      </div>
      <div class="form-buttons">
        <button @click="submitForm" class="form-btn">Применить</button>
        <button @click="cancel" class="form-btn cancel-btn">Отменить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import '../assets/styles/card.css'

const router = useRouter()
const imageUrl = ref('/src/assets/image/non_photo.png')
const departments = ref([])

function onFileChange(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target.result
      teacher.value.photo = e.target.result.split(',')[1]
    }
    reader.readAsDataURL(file)
  } else {
    imageUrl.value = '/src/assets/image/non_photo.png'
  }
}

const teacher = ref({
  last_name: '',
  first_name: '',
  birth_date: '',
  department_name: '',
  photo: null
})

const errors = ref({})

function validateForm() {
  errors.value = {}
  if (!teacher.value.photo) {
    errors.value.photo = true
  }
  if (!teacher.value.last_name) {
    errors.value.last_name = true
  }
  if (!teacher.value.first_name) {
    errors.value.first_name = true
  }
  if (!teacher.value.birth_date) {
    errors.value.birth_date = true
  }
  if (!teacher.value.department_name) {
    errors.value.department_name = true
  }
  return Object.keys(errors.value).length === 0
}
async function submitForm() {
  if (!validateForm()) {
    return
  }

  const payload = {
    last_name: teacher.value.last_name,
    first_name: teacher.value.first_name,
    birth_date: teacher.value.birth_date,
    department_name: teacher.value.department_name,
    photo: teacher.value.photo
  }

  try {
    const response = await axios.post('http://127.0.0.1:8000/instructors/', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log('Данные успешно сохранены', response.data)
    router.push({ name: 'TablePage' })
  } catch (error) {
    console.error(error)
  }
}

function cancel() {
  router.push({ name: 'TablePage' })
}

async function fetchFiltersData() {
  try {
    const [departmentsResponse] = await Promise.all([
      axios.get('http://127.0.0.1:8000/departments/')
    ])
    departments.value = departmentsResponse.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchFiltersData()
})
</script>
