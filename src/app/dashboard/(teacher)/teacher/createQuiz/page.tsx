"use client";

import { createQuiz } from "@/api/quiz/quizAPI";
import useQuizFormOneStore from "@/app/store/slices/teacher/QuizFormSlice";
import useStepStore from "@/app/store/slices/teacher/QuizStepSlice";
import QuizFormOne, {
  FormData1,
} from "@/components/src/dashboard-conponents/createQuiz/QuizFormOne";
import QuizFormThree, {
  FormData3,
} from "@/components/src/dashboard-conponents/createQuiz/QuizFormThree";
import QuizFormTwo, {
  FormData2,
} from "@/components/src/dashboard-conponents/createQuiz/QuizFormTwo";
import { useToast } from "@/hooks/use-toast";

const Page = () => {
  const { toast } = useToast();
  const { FormOne, setFormOne, FormTwo, setFormTwo } = useQuizFormOneStore();
  const { stepNumber, setStepNumber } = useStepStore();

  const getQuizFormOneData = async (data: FormData1) => {
    setFormOne(data);
    setStepNumber(2);
  };

  const getQuizFormTwoData = async (data: FormData2) => {
    setFormTwo(data);
    setStepNumber(3);
  };

  const onSubmit = async (data: FormData3) => {

    const Data = {
      ...FormOne,
      ...FormTwo,
      ...data,
    };

    const response = await createQuiz({
      ...Data,
      title: Data.title || "",
      teacher: Data.teacher || "",
      subject: Data.subject || "",
      grade: Data.grade || "",
      batch: Data.batch || "",
      code: Data.code || "",
      description: Data.description || "",
      password: Data.password || "",
    });
    if (response.error) {
      toast({
        title: "Failed to create quiz",
        description: `Can't create quiz.`,
        duration: 5000,
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Quiz Created",
      description: `Quiz created successfully.`,
      duration: 5000,
      variant: "default",
      className: "bg-GREEN text-PRIMARY_TEXT",
    });
  };

  return (
    <div>
      <div className=" w-full h-20 flex justify-between items-center relative">
        <div className=" flex justify-between items-center w-[100%] absolute">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`border border-BLUE w-7 h-7 rounded-full flex justify-center items-center ${i+1 === stepNumber ? 'bg-BLUE' : 'bg-SECONDARY'} text-SECONDARY_TEXT text-sm`}
            >
              <h1>{i + 1}</h1>
            </div>
          ))}
        </div>
        <div className="border border-SECONDARY w-[100%]"></div>
      </div>
      <div className=" w-[100%] flex flex-col justify-center items-center">
        {
          {
            1: <QuizFormOne onSubmit={getQuizFormOneData} />,
            2: <QuizFormTwo onSubmit={getQuizFormTwoData} />,
            3: <QuizFormThree onSubmit={onSubmit} />,
          }[stepNumber]
        }
      </div>
    </div>
  );
};

export default Page;
