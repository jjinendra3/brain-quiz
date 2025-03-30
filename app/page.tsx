"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useConfetti } from "@/hooks/use-confetti";
import QuizIntro from "@/components/quiz-intro";
import QuizQuestion from "@/components/quiz-question";
import QuizResults from "@/components/quiz-results";
import Leaderboard from "@/components/leaderboard";
import ThemeSelector from "@/components/theme-selector";
import RewardCarousel from "@/components/reward-carousel";
import type { QuizTheme, UserScore } from "@/types";
import { questions } from "@/data/questions";
import { initialLeaderboard } from "@/data/leaderboard";
import { calculateScore } from "@/lib/score-calculator";
import { Github, Linkedin } from "lucide-react";

export default function QuizPage() {
  const [username, setUsername] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<"intro" | "quiz" | "results">(
    "intro"
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<
    Array<{ questionId: number; answer: string; timeRemaining: number }>
  >([]);
  const [leaderboard, setLeaderboard] =
    useState<UserScore[]>(initialLeaderboard);
  const [selectedTheme, setSelectedTheme] = useState<QuizTheme>("cosmic");
  const [rewardModal, setRewardModal] = useState<{
    show: boolean;
    points: number;
  }>({
    show: false,
    points: 0,
  });
  const { triggerConfetti } = useConfetti();

  const handleStartQuiz = (name: string) => {
    setUsername(name);
    setCurrentStep("quiz");
  };

  const handleAnswerSubmit = (
    questionId: number,
    answer: string,
    timeRemaining: number
  ) => {
    const question = questions.find((q) => q.id === questionId);
    const isCorrect = question?.correctAnswer === answer;

    // Calculate points based on time remaining and correctness
    const pointsEarned = isCorrect ? calculateScore(timeRemaining) : 0;

    setAnswers((prev) => [...prev, { questionId, answer, timeRemaining }]);
    setScore((prev) => prev + pointsEarned);

    // Show reward modal randomly for correct answers (30% chance)
    if (
      isCorrect &&
      Math.random() < 0.3 &&
      currentQuestionIndex < questions.length - 1
    ) {
      const bonus = Math.floor(Math.random() * 50) + 10;
      setRewardModal({ show: true, points: bonus });

      // Hide reward after 3 seconds and move to next question
      setTimeout(() => {
        setRewardModal({ show: false, points: 0 });
        setScore((prev) => prev + bonus);
        setTimeout(() => setCurrentQuestionIndex((prev) => prev + 1), 500);
      }, 3000);
    } else {
      // Add delay to show the correct/wrong feedback before moving to next question
      setTimeout(
        () => {
          if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
          } else {
            // End of quiz
            setCurrentStep("results");
            triggerConfetti();

            // Update leaderboard
            const newLeaderboard = [
              ...leaderboard,
              { username, score: score + pointsEarned },
            ]
              .sort((a, b) => b.score - a.score)
              .slice(0, 10);

            setLeaderboard(newLeaderboard);
          }
        },
        isCorrect ? 1000 : 1500
      ); // Longer delay for wrong answers
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setCurrentStep("intro");
  };

  const handleThemeChange = (theme: QuizTheme) => {
    setSelectedTheme(theme);
  };

  // Apply theme class to body
  useEffect(() => {
    document.body.className = `theme-${selectedTheme}`;
    return () => {
      document.body.className = "";
    };
  }, [selectedTheme]);

  return (
    <div
      className={`min-h-screen p-4 md:p-8 bg-background text-foreground transition-colors duration-300 theme-${selectedTheme}`}
    >
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Brain Blitz Quiz
          </h1>
          {currentStep !== "intro" && (
            <div className="flex items-center gap-4">
              <div className="bg-muted/30 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-bold">Score: </span>
                <motion.span
                  key={score}
                  initial={{ scale: 1.5, color: "#4ade80" }}
                  animate={{ scale: 1, color: "inherit" }}
                  className="font-bold"
                >
                  {score}
                </motion.span>
              </div>
              <ThemeSelector
                currentTheme={selectedTheme}
                onThemeChange={handleThemeChange}
              />
            </div>
          )}
        </header>

        <main>
          <AnimatePresence mode="wait">
            {currentStep === "intro" && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuizIntro
                  onStart={handleStartQuiz}
                  currentTheme={selectedTheme}
                  onThemeChange={handleThemeChange}
                />
              </motion.div>
            )}

            {currentStep === "quiz" && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {rewardModal.show && (
                  <RewardCarousel bonusPoints={rewardModal.points} />
                )}
                {!rewardModal.show && (
                  <QuizQuestion
                    question={questions[currentQuestionIndex]}
                    onAnswer={handleAnswerSubmit}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={questions.length}
                  />
                )}
              </motion.div>
            )}

            {currentStep === "results" && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <QuizResults
                  score={score}
                  totalQuestions={questions.length}
                  username={username}
                  onPlayAgain={handlePlayAgain}
                />
                <div className="mt-12">
                  <Leaderboard
                    leaderboard={leaderboard}
                    currentUsername={username}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Brain Blitz Quiz. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://linkedin.com/in/jjinendra3"
              target="_blank"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/jjinendra3"
              target="_blank"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
