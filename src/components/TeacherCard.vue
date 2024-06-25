<template>
  <div>
    <h2>Карточка преподавателя</h2>
    <form @submit.prevent="submitForm">
      <div>
        <img :src="teacherImage" alt="Teacher" />
      </div>
      <div>
        <label>Кафедра</label>
        <div>
          <label v-for="department in departments" :key="department">
            <input type="checkbox" :value="department" v-model="teacher.department" />
            {{ department }}
          </label>
        </div>
      </div>
      <div>
        <label>Предмет</label>
        <div>
          <label v-for="subject in subjects" :key="subject">
            <input type="checkbox" :value="subject" v-model="teacher.subjects" />
            {{ subject }}
          </label>
        </div>
      </div>
      <div>
        <label>Фамилия</label>
        <input v-model="teacher.lastName" placeholder="Фамилия" />
      </div>
      <div>
        <label>Имя</label>
        <input v-model="teacher.firstName" placeholder="Имя" />
      </div>
      <div>
        <label>Отчество</label>
        <input v-model="teacher.middleName" placeholder="Отчество" />
      </div>
      <div>
        <label>Дата рождения</label>
        <input v-model="teacher.birthDate" placeholder="Дата рождения" />
      </div>
      <button type="submit">Ок</button>
      <button @click="cancel">Отмена</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      teacher: {
        lastName: '',
        firstName: '',
        middleName: '',
        birthDate: '',
        department: [],
        subjects: []
      },
      departments: [
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
      ],
      subjects: [
        'Русский язык',
        'История',
        'Иностранный язык',
        'Экономическая теория',
        'Социология',
        'Философия',
        'Психология',
        'ОБЖД',
        'Физическая культура',
        'Математика',
        'Физика'
      ]
    }
  },
  methods: {
    submitForm() {
      // Логика для обработки формы
      this.$router.push({ name: 'MainTable' })
    },
    cancel() {
      this.$router.push({ name: 'MainTable' })
    }
  }
}
</script>

<style scoped>
/* Добавьте стили по вашему усмотрению */
</style>
