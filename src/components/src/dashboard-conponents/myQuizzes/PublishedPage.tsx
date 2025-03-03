import { updateQuizStatus } from "@/api/quiz/quizAPI";
import useMyQuizzesStore from "@/app/store/slices/teacher/MyQuizzesSlice";
import { useToast } from "@/hooks/use-toast";
import QuizCard from "../reusable/QuizCard";

const PublishedPage = () => {
  const { quizzes, setQuizStatus } = useMyQuizzesStore();
  const { toast } = useToast();

  const quizzesList = Array.isArray(quizzes) ? quizzes : [];

  const runningQuizzes = quizzesList.filter(
    (quiz) => quiz.status === "started"
  );
  const notStartedQuizzes = quizzesList.filter(
    (quiz) => quiz.status === "not-started"
  );

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

  return (
    <div>
      <div>
        <h1>Running Quizzes</h1>
        <div className="h-auto flex flex-wrap rounded-md m-3">
          {runningQuizzes.length > 0 ? (
            runningQuizzes.map((quiz) => (
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
                updateStatus={() => {
                  updateStatus(quiz._id, "completed");
                  setQuizStatus("completed");
                }}
              />
            ))
          ) : (
            <div className="text-gray-500 text-sm">
              No Running Quizzes Available
            </div>
          )}
        </div>
      </div>

      <div>
        <h1>Not-Started Quizzes</h1>
        <div className="h-auto flex flex-wrap rounded-md m-3">
          {notStartedQuizzes.length > 0 ? (
            notStartedQuizzes.map((quiz) => (
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
                updateStatus={() => {
                  updateStatus(quiz._id, "started");
                  setQuizStatus("started");
                }}
                backToPending={() => {
                  updateStatus(quiz._id, "pending");
                  setQuizStatus("pending");
                }
                }
              />
            ))
          ) : (
            <div className="text-gray-500 text-sm">
              No Not-Started Quizzes Available. Check if you have any pending
              quizzes to publish.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublishedPage;
