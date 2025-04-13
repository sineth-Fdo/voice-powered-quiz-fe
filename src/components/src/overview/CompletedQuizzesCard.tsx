const CompletedQuizzesCard = (props:{
    title?: string;
    percentage?: string;
    students?: string;
}) => {
    const { title, percentage, students } = props;
  return (
    <div className="bg-[#ffffff0f] rounded-lg p-3 hover:bg-[#ffffff1a] transition-all">
      <h2 className="text-sm font-medium">{title}</h2>
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-BLUE"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span className="text-xs text-TERTIARY">{students} students</span>
        </div>
        <div className="text-sm font-medium text-BLUE">{percentage}%</div>
      </div>
      <div className="w-full bg-[#ffffff1a] rounded-full h-1.5 mt-2">
        <div
          className="bg-BLUE h-1.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CompletedQuizzesCard;
