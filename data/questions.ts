import type { Question } from "@/types"

export const questions: Question[] = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    timeLimit: 15,
    hint: "This city is known as the 'City of Light'",
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
    timeLimit: 10,
    hint: "Named after the Roman god of war",
  },
  {
    id: 3,
    text: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
    timeLimit: 12,
    hint: "It lives in the ocean",
  },
  {
    id: 4,
    text: "Which of these is NOT a programming language?",
    options: ["Java", "Python", "Cobra", "Dolphin"],
    correctAnswer: "Dolphin",
    timeLimit: 15,
    hint: "Think about animals",
  },
  {
    id: 5,
    text: "In which year did the first iPhone launch?",
    options: ["2005", "2007", "2009", "2010"],
    correctAnswer: "2007",
    timeLimit: 10,
    hint: "It was during the late 2000s",
  },
  {
    id: 6,
    text: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
    timeLimit: 8,
    hint: "It comes from the Latin word 'aurum'",
  },
  {
    id: 7,
    text: "Which country has the largest population in the world?",
    options: ["India", "United States", "China", "Russia"],
    correctAnswer: "India",
    timeLimit: 10,
    hint: "It's in Asia",
  },
  {
    id: 8,
    text: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"],
    correctAnswer: "Mount Everest",
    timeLimit: 8,
    hint: "It's located in the Himalayas",
  },
]

