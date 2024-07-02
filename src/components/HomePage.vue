<template>
  <div class="home">
    <header class="home-header">
      <h1>Добро пожаловать в систему управления университетом У.</h1>
      <p>
        Эта система позволяет нанимать и увольнять преподавателей, зачислять и отчислять студентов,
        а также просматривать и редактировать их оценки по предметам.
      </p>
    </header>
    <main class="main-content">
      <div class="feature">
        <h2>Преподаватели</h2>
        <p>Создавайте, редактируйте и удаляйте записи о преподавателях.</p>
        <router-link to="/instructors" class="button">Управление преподавателями</router-link>
      </div>
      <div class="feature">
        <h2>Студенты</h2>
        <p>Зачисляйте, редактируйте и отчисляйте студентов.</p>
        <router-link to="/students" class="button">Управление студентами</router-link>
      </div>
    </main>
  </div>
</template>

<script>
import '../assets/styles/home.css'
</script>
