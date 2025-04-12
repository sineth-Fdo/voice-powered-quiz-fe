"use client";

import { createQuestion, findAllQuestions } from "@/api/question/questionAPI";
import { findOneQuiz, updateQuizPassMark } from "@/api/quiz/quizAPI";
import useQuizStore from "@/app/store/slices/student/QuizDetailsSlice";
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
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { QuestionFormdata } from "@/types/question/question-interface";
import { getUserFromToken } from "@/utils/authUtils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuestionFormdata[]>([]);
  const [isAddQuestion, setIsAddQuestion] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [passingMark, setPassingMark] = useState(0);
  const { quiz, setQuiz } = useQuizStore();

  // Existing functions remain unchanged
  const addQuestion = async (data: QuestionFormData) => {
    const response = await createQuestion({
      quiz: quizId,
      questionNumber: questionNumber.toString(),
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
    setQuestionNumber(0);
    displayAllQuestions(quizId);
  };

  const displayAllQuestions = async (quizId: string) => {
    const user = getUserFromToken();
    const response = await findAllQuestions(quizId, user?.uid || "");
    if (response.length > 0) {
      setQuestions(response);
      setQuestionNumber(response.length + 1);
    }
  };

  const handlePassingMarkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassingMark(Number(e.target.value));
  };

  const updatePassingMark = async () => {
    const response = await updateQuizPassMark(quizId, passingMark);
    if (response.error) {
      toast({
        title: "Failed to update passing mark",
        description: `Can't update passing mark.`,
        duration: 5000,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Updated Successfully",
      description: `Passing mark updated successfully.`,
      duration: 5000,
      variant: "default",
      className: "bg-GREEN text-PRIMARY_TEXT",
    });
    setPassingMark(0);
    findQuiz();
  };

  const findQuiz = async () => {
    const response = await findOneQuiz(quizId);
    setQuiz(response);
  };

  useEffect(() => {
    findQuiz();
    displayAllQuestions(quizId);
  }, [quizId]);

  return (
    <div className="w-full bg-SECONDARY min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-PRIMARY/10 rounded-xl shadow-lg overflow-hidden">
        {/* Quiz Header */}
        <div className="bg-gradient-to-r from-SECONDARY_BLUE to-BLUE p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">
            {quiz.title || "Quiz Questions"}
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="bg-white/30 px-2 py-1 rounded-full">
                {questions.length} Questions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-white/30 px-2 py-1 rounded-full">
                Total Marks: {questions.reduce((sum, q) => sum + q.marks, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-PRIMARY_TEXT">
              Question Bank
            </h2>
            <div className="text-sm text-TERTIARY">
              <span className="inline-block h-2 w-2 rounded-full bg-GREEN mr-1"></span>{" "}
              Correct Answer
            </div>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <AccordionItem
                  key={question._id}
                  value={`item-${index}`}
                  className="border-none rounded-lg overflow-hidden shadow-sm"
                >
                  <AccordionTrigger className="px-4 py-4 bg-SECONDARY/70 hover:bg-SECONDARY rounded-lg text-left">
                    <div className="flex items-center gap-3 w-full">
                      <span className="bg-SECONDARY_BLUE/80 h-8 w-8 flex items-center justify-center rounded-full text-white font-semibold">
                        {index + 1}
                      </span>
                      <div className="flex-1 flex flex-col">
                        <span className="font-medium text-PRIMARY_TEXT">
                          {question.question}
                        </span>
                        <span className="text-xs text-TERTIARY mt-1">
                          {question.marks} marks
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="bg-SECONDARY/40 p-4 rounded-b-lg">
                    <div className="mb-4">
                      <p className="font-medium text-sm text-TERTIARY mb-2">
                        Options:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {question.options.map((option, idx) => (
                          <div
                            key={idx}
                            className={`
                              relative px-4 py-3 rounded-lg transition-all
                              ${
                                option.option === question.correctAnswer
                                  ? "bg-GREEN/20 border border-GREEN/50"
                                  : "bg-white/5 border border-white/10 hover:bg-white/10"
                              }
                            `}
                          >
                            {option.option === question.correctAnswer && (
                              <span className="absolute top-2 right-2 text-GREEN text-xs font-semibold">
                                ✓ Correct
                              </span>
                            )}
                            <p className="text-sm">{option.option}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="bg-SECONDARY/40 rounded-lg p-8 text-center">
                <p className="text-TERTIARY">
                  No questions available for this quiz yet
                </p>
                <p className="text-sm mt-1">
                  Add your first question to get started
                </p>
              </div>
            )}
          </Accordion>
        </div>

        {/* Passing Mark Section */}
        <div className="border-t border-white/10 bg-SECONDARY/40 p-6">
          <div className="bg-SECONDARY/70 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-lg">Quiz Settings</h3>
                <p className="text-sm text-TERTIARY">
                  Configure scoring parameters
                </p>
              </div>
              <div className="mt-2 sm:mt-0 bg-SECONDARY_BLUE/20 px-3 py-1 rounded-full">
                <span className="text-sm font-medium">
                  Current Passing Mark: {quiz.passingMarks || 0}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="number"
                placeholder="Enter new passing mark"
                value={passingMark || ""}
                onChange={handlePassingMarkChange}
                className="bg-white/5 border-white/10 focus:border-BLUE focus:ring-1 focus:ring-BLUE"
              />
              <Button
                className="bg-SECONDARY_BLUE hover:bg-BLUE transition-colors flex-shrink-0"
                onClick={() => updatePassingMark()}
              >
                Update Passing Mark
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Question Button/Form */}
      <div className="max-w-3xl mx-auto mt-6">
        {isAddQuestion ? (
          <div className="bg-PRIMARY/10 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-SECONDARY_BLUE to-BLUE p-4">
              <h2 className="font-bold text-lg">Add New Question</h2>
              <p className="text-sm opacity-80">
                Create a new question for this quiz
              </p>
            </div>
            <div className="p-6">
              <QuestionForm onSubmit={addQuestion} />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button
              className="bg-gradient-to-r from-SECONDARY_BLUE to-BLUE hover:opacity-90 px-6 py-6 text-lg rounded-full shadow-lg"
              onClick={() => setIsAddQuestion(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Question
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
