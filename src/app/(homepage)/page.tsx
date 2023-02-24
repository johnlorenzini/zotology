import ImportantDates from "./ImportantDates";
import Overview from "./Overview";
import SavedPlans from "./SavedPlans";
import CourseView from "./CourseView";
import FuzzySearch from "../FuzzySearch";
import WelcomeLogin from "../WelcomeLogin";
import SearchBar from "../SearchBar";
import { InstantSearch } from "react-instantsearch-hooks-web";
import SearchWrapper from "./SearchWrapper";
import { createClient } from "@/lib/supabase/utils/supabase-server";
import SectionsContext from "../SectionsContext";
import Hit from "../Hit";
// import {ToastContainer, toast} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <>
      <main className="flex flex-col items-center justify-center px-8 pb-20">
        {session && (
          <>
            <SectionsContext>
              {/* Search bar */}
              <div className="relative flex w-full h-64 justify-center items-center max-w-7xl z-30">
                {/* Quarter Text */}
                <div className="font-body absolute right-10 top-2">
                  <p className="font-semibold">Spring 2023</p>
                </div>
                <SearchWrapper/>
              </div>

              {/* Grid layout container */}
              <div className="grid grid-flow-row-dense gap-6 font-body grid-cols-12 max-w-7xl">
                {/* Row 1 */}
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
                {/* Row 2 */}
                <CourseView />
              </div>
            </SectionsContext>
          </>
        )}
        {!session && <WelcomeLogin />}
        
      </main>
    </>
  );
}
