import { findAllQuestions } from "@/api/question/questionAPI";
import { deleteQuiz, updateQuizStatus } from "@/api/quiz/quizAPI";
import useMyQuizzesStore from "@/app/store/slices/teacher/MyQuizzesSlice";
import { useToast } from "@/hooks/use-toast";
import { getUserFromToken } from "@/utils/authUtils";
import QuizCard from "../reusable/QuizCard";

const PendingPage = () => {
  const { quizzes } = useMyQuizzesStore();
  const { toast } = useToast();
  
  const pendingQuizzes = quizzes.filter(quiz => quiz.status === "pending");

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
    <div className="w-full space-y-8 px-2">
      {/* Pending Quizzes Section */}
      <section className="bg-SECONDARY/20 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-PRIMARY_TEXT flex items-center">
              <span className="bg-SECONDARY_BLUE/20 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-SECONDARY_BLUE" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
                </svg>
              </span>
              Pending Quizzes
            </h1>
            <p className="text-sm text-TERTIARY ml-14">Quizzes in draft state that need to be published</p>
          </div>
          <div className="bg-SECONDARY_BLUE/10 px-4 py-2 rounded-lg">
            <span className="text-PRIMARY_TEXT font-medium">
              {pendingQuizzes.length} {pendingQuizzes.length === 1 ? 'Quiz' : 'Quizzes'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pendingQuizzes.length > 0 ? (
            pendingQuizzes.map((quiz) => (
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
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 px-6 bg-SECONDARY/30 rounded-xl border border-SECONDARY/50">
              <div className="bg-SECONDARY p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-PRIMARY_TEXT mb-2">No Pending Quizzes</h3>
              <p className="text-center text-TERTIARY max-w-md">
                Create a new quiz to get started. Drafts and pending quizzes will appear here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PendingPage;