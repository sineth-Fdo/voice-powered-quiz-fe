import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import QuizCardDetails from "./QuizCardDetails";
import QuizDropdownMenuItem from "./QuizDropdownMenuItem";
import QuizStatus from "./QuizStatus";

const QuizCard = (props: {
  title?: string;
  subject?: string;
  grade?: string;
  batch?: string;
  durationHour?: number;
  durationMinute?: number;
  startDate?: string;
  startTime?: string;
  endTime?: string;
  status?: string;
  deleteQuiz?: () => void;
  updateStatus?: () => void;
  backToPending?: () => void;
  navigate?: string;
}) => {
  const {
    title,
    subject,
    grade,
    batch,
    durationHour,
    durationMinute,
    startDate,
    startTime,
    endTime,
    status,
    deleteQuiz,
    updateStatus,
    backToPending,
    navigate,
  } = props;
  const router = useRouter();

  return (
    <div className="border border-SECONDARY bg-SECONDARY shadow-xl w-72 h-72 rounded-lg m-3">
      <div className="h-[60%] w-[100%] flex justify-center items-end rounded-t-lg">
        <div className="w-[100%] h-[100%] bg-gradient-to-tr from-[#000000] to-PRIMARY flex justify-start items-end p-2 rounded-t-lg relative">
          <h1>{title}</h1>
          <div className=" w-10 h-10 absolute top-0 right-0 flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="border border-[#ffffff26] w-[60%] h-[60%] rounded-full cursor-pointer flex justify-center items-center">
                  <EllipsisIcon size={20} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                className="w-[100%] border bg-SECONDARY text-PRIMARY_TEXT rounded-md shadow-md"
              >
                {status === "pending" ? (
                  <>
                    <QuizDropdownMenuItem
                      onClick={() => {
                        updateStatus && updateStatus();
                      }}
                      name="Publish"
                    />
                    <QuizDropdownMenuItem name="Edit" />
                    <QuizDropdownMenuItem
                      onClick={() => {
                        navigate && router.push(navigate);
                      }}
                      name="Manage Questions"
                    />
                    <QuizDropdownMenuItem
                      onClick={() => {
                        deleteQuiz && deleteQuiz();
                      }}
                      name="Delete"
                    />
                  </>
                ) : status === "not-started" ? (
                  <>
                    <QuizDropdownMenuItem
                      onClick={() => {
                        updateStatus && updateStatus();
                      }}
                      name="Start"
                    />
                    <QuizDropdownMenuItem
                      name="Back to Edit"
                      onClick={() => {
                        backToPending && backToPending();
                      }}
                    />
                  </>
                ) : status === "started" ? (
                  <>
                    <QuizDropdownMenuItem
                      onClick={() => {
                        updateStatus && updateStatus();
                      }}
                      name="Stop"
                    />
                    <QuizDropdownMenuItem name="Edit" />
                  </>
                ) : status === "completed" ? (
                  <>
                    <QuizDropdownMenuItem name="View Result" />
                    <QuizDropdownMenuItem
                      onClick={() => {
                        deleteQuiz && deleteQuiz();
                      }}
                      name="Delete"
                    />
                  </>
                ) : null}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="h-[40%] p-2">
        <div className=" w-[100%] h-auto flex ">
          <div className=" w-[70%] flex flex-col space-y-1">
            <QuizCardDetails title="Subject" description={subject || ""} />
            <QuizCardDetails
              title="Grade"
              description={`${grade || ""} - ${batch || ""}`}
            />
            <QuizCardDetails
              title="Duration"
              description={`${durationHour || 0}h ${durationMinute || 0}min `}
            />
            <QuizCardDetails
              title="Start Time"
              description={`${startDate || ""} : ${startTime || ""}`}
            />
            <QuizCardDetails
              title="End Time"
              description={`${startDate || ""} : ${endTime || ""}`}
            />
          </div>
          <div className=" w-[30%] h-[10%] flex justify-end items-center">
            <QuizStatus status={status || "pending"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
