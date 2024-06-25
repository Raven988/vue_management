<template>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>ФИО</th>
        <th>Кафедра</th>
        <th>Группы</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="teacher in teachers" :key="teacher.id">
        <td><input type="checkbox" /></td>
        <td>{{ teacher.name }}</td>
        <td>{{ teacher.department }}</td>
        <td>{{ teacher.groups.join(', ') }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data() {
    return {
      teachers: [
        {
          id: 1,
          name: 'Иванов Алексей Евгеньевич',
          department: 'Кафедра истории и теории культуры',
          groups: [110, 210]
        },
        {
          id: 2,
          name: 'Юдина Ксения Данииловна',
          department: 'Кафедра истории и теории культуры',
          groups: [120]
        },
        {
          id: 3,
          name: 'Королев Родион Михайлович',
          department: 'Кафедра истории и теории культуры',
          groups: [130, 310]
        },
        {
          id: 4,
          name: 'Плотникова Амина Давидовна',
          department: 'Кафедра истории и теории культуры',
          groups: [320]
        },
        {
          id: 5,
          name: 'Медведева Вероника Ивановна',
          department: 'Кафедра истории и теории культуры',
          groups: [220]
        }
      ]
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  padding: 20px;
  overflow-y: auto;
}
th,
td {
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}
td:nth-child(2) {
  text-align: left;
}
</style>
