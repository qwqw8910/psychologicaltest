<template>
    <div class="result-page">
        <div class="result-header">
            <div class="celebration">🎉</div>
            <h2>恭喜 {{ username }}！</h2>
            <p>您的完整人格分析報告</p>
        </div>

        <!-- 整合後的最終人格報告 -->
        <div v-if="finalProfile" class="final-profile-card">
            <div class="final-header">
                <div class="type-name">{{ finalProfile.typeName }}</div>
                <div class="short-tag">{{ finalProfile.shortTag }}</div>
            </div>

            <div class="profile-sections">
                <section class="profile-section">
                    <h4>🌟 日常樣貌</h4>
                    <ul class="bullet-list">
                        <li v-for="p in finalProfile.dailyPatterns" :key="p">{{ p }}</li>
                    </ul>
                </section>
                <section class="profile-section two-col">
                    <div>
                        <h4>💪 優勢</h4>
                        <ul class="bullet-list">
                            <li v-for="a in finalProfile.advantages" :key="a">{{ a }}</li>
                        </ul>
                    </div>
                    <div>
                        <h4>⚠️ 缺點</h4>
                        <ul class="bullet-list warning">
                            <li v-for="r in finalProfile.risks" :key="r">{{ r }}</li>
                        </ul>
                    </div>
                </section>
                <section class="profile-section compatibility">
                    <h4>💕 相容性提示</h4>
                    <div class="compat-grid">
                        <div class="compat-box best">
                            <span class="label">最順：</span>{{ finalProfile.compatibility.best }}
                        </div>
                        <div class="compat-box adjust">
                            <span class="label">需調：</span>{{ finalProfile.compatibility.adjust }}
                        </div>
                        <div class="compat-box conflict">
                            <span class="label">易衝：</span>{{ finalProfile.compatibility.conflict }}
                        </div>
                    </div>
                </section>
                <section class="profile-section">
                    <h4>🎯 行動建議</h4>
                    <ul class="bullet-list neutral">
                        <li v-for="ac in finalProfile.actions" :key="ac">{{ ac }}</li>
                    </ul>
                </section>
                <section class="profile-section">
                    <h4>🧩 其他建議</h4>
                    <ul class="bullet-list neutral">
                        <li v-for="o in finalProfile.otherSuggestions" :key="o">{{ o }}</li>
                    </ul>
                </section>
            </div>
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

const quizStore = useQuizStore()

const {
    username,
    detailedResult,
    finalProfile
} = storeToRefs(quizStore)

const handleReset = () => {
    quizStore.reset()
}

const handleViewMatching = () => {
    quizStore.goToStep(3)
}
</script>

<style scoped>
/* 新增最終報告樣式：可與全域樣式配合 */
.final-profile-card {
    background: var(--card-bg, rgba(255, 255, 255, 0.08));
    backdrop-filter: var(--backdrop-filter, blur(15px));
    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.2));
    border-radius: var(--border-radius-lg, 20px);
    padding: 2rem;
    margin: 0 auto 2rem;
    text-align: left;
    box-shadow: var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.1));
    width: 100%;
}

.final-header {
    margin-bottom: 1.5rem;
}

.type-name {
    font-size: 1.3rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: .25rem;
}

.short-tag {
    font-size: .95rem;
    color: var(--text-secondary, #e0dfe4);
}

.profile-section {
    margin-bottom: 1.75rem;
}

.profile-section h4 {
    color: var(--primary-color, #ff6b9d);
    font-size: 1.05rem;
    margin: 0 0 .9rem;
    font-weight: 600;
}

.two-col {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

.bullet-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: .5rem;
}

.bullet-list li {
    background: var(--surface-color, rgba(255, 255, 255, 0.08));
    padding: .65rem .85rem;
    border-radius: 12px;
    line-height: 1.4;
    font-size: .9rem;
    border-left: 3px solid var(--primary-color, #ff6b9d);
    color: #fff;
}

.bullet-list.warning li {
    border-left-color: #ef4444;
}

.bullet-list.neutral li {
    border-left-color: #667eea;
}

.compat-grid {
    display: grid;
    gap: .75rem;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
}

.compat-box {
    padding: .75rem .85rem;
    border-radius: 12px;
    font-size: .85rem;
    line-height: 1.4;
    position: relative;
}

.compat-box .label {
    font-weight: 600;
    margin-right: .25rem;
}

.compat-box.best {
    background: rgba(16, 185, 129, .12);
    border-left: 4px solid #10b981;
}

.compat-box.adjust {
    background: rgba(245, 158, 11, .12);
    border-left: 4px solid #f59e0b;
}

.compat-box.conflict {
    background: rgba(239, 68, 68, .12);
    border-left: 4px solid #ef4444;
}

@media (max-width:600px) {
    .final-profile-card {
        padding: 1.5rem;
    }

    .two-col {
        grid-template-columns: 1fr;
    }
}
</style>
