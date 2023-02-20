import ImportantDates from "./ImportantDates";
import Overview from "./Overview";
import SavedPlans from "./SavedPlans";
import ListView from "./ListView";

import { sampleEvents, sampleWaitlist } from "../siteConfig";
import { DateEvent } from "./ImportantDates";

export default function Home() {
  const dateArray: Array<DateEvent> = [
    {
      date: "Feb 5",
      event: "View Date and Time of ",
    },
    {
      date: "Feb 6",
      event: "Waitlist Release",
    },
    {
      date: "Feb 7",
      event: "View Date and Time of ",
    },
    {
      date: "Feb 30",
      event: "ur mom comes to uci",
    },
    {
      date: "Feb 5",
      event: "View Date and Time of ",
    },
    {
      date: "Feb 6",
      event: "Waitlist Release",
    },
    {
      date: "Feb 7",
      event: "View Date and Time of ",
    },
    {
      date: "Feb 30",
      event: "ur mom comes to uci",
    },
  ];

  return (
    <>
      <main className="flex flex-col items-center">
        <div className="flex w-full h-64 justify-center items-center">
          this is where the search bar goes
        </div>
        <div className="grid grid-flow-row-dense gap-6 mx-12 font-body grid-cols-12 max-w-[1980px]">
          <div className="col-span-12 sm:col-span-5 lg:col-span-3 card h-64">
            <Overview />
          </div>
          <div className="col-span-12 sm:col-span-7 lg:col-span-3 card h-64 ">
            <SavedPlans plans={{}} />
          </div>
          <div className="col-span-12 sm:col-span-12 lg:col-span-6 card h-64">
            <ImportantDates dateArray={dateArray} />
          </div>
          <div className="card col-span-12 sm:col-span-12 lg:col-span-6">
            <ListView events={sampleEvents} waitlist={sampleWaitlist} />
          </div>
        </div>
      </main>
    </>
  );
}
