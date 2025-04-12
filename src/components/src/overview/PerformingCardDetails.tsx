const PerformingCardDetails = (props: {
  title?: string;
  percentage?: string;
  students?: string;
}) => {
  const { title, percentage, students } = props;
  return (
    <div className="bg-[#ffffff12] p-3 rounded-lg">
      <h2 className="font-medium text-sm">Quiz: &quot; {title} &quot;</h2>
      <p className="text-sm text-TERTIARY mt-1">
        Score Avg: <span className="text-GREEN">{percentage}%</span> (📊{" "}
        {students} students)
      </p>
    </div>
  );
};

export default PerformingCardDetails;
