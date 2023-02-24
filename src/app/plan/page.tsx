"use client";
import { supabase } from "@/lib/supabase/utils/supabase-secret";
import { useEffect, useState } from "react";
import SearchWrapper from "../(homepage)/SearchWrapper";
import FuzzySearch from "../FuzzySearch";
import ListView, { EnrolledView } from "../ListView";
import { useSearchParams } from "next/navigation";
import { sampleEvents, sampleWaitlist } from "../siteConfig";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";

export default function Home() {
  const searchParams = useSearchParams();
  const data = searchParams.get("id");

  const [planData, setPlanData] = useState<any>(null);
  const [fetchError, setFetchError] = useState<any>(null);

  useEffect(() => {
    async function retrievePlan() {
      if (data) {
        supabase
          .from("plans")
          .select("name, termId, created_at, updated_at, courses")
          .eq("id", data)
          .then((result) => {
            setPlanData(result.data?.at(0));
          });
      }
    }
    retrievePlan();
  }, [data]);

  useEffect(() => {
    console.log(planData)
  }, [planData])


  // const authsession = supabase.auth.getSession();
  // if (authsession) {
  //     authsession.then((result) => {
  //         const userId = result.data.session?.user.id;
  //         if (userId) {
  //             supabase
  //                 .from("plans")
  //                 .select("name, termId, created_at, updated_at, courses")
  //                 .eq("userId", userId)
  //                 //.eq("name", "current")
  //                 .then((result) => setPlanData(result));
  //         }
  //     });
  // }
  return (
    <main className="w-full flex justify-center">
      {fetchError && <div className="h-screen">{fetchError}</div>}
      {planData && (
        <div className="w-full flex flex-col justify-center items-center max-w-screen-2xl pb-16">
          {/* Back to home */}
          <div className="w-full flex justify-start px-10 py-5">  
            <Link href="/" className="flex items-center text-lg font-light text-gray-700 font-body">
              <MdOutlineKeyboardArrowLeft className="text-xl" />
              <span>Back to home</span>
            </Link>
          </div>

          {/* Grid layout */}
          <div className="grid grid-flow-row-dense gap-6 font-body grid-cols-12 w-full px-10">
            {/* Left: search to add classes */}
            <div className="card col-span-12 lg:col-span-6 p-5">
              <SearchWrapper />
            </div>
            {/* Right: edit current plan */}
            <div className="card col-span-12 lg:col-span-6 p-5">
              <h3 className="py-2 text-2xl font-semibold text-cardtitle font-title">
                {planData.name}
              </h3>
              <div>
                <EnrolledView events={sampleEvents} />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
