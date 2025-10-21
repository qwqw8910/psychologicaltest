// 配對演算法 - 基於心理人格的智能配對
export interface PersonalityScore {
  CV: number[]
  COM: number[]
  CMT: number[]
}

export interface CompatibilityResult {
  overallScore: number
  categoryScores: {
    CV: number
    COM: number
    CMT: number
  }
  strengths: string[]
  challenges: string[]
  recommendations: string[]
}

class MatchingAlgorithm {
  // 計算兩個人格的相容性
  calculateCompatibility(user1: PersonalityScore, user2: PersonalityScore): CompatibilityResult {
    const cvScore = this.calculateCategoryCompatibility(user1.CV, user2.CV, 'CV')
    const comScore = this.calculateCategoryCompatibility(user1.COM, user2.COM, 'COM')
    const cmtScore = this.calculateCategoryCompatibility(user1.CMT, user2.CMT, 'CMT')

    const overallScore = Math.round((cvScore + comScore + cmtScore) / 3)

    return {
      overallScore,
      categoryScores: {
        CV: cvScore,
        COM: comScore,
        CMT: cmtScore
      },
      strengths: this.getCompatibilityStrengths(user1, user2),
      challenges: this.getCompatibilityChallenges(user1, user2),
      recommendations: this.getRelationshipRecommendations(user1, user2)
    }
  }

  // 計算單一類別的相容性
  private calculateCategoryCompatibility(scores1: number[], scores2: number[], category: string): number {
    // 找出每個人在該類別的主要類型
    const type1 = scores1.indexOf(Math.max(...scores1))
    const type2 = scores2.indexOf(Math.max(...scores2))

    // 相容性矩陣 (簡化版本)
    const compatibilityMatrix = this.getCompatibilityMatrix(category)
    
    return compatibilityMatrix[type1][type2]
  }

  // 獲取相容性矩陣
  private getCompatibilityMatrix(category: string): number[][] {
    // 這裡是簡化的相容性矩陣，實際應用中會更複雜
    if (category === 'CV') {
      return [
        [95, 75, 45, 85], // 穩定保守型與其他類型的相容性
        [75, 90, 70, 60], // 開拓成長型
        [45, 70, 85, 55], // 自由獨立型
        [85, 60, 55, 95]  // 關係互助型
      ]
    } else if (category === 'COM') {
      return [
        [90, 60, 75, 85], // 調和協作型
        [60, 85, 80, 50], // 直言坦率型
        [75, 80, 90, 65], // 理性系統型
        [85, 50, 65, 95]  // 情感連結型
      ]
    } else { // CMT
      return [
        [95, 40, 70, 80], // 共同投入型
        [40, 90, 55, 75], // 獨立自主型
        [70, 55, 85, 60], // 結構紀律型
        [80, 75, 60, 90]  // 彈性適應型
      ]
    }
  }

  // 獲取相容性優勢
  private getCompatibilityStrengths(user1: PersonalityScore, user2: PersonalityScore): string[] {
    const strengths = []
    
    // 分析各維度的互補性
    const cvTypes = [user1.CV.indexOf(Math.max(...user1.CV)), user2.CV.indexOf(Math.max(...user2.CV))]
    const comTypes = [user1.COM.indexOf(Math.max(...user1.COM)), user2.COM.indexOf(Math.max(...user2.COM))]
    const cmtTypes = [user1.CMT.indexOf(Math.max(...user1.CMT)), user2.CMT.indexOf(Math.max(...user2.CMT))]

    // CV相容性分析
    if (this.areTypesCompatible(cvTypes, 'CV')) {
      strengths.push('你們在人生價值觀上高度契合，能夠支持彼此的目標')
    }

    // COM相容性分析
    if (this.areTypesCompatible(comTypes, 'COM')) {
      strengths.push('你們的溝通風格互補，能有效處理分歧')
    }

    // CMT相容性分析
    if (this.areTypesCompatible(cmtTypes, 'CMT')) {
      strengths.push('你們在承諾和資源分配上有共識，關係會很穩定')
    }

    return strengths
  }

  // 獲取相容性挑戰
  private getCompatibilityChallenges(user1: PersonalityScore, user2: PersonalityScore): string[] {
    const challenges = []
    
    const cvTypes = [user1.CV.indexOf(Math.max(...user1.CV)), user2.CV.indexOf(Math.max(...user2.CV))]
    const comTypes = [user1.COM.indexOf(Math.max(...user1.COM)), user2.COM.indexOf(Math.max(...user2.COM))]
    const cmtTypes = [user1.CMT.indexOf(Math.max(...user1.CMT)), user2.CMT.indexOf(Math.max(...user2.CMT))]

    // 檢查潛在衝突
    if (this.hasTypeConflict(cvTypes, 'CV')) {
      challenges.push('需要在人生規劃上多溝通協調')
    }

    if (this.hasTypeConflict(comTypes, 'COM')) {
      challenges.push('溝通方式差異較大，需要多練習理解彼此')
    }

    if (this.hasTypeConflict(cmtTypes, 'CMT')) {
      challenges.push('在時間和資源分配上可能需要更多協商')
    }

    return challenges
  }

  // 獲取關係建議
  private getRelationshipRecommendations(user1: PersonalityScore, user2: PersonalityScore): string[] {
    return [
      '定期進行深度對話，分享彼此的感受和想法',
      '尊重彼此的差異，將其視為關係中的豐富資源',
      '建立共同的目標和價值觀，增強關係的穩定性',
      '在衝突時保持冷靜，專注於解決問題而非指責',
      '給彼此適當的個人空間，保持關係的健康平衡'
    ]
  }

  // 檢查類型是否相容
  private areTypesCompatible(types: number[], category: string): boolean {
    const matrix = this.getCompatibilityMatrix(category)
    return matrix[types[0]][types[1]] >= 70
  }

  // 檢查類型是否有衝突
  private hasTypeConflict(types: number[], category: string): boolean {
    const matrix = this.getCompatibilityMatrix(category)
    return matrix[types[0]][types[1]] < 60
  }

  // 為用戶找到最佳配對 (模擬數據)
  findMatches(userProfile: PersonalityScore, userPool: any[] = []): any[] {
    // 這裡會是實際的匹配邏輯
    // 目前返回模擬數據
    return this.generateMockMatches()
  }

  // 生成模擬配對數據
  private generateMockMatches(): any[] {
    const mockPersonalities = [
      'CV-穩定保守型', 'CV-開拓成長型', 'CV-自由獨立型', 'CV-關係互助型',
      'COM-調和協作型', 'COM-直言坦率型', 'COM-理性系統型', 'COM-情感連結型',
      'CMT-共同投入型', 'CMT-獨立自主型', 'CMT-結構紀律型', 'CMT-彈性適應型'
    ]

    const mockNames = ['小雨', '阿明', '小華', '婷婷', '大偉', '小美', '志明', '春嬌']

    return Array.from({ length: 5 }, (_, i) => ({
      id: `match_${i + 1}`,
      name: mockNames[Math.floor(Math.random() * mockNames.length)],
      age: 22 + Math.floor(Math.random() * 15),
      personalityType: mockPersonalities[Math.floor(Math.random() * mockPersonalities.length)],
      compatibilityScore: 65 + Math.floor(Math.random() * 30),
      distance: Math.floor(Math.random() * 50) + 1,
      commonInterests: ['看電影', '旅行', '美食'].slice(0, Math.floor(Math.random() * 3) + 1),
      photos: [`https://via.placeholder.com/300x300?text=Photo${i + 1}`],
      lastActive: '2 小時前'
    }))
  }
}

export const matchingAlgorithm = new MatchingAlgorithm()
