<template>
  <div class="result-page">
    <div class="result-header">
      <div class="celebration">🎉</div>
      <h2>恭喜 {{ username }}！</h2>
      <p>您的完整人格分析報告</p>
    </div>

    <!-- 總覽卡片 -->
    <div class="overview-card">
      <h3>🎯 您的關係人格總結</h3>
      <div class="overall-type">
        <div class="main-badge">{{ detailedResult.overallResult.mainType }}</div>
        <div v-if="detailedResult.overallResult.subType" class="sub-badge">
          次要：{{ detailedResult.overallResult.subType }}
        </div>
      </div>
      <p class="overview-desc">{{ detailedResult.overallResult.description }}</p>
    </div>

    <!-- 三個面向的詳細分析 -->
    <div class="dimensions-analysis">
      <DimensionCard 
        v-for="dimension in detailedResult.dimensions" 
        :key="dimension.type" 
        :dimension="dimension" 
      />
    </div>

    <div class="action-buttons">
      <button @click="handleReset" class="secondary-btn">重新測驗</button>
      <button @click="handleViewMatching" class="primary-btn">
        查看配對功能
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useQuizStore } from '../stores/quizStore'
import DimensionCard from './DimensionCard.vue'

const quizStore = useQuizStore()

const {
  username,
  detailedResult
} = storeToRefs(quizStore)

const handleReset = () => {
  quizStore.reset()
}

const handleViewMatching = () => {
  quizStore.goToStep(3)
}
</script>

<style scoped>
/* 樣式已經在 app.css 中定義 */
</style>
