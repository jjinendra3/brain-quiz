"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Palette } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { QuizTheme } from "@/types"
import { motion } from "framer-motion"

interface ThemeSelectorProps {
  currentTheme: QuizTheme
  onThemeChange: (theme: QuizTheme) => void
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [open, setOpen] = useState(false)

  const themes: { value: QuizTheme; label: string; icon: string; colors: string[] }[] = [
    {
      value: "cosmic",
      label: "Cosmic Neon",
      icon: "🌌",
      colors: ["#b429f9", "#4d7cff", "#fc28a8"],
    },
    {
      value: "retro",
      label: "Retro Arcade",
      icon: "🕹️",
      colors: ["#ff9900", "#00cccc", "#ff3366"],
    },
    {
      value: "minimal",
      label: "Minimal Lines",
      icon: "⚪",
      colors: ["#0066ff", "#6633ff", "#0099ff"],
    },
  ]

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full relative overflow-hidden border-2"
          style={{
            borderColor: themes.find((t) => t.value === currentTheme)?.colors[0] || "currentColor",
          }}
        >
          <Palette className="h-4 w-4" />
          <span className="sr-only">Change theme</span>

          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              background: [
                `radial-gradient(circle, ${themes.find((t) => t.value === currentTheme)?.colors[0]} 0%, transparent 70%)`,
                `radial-gradient(circle, ${themes.find((t) => t.value === currentTheme)?.colors[1]} 0%, transparent 70%)`,
                `radial-gradient(circle, ${themes.find((t) => t.value === currentTheme)?.colors[2]} 0%, transparent 70%)`,
                `radial-gradient(circle, ${themes.find((t) => t.value === currentTheme)?.colors[0]} 0%, transparent 70%)`,
              ],
            }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="p-2">
          <h4 className="mb-2 text-sm font-medium">Select Theme</h4>
          <div className="space-y-1">
            {themes.map((theme) => (
              <DropdownMenuItem
                key={theme.value}
                onClick={() => {
                  onThemeChange(theme.value)
                  setOpen(false)
                }}
                className={`flex items-center gap-3 rounded-md p-2 ${
                  currentTheme === theme.value ? "bg-primary/10" : ""
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]})`,
                    boxShadow: currentTheme === theme.value ? `0 0 0 2px ${theme.colors[0]}` : "none",
                  }}
                >
                  <span>{theme.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{theme.label}</span>
                  <div className="flex gap-1 mt-1">
                    {theme.colors.map((color, i) => (
                      <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                    ))}
                  </div>
                </div>

                {currentTheme === theme.value && (
                  <motion.div
                    className="ml-auto w-4 h-4 rounded-full bg-primary flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9 1L3.5 6.5L1 4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </DropdownMenuItem>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

