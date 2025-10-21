<template>
  <div class="matching-preview">
    <div class="preview-header">
      <h3>🔮 配對功能預覽</h3>
      <p>基於您的人格測驗結果，我們為您準備了以下功能</p>
    </div>

    <div class="feature-cards">
      <div class="feature-card">
        <div class="feature-icon">💕</div>
        <h4>智能配對</h4>
        <p>根據12型人格相容性，為您推薦最合適的對象</p>
        <div class="feature-preview">
          <div class="mock-match" v-for="match in mockMatches" :key="match.id">
            <div class="match-avatar">{{ match.name[0] }}</div>
            <div class="match-info">
              <span class="match-name">{{ match.name }}</span>
              <span class="compatibility">{{ match.compatibilityScore }}% 相容</span>
            </div>
          </div>
        </div>
      </div>

      <div class="feature-card">
        <div class="feature-icon">💬</div>
        <h4>深度聊天</h4>
        <p>基於人格特質的話題推薦，讓對話更有意義</p>
        <div class="feature-preview">
          <div class="chat-preview">
            <div class="topic-suggestion">
              💡 推薦話題：「你最重視的人生價值是什麼？」
            </div>
          </div>
        </div>
      </div>

      <div class="feature-card">
        <div class="feature-icon">📊</div>
        <h4>相容性分析</h4>
        <p>詳細分析你們的人格相容性，提供關係建議</p>
        <div class="feature-preview">
          <div class="compatibility-chart">
            <div class="chart-item">
              <span>價值觀契合度</span>
              <div class="progress-bar">
                <div class="progress" style="width: 85%"></div>
              </div>
              <span>85%</span>
            </div>
            <div class="chart-item">
              <span>溝通方式</span>
              <div class="progress-bar">
                <div class="progress" style="width: 78%"></div>
              </div>
              <span>78%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="feature-card">
        <div class="feature-icon">🎯</div>
        <h4>約會建議</h4>
        <p>根據雙方人格特質，推薦最適合的約會活動</p>
        <div class="feature-preview">
          <div class="date-ideas">
            <span class="date-tag">🎨 藝術展覽</span>
            <span class="date-tag">🌅 戶外健行</span>
            <span class="date-tag">☕ 咖啡廳聊天</span>
          </div>
        </div>
      </div>
    </div>

    <div class="development-roadmap">
      <h4>🚀 開發規劃</h4>
      <div class="roadmap-timeline">
        <div class="timeline-item completed">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <h5>階段一：心理測驗系統</h5>
            <p>✅ 已完成 - 12型人格測驗</p>
          </div>
        </div>
        <div class="timeline-item current">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <h5>階段二：用戶系統</h5>
            <p>🔄 開發中 - 註冊、登入、個人檔案</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <h5>階段三：配對系統</h5>
            <p>📅 規劃中 - 智能配對演算法</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <h5>階段四：互動功能</h5>
            <p>📅 規劃中 - 聊天、約會安排</p>
          </div>
        </div>
      </div>
    </div>

    <div class="early-access">
      <h4>🎉 搶先體驗</h4>
      <p>想要第一時間體驗配對功能嗎？留下您的聯絡方式，我們會優先通知您！</p>
      <div class="early-access-form">
        <input 
          v-model="email" 
          type="email" 
          placeholder="輸入您的 Email" 
          class="email-input"
        />
        <button @click="subscribeEarlyAccess" class="subscribe-btn">
          加入等候名單
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MatchingPreview',
  data() {
    return {
      email: '',
      mockMatches: [
        { id: 1, name: '小雨', compatibilityScore: 92 },
        { id: 2, name: '志明', compatibilityScore: 87 },
        { id: 3, name: '婷婷', compatibilityScore: 83 },
      ]
    }
  },
  methods: {
    subscribeEarlyAccess() {
      if (this.email) {
        alert(`謝謝您的關注！我們會寄送最新消息到 ${this.email}`)
        this.email = ''
      } else {
        alert('請輸入有效的 Email 地址')
      }
    }
  }
}
</script>

<style scoped>
.matching-preview {
  color: white;
  max-width: 900px;
  margin: 0 auto;
}

.preview-header {
  text-align: center;
  margin-bottom: 2rem;
}

.preview-header h3 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.feature-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feature-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.feature-card h4 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.feature-card p {
  margin-bottom: 1rem;
  opacity: 0.9;
  font-size: 0.9rem;
}

.feature-preview {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 1rem;
}

.mock-match {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 0.5rem;
}

.match-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #feca57);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
}

.match-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.match-name {
  font-weight: 500;
}

.compatibility {
  font-size: 0.8rem;
  opacity: 0.8;
}

.chat-preview {
  text-align: center;
}

.topic-suggestion {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.8rem;
  font-size: 0.9rem;
}

.compatibility-chart {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.chart-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.8rem;
}

.chart-item span:first-child {
  flex: 1;
  text-align: left;
}

.chart-item span:last-child {
  min-width: 35px;
  text-align: right;
}

.progress-bar {
  flex: 2;
  height: 6px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #ff6b6b, #feca57);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.date-ideas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.date-tag {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
}

.development-roadmap {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.development-roadmap h4 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.roadmap-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  position: relative;
}

.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: 9px;
  top: 20px;
  width: 2px;
  height: calc(100% + 1.5rem);
  background: rgba(255, 255, 255, 0.3);
}

.timeline-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.5);
  flex-shrink: 0;
  margin-top: 2px;
}

.timeline-item.completed .timeline-dot {
  background: #2ecc71;
  border-color: #2ecc71;
}

.timeline-item.current .timeline-dot {
  background: #f39c12;
  border-color: #f39c12;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

.timeline-content h5 {
  margin-bottom: 0.3rem;
  font-size: 1rem;
}

.timeline-content p {
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0;
}

.early-access {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
}

.early-access h4 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.early-access p {
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.early-access-form {
  display: flex;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
}

.email-input {
  flex: 1;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
}

.email-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.5);
}

.subscribe-btn {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.subscribe-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
}

@media (max-width: 768px) {
  .feature-cards {
    grid-template-columns: 1fr;
  }
  
  .early-access-form {
    flex-direction: column;
  }
  
  .roadmap-timeline {
    gap: 1rem;
  }
  
  .timeline-item {
    gap: 0.8rem;
  }
}
</style>
