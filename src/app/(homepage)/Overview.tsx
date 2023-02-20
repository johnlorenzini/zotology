const Overview = () => {
  return (
    <div className="flex flex-col rounded-2xl px-5 gap-3 h-full text-center items-center justify-center">
      <div className="flex flex-col">
        <h4 className="text-xl font-semibold font-title text-cardtitle">
          Enrollment Window
        </h4>
        <span className="text-4xl font-semibold font-title text-uciblue">
          March 6, 2023 8:15AM
        </span>
      </div>

      <hr className="h-[2px] rounded-lg w-full border-none ucigold" />
      
      <div className="flex flex-col">
        <h4 className="text-xl font-semibold font-title">
          Fee Status
        </h4>
        <span className="text-4xl font-semibold font-title text-red">
          Not Received
        </span>
        <span className="text-sm text-slate-500 font-medium font-title">
          The fee payment deadline is 03/15/2023.
        </span>
      </div>
    </div>
  );
};

export default Overview;
