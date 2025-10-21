<template>
  <div id="app" class="app">
    <!-- 背景裝飾 -->
    <div class="bg-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
      <div class="circle circle-4"></div>
      <div class="circle circle-5"></div>
    </div>

    <div class="container">
      <!-- 首頁 -->
      <div v-if="step === 0" class="welcome-page">
        <div class="logo">
          <div class="heart-icon">💕</div>
          <h1 class="title">心理人格配對測驗</h1>
          <p class="subtitle">探索你的關係人格，找到最適合的靈魂伴侶</p>
        </div>

        <div class="start-form">
          <div class="input-group">
            <label for="username">請輸入您的姓名</label>
            <input id="username" v-model="username" placeholder="例如：小明" class="name-input" @keyup.enter="startTest" />
          </div>
          <button @click="startTest" :disabled="!username" class="start-btn">
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

      <!-- 測驗頁面 -->
      <div v-else-if="step === 1" class="quiz-page">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }"></div>
        </div>

        <div class="question-card">
          <div class="question-header">
            <span class="question-number">第 {{ currentQuestion + 1 }} 題</span>
            <span class="total-questions">共 {{ questions.length }} 題</span>
          </div>

          <div class="question-category">
            <span class="category-badge">{{ questions[currentQuestion].category }}</span>
          </div>

          <h2 class="question-text">{{ questions[currentQuestion].q }}</h2>

          <div class="options">
            <button v-for="(opt, idx) in questions[currentQuestion].opts" :key="idx" @click="answer(idx)"
              class="option-btn">
              <span class="option-letter">{{ String.fromCharCode(65 + idx) }}</span>
              <span class="option-text">{{ opt }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 結果頁面 -->
      <div v-else-if="step === 2" class="result-page">
        <div class="result-header">
          <div class="celebration">🎉</div>
          <h2>恭喜 {{ username }}！</h2>
          <p>您的心理測驗已完成</p>
        </div>

        <div class="result-card">
          <div class="personality-type">
            <div class="type-icon">🎭</div>
            <div class="type-info">
              <h3>您的人格類型</h3>
              <div class="main-type">{{ result.mainType }}</div>
              <div v-if="result.subType" class="sub-type">次要類型：{{ result.subType }}</div>
            </div>
          </div>

          <div class="description">
            <h4>性格描述</h4>
            <p>{{ result.desc }}</p>
          </div>
        </div>

        <div class="compatibility-section">
          <h3>💕 相容性分析</h3>

          <div class="compatibility-card best">
            <div class="compatibility-header">
              <span class="icon">✨</span>
              <h4>最佳配對</h4>
            </div>
            <p>{{ result.best }}</p>
          </div>

          <div class="compatibility-card adjust">
            <div class="compatibility-header">
              <span class="icon">⚖️</span>
              <h4>需要協調</h4>
            </div>
            <p>{{ result.adjust }}</p>
          </div>

          <div class="compatibility-card conflict">
            <div class="compatibility-header">
              <span class="icon">⚠️</span>
              <h4>可能衝突</h4>
            </div>
            <p>{{ result.conflict }}</p>
          </div>
        </div>

        <div class="action-buttons">
          <button @click="reset" class="secondary-btn">重新測驗</button>
          <button @click="viewMatchingPreview" class="primary-btn">
            查看配對功能
          </button>
        </div>
      </div>

      <!-- 配對功能預覽頁面 -->
      <div v-else-if="step === 3" class="matching-page">
        <div class="back-button-container">
          <button @click="backToResult" class="back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
            返回結果
          </button>
        </div>
        <MatchingPreview />
      </div>
    </div>
  </div>
</template>

<script>
import MatchingPreview from './components/MatchingPreview.vue'

export default {
  components: {
    MatchingPreview
  },
  data() {
    return {
      username: "",
      step: 0,
      currentQuestion: 0,
      answers: [],
      questions: [
        // CV - 核心價值與人生方向
        {
          q: "未來3–5年生活/職涯的優先選擇？",
          opts: [
            "穩定落地、固定城市與工作、可提前成家",
            "追求目標與成長、有機會會搬遷或轉換跑道",
            "保持彈性與自由，短期合約或接案、不被綁住",
            "以伴侶/家人/社群的需求為優先，住近支持網絡"
          ],
          type: "CV",
          category: "核心價值"
        },
        {
          q: "對婚育/家庭型態的基本態度？",
          opts: [
            "傳統路線、先婚再育、整體規劃",
            "視資源與生涯階段而定，可延後或調整",
            "不受傳統拘束，彈性選擇（含不婚不育）",
            "重視陪伴與照護，家庭品質比形式更重要"
          ],
          type: "CV",
          category: "核心價值"
        },
        {
          q: "面對金錢與風險的習慣？",
          opts: [
            "保守儲蓄、避免高風險、穩健理財",
            "合理冒險、投資成長、看長期回報",
            "當下價值最大化，花費偏自由與體驗",
            "共享與公平，願意支援家人/社群需求"
          ],
          type: "CV",
          category: "核心價值"
        },
        {
          q: "原生家庭與長輩照護的看法？",
          opts: [
            "預先規劃，固定安排與責任分工",
            "彈性支援，但不影響主要目標太多",
            "界線清楚，不因期待而勉強自己",
            "優先維繫連結，主動參與照護與節日"
          ],
          type: "CV",
          category: "核心價值"
        },
        // COM - 溝通與衝突修復
        {
          q: "吵架時你最希望對方怎麼做？",
          opts: [
            "先停火冷靜，彼此退一步找折衷",
            "直接講重點、當下解決問題",
            "拆解事實、釐清流程與責任",
            "先安撫感受與需求，再談事情"
          ],
          type: "COM",
          category: "溝通方式"
        },
        {
          q: "你習慣的修復SOP是？",
          opts: [
            "道歉互退、重建共識",
            "指出問題與界線、立即修正",
            "蒐集資料、擬方案、設定追蹤",
            "說出感受與需要、確認被理解"
          ],
          type: "COM",
          category: "溝通方式"
        },
        {
          q: "面對伴侶慢回訊/遲到等小摩擦，你會？",
          opts: [
            "討論合理規則，互相體諒",
            "直接提醒並要求改進",
            "設定量化標準與補救措施",
            "表達受傷與需要安全感/連結"
          ],
          type: "COM",
          category: "溝通方式"
        },
        {
          q: "做重大決策的對話方式？",
          opts: [
            "列利弊、找中間值",
            "各自陳述立場、當場拍板",
            "蒐集證據、設KPI與分工",
            "先交換感受與價值、再具體化"
          ],
          type: "COM",
          category: "溝通方式"
        },
        // CMT - 承諾與資源分配
        {
          q: "財務管理偏好？",
          opts: [
            "設共同預算，按比例分擔",
            "各自管理、清楚分開",
            "盤點收支、固定檢討與透明紀錄",
            "視情況調整，不拘形式但誠實信任"
          ],
          type: "CMT",
          category: "資源分配"
        },
        {
          q: "時間與家務分工？",
          opts: [
            "共同制定排程，互補與輪替",
            "各自負責自己的區域，互不干涉",
            "固定分工與標準，定期回顧",
            "依週期與狀態彈性分配"
          ],
          type: "CMT",
          category: "資源分配"
        },
        {
          q: "對前任/異性朋友的界線？",
          opts: [
            "共同約定可見透明，兼顧對方感受",
            "我有我的交友範圍，但遵守基本尊重",
            "明確規則，違反有處置",
            "視信任程度調整，重點是誠實報備"
          ],
          type: "CMT",
          category: "資源分配"
        },
        {
          q: "你的安全感主要來自？",
          opts: [
            "彼此的投入與陪伴",
            "自己的選擇與界線被尊重",
            "穩定的制度與紀律",
            "彈性信任配合一致行為"
          ],
          type: "CMT",
          category: "資源分配"
        },
      ],
      result: {
        mainType: '',
        subType: '',
        desc: '',
        best: '',
        adjust: '',
        conflict: ''
      },
    };
  },
  methods: {
    startTest() {
      if (!this.username.trim()) return;
      this.step = 1;
      this.currentQuestion = 0;
      this.answers = [];
    },
    answer(idx) {
      this.answers.push(idx);
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
      } else {
        this.calculateResult();
        this.step = 2;
      }
    },
    calculateResult() {
      // 計分系統
      const types = {
        CV: [0, 0, 0, 0],
        COM: [0, 0, 0, 0],
        CMT: [0, 0, 0, 0],
      };

      this.questions.forEach((q, i) => {
        types[q.type][this.answers[i]]++;
      });

      // 人格類型映射
      const getTypeName = (type, idx) => {
        const typeMap = {
          CV: ["穩定保守型", "開拓成長型", "自由獨立型", "關係互助型"],
          COM: ["調和協作型", "直言坦率型", "理性系統型", "情感連結型"],
          CMT: ["共同投入型", "獨立自主型", "結構紀律型", "彈性適應型"],
        };
        return `${type}-${typeMap[type][idx]}`;
      };

      // 計算各面向得分
      const scoreArr = Object.entries(types).map(([type, arr]) => {
        const max = Math.max(...arr);
        const maxIdx = arr.indexOf(max);
        const sorted = [...arr].sort((a, b) => b - a);
        return {
          type,
          arr,
          max,
          maxIdx,
          diff: sorted[0] - sorted[1],
          typeName: getTypeName(type, maxIdx)
        };
      });

      // 主型判定邏輯
      scoreArr.sort((a, b) => b.max - a.max);
      let main = scoreArr[0];
      let sub = scoreArr[1];

      // 處理並列情況
      const topScores = scoreArr.filter(s => s.max === scoreArr[0].max);
      if (topScores.length > 1) {
        topScores.sort((a, b) => b.diff - a.diff);
        if (topScores[0].diff === topScores[1].diff) {
          // 雙主型
          main = topScores[0];
          sub = topScores[1];
          this.result.mainType = `${main.typeName} + ${sub.typeName}`;
        } else {
          main = topScores[0];
          sub = scoreArr.find(s => s !== main) || scoreArr[1];
          this.result.mainType = main.typeName;
        }
      } else {
        this.result.mainType = main.typeName;
      }

      this.result.subType = sub.typeName;

      // 設定描述和建議
      this.setPersonalityDescription();
    },
    setPersonalityDescription() {
      const descriptions = {
        "CV-穩定保守型": "您重視安全感、穩定性和長期規劃，偏好傳統而可靠的生活方式。在關係中，您是值得信賴的伴侶，會為共同的未來努力。",
        "CV-開拓成長型": "您具有強烈的進取心和成長導向，勇於追求目標和新機會。在關係中，您會激勵伴侶一起進步，創造更美好的未來。",
        "CV-自由獨立型": "您珍視個人自主權和生活彈性，不喜歡被過度約束。在關係中，您需要足夠的個人空間，同時也會尊重伴侶的獨立性。",
        "CV-關係互助型": "您以人際關係和社群連結為生活重心，重視照護和互助。在關係中，您是溫暖體貼的伴侶，會優先考慮彼此的需求。",
        "COM-調和協作型": "您善於化解衝突，追求雙贏的解決方案。在關係中，您是和諧的維護者，總是努力讓彼此都感到舒適。",
        "COM-直言坦率型": "您溝通直接有效，重視效率和結果。在關係中，您能清楚表達想法，也期望伴侶同樣坦誠。",
        "COM-理性系統型": "您善於邏輯分析和系統化思考，喜歡有條理地解決問題。在關係中，您會用理性的方式處理衝突和挑戰。",
        "COM-情感連結型": "您重視情感交流和心靈連結，善於察覺和回應他人的感受。在關係中，您是情感支柱，能創造深度的親密感。",
        "CMT-共同投入型": "您相信共同努力和資源分享，重視公平和團隊合作。在關係中，您會全心投入，期望建立真正的伙伴關係。",
        "CMT-獨立自主型": "您重視個人界線和自主管理，喜歡清楚的分工。在關係中，您會維持個人獨立性，同時尊重伴侶的自主權。",
        "CMT-結構紀律型": "您重視規則和制度，喜歡有組織的生活方式。在關係中，您會建立穩定的相處模式，讓彼此都有安全感。",
        "CMT-彈性適應型": "您具有良好的適應能力，能根據情況靈活調整。在關係中，您是變通的伴侶，能應對各種挑戰和變化。"
      };

      const compatibility = {
        "CV-穩定保守型": {
          best: "CMT-結構紀律型、COM-調和協作型、CV-關係互助型",
          adjust: "COM-直言坦率型（需要更多耐心溝通）、CMT-共同投入型（注意分工平衡）",
          conflict: "CV-自由獨立型、CMT-獨立自主型（價值觀和承諾度差異較大）"
        },
        "CV-開拓成長型": {
          best: "CMT-彈性適應型、COM-理性系統型、COM-直言坦率型",
          adjust: "CV-穩定保守型（節奏協調）、CMT-結構紀律型（保持彈性）",
          conflict: "COM-情感連結型（可能忽視情感需求）"
        },
        "CV-自由獨立型": {
          best: "CMT-獨立自主型、CMT-彈性適應型、COM-調和協作型",
          adjust: "COM-直言坦率型（避免控制感）、CMT-結構紀律型（保留自由度）",
          conflict: "CV-穩定保守型（生活方式差異）"
        },
        "CV-關係互助型": {
          best: "COM-情感連結型、CMT-共同投入型、COM-調和協作型",
          adjust: "COM-直言坦率型（注意溝通方式）、CMT-獨立自主型（平衡陪伴需求）",
          conflict: "CV-自由獨立型（照護期待差異）"
        },
        "COM-調和協作型": {
          best: "CV-關係互助型、CMT-共同投入型、CMT-彈性適應型",
          adjust: "COM-直言坦率型（設定溝通界線）",
          conflict: "與CMT-獨立自主型可能產生期待落差"
        },
        "COM-直言坦率型": {
          best: "CV-開拓成長型、CMT-結構紀律型、COM-理性系統型",
          adjust: "COM-情感連結型（先處理情感再談事情）、CV-關係互助型（注意表達方式）",
          conflict: "COM-調和協作型（溝通風格差異）"
        },
        "COM-理性系統型": {
          best: "CMT-結構紀律型、CV-開拓成長型、CV-穩定保守型",
          adjust: "COM-情感連結型（增加情感關懷）",
          conflict: "過度理性分析可能忽視情感需求"
        },
        "COM-情感連結型": {
          best: "CV-關係互助型、CMT-共同投入型、COM-調和協作型",
          adjust: "COM-直言坦率型（建立安全溝通環境）、CMT-獨立自主型（尊重界線）",
          conflict: "CMT-結構紀律型（規則vs情感優先）"
        },
        "CMT-共同投入型": {
          best: "CV-關係互助型、COM-調和協作型、COM-情感連結型",
          adjust: "CV-自由獨立型（保留個人空間）",
          conflict: "CMT-獨立自主型（資源分配理念差異）"
        },
        "CMT-獨立自主型": {
          best: "CV-自由獨立型、COM-理性系統型",
          adjust: "CV-關係互助型、COM-情感連結型（增加透明度和同理心）",
          conflict: "CMT-共同投入型（獨立vs共享）"
        },
        "CMT-結構紀律型": {
          best: "CV-穩定保守型、COM-理性系統型、COM-直言坦率型",
          adjust: "CMT-彈性適應型（增加彈性）",
          conflict: "CV-自由獨立型（感到被約束）、COM-情感連結型（感到被忽視）"
        },
        "CMT-彈性適應型": {
          best: "CV-開拓成長型、COM-調和協作型",
          adjust: "CMT-結構紀律型（建立基本框架）",
          conflict: "COM-直言坦率型（可能過於直接）"
        }
      };

      const mainType = this.result.mainType.split(" + ")[0];
      this.result.desc = descriptions[mainType] || "您擁有獨特的人格特質，在關係中會展現出特殊的魅力。";

      const compatibilityInfo = compatibility[mainType];
      if (compatibilityInfo) {
        this.result.best = compatibilityInfo.best;
        this.result.adjust = compatibilityInfo.adjust;
        this.result.conflict = compatibilityInfo.conflict;
      } else {
        this.result.best = "與多種類型都有良好相容性";
        this.result.adjust = "保持開放溝通";
        this.result.conflict = "注意價值觀差異";
      }
    },
    reset() {
      this.step = 0;
      this.username = "";
      this.answers = [];
      this.result = {
        mainType: '',
        subType: '',
        desc: '',
        best: '',
        adjust: '',
        conflict: ''
      };
      this.currentQuestion = 0;
    },
    viewMatchingPreview() {
      this.step = 3;
    },
    backToResult() {
      this.step = 2;
    }
  },
};
</script>

<style>
/* 導入 CSS 模組 */
@import './assets/styles/variables.css';
@import './assets/styles/base.css';
@import './assets/styles/components.css';
@import './assets/styles/app.css';
@import './assets/styles/responsive.css';
</style>
