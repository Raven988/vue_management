<template>
  <div class="teacher_card">
    <h2>Карточка преподавателя</h2>
    <div class="midle">
      <img :src="teacherImage" alt="Teacher" />
      <div class="filter">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Кафедра</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="department in departments" :key="department">
              <td><input type="checkbox" /></td>
              <td>{{ department }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="filter">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Предмет</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subject in subjects" :key="subject">
              <td><input type="checkbox" /></td>
              <td>{{ subject }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="botton">
      <li>
        <label>Фамилия</label>
        <input v-model="teacher.lastName" placeholder="Фамилия" />
      </li>
      <li>
        <label>Имя</label>
        <input v-model="teacher.firstName" placeholder="Имя" />
      </li>
      <li>
        <label>Отчество</label>
        <input v-model="teacher.middleName" placeholder="Отчество" />
      </li>
      <li>
        <label>Дата рождения</label>
        <input v-model="teacher.birthDate" placeholder="Дата рождения" />
      </li>
    </div>
    <div class="button">
      <button>Ок</button>
      <button @click="cancel">Отмена</button>
    </div>
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
    cancel() {
      this.$router.push({ name: 'MainTable' })
    }
  }
}
</script>

<style scoped>
img {
  max-height: 443px;
  width: 355px;
  margin: 13px;
  align-self: center;
}
.filter {
  max-height: 443px;
  width: 355px;
  border: 1px solid #7e7d7d;
  overflow-y: scroll;
  padding: 10px;
  float: right;
  font-size: small;
  margin: 13px;
}
th,
td {
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
td:nth-child(2) {
  width: 300px;
  text-align: left;
}
button {
  width: 200px;
  height: 30px;
}
.button {
  display: flex;
}
.midle {
  height: 443px;
  display: flex;
}
.botton {
  display: flex;
  flex-direction: column;
}
</style>
