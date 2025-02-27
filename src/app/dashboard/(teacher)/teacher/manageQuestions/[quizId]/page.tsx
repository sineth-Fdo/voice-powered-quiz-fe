"use client";

import { createQuestion, findAllQuestions } from "@/api/question/questionAPI";
import QuestionForm, {
  QuestionFormData,
} from "@/components/src/dashboard-conponents/manageQuestions/QuestionForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getUserFromToken } from "@/utils/authUtils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface QuestionFormdata {
  _id: string;
  question: string;
  marks: number;
  options: { option: string }[];
  correctAnswer: string;
}

const Page = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuestionFormdata[]>([]);
  const [isAddQuestion, setIsAddQuestion] = useState(false);

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
    setIsAddQuestion(false);
    displayAllQuestions(quizId);
  };

  const displayAllQuestions = async (quizId: string) => {
    const user = getUserFromToken();
    const response = await findAllQuestions(quizId, user?.uid || "");
    setQuestions(response);
  };

  useEffect(() => {
    displayAllQuestions(quizId);
  }, [quizId]);

  return (
    <div className="w-[100%] flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Quiz Questions</h1>
        <Accordion type="single" collapsible>
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <AccordionItem key={question._id} value={`item-${index}`}>
                <AccordionTrigger className="px-4 py-4 bg-SECONDARY rounded-lg shadow-sm hover:bg-PRIMARY mb-2">
                  <div className="flex justify-between w-full ">
                    <span className="font-semibold text-md">
                      {question.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex px-4 py-2 ">
                  <div className=" mb-2 w-[100%] flex justify-between">
                    <div className=" w-[80%]">
                      <p className="font-medium">Options:</p>
                      <ul className="list-disc ml-6">
                        {question.options.map((option, idx) => (
                          <li
                            key={idx}
                            className={`w-[80%] text-SECONDARY_TEXT border border-SECONDARY_BLUE ${option.option == question.correctAnswer ? "border-SECONDARY_GREEN" : "border-SECONDARY_BLUE"} w-[50%] py-1 px-2 my-1 rounded-lg`}
                          >
                            {option.option}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className=" w-[20%] flex justify-end">
                      <span className="text-gray-500">
                        Marks: {question.marks}
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <p className="text-center text-gray-500">No questions available</p>
          )}
        </Accordion>
      </div>

      {isAddQuestion ? (
        <QuestionForm onSubmit={addQuestion} />
      ) : (
        <Button onClick={() => setIsAddQuestion(true)}>Add Question</Button>
      )}
    </div>
  );
};

export default Page;
