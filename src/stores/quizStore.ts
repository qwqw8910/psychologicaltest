import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Question, TestResult, DetailedResult, DimensionAnalysis, FinalProfile } from '../types/quiz'

export const useQuizStore = defineStore('quiz', () => {
  // 狀態
  const username = ref('')
  const step = ref(0) // 0: 首頁, 1: 測驗, 2: 結果, 3: 配對預覽
  const currentQuestion = ref(0)
  const answers = ref<number[]>([])
  
  // 題目數據
  const questions = ref<Question[]>([
  {
    "q": "未來3–5年生活/職涯的優先選擇？",
    "opts": [
      "安穩定下來，固定城市和工作，能早點成家",
      "衝目標、求成長，需要搬家或轉跑道也OK",
      "自由彈性為主，接案/短期約，不想被綁住",
      "以另一半/家人/社群優先，住在靠近支持的地方"
    ],
    "type": "CV",
    "category": "核心價值"
  },
  {
    "q": "對婚育/家庭型態的基本態度？",
    "opts": [
      "傳統派：先結婚再生，整體一起規劃",
      "看資源和人生階段，需要就延後或調整",
      "不走傳統，自己選擇（不婚不生也可以）",
      "重視陪伴和照顧，家庭品質比形式重要"
    ],
    "type": "CV",
    "category": "核心價值"
  },
  {
    "q": "面對金錢與風險的習慣？",
    "opts": [
      "保守存錢，避開高風險，穩健理財",
      "願意合理冒險，投資成長，看長期",
      "重視當下體驗，花錢比較隨性",
      "重分享與公平，也願意支援家人/社群"
    ],
    "type": "CV",
    "category": "核心價值"
  },
  {
    "q": "原生家庭與長輩照護的看法？",
    "opts": [
      "先規劃好，固定安排與分工",
      "彈性支援，但不要太影響主要目標",
      "界線說清楚，不因期待勉強自己",
      "優先維繫連結，照護與過節會主動參與"
    ],
    "type": "CV",
    "category": "核心價值"
  },
  {
    "q": "吵架時你最希望對方怎麼做？",
    "opts": [
      "先暫停冷靜，彼此退一步找折衷",
      "直接講重點，當下把問題解決",
      "把事實、流程、責任講清楚",
      "先安撫感受與需求，再談事情"
    ],
    "type": "COM",
    "category": "溝通方式"
  },
  {
    "q": "你習慣的修復SOP是？",
    "opts": [
      "先道歉、各退一步，再重建共識",
      "指出問題和界線，立刻修正",
      "先蒐集資料、擬方案，再約時間追蹤",
      "說出感受與需要，確認對方真的懂"
    ],
    "type": "COM",
    "category": "溝通方式"
  },
  {
    "q": "面對伴侶慢回訊/遲到等小摩擦，你會？",
    "opts": [
      "坐下來談談，訂合理規則、互相體諒",
      "直接提醒，請對方改進",
      "訂明確標準和補救做法",
      "表達我有受傷，也需要安全感/連結"
    ],
    "type": "COM",
    "category": "溝通方式"
  },
  {
    "q": "做重大決策的對話方式？",
    "opts": [
      "列出優缺點，找中間解",
      "各自說立場，當場定案",
      "先找資料，訂目標和分工，再追蹤",
      "先聊感受與價值，再進到細節"
    ],
    "type": "COM",
    "category": "溝通方式"
  },
  {
    "q": "財務管理偏好？",
    "opts": [
      "共同預算，按比例分攤",
      "各管各的錢，清楚分開",
      "把收支攤開，固定檢討，帳目透明",
      "看情況調整，形式不拘，但重誠實互信"
    ],
    "type": "CMT",
    "category": "資源分配"
  },
  {
    "q": "時間與家務分工？",
    "opts": [
      "一起排行程，互補輪替",
      "各自顧各自的區域，互不干涉",
      "固定分工與標準，定期檢視",
      "看每週狀態，彈性分配"
    ],
    "type": "CMT",
    "category": "資源分配"
  },
  {
    "q": "對前任/異性朋友的界線？",
    "opts": [
      "一起訂規則、透明可見，也顧及對方感受",
      "我有我的交友圈，但會保持基本尊重",
      "規則說清楚，違反就有後果",
      "依信任程度調整，重點是誠實報備"
    ],
    "type": "CMT",
    "category": "資源分配"
  },
  {
    "q": "你的安全感主要來自？",
    "opts": [
      "彼此的投入和陪伴",
      "我的選擇與界線被尊重",
      "穩定的規則和習慣",
      "有彈性的信任，加上對方行為一致"
    ],
    "type": "CMT",
    "category": "資源分配"
  }
])
  
  // 基本結果
  const result = ref<TestResult>({
    mainType: '',
    subType: '',
    desc: '',
    best: '',
    adjust: '',
    conflict: ''
  })
  
  // 詳細結果
  const detailedResult = ref<DetailedResult>({
    dimensions: [],
    overallResult: {
      mainType: '',
      subType: '',
      description: ''
    }
  })


  // 計算屬性
  const currentQuestionData = computed(() => questions.value[currentQuestion.value])
  const progressPercentage = computed(() => 
    ((currentQuestion.value + 1) / questions.value.length) * 100
  )
  const isTestComplete = computed(() => 
    answers.value.length === questions.value.length
  )

  // 動作
  const setUsername = (name: string) => {
    username.value = name
  }

  const startTest = () => {
    if (!username.value.trim()) return
    step.value = 1
    currentQuestion.value = 0
    answers.value = []
  }

  const answerQuestion = (answerIndex: number) => {
    answers.value.push(answerIndex)
    
    if (currentQuestion.value < questions.value.length - 1) {
      currentQuestion.value++
    } else {
      calculateResult()
      step.value = 2
    }
  }

  const goToStep = (newStep: number) => {
    step.value = newStep
  }

  const reset = () => {
    step.value = 0
    username.value = ""
    answers.value = []
    currentQuestion.value = 0
    result.value = {
      mainType: '',
      subType: '',
      desc: '',
      best: '',
      adjust: '',
      conflict: ''
    }
    detailedResult.value = {
      dimensions: [],
      overallResult: {
        mainType: '',
        subType: '',
        description: ''
      }
    }
  }

  const calculateResult = () => {
    // 計分系統
    const types = {
      CV: [0, 0, 0, 0],
      COM: [0, 0, 0, 0],
      CMT: [0, 0, 0, 0],
    }

    // 記錄每個問題的答案用於詳細分析
    const answersByType = {
      CV: [] as any[],
      COM: [] as any[],
      CMT: [] as any[]
    }

    questions.value.forEach((q, i) => {
      const answerIdx = answers.value[i]
      const typeArr = types[q.type]
      if (answerIdx !== undefined && typeArr && typeArr[answerIdx] !== undefined) {
        typeArr[answerIdx]++
        answersByType[q.type].push({
          questionIndex: i,
          answerIndex: answerIdx,
          question: q.q,
          answer: q.opts[answerIdx]
        })
      }
    })

    // 人格類型映射
    const getTypeName = (type: string, idx: number) => {
      const typeMap: Record<string, string[]> = {
        CV: ["穩定保守型", "開拓成長型", "自由獨立型", "關係互助型"],
        COM: ["調和協作型", "直言坦率型", "理性系統型", "情感連結型"],
        CMT: ["共同投入型", "獨立自主型", "結構紀律型", "彈性適應型"],
      }
      const typeArray = typeMap[type]
      return typeArray ? `${type}-${typeArray[idx]}` : `${type}-未知類型`
    }

    // 計算各面向得分
    const scoreArr = Object.entries(types).map(([type, arr]) => {
      const max = Math.max(...arr)
      const maxIdx = arr.indexOf(max)
      const sorted = [...arr].sort((a, b) => b - a)
      return {
        type,
        arr,
        max,
        maxIdx,
        diff: (sorted[0] || 0) - (sorted[1] || 0),
        typeName: getTypeName(type, maxIdx)
      }
    })

    // 主型判定邏輯
    scoreArr.sort((a, b) => b.max - a.max)
    let main = scoreArr[0]
    let sub = scoreArr[1]

    // 處理並列情況
    const topScores = scoreArr.filter(s => s.max === (scoreArr[0]?.max || 0))
    if (topScores.length > 1) {
      topScores.sort((a, b) => b.diff - a.diff)
      if ((topScores[0]?.diff || 0) === (topScores[1]?.diff || 0)) {
        // 雙主型
        main = topScores[0]
        sub = topScores[1]
        if (main && sub) {
          result.value.mainType = `${main.typeName} + ${sub.typeName}`
        }
      } else {
        main = topScores[0]
        sub = scoreArr.find(s => s !== main) || scoreArr[1]
        if (main) {
          result.value.mainType = main.typeName
        }
      }
    } else {
      if (main) {
        result.value.mainType = main.typeName
      }
    }

    if (sub) {
      result.value.subType = sub.typeName
    }

    // 設定基本描述和建議
    setPersonalityDescription()

    // 生成詳細分析
    generateDetailedAnalysis(types, answersByType, scoreArr)
  // 生成最終整合簡化報告
  buildFinalProfile()
  }

  const setPersonalityDescription = () => {
    // 人格描述對照表（與原 App.vue 相同）
    const descriptions: Record<string, string> = {
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
    }

    const compatibility: Record<string, any> = {
      "CV-穩定保守型": {
        best: "CMT-結構紀律型、COM-調和協作型、CV-關係互助型",
        adjust: "COM-直言坦率型（需要更多耐心溝通）、CMT-共同投入型（注意分工平衡）",
        conflict: "CV-自由獨立型、CMT-獨立自主型（價值觀和承諾度差異較大）"
      },
      // ... 其他類型的相容性描述（為了簡潔，這裡省略，實際使用時需要完整復制）
    }

    const mainType = result.value.mainType?.split(" + ")[0]
    if (mainType) {
      result.value.desc = descriptions[mainType] || "您擁有獨特的人格特質，在關係中會展現出特殊的魅力。"

      const compatibilityInfo = compatibility[mainType]
      if (compatibilityInfo) {
        result.value.best = compatibilityInfo.best
        result.value.adjust = compatibilityInfo.adjust
        result.value.conflict = compatibilityInfo.conflict
      } else {
        result.value.best = "與多種類型都有良好相容性"
        result.value.adjust = "保持開放溝通"
        result.value.conflict = "注意價值觀差異"
      }
    } else {
      result.value.desc = "您擁有獨特的人格特質，在關係中會展現出特殊的魅力。"
      result.value.best = "與多種類型都有良好相容性"
      result.value.adjust = "保持開放溝通"
      result.value.conflict = "注意價值觀差異"
    }

    // 生成詳細分析（暫時省略，可以後續添加）
    // generateDetailedAnalysis(types, answersByType, scoreArr)
  }

  const generateDetailedAnalysis = (types: any, answersByType: any, scoreArr: any) => {
    const dimensions: DimensionAnalysis[] = []

    // 面向資訊配置
    const dimensionConfig: Record<string, any> = {
      CV: {
        title: '你的核心價值主風格',
        icon: '🎯',
        styleNames: ['穩定保守型', '開拓成長型', '自由獨立型', '關係互助型'],
        questionLabels: [
          '未來3-5年優先選擇',
          '婚育/家庭型態態度',
          '金錢與風險習慣',
          '原生家庭照護看法'
        ]
      },
      COM: {
        title: '你的溝通修復主風格',
        icon: '💬',
        styleNames: ['調和協作型', '直言坦率型', '理性系統型', '情感連結型'],
        questionLabels: [
          '吵架時希望對方',
          '習慣的修復SOP',
          '面對小摩擦反應',
          '重大決策對話方式'
        ]
      },
      CMT: {
        title: '你的承諾資源主風格',
        icon: '🤝',
        styleNames: ['共同投入型', '獨立自主型', '結構紀律型', '彈性適應型'],
        questionLabels: [
          '財務管理偏好',
          '時間與家務分工',
          '前任/異性朋友界線',
          '安全感主要來源'
        ]
      }
    }

    // 為每個面向生成詳細分析
    Object.entries(types).forEach(([type, scores]) => {
      const config = dimensionConfig[type]
      const maxScore = Math.max(...(scores as number[]))
      const maxIdx = (scores as number[]).indexOf(maxScore)
      const sortedScores = [...(scores as number[])].sort((a, b) => b - a)
      const diff = (sortedScores[0] || 0) - (sortedScores[1] || 0)
      
      // 計算信心等級
      let confidenceLevel: 'high' | 'medium' | 'low', confidenceText: string
      if (maxScore >= 3 && diff >= 2) {
        confidenceLevel = 'high'
        confidenceText = '高'
      } else if (maxScore === 2 || diff === 1) {
        confidenceLevel = 'medium'
        confidenceText = '中'
      } else {
        confidenceLevel = 'low'
        confidenceText = '低（混合型）'
      }

      const mainStyle = config.styleNames[maxIdx]
      const userAnswers = answersByType[type]

      // 生成選項理由 - 直接引用用戶選擇
      const choiceReasons = userAnswers.map((answer: any, idx: number) => {
        const optionLetter = String.fromCharCode(65 + answer.answerIndex) // A, B, C, D
        return {
          question: config.questionLabels[idx],
          choice: `因為你在「${config.questionLabels[idx]}」選擇了${optionLetter}選項（${answer.answer}），這顯示了你的傾向。`
        }
      })

      // 獲取個人化分析
      const analysisData = getPersonalizedAnalysis(type, maxIdx, userAnswers, confidenceLevel)

      const dimension: DimensionAnalysis = {
        type,
        title: config.title,
        icon: config.icon,
        mainStyle,
        styleTag: analysisData.styleTag,
        styleNames: config.styleNames,
        scores: scores as number[],
        confidenceLevel,
        confidenceText,
        choiceReasons,
        dailyPatterns: analysisData.dailyPatterns,
        advantages: analysisData.advantages,
        risks: analysisData.risks,
        bestMatch: analysisData.bestMatch,
        needAdjust: analysisData.needAdjust,
        warning: analysisData.warning,
        microActions: analysisData.microActions,
        contrasts: analysisData.contrasts,
        accuracyNote: diff === 0 ? analysisData.mixedTypeNote : null
      }

      dimensions.push(dimension)
    })

    // 設定整體結果
    detailedResult.value = {
      dimensions,
      overallResult: {
        mainType: result.value.mainType,
        subType: result.value.subType,
        description: result.value.desc
      }
    }
  }

  // 個人化分析函數
  const getPersonalizedAnalysis = (type: string, styleIdx: number, userAnswers: any[], confidenceLevel: string) => {
    const analysisMap: Record<string, any[]> = {
      CV: [
        // 穩定保守型 (0)
        {
          styleTag: '重視安全感與長期規劃，偏好可預測的生活',
          dailyPatterns: [
            '你會提前規劃重要決定，比如買房、換工作都會深思熟慮',
            '你對「突然的改變」感到不安，需要時間調適',
            '你重視傳統價值，認為循序漸進比冒險更重要'
          ],
          advantages: '值得信賴、負責任、為關係提供穩定基石',
          risks: '可能過度保守，錯失成長機會；對伴侶的變化需求缺乏彈性',
          bestMatch: 'CMT-結構紀律型、COM-調和協作型（都重視穩定）',
          needAdjust: 'CV-開拓成長型（節奏差異需磨合）',
          warning: '遇到CV-自由獨立型時可能產生「束縛vs自由」的衝突',
          microActions: [
            '每月與伴侶討論一次「可接受的小改變」，逐步提升適應力',
            '為伴侶的新想法設定「試驗期」，而非立即否定',
            '建立「變化預告機制」，讓彼此都有心理準備時間'
          ],
          contrasts: [
            { type: '自由獨立型', reason: '你不傾向「保持彈性與自由，不被綁住」' },
            { type: '開拓成長型', reason: '你較不會為了目標而頻繁搬遷或轉換跑道' }
          ],
          mixedTypeNote: '若你在某題選擇了其他選項，可能同時具有其他風格特質。'
        },
        // 開拓成長型 (1)
        {
          styleTag: '追求進步與新機會，勇於為目標冒險',
          dailyPatterns: [
            '你經常思考「如何做得更好」，對現狀不滿足',
            '你會為了更好的機會考慮搬家或換工作',
            '你喜歡設定具挑戰性的目標，並享受達成的過程'
          ],
          advantages: '積極進取、激勵他人、為關係帶來活力與可能性',
          risks: '可能忽略伴侶對穩定的需求；過度專注目標而疏忽關係維護',
          bestMatch: 'CMT-彈性適應型、COM-理性系統型（都支持成長）',
          needAdjust: 'CV-穩定保守型（需平衡冒險與安全感）',
          warning: '與CV-關係互助型可能產生「個人成長vs關係優先」的拉扯',
          microActions: [
            '每週與伴侶分享一次「成長計畫」，讓對方參與而非被動接受',
            '為關係設定「共同成長目標」，而非只有個人發展',
            '在做重大改變前，先確保伴侶的安全感需求被照顧到'
          ],
          contrasts: [
            { type: '穩定保守型', reason: '你不傾向「穩定落地、固定城市與工作」' },
            { type: '關係互助型', reason: '你不會把伴侶/家人的需求放在個人目標之前' }
          ],
          mixedTypeNote: '若你同時重視穩定，可能在不同生活階段展現不同傾向。'
        },
        // 自由獨立型 (2)
        {
          styleTag: '珍視個人自主權，不喜歡被約束',
          dailyPatterns: [
            '你重視「選擇的權利」，即使是小事也不喜歡被決定',
            '你對長期承諾會仔細考慮，擔心失去彈性',
            '你認為「界線清楚」比「完全融合」更健康'
          ],
          advantages: '尊重界線、維護個性、為關係帶來獨立思考',
          risks: '可能讓伴侶感覺疏離；在需要深度承諾時出現抗拒',
          bestMatch: 'CMT-獨立自主型、CMT-彈性適應型（都重視自主）',
          needAdjust: 'CV-關係互助型（需平衡獨立與親密）',
          warning: '與CV-穩定保守型容易產生「自由vs承諾」的根本衝突',
          microActions: [
            '定期向伴侶說明「獨立不等於不愛你」，增加安全感',
            '在保持自主的同時，主動創造親密時光',
            '為關係設定「彈性承諾」，如季度檢視而非永久約定'
          ],
          contrasts: [
            { type: '關係互助型', reason: '你不會以伴侶/社群的需求為優先考量' },
            { type: '穩定保守型', reason: '你不傾向傳統路線的整體規劃' }
          ],
          mixedTypeNote: '若你在某些情況下重視關係，可能是情境性的權衡。'
        },
        // 關係互助型 (3)
        {
          styleTag: '以人際連結為重心，重視照護與支持',
          dailyPatterns: [
            '你經常考慮「這對家人/伴侶好嗎」再做決定',
            '你主動關心身邊人的需求，甚至超過自己',
            '你重視節日聚會、家庭傳統等連結儀式'
          ],
          advantages: '溫暖體貼、營造歸屬感、建立強韌的支持網絡',
          risks: '可能過度犧牲自我；對不同價值觀的人缺乏理解',
          bestMatch: 'COM-情感連結型、CMT-共同投入型（都重視關係）',
          needAdjust: 'CV-自由獨立型（需尊重對方的獨立需求）',
          warning: '與CV-開拓成長型可能產生「關係優先vs個人發展」的衝突',
          microActions: [
            '每月為自己安排一次「純個人時間」，避免過度融合',
            '學習說「不」的技巧，在照護他人前先照顧自己',
            '與伴侶討論「互助的界線」，避免單向付出'
          ],
          contrasts: [
            { type: '自由獨立型', reason: '你不會設定清楚界線，不因期待而勉強自己' },
            { type: '開拓成長型', reason: '你不會為了個人目標而忽視家人需求' }
          ],
          mixedTypeNote: '若你同時重視獨立，可能在親密與自主間尋找平衡。'
        }
      ],
      COM: [
        // 調和協作型 (0)
        {
          styleTag: '遇到衝突先求和諧，追求雙贏解決方案',
          dailyPatterns: [
            '吵架時你的第一反應是「我們都冷靜一下」',
            '你會主動尋找妥協點，即使自己需要讓步',
            '你不喜歡「非黑即白」的對立，偏好灰色地帶'
          ],
          advantages: '維護關係和諧、化解緊張、創造合作氛圍',
          risks: '可能壓抑真實想法；重要議題被稀釋而未真正解決',
          bestMatch: 'CV-關係互助型、CMT-共同投入型（都重視和諧）',
          needAdjust: 'COM-直言坦率型（需設定表達界線）',
          warning: '遇到COM-理性系統型時，可能被認為「迴避問題」',
          microActions: [
            '每次衝突後寫下「真正想說但沒說的話」，下次練習表達',
            '設定「表達時間」：先協調30分鐘，再各自表達底線',
            '學習「溫和堅持」技巧，在退讓前先試著說出真實想法'
          ],
          contrasts: [
            { type: '直言坦率型', reason: '你不傾向直接講重點、當下解決問題' },
            { type: '理性系統型', reason: '你不會先拆解事實、釐清流程與責任' }
          ],
          mixedTypeNote: '若你在緊急情況下會變得直接，可能是壓力下的模式切換。'
        },
        // 直言坦率型 (1)  
        {
          styleTag: '溝通直接高效，重視立即解決問題',
          dailyPatterns: [
            '你認為「有話直說」比拐彎抹角更有效率',
            '你在衝突中會直接指出問題點，期望快速處理',
            '你對「模糊的暗示」感到不耐煩，喜歡明確表達'
          ],
          advantages: '效率高、節省時間、避免誤解累積',
          risks: '可能讓對方感覺被攻擊；忽略情緒處理的重要性',
          bestMatch: 'CV-開拓成長型、CMT-結構紀律型（都重視效率）',
          needAdjust: 'COM-情感連結型（需先處理情感再談事情）',
          warning: '與COM-調和協作型容易產生「直接vs溫和」的衝突',
          microActions: [
            '在直接表達前，先用一句同理語：「我知道這可能讓你不舒服...」',
            '設定「緩衝時間」：重要對話前先問「現在方便嗎？」',
            '練習「三明治回饋法」：肯定→問題→支持，而非直接批評'
          ],
          contrasts: [
            { type: '調和協作型', reason: '你不會先停火冷靜，退一步找折衷' },
            { type: '情感連結型', reason: '你不會先安撫感受與需求，再談事情' }
          ],
          mixedTypeNote: '若你偶爾會迴避衝突，可能是為了保護重要關係。'
        },
        // 理性系統型 (2)
        {
          styleTag: '遇到問題先拆解流程，重視證據與制度',
          dailyPatterns: [
            '你喜歡把模糊的抱怨變成明確的規則與期限',
            '你對「說了但沒記錄」的承諾感到不安',
            '修復關係時，你會先問「下一步是什麼、誰負責、什麼時候檢查」'
          ],
          advantages: '高效率、可追蹤、降低重複摩擦',
          risks: '容易讓伴侶覺得被檢討或缺少被安撫',
          bestMatch: 'CMT-結構紀律型、COM-直言坦率型（都重視系統化）',
          needAdjust: 'COM-情感連結型（先給情緒安全，再談KPI）',
          warning: '過度系統化可能讓關係變得機械化，缺乏溫度',
          microActions: [
            '每次衝突先用一句同理語：「我知道你很委屈，我在這裡」',
            '將規則數量控制在「3條核心」，避免過度制度化',
            '設定「修復回合」：48小時內回顧一次並調整方案'
          ],
          contrasts: [
            { type: '調和協作型', reason: '你不傾向先退一步求感覺好再談事' },
            { type: '情感連結型', reason: '你不會把「被理解」放在方案之前' }
          ],
          mixedTypeNote: '若你在第2題選了D而非C，結果可能轉為「調和/情感混合」。'
        },
        // 情感連結型 (3)
        {
          styleTag: '重視心靈交流，優先處理情感需求',
          dailyPatterns: [
            '你會先關心對方的感受，再討論解決方案',
            '你重視「被理解」甚於「被解決」',
            '你相信「關係好了，問題自然會好」'
          ],
          advantages: '建立深度親密、提供情感支持、營造安全感',
          risks: '可能讓實際問題懸而未決；過度情緒化影響判斷',
          bestMatch: 'CV-關係互助型、CMT-共同投入型（都重視連結）',
          needAdjust: 'COM-直言坦率型（建立安全溝通環境）',
          warning: '與COM-理性系統型可能產生「情感vs效率」的根本差異',
          microActions: [
            '在情緒對話後，設定「解決方案時間」，確保問題有進展',
            '學習「情感 + 行動」模式：先同理，再提出具體建議',
            '為重要決策設定「情感檢視 + 理性分析」的雙重流程'
          ],
          contrasts: [
            { type: '理性系統型', reason: '你不會拆解事實、釐清流程與責任' },
            { type: '直言坦率型', reason: '你不會直接講重點、當下解決問題' }
          ],
          mixedTypeNote: '若你在緊急情況會變得理性，可能是情境適應能力。'
        }
      ],
      CMT: [
        // 共同投入型 (0)
        {
          styleTag: '相信資源共享與團隊合作，重視公平投入',
          dailyPatterns: [
            '你傾向「我們的錢」而非「你的我的」',
            '你會主動分享行程、計畫，希望伴侶也如此',
            '你認為「一起努力」比個人成就更有意義'
          ],
          advantages: '建立真正伙伴關係、資源效率最大化、強化歸屬感',
          risks: '可能對獨立需求理解不足；過度期待對方同等投入',
          bestMatch: 'CV-關係互助型、COM-調和協作型（都重視合作）',
          needAdjust: 'CMT-獨立自主型（需平衡共享與界線）',
          warning: '與CMT-獨立自主型容易產生「融合vs獨立」的核心衝突',
          microActions: [
            '每月討論一次「共享程度」，尊重對方的私人空間需求',
            '建立「個人帳戶 + 共同帳戶」的混合模式',
            '在要求透明度前，先確保對方感到安全而非被監控'
          ],
          contrasts: [
            { type: '獨立自主型', reason: '你不傾向各自管理、清楚分開' },
            { type: '結構紀律型', reason: '你不會設定固定分工與標準' }
          ],
          mixedTypeNote: '若你同時重視個人界線，可能在不同領域採用不同策略。'
        },
        // 獨立自主型 (1)
        {
          styleTag: '重視個人界線與清晰分工，各自負責',
          dailyPatterns: [
            '你習慣「AA制」或明確的費用分擔',
            '你有自己的朋友圈，不期待伴侶完全融入',
            '你認為「各自獨立，才能真正選擇在一起」'
          ],
          advantages: '維護個人成長空間、避免過度依賴、保持關係新鮮感',
          risks: '可能讓伴侶感覺疏離；在需要深度支持時顯得冷漠',
          bestMatch: 'CV-自由獨立型、COM-理性系統型（都重視界線）',
          needAdjust: 'CMT-共同投入型（需增加透明度和同理心）',
          warning: '與CMT-共同投入型可能產生「獨立vs共享」的價值觀衝突',
          microActions: [
            '定期主動分享「個人近況」，避免讓伴侶感覺被排除',
            '在保持獨立的同時，設定「共同目標」如旅行、置產',
            '練習「需要幫忙時主動求助」，而非凡事自己承擔'
          ],
          contrasts: [
            { type: '共同投入型', reason: '你不傾向設共同預算，按比例分擔' },
            { type: '彈性適應型', reason: '你不會視情況調整，不拘形式但誠實信任' }
          ],
          mixedTypeNote: '若你在某些領域願意共享，可能是基於實用性考量。'
        },
        // 結構紀律型 (2)
        {
          styleTag: '重視規則與制度，建立穩定的相處框架',
          dailyPatterns: [
            '你喜歡「固定的分工與標準」，每個人都知道自己的責任',
            '你會設定明確的界線規則，並期待雙方遵守',
            '你認為「有制度才有自由」，框架讓關係更安全'
          ],
          advantages: '提供安全感、避免模糊地帶、建立可預測的生活',
          risks: '可能過於僵化，缺乏應變彈性；讓伴侶感覺被約束',
          bestMatch: 'CV-穩定保守型、COM-理性系統型（都重視結構）',
          needAdjust: 'CMT-彈性適應型（需增加彈性空間）',
          warning: '與CMT-彈性適應型容易產生「規則vs自由」的摩擦',
          microActions: [
            '每季檢討一次「規則是否需要調整」，保持與時俱進',
            '為突發狀況設定「例外處理機制」，而非完全按表操課',
            '在建立規則前，先與伴侶討論「為什麼需要這個規則」'
          ],
          contrasts: [
            { type: '彈性適應型', reason: '你不會依週期與狀態彈性分配' },
            { type: '共同投入型', reason: '你不傾向視情況調整，不拘形式' }
          ],
          mixedTypeNote: '若你在壓力下會變得彈性，可能是適應機制的展現。'
        },
        // 彈性適應型 (3)
        {
          styleTag: '根據情況靈活調整，重視信任與適應性',
          dailyPatterns: [
            '你會「看情況」調整分工，而非死守固定模式',
            '你重視「誠實溝通」勝過「完美制度」',
            '你相信「關係會自然找到平衡」，不需要過度規劃'
          ],
          advantages: '適應力強、關係有機發展、能應對各種變化',
          risks: '可能缺乏穩定感；重要事務可能因為「彈性」而被忽略',
          bestMatch: 'CV-開拓成長型、COM-調和協作型（都重視適應）',
          needAdjust: 'CMT-結構紀律型（需建立基本框架）',
          warning: '與CMT-結構紀律型可能產生「自由vs規範」的認知差異',
          microActions: [
            '為重要事務設定「底線標準」，在彈性中保留原則',
            '定期與伴侶確認「目前的安排是否OK」，避免單方面調整',
            '在彈性調整前，先說明「為什麼要改變」，讓伴侶理解'
          ],
          contrasts: [
            { type: '結構紀律型', reason: '你不會固定分工與標準，定期回顧' },
            { type: '獨立自主型', reason: '你不傾向各自負責自己的區域，互不干涉' }
          ],
          mixedTypeNote: '若你在某些事情上堅持規則，可能是基於重要性判斷。'
        }
      ]
    }

    return analysisMap[type]?.[styleIdx] || {
      styleTag: '特殊類型組合',
      dailyPatterns: ['展現獨特的行為模式'],
      advantages: '具有多元化特質',
      risks: '可能在不同情境下表現不一致',
      bestMatch: '需要更深入了解',
      needAdjust: '建議進一步探索',
      warning: '注意情境差異',
      microActions: ['保持自我覺察'],
      contrasts: [],
      mixedTypeNote: '您展現了複合型特質。'
    }
  }

  // ===== 最終整合 12 類型報告 (簡化白話) =====
  const personalityProfiles: Record<string, Omit<FinalProfile, 'typeName'>> ={
  "CV-穩定保守型": {
    "shortTag": "你是踏實穩重的人，做事不急、先打底再前進；重視安全感和生活秩序，喜歡按部就班。",
    "dailyPatterns": [
      "做事前會先排好步驟、準備備案",
      "遇到突發狀況會先停一下觀望",
      "重視長期承諾，喜歡有規律的生活"
    ],
    "advantages": [
      "穩定可靠，讓人放心",
      "願意扛責任、守信用",
      "能維持穩定的節奏和品質"
    ],
    "risks": [
      "太保守可能錯過機會",
      "對變動容易焦慮",
      "常低估新點子的價值"
    ],
    "compatibility": {
      "best": "CMT-結構紀律型 / COM-調和協作型",
      "adjust": "CV-開拓成長型",
      "conflict": "CV-自由獨立型（承諾節奏差）"
    },
    "actions": [
      "每月試一件小改變，先小規模試水溫",
      "和伴侶一起列「可接受的風險清單」",
      "新點子先試用一段時間，不要直接否決"
    ],
    "otherSuggestions": [
      "把「我需要一點時間」放在嘴邊，別急著拒絕",
      "記下變動後帶來的好處，幫自己降焦慮"
    ]
  },
  "CV-開拓成長型": {
    "shortTag": "你目標感強、節奏快，喜歡升級人生；想一直成長，不愛停在原地。",
    "dailyPatterns": [
      "常同時推進好幾個目標",
      "對效率和成果很敏感",
      "生活像任務清單，行程滿滿"
    ],
    "advantages": [
      "動能強、執行力高",
      "會帶動身邊人一起進步",
      "敢試新方法、不怕改變"
    ],
    "risks": [
      "容易忽略情緒和關係維護",
      "耐心不夠，會催人",
      "轉向太快讓人不安"
    ],
    "compatibility": {
      "best": "CMT-彈性適應型 / COM-理性系統型",
      "adjust": "CV-穩定保守型",
      "conflict": "CV-關係互助型（優先級不同）"
    },
    "actions": [
      "把「關係維護」排成固定任務",
      "重大決策先問：會影響伴侶什麼？",
      "每週安排一段純放鬆、零產出時間"
    ],
    "otherSuggestions": [
      "重要決定延遲24小時再定案",
      "分享目標時加一句：我也會顧你的需求"
    ]
  },
  "CV-自由獨立型": {
    "shortTag": "你重視自主與選擇，喜歡有空間照自己的節奏來；投入前會先想清楚。",
    "dailyPatterns": [
      "不喜歡被催或被黏住",
      "保留個人領域和界線",
      "承諾前會多方衡量自由度"
    ],
    "advantages": [
      "尊重界線，不控制別人",
      "理性面對依附與期待",
      "能獨立完成事情，可靠自理"
    ],
    "risks": [
      "容易被誤會冷淡或不在乎",
      "投入較慢，可能錯過親密時機",
      "太保護自己，較少主動求助"
    ],
    "compatibility": {
      "best": "CMT-獨立自主型",
      "adjust": "CV-關係互助型",
      "conflict": "CV-穩定保守型（承諾速度差）"
    },
    "actions": [
      "主動安排共處，不要只等被邀",
      "用「我需要充電」說明狀態，不要直接消失",
      "設定彈性承諾的檢視點和退場方式"
    ],
    "otherSuggestions": [
      "寫下你怕被束縛的具體點，逐一驗證",
      "建立一個共享但不侵入的小儀式（例如每天早安）"
    ]
  },
  "CV-關係互助型": {
    "shortTag": "你以人為本、靠連結補能量；重視照顧與儀式感，讓大家有歸屬。",
    "dailyPatterns": [
      "習慣先照顧別人、替人著想",
      "重視節日、紀念日和小儀式",
      "擅長維持群體氣氛與連結"
    ],
    "advantages": [
      "溫暖體貼、同理心高",
      "能營造歸屬感和安全感",
      "讓團隊與關係更有黏著度"
    ],
    "risks": [
      "容易忽略自己的需求",
      "界線不清，付出過頭",
      "情緒被牽動，決策變慢"
    ],
    "compatibility": {
      "best": "COM-情感連結型 / CMT-共同投入型",
      "adjust": "CV-自由獨立型",
      "conflict": "CV-開拓成長型（優先級衝突）"
    },
    "actions": [
      "每週留一段只屬於自己的時間",
      "面對要求先說「我先想一下」",
      "列出「不再單向付出」清單並照做"
    ],
    "otherSuggestions": [
      "建立多點支持，不要只靠一個人",
      "觀察自己討好模式的觸發點與代價"
    ]
  },
  "COM-調和協作型": {
    "shortTag": "你會先降溫、找共識，是關係的緩衝帶；喜歡大家好好談、一起前進。",
    "dailyPatterns": [
      "遇到衝突會先安撫氣氛",
      "常用讓步換取穩定與和諧",
      "偏好過渡方案，不愛硬碰硬"
    ],
    "advantages": [
      "是團隊的緩衝與潤滑劑",
      "穩住關係、降低摩擦",
      "擅長共創，把人拉在一起"
    ],
    "risks": [
      "真實需求容易被壓住",
      "問題被延後處理，只剩表面和諧",
      "悶氣累積，最後一次爆掉"
    ],
    "compatibility": {
      "best": "CV-關係互助型",
      "adjust": "COM-直言坦率型",
      "conflict": "COM-理性系統型（容易被視為閃避）"
    },
    "actions": [
      "每次衝突後寫下：我其實想說的是…",
      "先講清楚底線，再談折衷",
      "替每個議題定一個結束時間，避免拖"
    ],
    "otherSuggestions": [
      "練習說「我不同意，原因是…」",
      "分辨維持和諧跟壓抑自己的差別"
    ]
  },
  "COM-直言坦率型": {
    "shortTag": "你說話直接、重結果；喜歡快狠準、有解法、不繞路。",
    "dailyPatterns": [
      "聊天常直切重點",
      "對冗長的情緒鋪陳耐心較低",
      "衝突時傾向快速定案"
    ],
    "advantages": [
      "效率高、決策快",
      "透明清楚、誤會少",
      "敢給回饋，推動進展"
    ],
    "risks": [
      "語氣容易被覺得硬或像在下指令",
      "忽略情緒修復的需要",
      "讓人有距離感或防備心"
    ],
    "compatibility": {
      "best": "CV-開拓成長型 / COM-理性系統型",
      "adjust": "COM-情感連結型",
      "conflict": "COM-調和協作型"
    },
    "actions": [
      "先一句同理，再進主題（例如：我懂你辛苦）",
      "先問「你現在適合談這個嗎？」再展開",
      "用三明治回饋法：肯定—建議—肯定"
    ],
    "otherSuggestions": [
      "留意對方表情和肢體，調整節奏",
      "準備3種不帶命令的開場白（我在想…／我們一起看看…／你覺得呢？）"
    ]
  },
  "COM-理性系統型": {
    "shortTag": "你先框架再討論，重邏輯與流程；喜歡結果可追蹤、好複盤。",
    "dailyPatterns": [
      "會做列表、追蹤和紀錄",
      "不喜歡模糊承諾或說不清楚",
      "把議題拆成好處理的步驟"
    ],
    "advantages": [
      "降低混亂、提升可預測性",
      "流程清楚，能持續調整優化",
      "決策品質穩定、方便複盤"
    ],
    "risks": [
      "容易被覺得偏冷、不夠貼心",
      "忽略情緒需求和人際細節",
      "關係太像流程，熱度不夠"
    ],
    "compatibility": {
      "best": "CMT-結構紀律型",
      "adjust": "COM-情感連結型",
      "conflict": "COM-調和協作型"
    },
    "actions": [
      "對話前先確認情緒（我在乎你的感受）",
      "規則控制在3條以內",
      "設48小時回顧點，看看要不要調整"
    ],
    "otherSuggestions": [
      "和伴侶一起設計流程，不要單方面決定",
      "練習描述感受，不只講問題和數據"
    ]
  },
  "COM-情感連結型": {
    "shortTag": "你喜歡先把心靠近再談事；在乎被理解，擅長建立深度親密。",
    "dailyPatterns": [
      "常主動確認對方的感受",
      "談事情前需要情緒被看見",
      "偏好慢熱鋪陳，先把安全感做好"
    ],
    "advantages": [
      "能建立深度的親密與信任",
      "情緒支持力強，氛圍有療癒感",
      "讓關係有溫度與被理解的感覺"
    ],
    "risks": [
      "容易拖到決策或行動",
      "情緒負載過高，自己先累",
      "忽略行動節奏與務實安排"
    ],
    "compatibility": {
      "best": "CV-關係互助型",
      "adjust": "COM-直言坦率型",
      "conflict": "COM-理性系統型"
    },
    "actions": [
      "每次對話結尾列出1個具體行動",
      "練習「情緒＋需求＋提議」三段式表達",
      "設定節奏：感受5分鐘→行動5分鐘"
    ],
    "otherSuggestions": [
      "留意情緒反覆卻沒前進的時刻",
      "建立自己的情緒紓壓清單"
    ]
  },
  "CMT-共同投入型": {
    "shortTag": "你喜歡一起做、一起扛；重視透明與合作，把資源和進度對齊。",
    "dailyPatterns": [
      "主動分享行程、資源與想法",
      "喜歡共用工具、一起盤點",
      "會討論彼此的投入比例與分工"
    ],
    "advantages": [
      "協作性高、團隊感強",
      "資源整合好、效率高",
      "能快速建立共同目標與默契"
    ],
    "risks": [
      "容易壓到對方的節奏與空間",
      "透明度太高可能造成壓力",
      "忽略對方需要獨處的時間"
    ],
    "compatibility": {
      "best": "CV-關係互助型",
      "adjust": "CMT-獨立自主型",
      "conflict": "CMT-獨立自主型（共享需求差）"
    },
    "actions": [
      "一起做「公共vs私人」清單",
      "每月檢視一次共享邊界是否舒服",
      "允許伴侶有一整天完全不分享也沒關係"
    ],
    "otherSuggestions": [
      "練習無條件支持，不急著給建議",
      "辨識「控制式關心」的跡象並適度放手"
    ]
  },
  "CMT-獨立自主型": {
    "shortTag": "你界線清楚、重視自我負責；互不打擾，但彼此支持。",
    "dailyPatterns": [
      "保留個人的財務、行程和空間",
      "互動節奏克制，不勉強黏在一起",
      "追求自給自足與穩定成長"
    ],
    "advantages": [
      "不黏不控制，尊重他人節奏",
      "能維持自我成長與職涯穩定",
      "界線清晰，信任成本低"
    ],
    "risks": [
      "可能被覺得冷淡或不在乎",
      "互動密度偏低，溫度下降",
      "建立深層信任較慢"
    ],
    "compatibility": {
      "best": "CV-自由獨立型",
      "adjust": "CMT-共同投入型",
      "conflict": "CMT-共同投入型（共享需求差）"
    },
    "actions": [
      "主動更新一次近況，讓對方跟上你",
      "用「預約式的親密時間」說到做到",
      "練習說：「我需要你陪，不是我做不到」"
    ],
    "otherSuggestions": [
      "列出1個可委派或可共享的領域試試看",
      "先談好緊急情境下的支援方式"
    ]
  },
  "CMT-結構紀律型": {
    "shortTag": "你有制度、有節奏；用清單和例行讓生活穩、效率好。",
    "dailyPatterns": [
      "用清單和系統管理生活與工作",
      "固定例行，公私分工清楚",
      "對混亂或臨時變動很敏感"
    ],
    "advantages": [
      "可預測性高、合作成本低",
      "效率穩、成果穩",
      "能減少摩擦與遺漏"
    ],
    "risks": [
      "彈性不夠，調整成本高",
      "可能被覺得管太多或太龜毛",
      "規則太多讓關係喘不過氣"
    ],
    "compatibility": {
      "best": "CV-穩定保守型",
      "adjust": "CMT-彈性適應型",
      "conflict": "CMT-彈性適應型（節奏衝突）"
    },
    "actions": [
      "挑出1條「可討論的規則」一起重寫",
      "為突發狀況設簡易的例外流程",
      "每季清一次過時規範"
    ],
    "otherSuggestions": [
      "先問伴侶：這條規則會讓你有壓力嗎？",
      "遇到小偏差先觀察，不必馬上修正"
    ]
  },
  "CMT-彈性適應型": {
    "shortTag": "你看情況、很會調整；流程鬆、靠默契與信任運作，氣氛輕鬆。",
    "dailyPatterns": [
      "事情自然分配，誰有空誰先上",
      "方案不固定，邊走邊修",
      "流程鬆，但靠默契和信任在運作"
    ],
    "advantages": [
      "適應力強，不容易僵化",
      "讓關係更輕鬆、壓力小",
      "面對變動反應快"
    ],
    "risks": [
      "重要細節容易被忽略",
      "他人看不清界線與標準",
      "長期節奏不易預測，影響承諾感"
    ],
    "compatibility": {
      "best": "CV-開拓成長型",
      "adjust": "CMT-結構紀律型",
      "conflict": "CMT-結構紀律型（規則 vs 自由）"
    },
    "actions": [
      "標記2件不可模糊的核心事項",
      "建立最小必要框架（例如財務、健康）",
      "調整前先說原因與期限，讓人心裡有底"
    ],
    "otherSuggestions": [
      "列出你常延後的固定事項並設提醒",
      "和伴侶定期對焦：現在這樣OK嗎？"
    ]
  }
}
  const finalProfile = ref<FinalProfile | null>(null)

  const buildFinalProfile = () => {
    const primary = result.value.mainType?.split(' + ')[0] || ''
    if (!primary) {
      finalProfile.value = null
      return
    }
    const base = personalityProfiles[primary]
    if (!base) {
      finalProfile.value = null
      return
    }
    // 雙主型簡單合併（若有 subType）：附加一句提示
    const sub = result.value.subType
    const note = sub ? `（同時帶有 ${sub} 的一些影子）` : ''
    finalProfile.value = {
      typeName: primary + note,
      shortTag: base.shortTag,
      dailyPatterns: base.dailyPatterns,
      advantages: base.advantages,
      risks: base.risks,
      compatibility: base.compatibility,
      actions: base.actions,
      otherSuggestions: base.otherSuggestions
    }
  }

  const finalProfileComputed = computed(() => finalProfile.value)

  return {
    // 狀態
    username,
    step,
    currentQuestion,
    answers,
    result,
    detailedResult,
    questions,
    finalProfile: finalProfileComputed,
    
    // 計算屬性
    currentQuestionData,
    progressPercentage,
    isTestComplete,
    
    // 動作
    setUsername,
    startTest,
    answerQuestion,
    goToStep,
    reset,
    calculateResult
  }
})
