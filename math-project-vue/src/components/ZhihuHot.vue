<script lang="ts" setup>
import { onMounted, ref } from 'vue'

// 类型定义区域
interface ZhiHuHotList {
  data: ZhiHuHot[]
  paging: Paging
  fresh_text: string
  display_num: number
  display_first: boolean
  fb_bill_main_rise: number
  head_zone: HeadZone
  head_zones: HeadZone2[]
}

interface ZhiHuHot {
  type: string
  style_type: string
  id: string
  card_id: string
  target: Target
  attached_info: string
  detail_text: string
  trend: number
  debut: boolean
  children: Children[]
  card_label?: CardLabel
}

interface Target {
  id: number
  title: string
  url: string
  type: string
  created: number
  answer_count: number
  follower_count: number
  author: Author
  bound_topic_ids: number[]
  comment_count: number
  is_following: boolean
  excerpt: string
}

interface Author {
  type: string
  user_type: string
  id: string
  url_token: string
  url: string
  name: string
  headline: string
  avatar_url: string
}

interface Children {
  type: string
  thumbnail: string
}

interface CardLabel {
  type: string
  icon: string
  night_icon: string
}

interface Paging {
  is_end: boolean
  is_start: boolean
  next: string
  previous: string
  totals: number
}

interface HeadZone {
  type: string
  data: Daum2[]
}

interface Daum2 {
  id: string
  link_url: string
  title: string
  source_type: number
  attached_info: string
  tag: string
  tag_bg_color: string
}

interface HeadZone2 {
  type: string
  data: Daum3[]
}

interface Daum3 {
  id: string
  link_url: string
  title: string
  source_type: number
  attached_info: string
  tag: string
  tag_bg_color: string
}

// 状态管理区域
const list = ref<ZhiHuHot[]>([])
const paging = ref<Paging>({
  is_end: false,
  is_start: true,
  next: '',
  previous: '',
  totals: 0,
})
const freshText = ref('')
const loading = ref(true)
const error = ref('')
const api = 'https://m1.apifoxmock.com/m1/7074910-0-default'

// 工具函数区域
/**
 * 格式化数字显示（1000 -> 1k, 10000 -> 1w）
 */
const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}w`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`
  }
  return num.toString()
}

/**
 * 判断是否有缩略图
 */
const hasThumbnail = (item: ZhiHuHot): boolean => {
  return item.children && item.children.length > 0 && item.children[0].thumbnail
}

/**
 * 获取第一张缩略图URL
 */
const getFirstThumbnail = (item: ZhiHuHot): string => {
  return item.children && item.children.length > 0 ? item.children[0].thumbnail : ''
}

/**
 * 根据趋势获取样式类
 */
const getTrendClass = (trend: number): string => {
  return trend > 0 ? 'up' : trend < 0 ? 'down' : ''
}

// 数据请求区域
/**
 * 获取热榜数据
 * @param url 可选，加载更多时的URL
 */
const getData = async (url?: string) => {
  try {
    loading.value = true
    const requestUrl = url || `${api}/zhihuHot/list`
    const response = await fetch(requestUrl)

    if (!response.ok) {
      throw new Error(`请求失败: ${response.status}`)
    }

    const res: ZhiHuHotList = await response.json()

    // 处理数据
    if (url) {
      // 加载更多 - 追加数据
      list.value = [...list.value, ...res.data]
    }
    else {
      // 首次加载 - 替换数据
      list.value = res.data
    }

    paging.value = res.paging
    freshText.value = res.fresh_text
    error.value = ''
  }
  catch (err) {
    error.value = err instanceof Error ? err.message : '获取数据失败，请稍后重试'
    console.error('数据请求错误:', err)
  }
  finally {
    loading.value = false
  }
}

/**
 * 加载更多数据
 */
const loadMore = () => {
  if (!paging.value.is_end && paging.value.next && !loading.value) {
    getData(paging.value.next)
  }
}

/**
 * 打开知乎问题页面
 */
const toggleHot = (id: number) => {
  window.open(`https://www.zhihu.com/question/${id}`, '_blank')
}

// 生命周期钩子
onMounted(() => {
  getData() // 组件挂载后获取数据
})
</script>

<template>
  <!-- 主容器 -->
  <div class="zhihu-hot-container">
    <!-- 头部区域 -->
    <header class="hot-header">
      <div class="header-content">
        <div class="logo-group" />
        <button class="more-btn">
          <i class="fa fa-ellipsis-h" />
        </button>
      </div>
    </header>

    <!-- 内容区域 -->
    <main class="hot-content">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-state">
        <div class="spinner" />
      </div>

      <!-- 错误提示 -->
      <div v-if="error" class="error-state">
        <i class="fa fa-exclamation-circle" />
        <span>{{ error }}</span>
      </div>

      <!-- 热榜列表 -->
      <div v-if="!loading && !error" class="hot-list">
        <div
          v-for="(item, index) in list"
          :key="item.id"
          class="hot-item"
          @click="toggleHot(item.target.id)"
        >
          <!-- 排名 -->
          <div class="item-rank">
            <span :class="{ top3: index < 3 }">{{ index + 1 }}</span>
          </div>

          <!-- 内容区 -->
          <div class="item-content">
            <h3 class="item-title">
              {{ item.target.title }}
            </h3>

            <div class="item-meta">
              <span class="meta-item answer-count">
                <i class="fa fa-comment-o" />
                {{ formatNumber(item.target.answer_count) }}回答
              </span>
              <span class="meta-item follow-count">
                <i class="fa fa-eye-o" />
                {{ formatNumber(item.target.follower_count) }}关注
              </span>
              <span class="meta-item author">
                <i class="fa fa-user-o" />
                {{ item.target.author.name }}
              </span>
              <span class="meta-item trend" :class="getTrendClass(item.trend)">
                <i v-if="item.trend > 0" class="fa fa-arrow-up" />
                <i v-if="item.trend < 0" class="fa fa-arrow-down" />
                {{ item.detail_text }}
              </span>
            </div>
          </div>

          <!-- 图片区 -->
          <div v-if="hasThumbnail(item)" class="item-image">
            <img
              :src="getFirstThumbnail(item)"
              alt="热榜相关图片"
              class="thumbnail"
            >
            <div class="image-overlay" />
          </div>
        </div>
      </div>
    </main>

    <!-- 底部区域 -->
    <footer v-if="!loading && !error" class="hot-footer">
      <!-- 加载更多 -->
      <button
        v-if="!paging.is_end"
        class="load-more-btn"
        :disabled="loading"
        @click="loadMore"
      >
        <i class="fa fa-refresh" />
        <span>加载更多</span>
      </button>

      <!-- 已加载全部 -->
      <div v-if="paging.is_end" class="end-message">
        <i class="fa fa-check-circle" />
        <span>已经加载全部内容</span>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* 基础样式 */
.zhihu-hot-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

/* 头部样式 */
.hot-header {
  padding: 20px 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-group {
  display: flex;
  align-items: center;
}

.fire-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #ff4d4f;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  box-shadow: 0 2px 4px rgba(255, 77, 79, 0.2);
}

.header-title {
  font-size: 24px;
  font-weight: bold;
  color: #1f2329;
  margin-right: 12px;
}

.update-tag {
  font-size: 12px;
  padding: 3px 8px;
  background-color: #fff2e8;
  color: #ff7a45;
  border-radius: 12px;
}

.more-btn {
  background: none;
  border: none;
  color: #86909c;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.more-btn:hover {
  background-color: #f2f3f5;
  color: #1f2329;
}

/* 内容区域样式 */
.hot-content {
  margin-bottom: 30px;
}

/* 加载状态 */
.loading-state {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #ff4d4f;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 错误状态 */
.error-state {
  background-color: #fff1f0;
  border: 1px solid #ffe3e0;
  color: #f5222d;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.error-state i {
  margin-right: 8px;
}

/* 热榜列表样式 */
.hot-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hot-item {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
}

.hot-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

/* 排名样式 */
.item-rank {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.item-rank span {
  font-size: 18px;
  font-weight: bold;
  color: #86909c;
}

.item-rank span.top3 {
  color: #ff4d4f;
}

/* 内容区样式 */
.item-content {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-title {
  font-size: 16px;
  font-weight: 500;
  color: #1f2329;
  margin-bottom: 12px;
  line-height: 1.5;
  transition: color 0.3s;
}

.hot-item:hover .item-title {
  color: #ff4d4f;
}

.item-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 12px;
  color: #86909c;
}

.meta-item {
  display: flex;
  align-items: center;
}

.meta-item i {
  margin-right: 4px;
  font-size: 12px;
}

.trend.up {
  color: #ff4d4f;
}

.trend.down {
  color: #52c41a;
}

/* 图片区样式 */
.item-image {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.hot-item:hover .thumbnail {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}

.hot-item:hover .image-overlay {
  opacity: 1;
}

/* 底部样式 */
.hot-footer {
  padding: 20px 0;
  text-align: center;
}

.load-more-btn {
  background-color: #f2f3f5;
  color: #1f2329;
  border: none;
  border-radius: 20px;
  padding: 8px 20px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
}

.load-more-btn:hover {
  background-color: #e5e6eb;
}

.load-more-btn i {
  margin-right: 6px;
}

.end-message {
  font-size: 14px;
  color: #86909c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.end-message i {
  margin-right: 6px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hot-item {
    flex-direction: column;
  }

  .item-image {
    width: 100%;
    height: 180px;
  }

  .item-rank {
    position: absolute;
    left: 12px;
    top: 12px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    z-index: 1;
  }

  .item-rank span {
    color: white;
    font-size: 14px;
  }

  .item-content {
    position: relative;
    padding-top: 24px;
  }
}
</style>
