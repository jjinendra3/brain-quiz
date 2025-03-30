"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Star, Sparkles, Award } from "lucide-react"

interface RewardCarouselProps {
  bonusPoints: number
}

export default function RewardCarousel({ bonusPoints }: RewardCarouselProps) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ y: 300, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 300, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="relative overflow-hidden border-4 border-primary shadow-[0_0_30px_rgba(var(--primary),0.3)]">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 z-0" />

            <div className="relative z-10 p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Award className="w-12 h-12 text-primary" />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <h3 className="text-2xl font-bold mb-2">Quick Thinking!</h3>
                <p className="text-muted-foreground mb-6">You've earned bonus points for your speedy response!</p>

                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [0.8, 1.2, 1] }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="text-5xl font-bold text-primary mb-4 flex items-center justify-center"
                >
                  <span>+{bonusPoints}</span>
                  <Star className="w-8 h-8 ml-2 text-yellow-500" />
                </motion.div>

                <p className="text-sm text-muted-foreground">Points added to your score</p>
              </motion.div>
            </div>

            {/* Animated confetti/sparkles */}
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (i % 2 === 0 ? 1 : -1) * Math.random() * 100],
                  y: [0, -Math.random() * 100],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: 1,
                  repeatDelay: 0.2,
                }}
                className="absolute"
                style={{
                  top: `${50 + Math.random() * 20}%`,
                  left: `${30 + Math.random() * 40}%`,
                  zIndex: 20,
                }}
              >
                <Sparkles
                  className={`w-${Math.floor(Math.random() * 3) + 3} h-${Math.floor(Math.random() * 3) + 3} text-${
                    ["yellow-500", "primary", "secondary", "green-400", "pink-400"][Math.floor(Math.random() * 5)]
                  }`}
                />
              </motion.div>
            ))}
          </Card>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

