<script setup>
import MainTable from '@/components/MainTable.vue'
import SideBar from '@/components/SideBar.vue'
import MainHeader from '@/components/MainHeader.vue'
// import TeacherCard from '@/components/TeacherCard.vue'
</script>

<template>
  <SideBar />
  <div class="main_content">
    <MainHeader />
    <MainTable />
  </div>
</template>
