"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Brain, Trophy, Clock, Zap, Palette } from "lucide-react"
import ThemeSelector from "@/components/theme-selector"
import type { QuizTheme } from "@/types"

interface QuizIntroProps {
  onStart: (username: string) => void
  currentTheme: QuizTheme
  onThemeChange: (theme: QuizTheme) => void
}

export default function QuizIntro({ onStart, currentTheme, onThemeChange }: QuizIntroProps) {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")

  const handleStart = () => {
    if (!username.trim()) {
      setError("Please enter a username to continue")
      return
    }
    onStart(username)
  }

  const features = [
    { icon: <Clock className="w-5 h-5" />, text: "Time-based scoring" },
    { icon: <Trophy className="w-5 h-5" />, text: "Compete on leaderboards" },
    { icon: <Sparkles className="w-5 h-5" />, text: "Win bonus points" },
    { icon: <Brain className="w-5 h-5" />, text: "Test your knowledge" },
    { icon: <Zap className="w-5 h-5" />, text: "Power-ups & lifelines" },
    { icon: <Palette className="w-5 h-5" />, text: "Customizable themes" },
  ]

  return (
    <motion.div
      className="bg-card rounded-xl p-6 md:p-8 shadow-lg relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background pattern based on theme */}
      <div className="absolute inset-0 opacity-10 z-0">
        {currentTheme === "cosmic" && (
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-primary"
                style={{
                  width: Math.random() * 4 + 1 + "px",
                  height: Math.random() * 4 + 1 + "px",
                  top: Math.random() * 100 + "%",
                  left: Math.random() * 100 + "%",
                }}
                animate={{
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        )}

        {currentTheme === "retro" && (
          <div className="absolute inset-0">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(0deg, rgba(var(--primary), 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(var(--primary), 0.2) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>
        )}

        {currentTheme === "minimal" && (
          <div className="absolute inset-0">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(var(--primary), 0.1) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>
        )}
      </div>

      <div className="relative z-10">
        <div className="flex justify-end mb-4">
          <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
        </div>

        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Brain className="w-12 h-12 text-primary" />
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Welcome to Brain Blitz!
          </motion.h2>
          <motion.p
            className="text-muted-foreground max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Test your knowledge with our fun, fast-paced quiz. Answer quickly to earn more points!
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-4 bg-muted/30 backdrop-blur-sm rounded-lg"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                {feature.icon}
              </div>
              <span className="text-sm font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Enter your username to begin
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                setError("")
              }}
              className="w-full"
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-destructive text-sm mt-1"
              >
                {error}
              </motion.p>
            )}
          </div>

          <Button onClick={handleStart} className="w-full relative overflow-hidden" size="lg">
            <span className="relative z-10 flex items-center">
              Start Quiz
              <Sparkles className="ml-2 w-4 h-4" />
            </span>

            {/* Button shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "linear", repeatDelay: 1 }}
            />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

