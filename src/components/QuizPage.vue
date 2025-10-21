<template>
  <div class="quiz-page">
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: `${progressPercentage}%` }"></div>
    </div>

    <div class="question-card">
      <div class="question-header">
        <span class="question-number">第 {{ currentQuestion + 1 }} 題</span>
        <span class="total-questions">共 {{ questions?.length || 0 }} 題</span>
      </div>

      <div class="question-category" v-if="currentQuestionData">
        <span class="category-badge">{{ currentQuestionData.category }}</span>
      </div>

      <h2 class="question-text" v-if="currentQuestionData">{{ currentQuestionData.q }}</h2>

      <div class="options" v-if="currentQuestionData">
        <button 
          v-for="(opt, idx) in currentQuestionData.opts" 
          :key="idx" 
          @click="handleAnswer(idx)"
          class="option-btn"
        >
          <span class="option-letter">{{ String.fromCharCode(65 + idx) }}</span>
          <span class="option-text">{{ opt }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuizStore } from '../stores/quizStore'

const quizStore = useQuizStore()

const {
  currentQuestion,
  questions,
  currentQuestionData,
  progressPercentage
} = storeToRefs(quizStore)

const handleAnswer = (answerIndex: number) => {
  quizStore.answerQuestion(answerIndex)
}
</script>

<style scoped>
/* 樣式已經在 app.css 中定義 */
</style>
