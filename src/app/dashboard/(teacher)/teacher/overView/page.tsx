"use client";

import { findAllQuiz } from "@/api/quiz/quizAPI";
import { findAllQuizStudent } from "@/api/quizStudent/quiz-studentAPI";
import useMyQuizzesStore from "@/app/store/slices/teacher/MyQuizzesSlice";
import { AreaChartOverview } from "@/components/src/dashboard-conponents/charts/AreaChartOverview";
import CardDetails from "@/components/src/overview/CardDetails";
import PerformingCardDetails from "@/components/src/overview/PerformingCardDetails";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getUserFromToken } from "@/utils/authUtils";
import { useEffect, useState } from "react";

const Page = () => {
  const { toast } = useToast();
  const [quizStudents, setQuizStudents] = useState<any[]>([]);
  const { setQuizzes, quizzes } = useMyQuizzesStore();
  const [completionRate, setCompletionRate] = useState(0);
  const [inCompletionRate, setInCompletionRate] = useState(0);
  const [latestQuiz, setLatestQuiz] = useState({
    _id: "",
    title: "",
    subject: { name: "" },
    grade: "",
    batch: "",
    durationHours: 0,
    durationMinutes: 0,
    startDate: "",
    startTime: "",
    endTime: "",
    status: "",
  });

  const findAllQuizzes = async () => {
    const user = getUserFromToken();
    const response = await findAllQuiz({
      teacher: user?.uid,
      status: "completed",
    });

    // latest quiz
    const responseList = Array.isArray(response) ? response : [];
    // get the latest one quiz of the list and save it in to object find by updatedAt
    const latestQuiz = responseList.reduce((prev, current) => {
      return prev.updatedAt > current.updatedAt ? prev : current;
    });
    setLatestQuiz(latestQuiz);
    setQuizzes(response);
  };

  const fetchAllQuizStudents = async () => {
    console.log("Latest Quiz ID", latestQuiz._id);
    const response = await findAllQuizStudent({
      quizId: latestQuiz._id,
    });
    if (response.error) {
      toast({
        title: "Failed to fetch quiz students",
        description: `Can't fetch quiz students.`,
        duration: 5000,
        variant: "destructive",
      });
      return;
    }
    // console.log("Quiz Students", response);
    // response.isStudentAttempt == false list
    const responseList = Array.isArray(response) ? response : [];
    const attemptedStudents = responseList.filter(
      (quiz) => quiz.attempted === true
    );
    const notAttemptedStudents = responseList.filter(
      (quiz) => quiz.attempted === false
    );

    console.log("Attempted Students", attemptedStudents.length);
    console.log("Response List", responseList.length);

    const CompletionRate =
      (attemptedStudents.length / responseList.length) * 100;
    const CompletionRateRounded = Math.round(CompletionRate);

    const InCompletionRate =
      (notAttemptedStudents.length / responseList.length) * 100;
    const InCompletionRateRounded = Math.round(InCompletionRate);
    setInCompletionRate(InCompletionRateRounded);

    setCompletionRate(CompletionRateRounded);
    setInCompletionRate(InCompletionRateRounded);
    console.log("Completion Rate", CompletionRateRounded);

    // console.log("Attempted Students", attemptedStudents);
    // console.log("Not Attempted Students", notAttemptedStudents);

    setQuizStudents(response);
  };

  useEffect(() => {
    findAllQuizzes();
    fetchAllQuizStudents();
  }, []);

  return (
    <div className=" w-full h-auto flex flex-col gap-4 p-4">
      <div className="border border-3 border-SECONDARY w-[100%] h-70 p-3 rounded-lg">
        <AreaChartOverview />
      </div>
      <div className="w-[100%] h-auto pt-3 pb-3 rounded-lg flex gap-4">
        <div className="border border-[#ffffff2c] rounded-lg w-[33%] h-full p-4">
          <h1 className="mb-3">Latest Quiz Performance</h1>
          <div className="w-full h-40 flex flex-col justify-end items-center bg-[#417ba1] rounded-lg">
            <div className="w-full h-50 pt-10 pb-5 pl-2 pr-2 bg-gradient-to-b from-[#417ba1] to-[#12222c] rounded-lg">
              <h1 className="text-sm">📝 {latestQuiz.title}</h1>
            </div>
          </div>
          <h1 className="mt-3 text-sm text-TERTIARY">First 3 days 6 hours</h1>
          <div className=" w-full h-auto mt-3 text-sm">
            <CardDetails title="Completion Rate" value={`${completionRate}%`} />
            <CardDetails
              title="InCompletion Rate"
              value={`${inCompletionRate}%`}
            />
            <CardDetails title="Status" value="Auto-Graded" />
          </div>
          <Button className="w-full/2 mt-3 bg-[#ffffff36] hover:bg-[#ffffff5d] text- rounded-full">
            Go to quiz analytics
          </Button>
        </div>

        {/* Top Performing Quizzes */}
        <div className="border border-[#ffffff2c] rounded-lg w-[33%] h-full p-4">
          <h1 className="mb-3 font-medium">
            🏆 Top Performing Quizzes (Last 7 Days)
          </h1>

          <div className="space-y-4 mt-4">
            <PerformingCardDetails
              title="Math – Algebra Basics"
              percentage="95"
              students="25"
            />
            <PerformingCardDetails
              title="Science – Water Cycle"
              percentage="91"
              students="32"
            />
            <PerformingCardDetails
              title="History – Ancient Civilizations"
              percentage="89"
              students="18"
            />
            <PerformingCardDetails
              title="English – Grammar Rules"
              percentage="87"
              students="22"
            />
          </div>

          <Button className="w-full mt-6 bg-[#ffffff36] hover:bg-[#ffffff5d] rounded-full">
            Go to full quiz report
          </Button>
        </div>

        {/* News/Updates */}
        <div className="border border-[#ffffff2c] rounded-lg w-[33%] h-full p-4">
          <h1 className="mb-3 font-medium">📢 System Updates</h1>

          <div className="space-y-4 mt-4">
            <div className="border-l-4 border-BLUE pl-3 py-2">
              <h2 className="font-medium text-sm">
                New feature: Add question hints!
              </h2>
              <p className="text-sm text-TERTIARY mt-1">
                Help students with optional clues during quizzes.
              </p>
            </div>

            <div className="border-l-4 border-BLUE pl-3 py-2">
              <h2 className="font-medium text-sm">
                Quiz analytics now shows time spent per question.
              </h2>
              <p className="text-sm text-TERTIARY mt-1">
                Track which questions take students longer to answer.
              </p>
            </div>

            <div className="border-l-4 border-BLUE pl-3 py-2">
              <h2 className="font-medium text-sm">
                Voice commands added for accessibility.
              </h2>
              <p className="text-sm text-TERTIARY mt-1">
                Students can navigate quizzes completely hands-free.
              </p>
            </div>
          </div>

          <Button className="w-full mt-6 bg-[#ffffff36] hover:bg-[#ffffff5d] rounded-full">
            Check it out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
