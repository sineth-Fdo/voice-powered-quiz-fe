"use client";

import { deleteQuiz } from "@/api/quiz/quizAPI";
import useMyQuizzesStore from "@/app/store/slices/teacher/MyQuizzesSlice";
import QuizCard from "@/components/src/dashboard-conponents/reusable/QuizCard";
import { useToast } from "@/hooks/use-toast";

const Page = () => {
  const { quizzes } = useMyQuizzesStore();
  const { toast } = useToast();

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
    <div className=" h-auto flex flex-wrap rounded-md m-3">
      {quizzes.length > 0 ? (
        quizzes.map((quiz) =>
          quiz.status === "completed" ? (
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
          ) : (
            <div key={quiz._id}></div>
          )
        )
      ) : (
        <div>No pending quizzes</div>
      )}
    </div>
  );
};

export default Page;
