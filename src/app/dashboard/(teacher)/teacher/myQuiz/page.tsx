"use client";

import { findAllQuiz } from "@/api/quiz/quizAPI";
import useMyQuizzesStore from "@/app/store/slices/teacher/MyQuizzesSlice";
import NavButton from "@/components/src/dashboard-conponents/myQuizzes/NavButton";
import PendingPage from "@/components/src/dashboard-conponents/myQuizzes/PendingPage";
import PublishedPage from "@/components/src/dashboard-conponents/myQuizzes/PublishedPage";
import { useEffect, useState } from "react";

const Page = () => {
  const [active, setActive] = useState("Published");
  const { setQuizzes } = useMyQuizzesStore();

  const findAllQuizzes = async () => {
    const response = await findAllQuiz({
      // teacher: "67ac5ed7759af7a40233ce1e",
      batch: "2024",
      grade: "G-11",
      status: "pending",
    });
  
    setQuizzes(response); 
  };
  

  useEffect(() => {
    findAllQuizzes();
  }
  , [active]);

  return (
    <div>
      <div className="mb-[3%] w-full h-auto flex justify-center items-center space-x-5">
        <NavButton
          active={active}
          name="Published"
          toggleActive={(name: string) => {
            setActive(name);
          }}
        />
        <NavButton
          active={active}
          name="Pending"
          toggleActive={(name: string) => {
            setActive(name);
          }}
        />
      </div>
      <div className="border w-[100%] h-auto">
        {active === "Published" ? <PublishedPage /> : <PendingPage />}
      </div>
    </div>
  );
};

export default Page;
