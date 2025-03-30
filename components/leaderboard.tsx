"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { UserScore } from "@/types"
import { Trophy, Medal, Award } from "lucide-react"

interface LeaderboardProps {
  leaderboard: UserScore[]
  currentUsername: string
}

export default function Leaderboard({ leaderboard, currentUsername }: LeaderboardProps) {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null)

  // Find the current user's position in the leaderboard
  useEffect(() => {
    const userIndex = leaderboard.findIndex((entry) => entry.username === currentUsername)
    if (userIndex !== -1) {
      setHighlightedIndex(userIndex)

      // Remove highlight after 5 seconds
      const timer = setTimeout(() => {
        setHighlightedIndex(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [leaderboard, currentUsername])

  // Render rank icon based on position
  const getRankIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />
      case 2:
        return <Award className="w-5 h-5 text-amber-700" />
      default:
        return <span className="w-5 h-5 inline-flex items-center justify-center font-bold">{position + 1}</span>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {leaderboard.map((entry, index) => (
            <AnimatePresence key={`${entry.username}-${index}`}>
              <motion.div
                initial={index === highlightedIndex ? { scale: 0.95 } : { scale: 1 }}
                animate={
                  index === highlightedIndex
                    ? [
                        { scale: 1.05, backgroundColor: "rgba(var(--primary), 0.15)" },
                        { scale: 1, backgroundColor: "rgba(var(--primary), 0.15)" },
                      ]
                    : { scale: 1 }
                }
                transition={{ duration: 0.3 }}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  entry.username === currentUsername ? "bg-primary/10 font-medium" : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    {getRankIcon(index)}
                  </div>
                  <span>{entry.username}</span>

                  {entry.username === currentUsername && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">You</span>
                  )}
                </div>
                <div className="font-bold">{entry.score}</div>

                {index === highlightedIndex && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{
                          scale: [0, 1.5, 0],
                          opacity: [0.8, 0],
                          x: [0, (i - 1) * 10],
                          y: [0, (i % 2 === 0 ? -1 : 1) * 10],
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.2,
                          repeat: 2,
                          repeatDelay: 0.5,
                        }}
                        className="absolute w-2 h-2 rounded-full bg-primary"
                      />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

