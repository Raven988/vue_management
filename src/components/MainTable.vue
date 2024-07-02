<template>
  <div class="MainTable">
    <table>
      <thead class="custom-header">
        <tr>
          <th></th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Кафедра</th>
          <th>{{ props.type.includes('instructors') ? 'Группы' : 'Группа' }}</th>
          <th>{{ props.type.includes('instructors') ? 'Дата найма' : 'Дата зачисления' }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in filteredPersons" :key="person.id">
          <td>
            <input type="checkbox" v-model="person.checked" @change="updateSelectedItems" />
          </td>
          <td @click="handleRowClick(person)">{{ person.first_name }}</td>
          <td @click="handleRowClick(person)">{{ person.last_name }}</td>
          <td @click="handleRowClick(person)">{{ person.department_name }}</td>
          <td @click="handleRowClick(person)">
            {{ person.groups ? person.groups.join(', ') : person.group_name }}
          </td>
          <td @click="handleRowClick(person)">
            {{
              person.employ_date
                ? person.employ_date.split('T')[0]
                : person.enroll_date.split('T')[0]
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import '../assets/styles/table.css'
import { ref, onMounted, watch, inject, computed } from 'vue'

const props = defineProps({
  type: String,
  searchQuery: String
})

const persons = inject('persons')
const fetchPersonsData = inject('fetchPersonsData')

const selectedItems = ref([])

defineExpose({ selectedItems, fetchPersonsData })

const emit = defineEmits(['selectionChanged'])

function updateSelectedItems() {
  selectedItems.value = persons.value.filter((person) => person.checked)
  emit('selectionChanged', selectedItems.value.length === 0)
}

watch(
  () => props.type,
  (newType) => {
    fetchPersonsData(newType)
    emit('selectionChanged', true)
  }
)

onMounted(() => {
  fetchPersonsData(props.type)
})

const getPerson = inject('getPerson')
function handleRowClick(person) {
  getPerson(`${props.type}/${person.id}`, `${props.type}`)
}

const filteredPersons = computed(() => {
  return persons.value.filter((person) => {
    const searchString = props.searchQuery.toLowerCase()
    return (
      person.first_name.toLowerCase().includes(searchString) ||
      person.last_name.toLowerCase().includes(searchString) ||
      person.department_name.toLowerCase().includes(searchString) ||
      (person.groups &&
        person.groups.some((group) => group.toLowerCase().includes(searchString))) ||
      (person.group_name && person.group_name.toLowerCase().includes(searchString))
    )
  })
})
</script>
