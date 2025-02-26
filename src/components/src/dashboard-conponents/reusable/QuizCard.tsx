import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const QuizCard = (props: { title: string; deleteQuiz?: () => void; navigate?: string }) => {
  const { title, deleteQuiz, navigate } = props;
  const router = useRouter();

  return (
    <div className="border border-SECONDARY bg-SECONDARY shadow-xl w-72 h-72 rounded-lg m-3">
      <div className=" h-[60%] w-[100%] flex justify-center items-end  rounded-t-lg">
        <div className="w-[100%] h-[100%] bg-gradient-to-tr from-[#000000] to-PRIMARY flex justify-start items-end p-2 rounded-t-lg relative">
          <h1 className="">{title}</h1>
          <div className="w-10 h-10 absolute top-0 right-0 flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="border border-[#ffffff26] w-[60%] h-[60%] rounded-full cursor-pointer flex justify-center items-center">
                  <EllipsisIcon size={20} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                className="w-[70%] border bg-SECONDARY text-PRIMARY_TEXT rounded-md shadow-md"
              >
                <button className="w-full">
                  <DropdownMenuItem>
                    <span>Publish</span>
                  </DropdownMenuItem>
                </button>
                <button className="w-full">
                  <DropdownMenuItem>
                    <span>Edit</span>
                  </DropdownMenuItem>
                </button>
                <button className="w-full">
                  <DropdownMenuItem
                    onClick={() => {
                      navigate && router.push(navigate);
                    }}
                  >
                    <span>Manage Questions</span>
                  </DropdownMenuItem>
                </button>
                <button className="w-full">
                  <DropdownMenuItem
                    onClick={() => {
                      deleteQuiz && deleteQuiz();
                    }}
                  >
                    <span>Delete</span>
                  </DropdownMenuItem>
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className=" h-[40%] p-2">
        <h1>Hello</h1>
      </div>
    </div>
  );
};

export default QuizCard;
