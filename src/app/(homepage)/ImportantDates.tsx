import "server-only";

import cn from "classnames";
import { supabase } from "@/lib/supabase/utils/supabase-secret";

const ImportantDates = async () => {
  const { data, error } = await supabase
    .from("dates")
    .select("title, date, term_id!inner(year, quarter)")
    .eq("term_id.quarter", "SPRING")
    .eq("term_id.year", 2023);
    // .in("title", [
    //   "Schedule of Classes available",
    //   "View date and time of enrollment window (continuing students)",
    //   "Waitlist release  (5 p.m.–8 p.m.)",
    //   "18-unit enrollment limit (undergrad) lifted (noon)",
    //   "Submit UCSHIP waiver to avoid $50 latewaiver fee",
    //   "Pay tuition and fees without $50 late payment charge and classes being dropped.(Fee Payment Deadline)*",
    //   "Pay tuition and fees to avoid loss of student status.*",
    //   "Quarter begins",
    //   "Instruction begins",
    //   "$50 late enrollment charge applies if enrolled in 0 units after this date (5:00 p.m.)",
    //   "Waitlists deactivated. (5:00 p.m.)",
    // ]);

  if (!data) throw new Error();
  const filteredData = data.filter((item) : any => new Date(item.date) > new Date());
  const dates = filteredData.map(({ date, ...rest }) => ({
    date: new Date(date),
    ...rest,
  }));

  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  return (
    <div className="relative flex flex-col rounded-2xl p-5 pb-0 h-full w-full overflow-y-hidden">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold font-title text-cardtitle self-start mb">
          Upcoming Dates
        </h2>
        <hr className="min-h-[3px] mt-4 rounded-lg w-full border-none ucigold" />
      </div>

      {/* Timeline container */}
      <div className="relative w-full h-full flex justify-center">
        {/* Timeline content */}
        <div className="relative w-full h-full flex overflow-y-scroll scrollbar-hide max-w-xl">
          {/* Timeline bar */}
          <div className="z-0 absolute w-[2px] left-[7rem] top-0 h-full translate-x-[-40%] bg-gradient-to-b from-uciyellow to-[#f78d2d]" />

          <ol className="w-full h-full z-0 grid grid-cols-[6rem_2rem_1fr] place-items-center">
            {dates.slice(0,4).map(({ date, title }, i) => {
              return (
                <li key={i} className="contents my-5">
                  {/* Date */}
                  <h4
                    className={cn(
                      "text-uciblue font-title font-medium",
                      i === 0 ? "text-xl" : "text-normal opacity-70"
                    )}
                  >
                    {formatter.format(date)}
                  </h4>

                  {/* Render circle */}
                  <div className="rounded-full border-[2px] border-sand1">
                    <div
                      className={cn(
                        "rounded-full",
                          i === 0
                          ? "h-4 w-4 bg-uciyellow"
                          : "h-3 w-3 bg-sand1 border-[2px] border-uciyellow"
                      )}
                    />
                  </div>

                  {/* Render event */}
                  <div
                    className="h-full flex w-full justify-start items-center"
                  >
                    <p className={cn("text-left opacity-70 pl-3 pr-8", 
                    i === 0 ? "font-semibold" : "")}>{title}</p>
                  </div>
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
