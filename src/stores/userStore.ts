// 用戶數據存儲 - 未來配對功能的基礎
import { reactive } from 'vue'

export interface UserProfile {
  id: string
  name: string
  age?: number
  gender?: string
  location?: string
  personalityType: string
  subType?: string
  testResults: {
    CV: number[]
    COM: number[]
    CMT: number[]
  }
  interests?: string[]
  bio?: string
  photos?: string[]
  preferences?: {
    ageRange: [number, number]
    maxDistance: number
    lookingFor: string[]
  }
  createdAt: Date
  lastActive: Date
}

export interface MatchResult {
  userId: string
  compatibilityScore: number
  matchedType: string
  reasonsForMatch: string[]
  potentialChallenges: string[]
}

class UserStore {
  private state = reactive({
    currentUser: null as UserProfile | null,
    isLoggedIn: false,
    matches: [] as MatchResult[],
    conversations: [] as any[],
  })

  // 獲取當前用戶
  get currentUser() {
    return this.state.currentUser
  }

  get isLoggedIn() {
    return this.state.isLoggedIn
  }

  get matches() {
    return this.state.matches
  }

  // 設置用戶資料
  setUser(user: UserProfile) {
    this.state.currentUser = user
    this.state.isLoggedIn = true
  }

  // 更新用戶資料
  updateUser(updates: Partial<UserProfile>) {
    if (this.state.currentUser) {
      Object.assign(this.state.currentUser, updates)
    }
  }

  // 登出
  logout() {
    this.state.currentUser = null
    this.state.isLoggedIn = false
    this.state.matches = []
    this.state.conversations = []
  }

  // 保存測驗結果
  saveTestResults(name: string, personalityType: string, subType: string, testResults: any) {
    const user: UserProfile = {
      id: this.generateUserId(),
      name,
      personalityType,
      subType,
      testResults,
      createdAt: new Date(),
      lastActive: new Date(),
    }
    this.setUser(user)
    return user
  }

  // 生成用戶ID
  private generateUserId(): string {
    return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
  }

  // 設置配對結果
  setMatches(matches: MatchResult[]) {
    this.state.matches = matches
  }
}

export const userStore = new UserStore()
