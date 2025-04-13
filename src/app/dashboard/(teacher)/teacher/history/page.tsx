"use client";

import { deleteQuiz } from "@/api/quiz/quizAPI";
import useMyQuizzesStore from "@/app/store/slices/teacher/MyQuizzesSlice";
import QuizCard from "@/components/src/dashboard-conponents/reusable/QuizCard";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

const Page = () => {
  const { quizzes } = useMyQuizzesStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Fix: Ensure quizzes is an array before filtering
  const quizzesArray = Array.isArray(quizzes) ? quizzes : [];
  const completedQuizzes = quizzesArray.filter(
    (quiz) => quiz.status === "completed"
  );

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [quizzes]);

  const removeQuiz = async (id: string) => {
    const response = await deleteQuiz(id);
    if (response.error) {
      toast({
        title: "Failed to delete quiz",
        description: `Can't delete quiz.`,
        duration: 5000,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Deleted Successfully",
      description: `Quiz deleted successfully.`,
      duration: 5000,
      variant: "default",
      className: "bg-GREEN text-PRIMARY_TEXT",
    });
  };

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Page header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-PRIMARY_TEXT mb-2">
              Quiz History
            </h1>
            <p className="text-sm text-TERTIARY">
              View and manage your completed quizzes
            </p>
          </div>
          <div className="bg-SECONDARY_BLUE/20 px-4 py-2 rounded-lg">
            <span className="text-PRIMARY_TEXT font-medium">
              {completedQuizzes.length} Completed{" "}
              {completedQuizzes.length === 1 ? "Quiz" : "Quizzes"}
            </span>
          </div>
        </div>
      </div>

      {/* Quiz cards grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 opacity-50 animate-pulse">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-full h-72 bg-SECONDARY rounded-xl"></div>
          ))}
        </div>
      ) : completedQuizzes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {completedQuizzes.map((quiz) => (
            <QuizCard
              key={quiz._id}
              title={quiz.title}
              subject={quiz.subject.name}
              grade={quiz.grade}
              batch={quiz.batch}
              durationHour={quiz.durationHours}
              durationMinute={quiz.durationMinutes}
              startDate={quiz.startDate}
              startTime={quiz.startTime}
              endTime={quiz.endTime}
              status={quiz.status}
              deleteQuiz={() => removeQuiz(quiz._id)}
              navigate={`/dashboard/teacher/manageQuestions/${quiz._id}`}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center bg-SECONDARY/50 rounded-xl py-16 px-4">
          <div className="bg-SECONDARY p-4 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-TERTIARY"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-PRIMARY_TEXT mb-2">
            No Completed Quizzes Yet
          </h2>
          <p className="text-center text-TERTIARY max-w-md">
            Once you have completed quizzes, they will appear here for you to
            review and analyze results.
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;