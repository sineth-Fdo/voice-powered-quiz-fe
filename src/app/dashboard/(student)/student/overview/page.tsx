"use client";

import { findAllQuiz } from "@/api/quiz/quizAPI";
import { findOneUser } from "@/api/user/userApi";
import useSpeechTextStore from "@/app/store/slices/student/SpeeshText.slice";
import useMyQuizzesStore from "@/app/store/slices/teacher/MyQuizzesSlice";
import PopupDialog from "@/components/src/dashboard-conponents/student/assistant/popupDialog";
import SpeechToText from "@/components/src/dashboard-conponents/student/assistant/SpeechToText";
import TextToSpeech from "@/components/src/dashboard-conponents/student/assistant/TextToSpeech";
import AllQuizzes from "@/components/src/dashboard-conponents/student/myQuiz/AllQuizzes";
import { getUserFromToken } from "@/utils/authUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { setQuizzes } = useMyQuizzesStore();
  const { speechText, setTextToSpeechText, setSpeechText, textToSpeechText } =
    useSpeechTextStore();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [popupStatus] = useState<number>(1);

  const findAllQuizzes = async () => {
    const user = getUserFromToken();
    const userData = await findOneUser(user?.uid || "");
    const response = await findAllQuiz({
      batch: userData.batch,
      grade: userData.grade,
    });
        
    setQuizzes(response);
    
    const responseList = Array.isArray(response) ? response : [];

    const responseRunning = responseList.filter(quiz => quiz.status === "started");
    const responseNotStarted = responseList.filter(quiz => quiz.status === "not-started");
  
    if (popupStatus === 0) {
      if (responseRunning.length > 0) {
        setTextToSpeechText(
          `You have ${responseRunning.length} ongoing quizzes. Would you like to hear the quiz names?`
        );
      } else {
        setTextToSpeechText("You have no ongoing quiz.");
      }
    }
  
    if (popupStatus === 1) {
      if (responseNotStarted.length > 0) {
        setTextToSpeechText(
          `You have ${responseNotStarted.length} quizzes waiting to be started. Would you like to hear the quiz names?`
        );
      } else {
        setTextToSpeechText("You have no not started quizzes.");
      }
    }
  };

  // commands function
  const confirm = () => {
    setIsDialogOpen(false);
    router.push("/dashboard/student/quizDetails");
  };

  useEffect(() => {
    const initializePage = async () => {
      await findAllQuizzes();
    };

    initializePage();
  }, []);

  useEffect(() => {
    if (speechText && speechText.toLowerCase() === "next") {
      confirm();
      setSpeechText("");
    } else if (speechText && speechText.toLowerCase() === "no") {
      setSpeechText("");
    }
  }, [speechText]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "ArrowDown") {
        setIsDialogOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-[100%] h-auto">
      <SpeechToText />
      <TextToSpeech speechedText={textToSpeechText} />

      {/* Reusable Dialog */}
      <PopupDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Quiz Notification"
        message={textToSpeechText}
        onConfirm={confirm}
      />
      <h1>{speechText}</h1>
      <AllQuizzes />
    </div>
  );
};

export default Page;
