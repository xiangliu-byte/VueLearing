<template>
  <div class="music-ranking-container">
    <h2 class="title text-xl font-bold mb-6 text-center">礼堂金曲</h2>

     <button 
      class="back-to-home-btn bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-all cursor-pointer mt-8"
      @click="goBackHome"
    >
      返回首页
    </button>

  
    <div v-if="loading" class="loading text-center py-8 text-gray-500">加载中...</div>

 
    <div v-else class="ranking-list">
      <div 
        class="ranking-item flex items-center gap-4 p-3 border-b border-gray-200 hover:bg-gray-50 transition-colors"
        v-for="item in musicList" 
        :key="item.id"
      >
      
        <div class="rank-circle w-8 h-8 rounded-full bg-red-300 text-white flex items-center justify-center text-sm">
          {{ item.id }}
        </div>


        <div class="logo-block w-24 h-16 bg-green-600 text-white flex items-center justify-center text-2xl font-bold">
          {{ item.logoText }}
        </div>

      
        <div class="text-content flex flex-col">
          <div class="author text-gray-600 text-sm">{{ item.author }}</div>
          <div class="song-info flex items-center gap-2 mt-1">
            <span class="song-name font-semibold text-gray-800">{{ item.songName }}</span>
            <span class="date text-gray-500 text-sm">{{ item.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios' 

import { useRouter } from 'vue-router' // 编程式导航钩子

// 跳转逻辑：点击返回首页
const router = useRouter()
const goBackHome = () => {
  router.push({ name: 'home' }) // 跳回首页路由
}

const musicList = ref<any[]>([]) 
const loading = ref(true)        


onMounted(async () => {
  try {
    const res = await axios.get('/api/music/ranking') 
    if (res.data.code === 200) {
      musicList.value = res.data.data 
    }
  } catch (err) {
    console.error('请求礼堂金曲数据失败：', err)
  } finally {
    loading.value = false 
  }
})
</script>

<style scoped>
.music-ranking-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
}

.back-to-home-btn {
  font-size: 16px;
  background-color: black;
}
</style>