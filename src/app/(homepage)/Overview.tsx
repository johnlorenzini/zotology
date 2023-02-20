const Overview = () => {
  return (
    <div className="flex flex-col rounded-2xl px-5 h-full text-center items-center justify-center">
      <h2 className="text-xl font-medium font-title text-cardtitle">
        Enrollment Window
      </h2>
      <span className="text-4xl pt-2 font-semibold font-title text-uciblue">
        March 6, 2023 8:15AM
      </span>
      <hr className="h-[2px] my-6 rounded-lg w-full border-none ucigold" />
      <span className="text-xl font-medium font-title">Fee Status</span>
      <span className="text-4xl pt-2 font-semibold font-title text-red">
        NOT RECEIVED
      </span>
      <span className="text-sm text-slate-500 font-medium font-title">
        The fee payment deadline is 03/15/2023.
      </span>
    </div>
  );
};

export default Overview;
