"use client";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase/utils/supabase-secret";

import ListView from "../ListView";
import CalendarView from "../CalendarView";

import { sampleWaitlist } from "../siteConfig";
import { useUserContext } from "../SectionsContext";
import { motion } from "framer-motion";

type Props = {};

interface DateInfo {
  title: string;
  date: string;
}

const CourseView = ({}: Props) => {
  const { courseContext, setCourseContext } = useUserContext();

  const [calendarFull, setCalendarFull] = useState<boolean>(false);

  useEffect(() => {
    async function retrieveCourses() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        supabase
          .from("users")
          .select("sections")
          .eq("id", session.user.id)
          .then((result) => {
            // take the plan data and query their description
            const sectionArray = result.data?.at(0)?.sections;

            let sectionsLength = sectionArray?.length ?? 0;

            if (sectionsLength > 0) {
              supabase
                .from("sections")
                .select()
                .in("sectionCode", sectionArray) // ["XXXXX", "XXXXX", "XXXXX"]
                .then((allSections) => {
                  if (allSections?.data) {
                    setCourseContext(allSections?.data);
                  }
                });
            }
          });
      }
    }
    retrieveCourses();
  }, []);

  return (
    <>
      {/* List View */}
      <div className="card col-span-12 sm:col-span-12 lg:col-span-6 pb-4 md:pb-0 md:h-[60rem] pr-5">
        <ListView events={courseContext} waitlist={sampleWaitlist} />
      </div>
      {/* Calendar View */}
      {calendarFull && (
        <div className="fixed top-14 left-0 flex justify-center items-center w-screen h-[calc(100vh-56px)] z-40">
          <div
            className="absolute left-0 top-0 w-full h-full bg-slate-300 bg-opacity-30 z-0"
            onClick={() => {
              setCalendarFull(false);
            }}
          />
          <motion.div
            layout
            className="card w-[80%] h-[90%] overflow-y-scroll max-w-5xl gray-scrollbar z-10 relative bg-white"
            layoutId="calendar"
          >
            <CalendarView
              events={courseContext}
              setCalendarFull={setCalendarFull}
              calendarFull={calendarFull}
            />
          </motion.div>
        </div>
      )}
      {!calendarFull && (
        <motion.div
          layout
          className="card col-span-12 sm:col-span-12 lg:col-span-6 overflow-hidden z-20 relative"
          layoutId="calendar"
        >
          <CalendarView
            events={courseContext}
            setCalendarFull={setCalendarFull}
            calendarFull={calendarFull}
          />
        </motion.div>
      )}
    </>
  );
};

export default CourseView;
