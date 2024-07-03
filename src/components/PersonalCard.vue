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
        <input type="text" id="last_name" v-model="person.last_name" class="form-input" />
      </div>
      <div :class="['form-group', { error: errors.first_name }]">
        <label class="form-label">Имя:</label>
        <input type="text" id="first_name" v-model="person.first_name" class="form-input" />
      </div>
      <div :class="['form-group', { error: errors.birth_date }]">
        <label class="form-label">Дата рождения:</label>
        <input type="date" id="birth_date" v-model="person.birth_date" class="form-input" />
      </div>
      <div :class="['form-group', { error: errors.department_name }]">
        <label class="form-label">Кафедра:</label>
        <select class="form-input" v-model="person.department_name">
          <option
            v-for="department in departments.departments"
            :key="department"
            :value="department"
          >
            {{ department }}
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
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const API_BASE_URL = 'http://127.0.0.1:8000'

const router = useRouter()

const departments = inject('departments')

const imageUrl = ref('/src/assets/image/non_photo.png')
const errors = ref({})

const props = defineProps({
  type: String
})

const person = ref({
  last_name: '',
  first_name: '',
  birth_date: '',
  department_name: '',
  photo: null
})

function onFileChange(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target.result
      person.value.photo = e.target.result.split(',')[1]
    }
    reader.readAsDataURL(file)
  } else {
    imageUrl.value = '/src/assets/image/non_photo.png'
  }
}

function validateForm() {
  errors.value = {
    photo: !person.value.photo,
    last_name: !person.value.last_name,
    first_name: !person.value.first_name,
    birth_date: !person.value.birth_date,
    department_name: !person.value.department_name
  }
  return !Object.values(errors.value).includes(true)
}

async function submitForm() {
  if (!validateForm()) {
    return
  }
  const payload = {
    last_name: person.value.last_name,
    first_name: person.value.first_name,
    birth_date: person.value.birth_date,
    department_name: person.value.department_name,
    photo: person.value.photo
  }
  try {
    await axios.post(`${API_BASE_URL}/${props.type}/`, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    router.push(`/${props.type}`)
  } catch (error) {
    console.error(error)
    if (error.response && error.response.data && error.response.data.detail) {
      alert(`Ошибка: ${error.response.data.detail}`)
    } else {
      alert(error)
    }
  }
}

function cancel() {
  router.push(`/${props.type}`)
}
</script>
