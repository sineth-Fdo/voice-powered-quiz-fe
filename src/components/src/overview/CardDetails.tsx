const CardDetails = (props: { title?: string; value?: string }) => {
  const { title, value } = props;
  return (
    <div className=" w-full flex justify-between items-center">
      <h1 className="mb-3">{title}</h1>
      <h1 className="mb-3">{value}</h1>
    </div>
  );
};

export default CardDetails;
