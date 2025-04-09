"use client";

import { checkAnswer, findAllQuestions } from "@/api/question/questionAPI";
import { findOneQuiz } from "@/api/quiz/quizAPI";
import { findOneQuizStudent } from "@/api/quizStudent/quiz-studentAPI";
import useQuizStore from "@/app/store/slices/student/QuizDetailsSlice";
import useSpeechTextStore from "@/app/store/slices/student/SpeeshText.slice";
import PopupDialog from "@/components/src/dashboard-conponents/student/assistant/popupDialog";
import SpeechToText from "@/components/src/dashboard-conponents/student/assistant/SpeechToText";
import TextToSpeech from "@/components/src/dashboard-conponents/student/assistant/TextToSpeech";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getUserFromToken } from "@/utils/authUtils";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// Define types for better code quality
interface QuestionOption {
  _id: string;
  option: string;
}

interface Question {
  _id: string;
  questionNumber: number;
  question: string;
  options: QuestionOption[];
  marks: number;
}

interface AnsweredQuestion {
  questionId: {
    _id: string;
    questionNumber: number;
  };
}

interface QuizStudentI {
  quizId: string;
  studentId: string;
  correctAnswers: number;
  incorrectAnswers: number;
  correctMarks: number;
  incorrectMarks: number;
  totalQuestions: number;
  totalMarks: number;
}

const Page = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { id } = params;
  const { quiz, setQuiz } = useQuizStore();
  const { speechText, setTextToSpeechText, setSpeechText, textToSpeechText } =
    useSpeechTextStore();

  // Consolidated and typed state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dataFetched, setDataFetched] = useState<boolean>(false);
  const [answeredQuestionNumbers, setAnsweredQuestionNumbers] = useState<
    number[]
  >([]);
  const [quizStudent, setQuizStudent] = useState<QuizStudentI>(
    {} as QuizStudentI
  );

  // Quiz summary data (used when quiz is completed)
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [totalMarks, setTotalMarks] = useState(0); // Replace with actual data
  const [totalPossibleMarks, setTotalPossibleMarks] = useState(0); // Replace with actual data

  const confirm = () => {
    setIsDialogOpen(false);
    router.push("/dashboard/student/overview");
  };

  useEffect(() => {
    if (quizCompleted) {
      finalMarksFunction();
    }
  }, [quizCompleted]);

  // Read out quiz results effect - moved to top level with conditional inside
  useEffect(() => {
    if (quizCompleted && quizStudent.totalQuestions) {
      const totalPossibleMarks =
        quizStudent.incorrectMarks + quizStudent.correctMarks;
      const correctMarks = quizStudent.correctMarks;

      setTotalPossibleMarks(totalPossibleMarks);
      setTotalMarks(correctMarks);

      const percentageScore = Math.round(
        (correctMarks / totalPossibleMarks) * 100
      );

      // Add the navigation prompt at the end of the result speech
      const resultSpeech = `Quiz complete! Score: ${correctMarks} out of ${totalPossibleMarks} which is  (${percentageScore}%). Say NEXT for dashboard or press down arrow for details.`;

      setTextToSpeechText(resultSpeech);
    }
  }, [quizCompleted, quizStudent, setTextToSpeechText]);

  useEffect(() => {
    // Only add listener when quiz is completed
    if (!quizCompleted) return;

    // Function to handle key presses
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for arrow down key (keyCode 40)
      if (event.key === "ArrowDown" || event.keyCode === 40) {
        setIsDialogOpen(true);
      }
    };

    // Add the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [quizCompleted]);

  useEffect(() => {
    if (quizCompleted && speechText) {
      const command = speechText.toLowerCase().trim();

      // Check specifically for "next" command
      if (command === "next") {
        // Navigate to dashboard
        router.push("/dashboard/student/overview");
      }

      setSpeechText("");
    }
  }, [quizCompleted, speechText, router, setSpeechText]);

  // Simplified finalMarksFunction
  const finalMarksFunction = async () => {
    const user = getUserFromToken();
    if (!user?.uid) return;

    const quizStudentRes = await findOneQuizStudent(id, user.uid);
    setQuizStudent(quizStudentRes); // Just set the entire response object
  };
  // Memoized function to fetch a random question
  const fetchRandomQuestion = useCallback(async () => {
    if (dataFetched) return;

    setLoading(true);

    // Get current user
    const user = getUserFromToken();
    if (!user?.uid) return;

    // Get quiz student data
    const quizStudentRes = await findOneQuizStudent(id, user.uid);

    // Get quiz details
    const quizResponse = await findOneQuiz(id);
    setQuiz(quizResponse);

    // Extract answered question numbers
    const answeredQNums = quizStudentRes.answeredQuestions.map(
      (item: AnsweredQuestion) => item.questionId.questionNumber
    );
    setAnsweredQuestionNumbers(answeredQNums);

    // Check if all questions are answered
    if (answeredQNums.length >= quizResponse.quizTotalQuestions) {
      setTextToSpeechText("You have answered all questions in this quiz.");
      setQuizCompleted(true);
      setLoading(false);
      return;
    }

    // Generate a random question number that hasn't been answered yet
    let randomNum;
    let attempts = 0;
    const maxAttempts = 20;

    do {
      randomNum =
        Math.floor(Math.random() * quizResponse.quizTotalQuestions) + 1;
      attempts++;
    } while (answeredQNums.includes(randomNum) && attempts < maxAttempts);

    // If we couldn't find an unanswered question after max attempts
    if (answeredQNums.includes(randomNum)) {
      setTextToSpeechText(
        "Could not find any unanswered questions. Please try again later."
      );
      setQuizCompleted(true);
      setLoading(false);
      return;
    }

    // Fetch the random question
    const questionResponse = await findAllQuestions(id, user.uid, {
      questionNumber: randomNum.toString(),
    });

    // Process response
    const questionData = Array.isArray(questionResponse)
      ? questionResponse
      : [questionResponse];

    // Skip displaying already answered questions
    if (questionData.length > 0) {
      const questionId = questionData[0]._id;
      const alreadyAnswered = quizStudentRes.answeredQuestions.some(
        (item: AnsweredQuestion) => item.questionId._id === questionId
      );

      if (alreadyAnswered) {
        // Don't display this question, try again
        setDataFetched(false);
        setLoading(false);
        // Recursively call fetchRandomQuestion to get a different question
        fetchRandomQuestion();
        return;
      }

      // Question is not answered, proceed normally
      setQuestions(questionData);
      setTextToSpeechText(questionData[0].question);
    } else {
      // No questions found
      setTextToSpeechText("No questions found for this quiz.");
    }

    setDataFetched(true);

    setLoading(false);
  }, [id, setQuiz, setTextToSpeechText, dataFetched]);

  // Initialize quiz on component mount
  useEffect(() => {
    fetchRandomQuestion();
  }, [fetchRandomQuestion]);

  // Handle speech commands
  useEffect(() => {
    if (!speechText) return;

    const currentQuestion = questions[0];
    if (currentQuestion?.options) {
      // Check for option selection via speech
      const matchedOption = currentQuestion.options.find(
        (opt) => opt.option.toLowerCase() === speechText.toLowerCase()
      );

      if (matchedOption) {
        setSelectedOption(matchedOption._id);
        setSpeechText("");
        return;
      }

      // Check for submit command
      if (speechText.toLowerCase() === "submit" && selectedOption) {
        handleSubmit();
        return;
      }
    }

    setSpeechText("");
  }, [speechText, questions, setSpeechText, selectedOption]);

  // Submit answer handler
  const handleSubmit = async () => {
    if (!selectedOption || !questions[0]) return;

    setLoading(true);

    const response = await checkAnswer({
      quizId: quiz._id,
      questionId: questions[0]._id,
      studentId: getUserFromToken()?.uid || "",
      studentAnswer: selectedOption,
    });

    if (response) {
      // Calculate remaining questions
      const totalAnswered = answeredQuestionNumbers.length + 1;
      const remaining = quiz.quizTotalQuestions - totalAnswered;

      // Set the text for speech
      setTextToSpeechText(
        `Your answer has been submitted. You have ${remaining} questions left.`
      );

      // Add a delay before resetting states to allow speech to complete
      setTimeout(() => {
        // Reset for next question
        setQuestions([]);
        setSelectedOption("");
        setSpeechText("");
        setDataFetched(false);
      }, 5000); // 5 second delay should be enough for the speech to complete
    }

    setLoading(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full h-full p-5 bg-SECONDARY rounded-lg flex justify-center items-center">
        <p>Loading question...</p>
      </div>
    );
  }

  const currentQuestion = questions[0];

  // No question found or quiz completed state
  if (!currentQuestion || quizCompleted) {
    const percentageScore = Math.round((totalMarks / totalPossibleMarks) * 100);

    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center p-6 bg-SECONDARY rounded-lg">
        <div className="w-[100%] mb-3">
          <SpeechToText />
        </div>
        <TextToSpeech speechedText={textToSpeechText} />
        <PopupDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          title="Quiz Notification"
          message={textToSpeechText}
          onConfirm={confirm}
        />

        <div className="w-full max-w-md bg-white/10 rounded-xl shadow-lg overflow-hidden">
          <div className={`p-4 text-center bg-SECONDARY_GREEN/80`}>
            <h1 className="text-3xl font-bold mb-2">Quiz Completed</h1>
          </div>

          <div className="p-6 space-y-6">
            {/* Score card */}
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <h2 className="text-xl font-semibold mb-2">Your Score</h2>
              <div className="text-4xl font-bold mb-1">
                {totalMarks}/{totalPossibleMarks}
              </div>
              <div className="text-xl opacity-80">{percentageScore}%</div>
            </div>

            {/* Results breakdown */}
            <div className="flex justify-between text-center gap-4">
              <div className="flex-1 bg-green-500/10 rounded-lg p-3">
                <div className="flex justify-center items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-green-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Correct</h3>
                <p className="text-3xl font-bold">
                  {quizStudent.correctAnswers}
                </p>
              </div>

              <div className="flex-1 bg-red-500/10 rounded-lg p-3">
                <div className="flex justify-center items-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-red-500"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg">Incorrect</h3>
                <p className="text-3xl font-bold">
                  {quizStudent.incorrectAnswers}
                </p>
              </div>
            </div>

            <Button
              className="w-full bg-SECONDARY_BLUE hover:bg-SECONDARY_BLUE/80 text-lg py-6"
              onClick={() => router.push("/dashboard/student/overview")}
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full p-5 bg-SECONDARY rounded-lg">
      <SpeechToText />
      <TextToSpeech speechedText={textToSpeechText} />

      <h1 className="text-2xl font-bold mb-4">
        Question {currentQuestion.questionNumber}
      </h1>

      <div className="mb-10 text-lg p-5 bg-white/10 rounded-lg">
        {currentQuestion.question}
        <div className="mt-2 text-sm text-gray-500">
          Marks: {currentQuestion.marks}
        </div>
      </div>

      <div className="w-full h-full p-5 bg-white/5 rounded-lg">
        <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
          {currentQuestion.options.map((option) => (
            <div
              key={option._id}
              className="flex items-center space-x-2 mb-3 p-2 hover:bg-white/10 rounded"
            >
              <RadioGroupItem value={option.option} id={option._id} />
              <Label htmlFor={option._id} className="cursor-pointer text-lg">
                {option.option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="w-[100%] flex justify-end items-center mt-10 p-5">
        <Button
          className="bg-SECONDARY_BLUE"
          onClick={handleSubmit}
          disabled={!selectedOption}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Page;
