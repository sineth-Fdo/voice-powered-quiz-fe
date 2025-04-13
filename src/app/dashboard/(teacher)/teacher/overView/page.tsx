"use client";

import { findAllQuiz } from "@/api/quiz/quizAPI";
import { findAllQuizStudent } from "@/api/quizStudent/quiz-studentAPI";
import useMyQuizzesStore from "@/app/store/slices/teacher/MyQuizzesSlice";
import CardDetails from "@/components/src/overview/CardDetails";
import CompletedQuizzesCard from "@/components/src/overview/CompletedQuizzesCard";
import PerformingCardDetails from "@/components/src/overview/PerformingCardDetails";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getUserFromToken } from "@/utils/authUtils";
import { useEffect, useState } from "react";

interface Quiz {
  _id: string;
  title: string;
  updatedAt: string;
  // Add other properties as needed
}

const Page = () => {
  const { toast } = useToast();
  const { quizzes, setQuizzes } = useMyQuizzesStore();
  const [completionRate, setCompletionRate] = useState(0);
  const [inCompletionRate, setInCompletionRate] = useState(0);
  const [latestQuiz, setLatestQuiz] = useState<Quiz | null>(null);
  const [quizStats, setQuizStats] = useState<
    Record<
      string,
      {
        completionPercentage: number;
        studentCount: number;
      }
    >
  >({});

  const findAllQuizzes = async () => {
    const user = getUserFromToken();
    const response = await findAllQuiz({
      teacher: user?.uid,
      status: "completed",
    });

    // latest quiz
    const responseList = Array.isArray(response) ? response : [];
    // get the latest one quiz of the list and save it in to object find by updatedAt
    if (responseList.length > 0) {
      const latestQuiz = responseList.reduce((prev, current) => {
        return prev.updatedAt > current.updatedAt ? prev : current;
      });
      setLatestQuiz(latestQuiz);
    }
    setQuizzes(response);
  };

  const fetchQuizStudents = async () => {
    const response = await findAllQuizStudent({
      quizId: latestQuiz?._id,
      teacherId: getUserFromToken()?.uid,
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

    const responseList = Array.isArray(response) ? response : [];
    const attemptedStudents = responseList.filter(
      (quiz) => quiz.attempted === true
    );
    const notAttemptedStudents = responseList.filter(
      (quiz) => quiz.attempted === false
    );

    const CompletionRate =
      (attemptedStudents.length / responseList.length) * 100;
    const CompletionRateRounded = Math.round(CompletionRate);

    const InCompletionRate =
      (notAttemptedStudents.length / responseList.length) * 100;
    const InCompletionRateRounded = Math.round(InCompletionRate);
    setInCompletionRate(InCompletionRateRounded);

    setCompletionRate(CompletionRateRounded);
    setInCompletionRate(InCompletionRateRounded);
  };

  // Add function to fetch stats for all quizzes
  const fetchAllQuizStats = async () => {
    const quizzesArray = Array.isArray(quizzes) ? quizzes : [];

    // Create an object to store quiz stats
    const stats: Record<
      string,
      {
        completionPercentage: number;
        studentCount: number;
      }
    > = {};

    // Fetch stats for each quiz
    for (const quiz of quizzesArray) {
      const response = await findAllQuizStudent({
        quizId: quiz._id,
        teacherId: getUserFromToken()?.uid,
      });

      if (response.error) continue;

      const responseList = Array.isArray(response) ? response : [];
      const attemptedStudents = responseList.filter(
        (quiz) => quiz.attempted === true
      );

      // Calculate completion percentage
      const completionPercentage =
        responseList.length > 0
          ? Math.round((attemptedStudents.length / responseList.length) * 100)
          : 0;

      // Store stats for this quiz
      stats[quiz._id] = {
        completionPercentage,
        studentCount: responseList.length,
      };
    }

    setQuizStats(stats);
  };

  const fetchAllQuizStudents = async () => {
    const response = await findAllQuizStudent({
      teacherId: getUserFromToken()?.uid,
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
  };

  useEffect(() => {
    findAllQuizzes();
    fetchAllQuizStudents();
  }, []);

  // Add effect to fetch quiz stats when quizzes are available
  useEffect(() => {
    if (quizzes && Array.isArray(quizzes) && quizzes.length > 0) {
      fetchAllQuizStats();
    }
  }, [quizzes]);

  useEffect(() => {
    if (latestQuiz && latestQuiz._id) {
      fetchQuizStudents();
    }
  }, [latestQuiz]);

  return (
    <div className=" w-full h-auto flex flex-col gap-4 p-4">
      <div className=" w-[100%] h-auto pt-3 pb-3 rounded-lg flex gap-4">
        <div className="w-[33%] h-full space-y-8">
          <div className="border border-[#ffffff2c] rounded-lg w-[100%] h-full p-4">
            <h1 className="mb-3">Latest Quiz Performance</h1>
            <div className="w-full h-40 flex flex-col justify-end items-center bg-[#417ba1] rounded-lg">
              <div className="w-full h-50 pt-10 pb-5 pl-2 pr-2 bg-gradient-to-b from-[#417ba1] to-[#12222c] rounded-lg">
                <h1 className="text-sm">📝 {latestQuiz?.title}</h1>
              </div>
            </div>
            <h1 className="mt-3 text-sm text-TERTIARY">First 3 days 6 hours</h1>
            <div className=" w-full h-auto mt-3 text-sm">
              <CardDetails
                title="Completion Rate"
                value={`${completionRate}%`}
              />
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
          <div className="border border-[#ffffff2c] rounded-lg w-[100%] h-full p-4">
            <h1 className="mb-3 font-medium">📊 Completed Quizzes</h1>

            <div className="space-y-4 mt-4">
              {/* display maximum 3 quizzes */}
              {Array.isArray(quizzes) &&
                quizzes
                  .slice(0, 3)
                  .map((quiz) => (
                    <CompletedQuizzesCard
                      key={quiz._id}
                      title={quiz.title}
                      percentage={
                        quizStats[quiz._id]?.completionPercentage?.toString() ||
                        "0"
                      }
                      students={
                        quizStats[quiz._id]?.studentCount?.toString() || "0"
                      }
                    />
                  ))}
            </div>

            <Button className="w-full mt-6 bg-[#ffffff36] hover:bg-[#ffffff5d] rounded-full">
              Go to quizzes
            </Button>
          </div>
        </div>

        {/* Top Performing Quizzes */}
        <div className=" w-[33%] h-full space-y-8">
          <div className="border border-[#ffffff2c] rounded-lg w-[100%] h-full p-4">
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
        </div>

        {/* News/Updates */}
        <div className=" w-[33%] h-full space-y-8">
          <div className="border border-[#ffffff2c] rounded-lg w-[100%] h-full p-4">
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
    </div>
  );
};

export default Page;
