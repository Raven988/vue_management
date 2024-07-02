<template>
  <div class="person_card">
    <h2 class="lable">Редактирование личной карточки</h2>
    <div class="form-container">
      <div class="mid">
        <div :class="['photo', { error: errors.photo }]">
          <img :src="imageSrc" v-if="imageSrc" class="preview" />
          <input type="file" @change="onFileChange" class="file-input" />
        </div>
        <div v-if="route.params.type_and_id.includes('students')" class="mid_table">
          <table>
            <thead>
              <tr>
                <th>Предмет</th>
                <th>Оценка</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="subject in studentGrades" :key="subject">
                <td>{{ subject.subject_name }}</td>
                <td>
                  <select v-model="subject.grade">
                    <option v-for="grade in availableGrades.grades" :key="grade">
                      {{ grade }}
                    </option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div :class="['form-group', { error: errors.last_name }]">
        <label class="form-label">Фамилия:</label>
        <input type="text" id="last_name" v-model="personData.last_name" class="form-input" />
      </div>
      <div :class="['form-group', { error: errors.first_name }]">
        <label class="form-label">Имя:</label>
        <input type="text" id="first_name" v-model="personData.first_name" class="form-input" />
      </div>
      <div :class="['form-group', { error: errors.birth_date }]">
        <label class="form-label">Дата рождения:</label>
        <input
          type="date"
          id="birth_date"
          :value="personData.birth_date.split('T')[0]"
          ref="birthDateInput"
          class="form-input"
        />
      </div>
      <div class="form-group">
        <label class="form-label">Кафедра:</label>
        <input disabled v-model="personData.department_name" class="form-input" />
      </div>
      <div class="form-buttons">
        <button @click="submitForm" class="form-btn">Применить</button>
        <button @click="cancel" class="form-btn cancel-btn">Отменить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import '../assets/styles/card.css'
import { ref, inject, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()
const personData = inject('personData')
const availableGrades = inject('availableGrades')
const studentGrades = ref([])
const birthDateInput = ref(null)
const imageSrc = ref(null)
const errors = ref({})

async function fetchGrades() {
  if (route.params.type_and_id.includes('students')) {
    try {
      const personResponse = await axios.get(
        `http://127.0.0.1:8000/${route.params.type_and_id}/grades`
      )
      studentGrades.value = personResponse.data
    } catch (error) {
      console.error(error)
    }
  }
}
onMounted(fetchGrades)

function onFileChange(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageSrc.value = e.target.result
      personData.value.photo = e.target.result.split(',')[1]
    }
    reader.readAsDataURL(file)
  }
}

function validateForm() {
  errors.value = {
    photo: !personData.value.photo,
    last_name: !personData.value.last_name,
    first_name: !personData.value.first_name,
    birth_date: !birthDateInput.value.value,
    department_name: !personData.value.department_name
  }
  return !Object.values(errors.value).includes(true)
}

async function submitForm() {
  if (!validateForm()) {
    return
  }
  const payloadPerson = {
    last_name: personData.value.last_name,
    first_name: personData.value.first_name,
    birth_date: birthDateInput.value.value,
    department_name: personData.value.department_name,
    photo: personData.value.photo
  }
  const payloadGrades = {
    grades: studentGrades.value
  }
  try {
    await axios.put(`http://127.0.0.1:8000/${route.params.type_and_id}`, payloadPerson, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (route.params.type_and_id.includes('students')) {
      await axios.put(`http://127.0.0.1:8000/${route.params.type_and_id}/grades`, payloadGrades, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
    router.push(`/${route.params.type_and_id.split('/')[0]}`)
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
  router.push(`/${route.params.type_and_id.split('/')[0]}`)
}

function dataURItoBlob(dataURI) {
  const ab = new ArrayBuffer(dataURI.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < dataURI.length; i++) {
    ia[i] = dataURI.charCodeAt(i)
  }
  return new Blob([ab], { type: 'image/png' })
}

imageSrc.value = URL.createObjectURL(dataURItoBlob(atob(`${personData.value.photo}`)))
</script>
