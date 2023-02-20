import React from "react";

export interface DateEvent {
  date: string;
  event: string;
}

type Props = {
  dateArray: Array<DateEvent>;
};

const ImportantDates = ({ dateArray }: Props) => {
  return (
    <div className="relative flex flex-col gap-3 rounded-2xl p-5 pb-0 h-full text-center w-full overflow-y-hidden">
      <h2 className="text-2xl font-semibold font-title text-cardtitle self-start">
        Important Dates
      </h2>
      {/* Timeline container */}
      <div className="relative w-full h-full">
        {/* Timeline content */}
        <div className="relative w-full h-full flex justify-start px-10 overflow-y-scroll scrollbar-hide">
          {/* Timeline bar */}
          <div className="z-0 absolute w-[2px] left-[9rem] top-6 h-full translate-x-[-40%] bg-gradient-to-b from-uciyellow to-[#f78d2d]" />
          <ol className="w-full h-full z-0">
            {dateArray.map(({ date, event }: DateEvent, index): any => {
              return (
                <li
                  key={index}
                  className="h-10 z-10 relative grid grid-cols-[5rem_3rem_auto] items-center my-2"
                >
                  {/* Render date */}
                  {
                    index == 0 
                    ? (
                      <h4 className="text-uciblue font-title text-xl font-medium">
                        {date}
                      </h4>
                      )
                    : (
                      <h4 className="text-uciblue opacity-70 font-title text-normal font-medium">
                        {date}
                      </h4> 
                    )
                  }
                  
                  {/* Render circle */}
                  <div className="flex justify-center">
                    {index == 0 ? (
                      // Top always has filled icon with line
                      <div className="h-4 w-4 bg-uciyellow rounded-full"></div>
                    ) : (
                      <div className="h-3 w-3 bg-sand1 rounded-full border-[2px] border-uciyellow"></div>
                    )}
                  </div>

                  {/* Render event */}
                  { 
                    index == 0 
                    ? (
                      // bg-gradient-to-r from-[rgba(255,210,0,0.9)] to-[rgba(247,141,45,0.9)] 
                      <div className="bg-slate-300 bg-opacity-50 h-full flex items-center rounded-lg">  
                        <p className="text-left font-medium pl-3 text-black">
                          {event}
                        </p>
                      </div>
                      )
                    : (
                      <div className="h-full flex items-center rounded-lg">  
                        <p className="text-left opacity-70 pl-3">
                          {event}
                        </p>
                      </div>
                    )
                  
                  }
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ImportantDates;
