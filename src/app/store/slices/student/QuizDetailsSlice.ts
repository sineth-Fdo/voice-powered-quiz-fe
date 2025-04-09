import { create } from "zustand";

interface QuizI {
  _id: string;
  title: string;
  code: string;
  description: string;
  password: string;
  status: string;
  teacher: {
    _id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };
  subject: {
    _id: string;
    name: string;
    code: string;
    description: string;
    status: string;
  };
  grade: string;
  batch: string;
  duration: number;
  durationHours: number;
  durationMinutes: number;
  quizTotalMarks: number;
  quizTotalQuestions: number;
  passingMarks: number;
  startDate: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

interface QuizStore {
  quiz: QuizI;
  setQuiz: (newQuiz: Partial<QuizI>) => void;
}

const useQuizStore = create<QuizStore>((set) => ({
  quiz: {
    _id: "",
    title: "",
    code: "",
    description: "",
    password: "",
    status: "",
    teacher: {
      _id: "",
      name: "",
      email: "",
      role: "",
      status: "",
    },
    subject: {
      _id: "",
      name: "",
      code: "",
      description: "",
      status: "",
    },
    grade: "",
    batch: "",
    duration: 0,
    durationHours: 0,
    durationMinutes: 0,
    quizTotalMarks: 0,
    quizTotalQuestions: 0,
    passingMarks: 0,
    startDate: "",
    startTime: "",
    endTime: "",
    createdAt: "",
    updatedAt: "",
  },
  setQuiz: (newQuiz) =>
    set((state) => ({
      quiz: { ...state.quiz, ...newQuiz },
    })),
}));

export default useQuizStore;
