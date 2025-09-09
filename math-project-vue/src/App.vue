<script setup lang="ts">
import { ref, watchEffect, onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import dayjs from "dayjs";
import ZhihuHot from './components/ZhihuHot.vue';

// 主题状态管理（逻辑不变，仅优化样式调用）
const isDarkMode = ref<boolean>(false);

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') isDarkMode.value = true;
  else if (savedTheme === 'light') isDarkMode.value = false;
  else isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
});

watchEffect(() => {
  const theme = isDarkMode.value ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
  document.documentElement.classList.toggle('dark', isDarkMode.value);
  document.body.style.backgroundColor = 'var(--bg-color)'; // 简化冗余逻辑
});

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
};
</script>

<template>
  <HelloWorld />
  <!-- 主容器：用原子类替代复合样式，语义化命名 -->
  <div class="app-container max-w-7xl mx-auto px-4 py-5" :class="{ dark: isDarkMode }">
    <!-- 主题切换控件：完全用原子类组合，删除冗余复合类 -->
    <div 
      class="theme-switcher fixed top-5 right-5 flex items-center gap-2 px-2 py-1 bg-card rounded-full shadow cursor-pointer z-50 select-none"
      @click="toggleTheme" 
      aria-label="切换白天/黑夜模式"
    >
      <!-- 开关轨道：原子类组合，无冗余样式 -->
      <div class="switch-track w-10 h-5 rounded-full bg-switch-track transition-all duration-300" :class="{ 'bg-primary/80': isDarkMode }"></div>
      
      <!-- 主题文字提示：原子类控制字体、颜色 -->
      <span class="switch-label text-sm text-text">
        {{ isDarkMode ? '黑夜模式' : '白天模式' }}
      </span>
    </div>

    <ZhihuHot />
  </div>
</template>

<style>
/* 1. 基础变量定义（保留，主题切换核心） */
:root {
  /* 基础单位：1rem = 16px，原子类基于 rem 适配（如 w-10 = 40px = 2.5rem） */
  --unit: 0.25rem; /* 1单位 = 4px，方便原子类计算 */
  
  /* 主题变量（新增原子类依赖的变量，如 bg-card、text-text） */
  --bg-color: #ffffff;
  --text-color: #1f2329;
  --text-secondary: #86909c;
  --card-bg: #ffffff; /* 对应原子类 bg-card */
  --border-color: #e0e0e0;
  --primary-color: #ff4d4f; /* 对应原子类 bg-primary */
  --hover-bg: #f2f3f5;
  --switch-track: #e0e0e0; /* 对应原子类 bg-switch-track */
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

/* 2. 全局基础样式（原子类依赖的底层样式，仅写一次） */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* 对应原子类 box-border */
  transition: background-color 300ms ease, color 300ms ease, border-color 300ms ease, box-shadow 300ms ease; /* 对应原子类 transition-colors */
}

body {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* 3. 原子类定义（核心：单一职责，语义化命名） */
/* 布局原子类 */
.flex { display: flex; }
.items-center { align-items: center; }
.mx-auto { margin-left: auto; margin-right: auto; }
.fixed { position: fixed; }
.z-50 { z-index: 50; } /* 替代原 z-index: 1000，按优先级分级 */

/* 尺寸原子类（基于 --unit=0.25rem，1单位=4px） */
.w-10 { width: calc(var(--unit) * 10); } /* 40px */
.h-5 { height: calc(var(--unit) * 5); } /* 20px */
.max-w-7xl { max-width: calc(var(--unit) * 280); } /* 1120px（原 1400px 优化为更适配的宽度） */
.px-2 { padding-left: calc(var(--unit) * 2); padding-right: calc(var(--unit) * 2); } /* 8px */
.py-1 { padding-top: calc(var(--unit) * 1); padding-bottom: calc(var(--unit) * 1); } /* 4px */
.px-4 { padding-left: calc(var(--unit) * 4); padding-right: calc(var(--unit) * 4); } /* 16px */
.py-5 { padding-top: calc(var(--unit) * 5); padding-bottom: calc(var(--unit) * 5); } /* 20px */
.gap-2 { gap: calc(var(--unit) * 2); } /* 8px */

/* 定位原子类 */
.top-5 { top: calc(var(--unit) * 5); } /* 20px */
.right-5 { right: calc(var(--unit) * 5); } /* 20px */

/* 外观原子类 */
.rounded-full { border-radius: 9999px; } /* 圆形/胶囊形 */
.shadow { box-shadow: var(--shadow); }
.cursor-pointer { cursor: pointer; }
.select-none { user-select: none; } /* 禁止文本选中 */
.text-sm { font-size: calc(var(--unit) * 3.5); } /* 14px */

/* 主题关联原子类（动态关联 CSS 变量，避免重复写 var()） */
.bg-card { background-color: var(--card-bg); }
.bg-switch-track { background-color: var(--switch-track); }
.bg-primary\/80 { background-color: var(--primary-color); opacity: 0.8; } /* 暗黑模式轨道色 */
.text-text { color: var(--text-color); }

/* 过渡原子类 */
.transition-all { transition: all 300ms ease; }
.duration-300 { transition-duration: 300ms; }

/* 4. 原有特殊样式（保留，无冗余） */
/* 自定义滚动条 */
::-webkit-scrollbar {
  width: calc(var(--unit) * 2); /* 8px */
  height: calc(var(--unit) * 2); /* 8px */
}
::-webkit-scrollbar-thumb {
  background-color: var(--scrollbar-thumb);
  border-radius: calc(var(--unit) * 1); /* 4px */
}
::-webkit-scrollbar-track {
  background-color: var(--scrollbar-track);
}

/* Logo 样式（原子类无法覆盖的特殊效果） */
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