export interface Question {
  q: string
  opts: string[]
  type: 'CV' | 'COM' | 'CMT'
  category: string
}

export interface TestResult {
  mainType: string
  subType: string
  desc: string
  best: string
  adjust: string
  conflict: string
}

export interface ChoiceReason {
  question: string
  choice: string
}

export interface ContrastItem {
  type: string
  reason: string
}

export interface DimensionAnalysis {
  type: string
  title: string
  icon: string
  mainStyle: string
  styleTag: string
  styleNames: string[]
  scores: number[]
  confidenceLevel: 'high' | 'medium' | 'low'
  confidenceText: string
  choiceReasons: ChoiceReason[]
  dailyPatterns: string[]
  advantages: string
  risks: string
  bestMatch: string
  needAdjust: string
  warning: string
  microActions: string[]
  contrasts: ContrastItem[]
  accuracyNote: string | null
}

export interface DetailedResult {
  dimensions: DimensionAnalysis[]
  overallResult: {
    mainType: string
    subType: string
    description: string
  }
}

// 最終整合後的人格報告（12 類型之一）
export interface FinalProfileCompatibility {
  best: string
  adjust: string
  conflict: string
}

export interface FinalProfile {
  typeName: string              // 例如：CV-穩定保守型 或 綜合型 (雙主型時可調整)
  shortTag: string              // 簡短標籤（直白白話）
  dailyPatterns: string[]       // 日常樣貌（3~5 條）
  advantages: string[]          // 優勢列點
  risks: string[]               // 缺點/風險列點
  compatibility: FinalProfileCompatibility // 相容性提示
  actions: string[]             // 行動建議（微行動）
  otherSuggestions: string[]    // 其他建議/提醒
}

