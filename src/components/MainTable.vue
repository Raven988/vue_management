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

<script setup></script>

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
