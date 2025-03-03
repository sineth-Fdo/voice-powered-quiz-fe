const QuizStatus = (props:{
  status: string;
}) => {
    const { status } = props;
  return (

    <div className={`w-[100%] h-[100%] flex justify-center items-center py-1 ${status === "pending" ? "bg-YELLOW" : status === "started" ? "bg-GREEN" : status === "completed" ? "bg-GREEN" : "bg-RED"} rounded-full text-SECONDARY_TEXT`}>
      <h1 className="text-xs">{status}</h1>
    </div>
  );
};

export default QuizStatus;
