import { deleteQuiz } from "@/api/quiz/quizAPI";
import useMyQuizzesStore from "@/app/store/slices/teacher/MyQuizzesSlice";
import { useToast } from "@/hooks/use-toast";
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

  return (
    <div className="border h-auto flex flex-wrap rounded-md m-3">
      {quizzes.length > 0 ? (
        quizzes.map((quiz) =>
          quiz.status === "pending" ? (
            <QuizCard
              key={quiz._id}
              title={quiz.title}
              deleteQuiz={() => removeQuiz(quiz._id)}
              navigate={`/dashboard/teacher/manageQuestions/${quiz._id}`}
            />
          ) : (
            <div key={quiz._id}>hello</div>
          )
        )
      ) : (
        <div>No pending quizzes</div>
      )}
    </div>
  );
};

export default PendingPage;
