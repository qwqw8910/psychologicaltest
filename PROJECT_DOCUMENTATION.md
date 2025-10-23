# Vue 心理測驗專案文檔

## 📋 專案概述

這是一個基於 Vue 3 + TypeScript 的心理人格測驗應用程式，提供 12 種人格類型的綜合分析。用戶可以通過回答 12 道問題，獲得詳細的人格分析報告，包括核心價值、溝通風格、承諾模式等三個維度的深度解析。

### 🎯 核心功能
- **歡迎頁面**：用戶註冊和測驗介紹
- **心理測驗**：12 題多選問題，覆蓋三大人格維度
- **結果分析**：詳細的人格類型分析和配對建議
- **維度解析**：深入分析用戶在各個維度的表現
- **配對預覽**：未來功能擴展預留接口

## 🏗️ 專案結構

```
vue-project/
├── 📄 配置文件
│   ├── package.json          # 依賴管理和腳本配置
│   ├── vite.config.ts        # Vite 建構工具配置
│   ├── tsconfig.json         # TypeScript 主配置
│   ├── tsconfig.app.json     # 應用程式 TS 配置
│   ├── tsconfig.node.json    # Node.js TS 配置
│   ├── env.d.ts             # 環境類型聲明
│   ├── index.html           # HTML 入口文件
│   └── README.md            # 專案說明
│
├── 📁 public/               # 靜態資源
│   └── favicon.ico         
│
└── 📁 src/                  # 源代碼目錄
    ├── App.vue              # 根組件
    ├── main.ts              # 應用程式入口
    │
    ├── 📁 assets/           # 資源文件
    │   └── styles/          # 樣式文件
    │       ├── app.css      # 主要應用樣式
    │       ├── base.css     # 基礎樣式重置
    │       ├── components.css # 組件專用樣式
    │       ├── responsive.css # 響應式樣式
    │       └── variables.css  # CSS 變數定義
    │
    ├── 📁 components/       # Vue 組件
    │   ├── WelcomePage.vue  # 歡迎頁面組件
    │   ├── QuizPage.vue     # 測驗頁面組件
    │   ├── ResultPage.vue   # 結果頁面組件
    │   ├── DimensionCard.vue # 維度分析卡片組件
    │   └── MatchingPreview.vue # 配對預覽組件
    │
    ├── 📁 router/           # 路由配置
    │   └── index.ts         # Vue Router 設定
    │
    ├── 📁 stores/           # 狀態管理
    │   ├── index.ts         # Pinia 配置
    │   ├── quizStore.ts     # 測驗狀態管理
    │   └── userStore.ts     # 用戶狀態管理
    │
    ├── 📁 types/            # TypeScript 類型定義
    │   └── quiz.ts          # 測驗相關類型
    │
    └── 📁 utils/            # 工具函數
        └── matchingAlgorithm.ts # 配對算法
```

## 🛠️ 技術架構

### 核心技術棧
- **Vue 3** (v3.5.22) - 前端框架，使用 Composition API
- **TypeScript** (v5.9.0) - 類型安全的 JavaScript 超集
- **Vite** (v7.1.7) - 現代化建構工具
- **Pinia** (v3.0.3) - Vue 官方狀態管理庫
- **Vue Router** (v4.5.1) - 單頁應用路由管理

### 開發工具
- **Vue DevTools** - Vue 開發者工具
- **TypeScript Compiler** - 類型檢查
- **npm-run-all2** - 並行腳本執行

### Node.js 版本要求
- Node.js ^20.19.0 或 >=22.12.0

## 📦 依賴說明

### 生產依賴
```json
{
  "pinia": "^3.0.3",        // 狀態管理
  "vue": "^3.5.22",         // 核心框架
  "vue-router": "^4.5.1"    // 路由管理
}
```

### 開發依賴
```json
{
  "@tsconfig/node22": "^22.0.2",      // Node.js TS 配置
  "@types/node": "^22.18.6",          // Node.js 類型定義
  "@vitejs/plugin-vue": "^6.0.1",     // Vue Vite 插件
  "@vue/tsconfig": "^0.8.1",          // Vue TS 配置
  "npm-run-all2": "^8.0.4",           // 並行腳本
  "typescript": "~5.9.0",             // TypeScript 編譯器
  "vite": "^7.1.7",                   // 建構工具
  "vite-plugin-vue-devtools": "^8.0.2", // Vue 開發工具
  "vue-tsc": "^3.1.0"                 // Vue TypeScript 檢查
}
```

## 📱 組件架構

### 1. App.vue - 根組件
- **職責**：應用程式主要容器和路由控制
- **功能**：根據測驗步驟渲染對應組件
- **狀態管理**：監聽 quizStore 的 step 狀態

### 2. WelcomePage.vue - 歡迎頁面
- **職責**：用戶引導和測驗開始
- **功能**：
  - 收集用戶名稱
  - 測驗說明和介紹
  - 開始測驗按鈕
- **表單驗證**：確保用戶名稱不為空

### 3. QuizPage.vue - 測驗頁面
- **職責**：問題展示和答案收集
- **功能**：
  - 進度條顯示
  - 問題類別標籤
  - 四選一答案選項
  - 自動進入下一題
- **數據流**：答案直接保存到 quizStore

### 4. ResultPage.vue - 結果頁面
- **職責**：測驗結果展示
- **功能**：
  - 基本人格類型顯示
  - 配對相容性分析
  - 查看詳細分析按鈕
  - 重新測驗選項

### 5. DimensionCard.vue - 維度分析卡片
- **職責**：深度維度分析展示
- **功能**：
  - 三大維度詳細分析
  - 個人化建議
  - 日常行為模式分析
  - 優勢風險提示

### 6. MatchingPreview.vue - 配對預覽
- **職責**：未來配對功能預留
- **功能**：暫時作為佔位組件

## 🗄️ 狀態管理架構

### quizStore.ts - 測驗核心狀態
```typescript
// 主要狀態
const username = ref('')              // 用戶名稱
const step = ref(0)                   // 當前步驟 (0-3)
const currentQuestion = ref(0)        // 當前問題索引
const answers = ref<number[]>([])     // 答案數組
const result = ref<TestResult>({...}) // 基本測驗結果
const detailedResult = ref<DetailedResult>({...}) // 詳細分析結果

// 核心方法
- setUsername(name: string)           // 設定用戶名稱
- startTest()                         // 開始測驗
- answerQuestion(answerIndex: number) // 記錄答案
- goToStep(newStep: number)           // 跳轉步驟
- reset()                            // 重置所有狀態
- calculateResult()                   // 計算測驗結果
```

### userStore.ts - 用戶狀態管理
- **職責**：管理用戶相關的持久化狀態
- **功能**：用戶偏好、歷史記錄等

## 🧠 測驗邏輯架構

### 人格維度系統
測驗基於三大核心維度，每個維度 4 道問題：

#### 1. CV (Core Values) - 核心價值觀
- **問題範圍**：生涯規劃、家庭態度、金錢觀、家庭責任
- **類型分析**：
  - 穩定保守型：重視安全感與長期規劃
  - 開拓成長型：追求進步與新機會
  - 自由獨立型：珍視個人自主權
  - 關係互助型：以人際連結為重心

#### 2. COM (Communication) - 溝通修復風格
- **問題範圍**：衝突處理、修復機制、決策模式
- **類型分析**：
  - 調和協作型：追求和諧與雙贏
  - 直言坦率型：溝通直接高效
  - 理性系統型：重視邏輯與制度
  - 情感連結型：優先處理情感需求

#### 3. CMT (Commitment) - 承諾與資源分配
- **問題範圍**：財務管理、時間分工、關係界線、安全感來源
- **類型分析**：
  - 共同投入型：相信資源共享與合作
  - 獨立自主型：重視個人界線與清晰分工
  - 結構紀律型：重視規則與制度
  - 彈性適應型：根據情況靈活調整

### 計分演算法
```typescript
// 1. 按維度分類計分
const types = { CV: [0,0,0,0], COM: [0,0,0,0], CMT: [0,0,0,0] }

// 2. 統計各選項得分
questions.forEach((q, i) => {
  const answerIdx = answers[i]
  types[q.type][answerIdx]++
})

// 3. 主型判定邏輯
// - 找出最高分
// - 處理並列情況
// - 判定主型和次型

// 4. 生成詳細分析
// - 個人化建議
// - 日常行為模式
// - 優勢風險評估
// - 相容性分析
```

## 🎨 樣式架構

### CSS 模組化設計
採用模組化 CSS 架構，便於維護和擴展：

#### variables.css - 設計系統變數
```css
:root {
  --primary: #ff6b9d;      /* 主色調 - 粉紅色 */
  --secondary: #667eea;    /* 次要色 - 藍色 */
  --bg-light: #f8fafc;    /* 淺色背景 */
  --text-primary: #1a202c; /* 主要文字色 */
  --border-color: #e2e8f0; /* 邊框色 */
  /* ... 更多變數 */
}
```

#### base.css - 基礎樣式重置
- 瀏覽器樣式重置
- 全域字體設定
- 基本 HTML 元素樣式

#### components.css - 組件樣式
- 按鈕樣式系統
- 卡片組件樣式
- 表單元素樣式
- 進度條樣式

#### app.css - 應用程式樣式
- 頁面佈局樣式
- 測驗相關組件樣式
- 結果展示樣式

#### responsive.css - 響應式設計
- 行動裝置適配
- 平板裝置優化
- 桌面版樣式增強

### 顏色主題說明
- **主色調 (#ff6b9d)**：用於重要按鈕、進度條、強調元素
- **次要色 (#667eea)**：用於次要按鈕、輔助信息
- **背景色系**：多層次灰階背景，提供良好的視覺層次

## 🔧 開發指令

```bash
# 安裝依賴
npm install

# 開發模式啟動
npm run dev

# 建構生產版本
npm run build

# 預覽建構結果
npm run preview

# 僅建構（不進行類型檢查）
npm run build-only

# TypeScript 類型檢查
npm run type-check
```

## 📊 類型系統

### 核心類型定義 (types/quiz.ts)

```typescript
// 問題結構
interface Question {
  q: string                    // 問題內容
  opts: string[]              // 選項數組
  type: 'CV' | 'COM' | 'CMT'  // 維度類型
  category: string            // 問題類別
}

// 基本測驗結果
interface TestResult {
  mainType: string    // 主要人格類型
  subType: string     // 次要人格類型
  desc: string        // 基本描述
  best: string        // 最佳配對
  adjust: string      // 需要調整的配對
  conflict: string    // 可能衝突的配對
}

// 詳細維度分析
interface DimensionAnalysis {
  type: string                           // 維度類型
  title: string                          // 維度標題
  icon: string                           // 圖標
  mainStyle: string                      // 主要風格
  styleTag: string                       // 風格標籤
  styleNames: string[]                   // 所有風格名稱
  scores: number[]                       // 各選項得分
  confidenceLevel: 'high' | 'medium' | 'low' // 信心等級
  confidenceText: string                 // 信心等級文字
  choiceReasons: ChoiceReason[]          // 選擇理由
  dailyPatterns: string[]                // 日常行為模式
  advantages: string                     // 優勢
  risks: string                          // 風險
  bestMatch: string                      // 最佳配對
  needAdjust: string                     // 需要調整
  warning: string                        // 警告提示
  microActions: string[]                 // 微行動建議
  contrasts: ContrastItem[]              // 對比分析
  accuracyNote: string | null            // 準確度說明
}
```

## 🚀 部署說明

### GitHub Pages 部署
專案已配置 GitHub Actions 自動部署：

1. **推送到 main 分支**：自動觸發建構和部署
2. **建構產物**：Vite 建構到 `dist` 目錄
3. **GitHub Pages**：自動發布到 GitHub Pages

### 本地建構
```bash
# 建構生產版本
npm run build

# 預覽建構結果
npm run preview
```

## 🔄 未來擴展規劃

### 1. 配對系統 (matchingAlgorithm.ts)
- **相容性計算**：基於三維度得分計算配對相容性
- **匹配推薦**：提供潛在配對建議
- **關係建議**：針對不同組合提供相處建議

### 2. 數據持久化
- **LocalStorage**：保存測驗記錄
- **用戶歷史**：多次測驗結果對比
- **進度保存**：中途退出恢復功能

### 3. 社交功能
- **結果分享**：社交媒體分享功能
- **匿名配對**：基於測驗結果的匿名配對
- **群組分析**：團隊或群組的整體分析

### 4. 測驗擴展
- **更多維度**：增加情緒管理、價值觀等維度
- **自適應題目**：基於答案動態調整後續問題
- **個人化報告**：更詳細的個人分析報告

## 🐛 已知問題與解決方案

### 1. 顏色對比度問題
**問題**：初始藍色主題對比度不足
**解決**：更換為粉紅色主題 (#ff6b9d)，提升可讀性

### 2. TypeScript 嚴格模式
**解決**：完整的類型定義，避免 any 類型使用

### 3. 響應式設計
**解決**：獨立的 responsive.css，確保各設備適配

## 📝 編碼規範

### 1. Vue 組件規範
- 使用 Composition API
- 單文件組件 (.vue)
- Props 和 Emits 明確定義
- 響應式數據使用 ref/reactive

### 2. TypeScript 規範
- 嚴格類型檢查
- 接口優於類型別名
- 避免 any 類型
- 明確的函數返回類型

### 3. 樣式規範
- CSS 變數集中管理
- 模組化樣式文件
- 語義化類名
- 響應式優先設計

### 4. 命名規範
- 組件：PascalCase (WelcomePage.vue)
- 函數：camelCase (startTest)
- 變數：camelCase (currentQuestion)
- 常數：UPPER_SNAKE_CASE

## 🔍 除錯指南

### 1. 常見問題排查
```bash
# 依賴問題
npm install

# TypeScript 錯誤
npm run type-check

# 建構問題
npm run build-only
```

### 2. 開發工具
- **Vue DevTools**：狀態檢查
- **瀏覽器開發者工具**：樣式和 JavaScript 除錯
- **VS Code 插件**：Vue Language Features, TypeScript

### 3. 狀態除錯
- 使用 Pinia DevTools 檢查狀態變化
- console.log 輸出關鍵數據
- 檢查 computed 屬性的依賴關係

## 📚 學習資源

### Vue 3 相關
- [Vue 3 官方文檔](https://vuejs.org/)
- [Composition API 指南](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Pinia 狀態管理](https://pinia.vuejs.org/)

### TypeScript 相關
- [TypeScript 官方文檔](https://www.typescriptlang.org/)
- [Vue 3 + TypeScript 指南](https://vuejs.org/guide/typescript/overview.html)

### 建構工具
- [Vite 官方文檔](https://vitejs.dev/)
- [Vue Router 4](https://router.vuejs.org/)

---

## 📧 聯絡信息

如有問題或建議，請通過以下方式聯絡：
- GitHub Issues：在專案倉庫提交 Issue
- 開發團隊：透過 GitHub 討論區交流

**最後更新時間**：2024年12月

---

*此文檔涵蓋了專案的完整架構和開發指南，便於團隊協作和未來維護。建議定期更新此文檔以反映最新的變更。*
