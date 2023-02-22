const Overview = () => {
  return (
    <div className="flex flex-col rounded-2xl p-5 gap-5 h-full justify-center md:justify-start">
      <div className="flex flex-col">
        <h4 className="text-2xl font-semibold font-title text-cardtitle">
            Enrollment<br/>Window
        </h4>
        <hr className="min-h-[3px] mt-4 rounded-lg w-full border-none ucigold" />  
      </div>
      
      <span className="text-3xl font-semibold font-title text-uciblue">
        March 6, 2023 8:15AM
      </span>
        
      <div className="flex flex-col">
        <hr className="min-h-[3px] mb-4 rounded-lg w-full border-none ucigold" />
        <h4 className="text-2xl font-semibold font-title text-cardtitle">
          Fee Status
        </h4>
        <a href="https://zotaccount.uci.edu/" target="_blank" rel="noreferrer" className="text-xl underline font-medium font-title">
          Not Received
        </a>
      </div>
    </div>
  );
};

export default Overview;
