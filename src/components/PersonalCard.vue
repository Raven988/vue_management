<template>
  <div class="teacher_card">
    <h2 class="lable">Личная карточка</h2>
    <div class="middle">
      <div class="photo">
        <img :src="imageUrl" v-if="imageUrl" class="preview" />
        <input type="file" @change="onFileChange" class="file-input" />
      </div>
      <div class="department">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Кафедра</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="department in departments" :key="department">
              <td><input type="checkbox" :value="department" v-model="teacher.department" /></td>
              <td>{{ department }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="form-container">
      <div class="form-group">
        <label for="lastName" class="form-label">Фамилия:</label>
        <input type="text" id="lastName" v-model="teacher.lastName" class="form-input" />
      </div>
      <div class="form-group">
        <label for="firstName" class="form-label">Имя:</label>
        <input type="text" id="firstName" v-model="teacher.firstName" class="form-input" />
      </div>
      <div class="form-group">
        <label for="middleName" class="form-label">Отчество:</label>
        <input type="text" id="middleName" v-model="teacher.middleName" class="form-input" />
      </div>
      <div class="form-group">
        <label for="birthDate" class="form-label">Дата рождения:</label>
        <input type="date" id="birthDate" v-model="teacher.birthDate" class="form-input" />
      </div>
      <div class="form-buttons">
        <button @click="submitForm" class="form-btn">Применить</button>
        <button @click="cancel" class="form-btn cancel-btn">Отменить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import '../assets/styles/card.css'

const router = useRouter()

const imageUrl = ref('/src/assets/image/non_photo.png')

const teacher = ref({
  lastName: '',
  firstName: '',
  middleName: '',
  birthDate: '',
  department: [],
  image: null
})

const departments = [
  'Кафедра кибербезопасности',
  'Кафедра прикладной информатики',
  'Кафедра общей физики',
  'Кафедра теоретической физики',
  'Кафедра экспериментальной физики',
  'Кафедра математического анализа',
  'Кафедра психологии',
  'Кафедра конфликтологии',
  'Кафедра религиоведения',
  'Кафедра истории и теории культуры',
  'Кафедра этики и эстетики'
]

function onFileChange(event) {
  const file = event.target.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target.result
    }
    reader.readAsDataURL(file)
    teacher.value.image = file
  } else {
    imageUrl.value = '/src/assets/image/non_photo.png'
  }
}

function cancel() {
  router.push({ name: 'MainTable' })
}

function submitForm() {
  const formData = new FormData()
  formData.append('lastName', teacher.value.lastName)
  formData.append('firstName', teacher.value.firstName)
  formData.append('middleName', teacher.value.middleName)
  formData.append('birthDate', teacher.value.birthDate)
  formData.append('department', JSON.stringify(teacher.value.department))
  if (teacher.value.image) {
    formData.append('image', teacher.value.image)
  }
  console.log('Форма отправлена', teacher.value)
  router.push({ name: 'MainTable' })
  // axios.post('/api/teachers', formData)
  //   .then(response => {
  //     console.log('Данные успешно сохранены', response.data);
  //     router.push({ name: 'MainTable' });
  //   })
  //   .catch(error => {
  //     console.error('Ошибка при сохранении данных', error);
  //   });
}
</script>
