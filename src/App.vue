<template>
  <div id="app">
    <div class="app-background">
      <div class="app-wrapper">
        <div class="main-container">
          <!-- 首頁 -->
          <WelcomePage v-if="step === 0" />
          
          <!-- 測驗頁面 -->
          <QuizPage v-if="step === 1" />
          
          <!-- 結果頁面 -->
          <ResultPage v-if="step === 2" />
          
          <!-- 配對預覽頁面 -->
          <MatchingPreview v-if="step === 3" @back-to-result="handleBackToResult" />
        </div>
      </div>
      
      <!-- 裝飾元素 -->
      <div class="decoration-shape shape-1"></div>
      <div class="decoration-shape shape-2"></div>
      <div class="decoration-shape shape-3"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuizStore } from './stores/quizStore'
import WelcomePage from './components/WelcomePage.vue'
import QuizPage from './components/QuizPage.vue'
import ResultPage from './components/ResultPage.vue'
import MatchingPreview from './components/MatchingPreview.vue'

const quizStore = useQuizStore()
const { step } = storeToRefs(quizStore)

const handleBackToResult = () => {
  quizStore.goToStep(2)
}
</script>

<style>
/* 全域樣式由 CSS 模組管理 */
</style>
