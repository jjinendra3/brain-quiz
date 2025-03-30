/**
 * Calculate score based on time remaining
 * @param timeRemaining Time remaining in seconds
 * @returns Score value
 */
export function calculateScore(timeRemaining: number): number {
  // Base score for correct answer
  const baseScore = 50

  // Bonus points based on time remaining (max 50 bonus points)
  const timeBonus = Math.round(timeRemaining * 5)

  return baseScore + timeBonus
}

