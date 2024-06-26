<template>
  <div class="header">
    <input type="text" placeholder="Поиск..." />
    <div class="header-button">
      <button disabled class="red">Уволить</button>
      <button @click="goToCard" class="green">Нанять</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import '../assets/styles/header.css'

const router = useRouter()

function goToCard() {
  router.push('/card')
}
</script>
