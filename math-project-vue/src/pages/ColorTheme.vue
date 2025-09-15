<template>
  
  <div class="theme-page-container">
    <h1 class="theme-page-title">该页面是主题页面</h1>
    <p class="theme-page-desc">可在此页面扩展主题相关功能</p>

 
    <button 
      class="back-to-home-btn bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-all cursor-pointer mt-8"
      @click="goBackHome"
    >
      返回首页
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router' // 编程式导航钩子

// 跳转逻辑：点击返回首页
const router = useRouter()
const goBackHome = () => {
  router.push({ name: 'home' }) // 跳回首页路由
}
</script>

<style scoped>
/* 主题页专属样式：只作用于主题页 */
.theme-page-container {
  min-height: 60vh; /* 垂直居中，美观 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
}
.theme-page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--text-color); /* 适配主题色 */
  margin-bottom: 16px;
}
.theme-page-desc {
  font-size: 16px;
  color: var(--text-secondary); /* 适配主题色 */
  text-align: center;
}
.back-to-home-btn {
  font-size: 16px;
  background-color: black;
}
</style>