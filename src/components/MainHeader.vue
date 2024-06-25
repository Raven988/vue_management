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

const router = useRouter()

function goToCard() {
  router.push('/card')
}
</script>

<style scoped>
.header {
  height: 134px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}

.header input[type='text'] {
  height: 24px;
  width: 405px;
  border-radius: 10px;
  padding: 5px;
  font-size: 16px;
  margin-left: 64px;
  margin-top: 70px;
  transition: transform 0.2s ease-in-out;
}

.header-button {
  height: 56px;
  width: 300px;
  margin-right: 19px;
  margin-top: 62px;
}

.red,
.green {
  font-size: 16px;
  min-height: 33px;
  min-width: 119px;
  margin: 10px;
  cursor: pointer;
  border-radius: 10px;
  color: white;
  border: 1px solid black;
  transition: transform 0.2s ease-in-out;
}

.green {
  background-color: green;
}

.red {
  background-color: red;
}

.red:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.header input:hover,
.green:hover,
.red:hover {
  transform: translateY(-2px);
}
</style>
