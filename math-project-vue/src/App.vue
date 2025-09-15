<template>
  <div class="app-container mx-auto max-w-7xl px-4 py-5" :class="{ dark: isDarkMode }">
    <!-- 全局公共：主题切换器 -->
    <div
      class="theme-switcher bg-card fixed right-5 top-5 z-50 flex cursor-pointer select-none items-center gap-2 rounded-full px-2 py-1 shadow"
      aria-label="切换白天/黑夜模式"
      @click="toggleTheme"
    >
      <div class="switch-track bg-switch-track h-5 w-10 rounded-full transition-all duration-300" :class="{ 'bg-primary/80': isDarkMode }" />
      <span class="switch-label text-text text-sm">
        {{ isDarkMode ? '黑夜模式' : '白天模式' }}
      </span>
    </div>

 

    <!-- 路由出口：关键！首页/主题页会在这里替换显示 -->
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue'
import { RouterLink, RouterView } from 'vue-router' // 必须导入 RouterView
import { toggleTheme } from './hooks/dark'

// 主题切换逻辑（保留原有代码，不修改）
const isDarkMode = ref<boolean>(false)
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') { isDarkMode.value = true }
  else if (savedTheme === 'light') { isDarkMode.value = false }
  else { isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches }
})
watchEffect(() => {
  const theme = isDarkMode.value ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
  document.documentElement.classList.toggle('dark', isDarkMode.value)
  document.body.style.backgroundColor = 'var(--bg-color)'
})
</script>

<style>
/* 保留你原有所有全局样式，不删除任何内容 */
:root {
  --unit: 0.25rem;
  --bg-color: #ffffff;
  --text-color: #1f2329;
  --text-secondary: #86909c;
  --card-bg: #ffffff;
  --border-color: #e0e0e0;
  --primary-color: #ff4d4f;
  --hover-bg: #f2f3f5;
  --switch-track: #e0e0e0;
  --scrollbar-thumb: #c9c9c9;
  --scrollbar-track: #f5f5f5;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
.dark {
  --bg-color: #121212;
  --text-color: #f0f0f0;
  --text-secondary: #bbbbbb;
  --card-bg: #1e1e1e;
  --border-color: #333333;
  --primary-color: #ff6b6b;
  --hover-bg: #2d2d2d;
  --switch-track: #333333;
  --scrollbar-thumb: #444444;
  --scrollbar-track: #1e1e1e;
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition:
    background-color 300ms ease,
    color 300ms ease,
    border-color 300ms ease,
    box-shadow 300ms ease;
}
body {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
/* 布局原子类 */
.flex { display: flex; }
.items-center { align-items: center; }
.mx-auto { margin-left: auto; margin-right: auto; }
.fixed { position: fixed; }
.z-50 { z-index: 50; }
/* 尺寸原子类 */
.w-10 { width: calc(var(--unit) * 10); }
.h-5 { height: calc(var(--unit) * 5); }
.max-w-7xl { max-width: calc(var(--unit) * 280); }
.px-2 { padding-left: calc(var(--unit) * 2); padding-right: calc(var(--unit) * 2); }
.py-1 { padding-top: calc(var(--unit) * 1); padding-bottom: calc(var(--unit) * 1); }
.px-4 { padding-left: calc(var(--unit) * 4); padding-right: calc(var(--unit) * 4); }
.py-5 { padding-top: calc(var(--unit) * 5); padding-bottom: calc(var(--unit) * 5); }
.gap-2 { gap: calc(var(--unit) * 2); }
/* 定位原子类 */
.top-5 { top: calc(var(--unit) * 5); }
.right-5 { right: calc(var(--unit) * 5); }
/* 外观原子类 */
.rounded-full { border-radius: 9999px; }
.shadow { box-shadow: var(--shadow); }
.cursor-pointer { cursor: pointer; }
.select-none { user-select: none; }
.text-sm { font-size: calc(var(--unit) * 3.5); }
.my-4 { margin-top: calc(var(--unit) * 4); margin-bottom: calc(var(--unit) * 4); }
/* 主题关联原子类 */
.bg-card { background-color: var(--card-bg); }
.bg-switch-track { background-color: var(--switch-track); }
.bg-primary\/80 { background-color: var(--primary-color); opacity: 0.8; }
.text-text { color: var(--text-color); }
/* 过渡原子类 */
.transition-all { transition: all 300ms ease; }
.duration-300 { transition-duration: 300ms; }
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: calc(var(--unit) * 2);
  height: calc(var(--unit) * 2);
}
::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
  border-radius: calc(var(--unit) * 1);
}
::-webkit-scrollbar-track {
  background-color: var(--scrollbar-track);
}
/* Logo 样式 */
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms ease;
}
.logo:hover {
  filter: drop-shadow(0 0 2em var(--primary-color));
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
/* 链接样式 */
a {
  color: var(--primary-color);
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>