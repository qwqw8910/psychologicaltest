<template>
  <div class="welcome-page">
    <div class="logo">
      <div class="heart-icon">💕</div>
      <h1 class="title">心理人格配對測驗</h1>
      <p class="subtitle">探索你的關係人格，找到最適合的靈魂伴侶</p>
    </div>

    <div class="start-form">
      <div class="input-group">
        <label for="username">請輸入您的姓名</label>
        <input 
          id="username" 
          v-model="localUsername" 
          placeholder="例如：小明" 
          class="name-input" 
          @keyup.enter="handleStartTest" 
        />
      </div>
      <button @click="handleStartTest" :disabled="!localUsername" class="start-btn">
        <span>開始測驗</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <div class="features">
      <div class="feature">
        <div class="feature-icon">🧠</div>
        <h3>科學分析</h3>
        <p>基於心理學理論的12型人格分析</p>
      </div>
      <div class="feature">
        <div class="feature-icon">💝</div>
        <h3>精準配對</h3>
        <p>智能演算法為您推薦最合適的對象</p>
      </div>
      <div class="feature">
        <div class="feature-icon">🔒</div>
        <h3>隱私保護</h3>
        <p>您的個人資料完全安全保密</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useQuizStore } from '../stores/quizStore'

const quizStore = useQuizStore()
const localUsername = ref('')

// 監聽 store 中的 username 變化
watch(() => quizStore.username, (newUsername) => {
  localUsername.value = newUsername
}, { immediate: true })

const handleStartTest = () => {
  if (!localUsername.value.trim()) return
  quizStore.setUsername(localUsername.value)
  quizStore.startTest()
}
</script>

<style scoped>
/* 這裡的樣式已經在 app.css 中定義，所以不需要重複 */
</style>
