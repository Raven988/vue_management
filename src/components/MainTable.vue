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
      <!-- <tr v-for="teacher in teachers" :key="teacher.id">
        <td><input type="checkbox" /></td>
        <td>{{ teacher.name }}</td>
        <td>{{ teacher.department }}</td>
        <td>{{ teacher.groups.join(', ') }}</td>
      </tr> -->
    </tbody>
  </table>
</template>

<script setup>
import '../assets/styles/table.css'
</script>
