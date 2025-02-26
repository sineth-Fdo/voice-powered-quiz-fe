import useMyQuizzesStore from "@/app/store/slices/teacher/MyQuizzesSlice";
import QuizCard from "../reusable/QuizCard";

const PublishedPage = () => {
  const { quizzes } = useMyQuizzesStore();

  return (
    <div className="border h-auto flex flex-wrap rounded-md m-3">
      {quizzes.length > 0 ? (
        quizzes.map((quiz) =>
          quiz.status === "started" ? (
            <QuizCard key={quiz._id} title={quiz.title} />
          ) : null
        )
      ) : (
        <div>No published quizzes</div>
      )}
    </div>
  );
};

export default PublishedPage;
