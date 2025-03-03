const QuizCardDetails = (props:{
    title : string;
    description : string;
}) => {
    const {title, description} = props;
  return (
    <h1 className="text-xs">
      {title}: <span className="text-xs text-gray-400">{description}</span>
    </h1>
  );
};

export default QuizCardDetails;
