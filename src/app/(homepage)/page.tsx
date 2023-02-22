import ImportantDates from "./ImportantDates";
import Overview from "./Overview";
import SavedPlans from "./SavedPlans";
import ListView from "./ListView";
import CalendarView from "./CalendarView";

import { sampleEvents, sampleWaitlist } from "../siteConfig";
import SearchBar from "../SearchBar";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center px-8 pb-32">
        {/* Search bar */}
        <div className="flex w-full h-64 justify-center items-center">
          <SearchBar/>  
        </div>

        {/* Grid layout container */}
        <div className="grid grid-flow-row-dense gap-6 font-body grid-cols-12 max-w-7xl">
          <div className="col-span-12 sm:col-span-5 lg:col-span-3 card h-64">
            <Overview />
          </div>
          <div className="col-span-12 sm:col-span-7 lg:col-span-3 card h-64 ">
            <SavedPlans plans={{}} />
          </div>
          <div className="col-span-12 sm:col-span-12 lg:col-span-6 card h-64">
            {/* @ts-ignore */}
            <ImportantDates />
          </div>
          <div className="card col-span-12 sm:col-span-12 lg:col-span-6 h-[50rem]">
            <ListView events={sampleEvents} waitlist={sampleWaitlist} />
          </div>
          <div className="card col-span-12 sm:col-span-12 lg:col-span-6 top-[80px] overflow-hidden h-[50rem]">
            <CalendarView />
          </div>
        </div>
      </main>
    </>
  );
}
