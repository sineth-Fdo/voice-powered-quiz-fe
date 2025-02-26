import { create } from "zustand";

interface Quiz {
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

interface MyQuizzesState {
  quizzes: Quiz[];
  setQuizzes: (data: Quiz[]) => void;
}

const useMyQuizzesStore = create<MyQuizzesState>((set) => ({
  quizzes: [],
  setQuizzes: (data) => set({ quizzes: data }),
}));

export default useMyQuizzesStore;
