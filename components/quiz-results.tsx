"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, RotateCcw, Share2 } from "lucide-react"

interface QuizResultsProps {
  score: number
  totalQuestions: number
  username: string
  onPlayAgain: () => void
}

export default function QuizResults({ score, totalQuestions, username, onPlayAgain }: QuizResultsProps) {
  // Calculate percentage score
  const percentage = Math.round((score / (totalQuestions * 100)) * 100)

  // Determine message based on score
  const getMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a quiz master!"
    if (percentage >= 70) return "Great job! You know your stuff!"
    if (percentage >= 50) return "Good effort! Keep practicing!"
    return "Nice try! Better luck next time!"
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-6 md:p-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Trophy className="w-12 h-12 text-primary" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-3xl font-bold mb-2"
        >
          Quiz Completed!
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground mb-6"
        >
          {getMessage()}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-muted/30 rounded-lg p-6 mb-6 inline-block"
        >
          <div className="text-4xl md:text-5xl font-bold text-primary">{score}</div>
          <div className="text-sm text-muted-foreground">points earned</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Button onClick={onPlayAgain} variant="default" size="lg" className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Play Again
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share Score
          </Button>
        </motion.div>
      </div>
    </Card>
  )
}

