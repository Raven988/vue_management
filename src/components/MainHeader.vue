<template>
  <div class="header">
    <input type="text" v-model="searchQuery" placeholder="Поиск..." />
    <div class="header-button">
      <button :disabled="isButtonActive" @click="deletePerson" class="red">
        {{ del }}
      </button>
      <button @click="goToCard" class="green">{{ add }}</button>
    </div>
  </div>
  <MainTable
    @selectionChanged="updateButtonState"
    ref="main_table"
    :type="type"
    :searchQuery="searchQuery"
  />
</template>

<script setup>
import '../assets/styles/header.css'
import { useRouter } from 'vue-router'
import { defineProps, ref, toRaw } from 'vue'
import axios from 'axios'
import MainTable from './MainTable.vue'

const props = defineProps({
  type: String,
  add: String,
  del: String
})

const router = useRouter()
const isButtonActive = ref(true)
const main_table = ref(null)
const searchQuery = ref('')

async function deletePerson() {
  const rawData = toRaw(main_table.value.selectedItems)
  const ids = rawData.map((item) => item.id)
  const deleteRequests = ids.map((id) => axios.delete(`http://127.0.0.1:8000/${props.type}/${id}`))
  try {
    await Promise.all(deleteRequests)
    await main_table.value.fetchPersonsData(props.type)
    isButtonActive.value = true
  } catch (error) {
    console.error(error)
    isButtonActive.value = true
    if (error.response && error.response.data && error.response.data.detail) {
      alert(`Ошибка: ${error.response.data.detail}`)
    } else {
      alert(error)
    }
  }
}

function updateButtonState(notSelected) {
  isButtonActive.value = notSelected
}

function goToCard() {
  router.push({ name: `${props.type}Card` })
}
</script>
