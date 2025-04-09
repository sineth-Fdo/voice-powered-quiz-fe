"use client";

import { findAllQuiz } from "@/api/quiz/quizAPI";
import { findOneUser } from "@/api/user/userApi";
import useDialogPopupStore from "@/app/store/slices/student/DialogPopupSlice";
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
  const { dialogPopup, setDialogPopup } = useDialogPopupStore();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [runningQuizId, setRunningQuizId] = useState<string | null>(null);

  const findAllQuizzes = async () => {
    const user = getUserFromToken();
    const userData = await findOneUser(user?.uid || "");
    const response = await findAllQuiz({
      batch: userData.batch,
      grade: userData.grade,
    });

    setQuizzes(response);
    const responseList = Array.isArray(response) ? response : [];

    const responseRunning = responseList.filter(
      (quiz) => quiz.status === "started"
    );
    const newRunningQuizId =
      responseRunning.length > 0 ? responseRunning[0]._id : null;
    setRunningQuizId(newRunningQuizId);

    console.log("running quiz id:", runningQuizId);
    const responseNotStarted = responseList.filter(
      (quiz) => quiz.status === "not-started"
    );

    handleQuizDialog(dialogPopup, responseRunning, responseNotStarted);
  };

  const handleQuizDialog = (
    status: number,
    runningQuizzes: any[],
    notStartedQuizzes: any[]
  ) => {
    if (status === 0) {
      if (runningQuizzes.length > 0) {
        setTextToSpeechText(
          `You have ${runningQuizzes.length} active quiz! Say 'NEXT' or 'PRESS SPACE BUTTON ON YOUR KEYBOARD' to resume the quiz.`
        );
      } else {
        setTextToSpeechText("You have no ongoing quiz.");
        setTimeout(() => {
          setDialogPopup(1);
        }, 4000);
      }
    }

    if (status === 1) {
      if (notStartedQuizzes.length > 0) {
        setTextToSpeechText(
          `You have ${notStartedQuizzes.length} quizzes waiting to be started. Would you like to hear the quiz names?`
        );
      } else {
        setTextToSpeechText("You have no not started quizzes.");
      }
    }
  };

  const confirm = () => {
    setIsDialogOpen(false);
    if (dialogPopup === 0) {
      router.push(`/dashboard/student/quizDetails/${runningQuizId}`);
    } else if (dialogPopup === 1) {
      alert("No not started quizzes");
    }
  };

  useEffect(() => {
    const initializePage = async () => {
      await findAllQuizzes();
    };

    initializePage();
  }, []);

  useEffect(() => {
    if (dialogPopup === 1) {
      findAllQuizzes();
    }
  }, [dialogPopup]);

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
        // onCancel={reject}
      />
      <h1>{speechText}</h1>
      <AllQuizzes />
    </div>
  );
};

export default Page;
