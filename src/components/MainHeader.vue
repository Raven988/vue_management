<template>
  <div class="header">
    <input type="text" placeholder="Поиск..." />
    <div class="header-button">
      <button class="red">Уволить</button>
      <button class="green">Нанять</button>
    </div>
  </div>
</template>

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
}
.red {
  background-color: #ff4d4d;
}
.green {
  background-color: #4caf50;
}
</style>
