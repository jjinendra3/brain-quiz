export type QuizTheme = "cosmic" | "retro" | "minimal"

export interface Question {
  id: number
  text: string
  options: string[]
  correctAnswer: string
  timeLimit: number
  hint: string
}

export interface UserScore {
  username: string
  score: number
}

