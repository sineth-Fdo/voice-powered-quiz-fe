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
    <div className="w-full space-y-8 px-2">
      {/* Running Quizzes Section */}
      <section className="bg-SECONDARY/20 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-PRIMARY_TEXT flex items-center">
              <span className="bg-BLUE/20 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-BLUE" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              </span>
              Running Quizzes
            </h1>
            <p className="text-sm text-TERTIARY ml-14">Active quizzes that students can currently take</p>
          </div>
          <div className="bg-BLUE/10 px-4 py-2 rounded-lg">
            <span className="text-PRIMARY_TEXT font-medium">
              {runningQuizzes.length} {runningQuizzes.length === 1 ? 'Quiz' : 'Quizzes'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
            <div className="col-span-full flex flex-col items-center justify-center py-12 px-6 bg-SECONDARY/30 rounded-xl border border-SECONDARY/50">
              <div className="bg-SECONDARY p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-PRIMARY_TEXT mb-2">No Running Quizzes</h3>
              <p className="text-center text-TERTIARY max-w-md">
                When you start a published quiz, it will appear here for monitoring.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Not Started Quizzes Section */}
      <section className="bg-SECONDARY/20 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-PRIMARY_TEXT flex items-center">
              <span className="bg-YELLOW/20 p-2 rounded-full mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-YELLOW" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Not-Started Quizzes
            </h1>
            <p className="text-sm text-TERTIARY ml-14">Published quizzes ready to be started</p>
          </div>
          <div className="bg-YELLOW/10 px-4 py-2 rounded-lg">
            <span className="text-PRIMARY_TEXT font-medium">
              {notStartedQuizzes.length} {notStartedQuizzes.length === 1 ? 'Quiz' : 'Quizzes'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                }}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 px-6 bg-SECONDARY/30 rounded-xl border border-SECONDARY/50">
              <div className="bg-SECONDARY p-4 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-TERTIARY" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-PRIMARY_TEXT mb-2">No Published Quizzes</h3>
              <p className="text-center text-TERTIARY max-w-md">
                No not-started quizzes available. Check if you have any pending quizzes to publish.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PublishedPage;