import React from "react";
import { Circle } from "lucide-react";

export interface DateEvent {
  date: string;
  event: string;
}

type Props = {
  dateArray: Array<DateEvent>;
};

const ImportantDates = ({ dateArray }: Props) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-5 pb-0 h-full text-center">
      <h2 className="text-2xl font-semibold font-title text-cardtitle self-start">
        Important Dates
      </h2>
      {/* Timeline container */}
      <div className="w-full h-full flex justify-start pl-10">
        <ol className="w-full overflow-hidden relative z-0">
          {/* Timeline bar */}
          <div className="z-0 absolute w-[2px] h-full left-[6.5rem] top-0 translate-x-[-40%] bg-gradient-to-b from-uciyellow to-[#f78d2d]" />

          {/* Timeline content */}
          {dateArray.map(({ date, event }: DateEvent, index): any => {
            return (
              <li
                key={index}
                className="z-10 relative grid grid-cols-[5rem_3rem_auto] items-center py-2"
              >
                <div className="text-darkblue font-title text-xl font-semibold">
                  {date}
                </div>
                <div className="flex justify-center">
                  {index == 0 ? (
                    // Top always has filled icon with line
                    <div className="h-5 w-5 bg-uciyellow rounded-full"></div>
                  ) : (
                    <div className="h-3 w-3 bg-sand1 rounded-full border-[2px] border-uciyellow"></div>
                  )}
                </div>
                <div className="text-left pl-3">{event}</div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default ImportantDates;
