import ImportantDates from "./ImportantDates";
import Overview from "./Overview";
import SavedPlans from "./SavedPlans";
import ListView from "./ListView";
import CalendarView from "./CalendarView";
import FuzzySearch from "../FuzzySearch"

import { sampleEvents, sampleWaitlist } from "../siteConfig";
import SearchBar from "../SearchBar";
import { InstantSearch } from "react-instantsearch-hooks-web";
import SearchWrapper from "./SearchWrapper";


export default function Home() {


  return (
    <>
      <main className="flex flex-col items-center justify-center px-8 pb-32">

        {/* Search bar */}
        <div className="relative flex w-full h-64 justify-center items-center max-w-7xl">
          {/* Quarter Text */}
          <div className="font-body absolute right-10 top-2">
            <p className="font-semibold">Spring 2023</p>
          </div>
          <SearchWrapper/>
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
          <div className="card col-span-12 sm:col-span-12 lg:col-span-6 h-[60rem] pr-5">
            <ListView events={sampleEvents} waitlist={sampleWaitlist} />
          </div>
          <div className="card col-span-12 sm:col-span-12 lg:col-span-6 h-[60rem] overflow-hidden">
            <CalendarView />
          </div>
        </div>
      </main>
    </>
  );
}
