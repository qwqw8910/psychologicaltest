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
