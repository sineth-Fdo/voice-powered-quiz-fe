"use client";

import { findOneQuiz } from "@/api/quiz/quizAPI";
import useDialogPopupStore from "@/app/store/slices/student/DialogPopupSlice";
import useQuizStore from "@/app/store/slices/student/QuizDetailsSlice";
import useSpeechTextStore from "@/app/store/slices/student/SpeeshText.slice";
import PopupDialog from "@/components/src/dashboard-conponents/student/assistant/popupDialog";
import SpeechToText from "@/components/src/dashboard-conponents/student/assistant/SpeechToText";
import TextToSpeech from "@/components/src/dashboard-conponents/student/assistant/TextToSpeech";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { quiz, setQuiz } = useQuizStore();
  const params = useParams<{ id: string }>();
  const { id } = params;
  const { speechText, setTextToSpeechText, setSpeechText, textToSpeechText } =
    useSpeechTextStore();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const { dialogPopup, setDialogPopup } = useDialogPopupStore();

  const findQuiz = async () => {
    const response = await findOneQuiz(id);
    setQuiz(response);
    if (response && response._id) {
      setDialogPopup(2);
      triggerQuizNotification(true, 3);
    }
  };

  const triggerQuizNotification = (hasQuiz: boolean, popupState: number) => {
    if (popupState === 2 && hasQuiz) {
      setTextToSpeechText(
        "You have a new quiz. Do you want to start it now say 'NEXT' or say 'DETAILS' to hear the details?"
      );
    }

    if (popupState === 3 && hasQuiz) {
      setTextToSpeechText(
        `Get ready! You have a ${quiz.durationHours}-hour and ${quiz.durationMinutes}-minute ${quiz.subject.name} quiz ahead. Do you want to start now?`
      );
    }
  };

  const confirm = () => {
    setIsDialogOpen(false);
    if (dialogPopup === 2) {
      setDialogPopup(3);
      router.push(`/dashboard/student/quiz/${quiz._id}`);
      setTextToSpeechText("");
    }
  };

  useEffect(() => {
    const initializePage = async () => {
      await findQuiz();
    };

    initializePage();
  }, []);

  useEffect(() => {
    if (dialogPopup === 2) {
      findQuiz();
    }
  }, [dialogPopup]);

  useEffect(() => {
    if (speechText && speechText.toLowerCase() === "next") {
      confirm();
      setSpeechText("");
    } else if (
      (speechText && speechText.toLowerCase() === "details") ||
      "detail"
    ) {
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
    <div>
      <h1>{dialogPopup}</h1>
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
      <div className="-b-2 w-[100%] h-60 mt-4 flex items-end rounded-md  bg-gradient-to-tr from-[#1b3e55] to-PRIMARY ">
        <div className="bottom-0 w-3/4 h-1/2 flex items-end pl-3 pb-3">
          <h1 className="text-3xl ">Quiz Name Test</h1>
        </div>
      </div>
      <div className=" h-40 mt-4">
        <h1>
          Subject:{" "}
          {quiz.subject && typeof quiz.subject === "object"
            ? quiz.subject.name
            : "Unknown"}
        </h1>
        <h1>
          Duration : {quiz.durationHours}h {quiz.durationMinutes}min{" "}
        </h1>

        <h1>Starting date : {quiz.startDate}</h1>
        <h1>Starting time : {quiz.startTime}</h1>
        <h1>Ending Time : {quiz.endTime}</h1>

        <h1>Total Questions : 20</h1>
      </div>
      <div className=" w-[100%] flex justify-end items-center h-20">
        <Button className="bg-SECONDARY_BLUE">Start Quiz</Button>
      </div>
    </div>
  );
};

export default Page;
