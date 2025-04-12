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
  role?: string;
  navigate?: string;
  deleteQuiz?: () => void;
  updateStatus?: () => void;
  backToPending?: () => void;
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
    navigate,
    role,
    deleteQuiz,
    updateStatus,
    backToPending,
  } = props;
  const router = useRouter();

  // Define background gradient based on quiz status
  const getCardBackground = () => {
    switch (status) {
      case "started":
        return "from-BLUE/40 to-SECONDARY_BLUE/70";
      case "completed":
        return "from-GREEN/40 to-SECONDARY_GREEN/70";
      case "not-started":
        return "from-YELLOW/40 to-YELLOW/70";
      default:
        return "from-[#000000]/90 to-PRIMARY/90";
    }
  };

  return (
    <div className="w-72 h-72 rounded-xl overflow-hidden transform transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl">
      {/* Card border with gradient */}
      <div className="w-full h-full p-[1px] bg-gradient-to-tr from-[#ffffff20] to-[#ffffff05]">
        {/* Card content */}
        <div className="w-full h-full bg-SECONDARY rounded-xl overflow-hidden flex flex-col">
          {/* Top section with title and dropdown */}
          <div className="h-[60%] relative">
            {/* Background gradient */}
            <div className={`w-full h-full bg-gradient-to-tr ${getCardBackground()} p-4 flex flex-col justify-between`}>
              {/* Subject pill */}
              <div className="flex justify-between items-start">
                <div className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                  {subject || "Subject"}
                </div>
                
                {/* Action menu */}
                {role !== "student" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className="bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all w-8 h-8 rounded-full cursor-pointer flex justify-center items-center">
                        <EllipsisIcon size={18} />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="bottom"
                      align="end"
                      className="w-48 border bg-SECONDARY text-PRIMARY_TEXT rounded-md shadow-md"
                    >
                      {status === "pending" ? (
                        <>
                          <QuizDropdownMenuItem
                            onClick={() => {
                              if (updateStatus) updateStatus();
                            }}
                            name="Publish"
                          />
                          <QuizDropdownMenuItem name="Edit" />
                          <QuizDropdownMenuItem
                            onClick={() => {
                              if (navigate) router.push(navigate);
                            }}
                            name="Manage Questions"
                          />
                          <QuizDropdownMenuItem
                            onClick={() => {
                              if (deleteQuiz) deleteQuiz();
                            }}
                            name="Delete"
                          />
                        </>
                      ) : status === "not-started" ? (
                        <>
                          <QuizDropdownMenuItem
                            onClick={() => {
                              if (updateStatus) updateStatus();
                            }}
                            name="Start"
                          />
                          <QuizDropdownMenuItem
                            name="Back to Edit"
                            onClick={() => {
                              if (backToPending) backToPending();
                            }}
                          />
                        </>
                      ) : status === "started" ? (
                        <>
                          <QuizDropdownMenuItem
                            onClick={() => {
                              if (updateStatus) updateStatus();
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
                              if (deleteQuiz) deleteQuiz();
                            }}
                            name="Delete"
                          />
                        </>
                      ) : null}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              
              {/* Title */}
              <div className="mt-auto">
                <h1 className="text-xl font-bold line-clamp-2 break-words">{title}</h1>
                <div className="flex items-center gap-1 mt-1">
                  <div className="bg-white/20 text-xs px-2 py-0.5 rounded-md">
                    {`${grade || ""} - ${batch || ""}`}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom section with details */}
          <div className="h-[40%] p-3 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="space-y-1.5 w-[70%]">
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
              <div className="w-[30%] flex justify-end items-start">
                <QuizStatus status={status || "pending"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;