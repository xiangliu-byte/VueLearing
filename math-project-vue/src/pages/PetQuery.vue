<template>
  <div class="pet-query-container max-w-2xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-center">宠物信息查询</h2>

    <!-- 输入 + 查询按钮 -->
    <div class="search-section flex gap-3 mb-6">
      <input
        v-model="petId"
        type="text"
        placeholder="请输入宠物ID（如：1）"
        class="input-petid flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        @click="fetchPet"
        class="search-btn bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        查询
      </button>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading text-center py-4 text-gray-500">加载中...</div>

    <!-- 宠物信息展示（查询成功） -->
    <div v-else-if="petInfo" class="pet-info bg-gray-50 p-4 rounded-md border border-gray-200">
      <h3 class="text-lg font-semibold mb-3">宠物详情</h3>
      <ul>
        <li class="mb-2"><span class="font-medium">ID：</span>{{ petInfo.id }}</li>
        <li class="mb-2"><span class="font-medium">名称：</span>{{ petInfo.name }}</li>
        <li class="mb-2"><span class="font-medium">类别：</span>{{ petInfo.category?.name }}</li>
        <li class="mb-2"><span class="font-medium">状态：</span>{{ petInfo.status }}</li>
        <!-- 展示宠物照片（取第一个链接） -->
        <li v-if="petInfo.photoUrls && petInfo.photoUrls.length">
          <span class="font-medium">照片：</span>
          <img 
            :src="petInfo.photoUrls[0]" 
            alt="宠物照片" 
            class="w-32 h-32 object-cover rounded mt-2 border border-gray-200"
          >
        </li>
      </ul>
    </div>

    <!-- 查询失败提示 -->
    <div v-else-if="errorMsg" class="error-msg text-center text-red-500 py-4">
      {{ errorMsg }}
    </div>

    <!-- 无查询内容提示 -->
    <div v-else class="text-center text-gray-500 py-4">
      请输入ID查询宠物信息
    </div>

    <!-- 返回首页按钮 -->
    <button
      class="back-to-home mt-8 bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
      @click="goBackHome"
    >
      返回首页
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// 路由跳转：返回首页
const router = useRouter();
const goBackHome = () => {
  router.push({ name: 'home' });
};

// 响应式数据
const petId = ref('');        // 绑定输入的宠物ID
const petInfo = ref<any | null>(null); // 存储查询到的宠物信息
const loading = ref(false);   // 加载状态
const errorMsg = ref('');     // 错误提示

// 发起查询请求
const fetchPet = async () => {
  if (!petId.value.trim()) { // 校验输入非空
    errorMsg.value = '请输入宠物ID';
    petInfo.value = null;
    return;
  }

  loading.value = true;
  errorMsg.value = '';

  try {
    // 拼接ID，请求接口
    const response = await axios.get(
      `http://127.0.0.1:4523/m1/7121389-6844235-default/pet/${petId.value}`
    );

    // 接口约定：code=0 为成功
    if (response.data.code === 0) {
      petInfo.value = response.data.data; // 提取「data.data」作为宠物信息
    } else {
      errorMsg.value = '接口返回失败，请确认ID是否有效';
      petInfo.value = null;
    }
  } catch (error) {
    console.error('查询宠物失败：', error);
    errorMsg.value = '网络错误或服务器异常，请稍后再试';
    petInfo.value = null;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.pet-query-container {
  background-color: var(--card-bg);
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.input-petid {
  font-size: 16px;
}

.search-btn {
  font-size: 16px;
}

.pet-info li {
  list-style: none;
}

.back-to-home {
  align-self: center;
}
</style>