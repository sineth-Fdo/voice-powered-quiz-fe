import { findAllQuestions } from "@/api/question/questionAPI";
import { deleteQuiz, updateQuizStatus } from "@/api/quiz/quizAPI";
import useMyQuizzesStore from "@/app/store/slices/teacher/MyQuizzesSlice";
import { useToast } from "@/hooks/use-toast";
import { getUserFromToken } from "@/utils/authUtils";
import QuizCard from "../reusable/QuizCard";

const PendingPage = () => {
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

  const updateStatus = async (id: string, status: string) => {
    const response = await updateQuizStatus(id, status);
    if (response.error) {
      toast({
        title: "Failed to Publish the quiz",
        description: `Can't publish the quiz.`,
        duration: 5000,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Published Successfully",
      description: `Quiz published successfully.`,
      duration: 5000,
      variant: "default",
      className: "bg-GREEN text-PRIMARY_TEXT",
    });
  };

  const displayAllQuestions = async (quizId: string) => {
    const user = getUserFromToken();
    const response = await findAllQuestions(quizId, user?.uid || "");
    if (response.length > 0) {
      updateStatus(quizId, "not-started");
    }
    toast({
      title: "Can't update status",
      description: `Add questions to update status`,
      duration: 5000,
      variant: "destructive",
      className: "bg-YELLOW text-PRIMARY_TEXT",
    });
  };

  return (
    <div className=" h-auto flex flex-wrap rounded-md m-3">
      {quizzes.length > 0 ? (
        quizzes.map((quiz) =>
          quiz.status === "pending" ? (
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
              updateStatus={() => {
                displayAllQuestions(quiz._id);
              }}
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

export default PendingPage;
