<template>
  <div class="dimension-card">
    <!-- 標題與標籤 -->
    <div class="dimension-header">
      <h3>{{ dimension.icon }} {{ dimension.title }}</h3>
      <div class="confidence-badge" :class="dimension.confidenceLevel">
        信心等級：{{ dimension.confidenceText }}
      </div>
    </div>

    <div class="type-summary">
      <div class="main-style">{{ dimension.mainStyle }}</div>
      <div class="style-tag">{{ dimension.styleTag }}</div>
    </div>

    <!-- 信心指標與分數摘要 -->
    <div class="score-overview">
      <div class="score-bars">
        <div v-for="(score, styleIdx) in dimension.scores" :key="styleIdx" class="score-bar">
          <span class="style-name">{{ dimension.styleNames[styleIdx] }}</span>
          <div class="bar-container">
            <div class="bar-fill" :style="{ width: `${(score / 4) * 100}%` }"></div>
            <span class="score-text">{{ score }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 為什麼是你 -->
    <div class="why-you-section">
      <h4>🔍 為什麼是你</h4>
      <ul class="choice-reasons">
        <li v-for="reason in dimension.choiceReasons" :key="reason.question">
          <strong>{{ reason.question }}：</strong>{{ reason.choice }}
        </li>
      </ul>
    </div>

    <!-- 日常樣貌 -->
    <div class="daily-patterns">
      <h4>🌟 日常樣貌</h4>
      <ul class="pattern-list">
        <li v-for="pattern in dimension.dailyPatterns" :key="pattern">{{ pattern }}</li>
      </ul>
    </div>

    <!-- 優勢與風險 -->
    <div class="pros-risks">
      <div class="pros">
        <h5>💪 優勢</h5>
        <p>{{ dimension.advantages }}</p>
      </div>
      <div class="risks">
        <h5>⚠️ 風險</h5>
        <p>{{ dimension.risks }}</p>
      </div>
    </div>

    <!-- 相容性提示 -->
    <div class="compatibility-hints">
      <h4>💕 相容性提示</h4>
      <div class="compatibility-item best">
        <span class="label">最佳互補：</span>
        <span>{{ dimension.bestMatch }}</span>
      </div>
      <div class="compatibility-item adjust">
        <span class="label">需協調：</span>
        <span>{{ dimension.needAdjust }}</span>
      </div>
      <div class="compatibility-item warning">
        <span class="label">雷區提醒：</span>
        <span>{{ dimension.warning }}</span>
      </div>
    </div>

    <!-- 微行動建議 -->
    <div class="micro-actions">
      <h4>🎯 微行動建議</h4>
      <ol class="action-list">
        <li v-for="action in dimension.microActions" :key="action">{{ action }}</li>
      </ol>
    </div>

    <!-- 對照說明 -->
    <div class="contrast-section">
      <h4>🚫 你不像什麼</h4>
      <div class="contrast-items">
        <div v-for="contrast in dimension.contrasts" :key="contrast.type" class="contrast-item">
          <strong>{{ contrast.type }}：</strong>{{ contrast.reason }}
        </div>
      </div>
    </div>

    <!-- 精準度說明 -->
    <div v-if="dimension.accuracyNote" class="accuracy-note">
      <h5>🎯 精準度說明</h5>
      <p>{{ dimension.accuracyNote }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DimensionAnalysis } from '../types/quiz'

defineProps<{
  dimension: DimensionAnalysis
}>()
</script>

<style scoped>
/* 樣式已經在 app.css 中定義 */
</style>
