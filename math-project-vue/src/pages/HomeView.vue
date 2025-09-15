<template>

  <HelloWorld />

   <button 
    class="go-to-theme-btn bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-all cursor-pointer"
    @click="goToThemePage"
  >
    Theme
  </button>

    <button 
    class="go-to-theme-btn bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-all cursor-pointer"
    @click="goToMockPage"
  >
    Mock
  </button>

    <button 
    class="go-to-theme-btn bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-all cursor-pointer"
    @click="goToPetPage"
  >
    api
  </button>

  <button 
    class="go-to-theme-btn bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-all cursor-pointer"
    @click="gotoTransPage"
  >
    translate
  </button>

  <ZhihuHot class="my-6" />


 
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router' 

import HelloWorld from '../components/HelloWorld.vue'
import ZhihuHot from '../components/ZhihuHot.vue'

const router = useRouter()
const goToThemePage = () => {
  router.push({ name: 'theme' }) }

const goToMockPage = () => {
  router.push({ name: 'mock' }) }

const goToPetPage = () => {
  router.push({ name: 'pet-query' }) }

  const gotoTransPage = () => {
    router.push({ name: 'translate' })
  }
  
</script>



<style scoped>

.go-to-theme-btn {
  margin-top: 20px;
  font-size: 16px;
  background-color: black;
}

</style>