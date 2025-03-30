"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Question } from "@/types"
import ProgressRing from "@/components/progress-ring"
import { HelpCircle, Clock, ArrowRight } from "lucide-react"

interface QuizQuestionProps {
  question: Question
  onAnswer: (questionId: number, answer: string, timeRemaining: number) => void
  questionNumber: number
  totalQuestions: number
}

export default function QuizQuestion({ question, onAnswer, questionNumber, totalQuestions }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(question.timeLimit)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [freezeUsed, setFreezeUsed] = useState(false)
  const [timerFrozen, setTimerFrozen] = useState(false)
  // Add state for tracking answer correctness
  const [answerStatus, setAnswerStatus] = useState<"correct" | "incorrect" | null>(null)

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null)
    setTimeRemaining(question.timeLimit)
    setIsSubmitting(false)
    setShowHint(false)
    setTimerFrozen(false)
    setAnswerStatus(null)
  }, [question])

  // Timer countdown
  useEffect(() => {
    if (timeRemaining <= 0 || isSubmitting || timerFrozen) return

    const timer = setTimeout(() => {
      setTimeRemaining((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeRemaining, isSubmitting, timerFrozen])

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining <= 0 && !isSubmitting) {
      handleSubmit()
    }
  }, [timeRemaining])

  // Update the handleSubmit function to check answer correctness
  const handleSubmit = () => {
    if (isSubmitting || !selectedAnswer) return

    setIsSubmitting(true)

    // Check if answer is correct
    const isCorrect = selectedAnswer === question.correctAnswer
    setAnswerStatus(isCorrect ? "correct" : "incorrect")

    // Submit the selected answer
    setTimeout(() => {
      onAnswer(question.id, selectedAnswer, timeRemaining)
    }, 500)
  }

  const handleFreezeTimer = () => {
    if (freezeUsed) return

    setFreezeUsed(true)
    setTimerFrozen(true)

    // Unfreeze after 5 seconds
    setTimeout(() => {
      setTimerFrozen(false)
    }, 5000)
  }

  const handleShowHint = () => {
    if (hintsUsed >= 2) return

    setHintsUsed((prev) => prev + 1)
    setShowHint(true)
  }

  // Calculate progress percentage for the ring
  const progressPercentage = (timeRemaining / question.timeLimit) * 100

  // Determine color based on time remaining
  const getProgressColor = () => {
    if (progressPercentage > 66) return "#4ade80" // green
    if (progressPercentage > 33) return "#facc15" // yellow
    return "#f87171" // red
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">
          Question {questionNumber} of {totalQuestions}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShowHint}
            disabled={hintsUsed >= 2 || isSubmitting}
            className="flex items-center gap-1"
          >
            <HelpCircle className="w-4 h-4" />
            Hint ({2 - hintsUsed})
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleFreezeTimer}
            disabled={freezeUsed || isSubmitting}
            className="flex items-center gap-1"
          >
            <Clock className="w-4 h-4" />
            Freeze Timer
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl md:text-2xl font-bold">{question.text}</h3>
            <div className="relative">
              <ProgressRing progress={progressPercentage} size={70} strokeWidth={6} color={getProgressColor()} />
              <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">{timeRemaining}</div>
            </div>
          </div>

          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-4 p-3 bg-muted/50 rounded-lg text-sm"
            >
              <p className="font-medium">Hint: {question.hint}</p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option
              const isCorrect = question.correctAnswer === option

              // Determine button styling based on selection and correctness
              let buttonStyle = "bg-muted/50 hover:bg-muted"

              if (answerStatus !== null) {
                if (isCorrect) {
                  buttonStyle = "bg-green-500/20 border-2 border-green-500 text-green-700 dark:text-green-300"
                } else if (isSelected && !isCorrect) {
                  buttonStyle = "bg-red-500/20 border-2 border-red-500 text-red-700 dark:text-red-300"
                }
              } else if (isSelected) {
                buttonStyle = "bg-primary text-primary-foreground"
              }

              return (
                <motion.button
                  key={option}
                  whileHover={{ scale: answerStatus === null ? 1.02 : 1 }}
                  whileTap={{ scale: answerStatus === null ? 0.98 : 1 }}
                  onClick={() => !isSubmitting && answerStatus === null && setSelectedAnswer(option)}
                  className={`p-4 rounded-lg text-left transition-colors ${buttonStyle}`}
                  disabled={isSubmitting || answerStatus !== null}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        answerStatus !== null && isCorrect
                          ? "bg-green-500 text-white"
                          : answerStatus !== null && isSelected && !isCorrect
                            ? "bg-red-500 text-white"
                            : "bg-background/20"
                      }`}
                    >
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                  </div>

                  {/* Show correct/incorrect icons */}
                  {answerStatus !== null && isCorrect && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </motion.div>
                  )}

                  {answerStatus !== null && isSelected && !isCorrect && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>

        <div className="p-4 bg-muted/30 flex justify-between items-center">
          <div className="text-sm">
            {timerFrozen && <span className="text-primary font-medium">Timer frozen for 5 seconds!</span>}
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer || isSubmitting || answerStatus !== null}
            className={`gap-2 ${
              answerStatus === "correct"
                ? "bg-green-500 hover:bg-green-600"
                : answerStatus === "incorrect"
                  ? "bg-red-500 hover:bg-red-600"
                  : ""
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : answerStatus === "correct"
                ? "Correct!"
                : answerStatus === "incorrect"
                  ? "Incorrect!"
                  : "Submit Answer"}
            {!isSubmitting && answerStatus === null && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>
      </Card>
    </div>
  )
}

