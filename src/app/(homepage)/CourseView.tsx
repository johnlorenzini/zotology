"use client";
import React, { useContext, useEffect, useState } from "react";
import { Schedule } from "../Schedule";

import { supabase } from "@/lib/supabase/utils/supabase-secret";

import ListView from "../ListView";
import CalendarView from "../CalendarView";
import { createClient } from "@/lib/supabase/utils/supabase-server";

import { sampleEvents, sampleWaitlist } from "../siteConfig";
import { CourseSection } from "../siteConfig";
import { useUserContext } from "../SectionsContext";

type Props = {};

interface DateInfo {
  title: string;
  date: string;
}

const CourseView = ({}: Props) => {
  const { courseContext, setCourseContext } = useUserContext();

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
      <div className="card col-span-12 sm:col-span-12 lg:col-span-6 h-[60rem] pr-5">
        <ListView events={courseContext} waitlist={sampleWaitlist} />
      </div>
      {/* Calendar View */}
      <div className="card col-span-12 sm:col-span-12 lg:col-span-6 h-[60rem] overflow-hidden">
        <CalendarView events={courseContext} />
      </div>
    </>
  );
};

export default CourseView;
