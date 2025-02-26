"use client";

import { createQuestion, findAllQuestions } from "@/api/question/questionAPI";
import QuestionForm, {
  QuestionFormData,
} from "@/components/src/dashboard-conponents/manageQuestions/QuestionForm";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { toast } = useToast();

  const addQuestion = async (data: QuestionFormData) => {
    const response = await createQuestion({
      quiz: quizId,
      questionNumber: "1",
      question: data.question,
      correctAnswer: data.correctAnswer,
      options: data.options,
      marks: data.marks,
    });
    if (response.error) {
      toast({
        title: "Failed to create question",
        description: `Can't create question.`,
        duration: 5000,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Created Successfully",
      description: `Question created successfully.`,
      duration: 5000,
      variant: "default",
      className: "bg-GREEN text-PRIMARY_TEXT",
    });
  };

  const displayAllQuestions = async (quizId: string) => {
    const response = await findAllQuestions(quizId, "67ac5ed7759af7a40233ce1e");
    console.log(response);
  };

  useEffect(() => {
    displayAllQuestions(quizId);
  }, [quizId]);

  return (
    <div className="w-[100%] flex flex-col justify-center items-center">
      Manage Questions page {quizId}
      <QuestionForm
        onSubmit={(data) => {
          addQuestion(data);
        }}
      />
    </div>
  );
};

export default Page;
