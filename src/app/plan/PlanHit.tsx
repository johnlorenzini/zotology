import React from "react";
import { useLocalStorage } from "react-use";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../lib/components/legacy/ui/accordion";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

import { Highlight } from "react-instantsearch-hooks-web";
import { supabase } from "@/lib/supabase/utils/supabase-secret";

import cn from "classnames";
import { useEffect, useState, SetStateAction } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CourseSection } from "../siteConfig";
import { useSearchParams } from "next/navigation";

import { HoverSection } from "./PlanCalendar";

import { parseRestriction } from "@/lib/section/utils/parseRestriction";

type props = {
  hit: any;
  setPlanCourses: React.Dispatch<SetStateAction<CourseSection[]>>;
  setSectionHover: React.Dispatch<SetStateAction<HoverSection | null>>;
  sectionHover: HoverSection | null;
};

const Hit = ({ hit, setPlanCourses, setSectionHover, sectionHover }: props) => {
  // async function getClasses(){
  //   const {data: {session}} = await supabase.auth.getSession();
  //   if(session){
  //     const {data, error} = await supabase
  //       .from("users")
  //       .select()
  //       .eq("id", session.user.id)
  //     console.log(data)

  //     if(data){
  //       const sections = data.at(0).sections
  //       setClasses(sections)
  //     }
  //   }
  // }

  const [showRestrHover, setShowRestrHover] = useState<string | null>(null);

  async function handleUnenroll(courseCode: string) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", session.user.id);

      if (data) {
        const sections = data.at(0).sections;
        const id = data.at(0).id;
        const ucinetid = data.at(0).ucinetid;
        if (sections && sections.includes(courseCode)) {
          sections.splice(sections.indexOf(courseCode), 1);

          const { data, error } = await supabase
            .from("users")
            .update({ id: id, ucinetid: ucinetid, sections: sections })
            .eq("id", id)
            .select();

          if (error) {
            console.log(error);
          }
          if (data) {
            toast.success("Unenrolled!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
              theme: "light",
              transition: Slide,
            });
          }
        }
      }
    }
  }

  const searchParams = useSearchParams();

  async function handleSubmit(courseCode: string) {
    const data = searchParams.get("id");

    if (data) {
      // query for the plan course
      supabase
        .from("plans")
        .select()
        .eq("id", data)
        .then((result) => {
          // take the plan data and query their description
          const sections = result.data?.at(0)?.courses ?? [];
          const planId = result.data?.at(0)?.id;

          if (!sections.includes(courseCode)) {
            // Add course description to local states
            supabase
              .from("sections")
              .select()
              .eq("sectionCode", courseCode) // ["XXXXX", "XXXXX", "XXXXX"]
              .then((result) => {
                if (result) {
                  setPlanCourses((courses) => [...courses, result.data?.at(0)]);
                }
              });

            // Update new course code on database
            sections.push(courseCode);

            supabase
              .from("plans")
              .update({ id: planId, courses: sections })
              .eq("id", planId)
              .then((result) => {
                if (result) {
                  toast.success("Added!", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light",
                    transition: Slide,
                  });
                }
              });
          } else {
            toast.error("ERROR: You already have this in your plan!", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
              theme: "light",
              transition: Slide,
            });
          }
        });
    }
  }

  if (!hit) return <></>;

  const {
    objectID,
    deptCode,
    courseNumber,
    courseTitle,
    courseComment,
    prerequisiteLink,
    sections,
  } = hit;

  return (
    <AccordionItem
      className="my-2 AccordionItem bg-white transition ease-in-out duration-200"
      value={objectID}
    >
      <AccordionTrigger className="hover:bg-slate-100 rounded-lg">
        <table>
          <tbody className="border-spacing-2.5">
            <tr>
              <td className="font-semibold text-uciblue">
                <Highlight attribute="deptCode" hit={hit}>
                  {deptCode}
                </Highlight>{" "}
                <Highlight attribute="courseNumber" hit={hit}>
                  {courseNumber}
                </Highlight>
              </td>
              <td className="px-5 text-cardtitle">-</td>
              <td className="text-cardtitle">
                <Highlight attribute="courseTitle" hit={hit}>
                  {courseTitle}
                </Highlight>
              </td>
            </tr>
          </tbody>
        </table>
      </AccordionTrigger>
      <AccordionContent>
        {sections && Object.keys(sections).length > 0 ? (
          <div className="pb-4 overflow-auto gray-scrollbar-horizontal">
            <table className="w-full">
              <thead className="sticky right-0">
                <tr className="text-center border-b-2 border-cardtitle text-cardtitle">
                  <th className="px-1 text-center">Code</th>
                  <th className="px-1 text-center">Type</th>
                  <th className="px-1 text-center">Location</th>
                  <th className="px-1 text-center">Time</th>
                  <th className="px-1 text-center">Instructor</th>
                  <th className="px-1 text-center">Rstr</th>
                  <th className="px-1 text-center">Enrolled</th>
                  <th className="px-1 text-center sticky right-0 bg-gradient-to-r from-transparent to-[rgba(255,255,255,1)]"></th>
                  <th className="px-1 text-center"></th>
                </tr>
              </thead>
              <tbody>
                {sections?.map(
                  (
                    {
                      sectionCode,
                      sectionType,
                      units,
                      instructors,
                      meetings,
                      finalExam,
                      maxCapacity,
                      numCurrentlyEnrolled,
                      totalEnrolled,
                      numOnWaitlist,
                      numRequested,
                      numNewOnlyReserved,
                      restrictions,
                      status,
                      sectionComment,
                    }: any,
                    i: number
                  ) => {
                    const isHeader = sectionType == "Lec";
                    return (
                      <>
                        {sectionType == "Lec" && (
                          // Lecture section padding
                          <div className={i == 0 ? "h-2" : "h-3"} />
                        )}
                        <tr
                          className={cn(
                            "font-medium text-center",
                            isHeader ? "bg-[#E9E9E6] font-semibold" : ""
                          )}
                          key={sectionCode}
                        >
                          <td
                            className={cn(
                              "p-1 text-center",
                              isHeader ? "rounded-l-md" : ""
                            )}
                          >
                            {/* <Highlight
                              attribute={`sections.${i}.sectionCode`}
                              hit={hit}
                            > */}
                            {sectionCode}
                            {/* </Highlight> */}
                          </td>
                          <td>
                            <Highlight
                              attribute={`sections.${i}.sectionType`}
                              hit={hit}
                              className=""
                            >
                              {sectionType}
                            </Highlight>
                          </td>
                          <td className="px-1 text-center">
                            {meetings[0]?.bldg}
                          </td>
                          <td className="px-1 text-center">
                            {meetings[0]?.days} {meetings[0]?.time}
                          </td>
                          <td className="px-1 text-center">
                            <Highlight
                              attribute={`sections.${i}.instructors`}
                              hit={hit}
                            >
                              {instructors[0]}
                            </Highlight>
                          </td>
                          <td className="px-1 text-center relative select-none z-50">
                            <p
                              className="underline cursor-pointer"
                              onClick={() => {
                                if (showRestrHover == sectionCode) {
                                  setShowRestrHover(null);
                                } else {
                                  setShowRestrHover(sectionCode);
                                }
                              }}
                            >
                              {restrictions}
                            </p>
                            {showRestrHover == sectionCode && (
                              <div className="absolute bottom-10 left-5 -translate-x-1/2 text-center p-1 bg-slate-200 bg-opacity-90 rounded-lg w-64">
                                <ul className="text-sm gray-400 font-semibold">
                                  {parseRestriction(restrictions).map(
                                    (restrString: string, i: number) => (
                                      <li key={i}>{restrString}</li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}
                          </td>
                          <td className="px-1 text-center">
                            {numCurrentlyEnrolled.totalEnrolled} / {maxCapacity}
                          </td>
                          <td
                            className={cn(
                              "px-2 sticky right-0",
                              isHeader
                                ? "bg-[#E9E9E6]"
                                : "bg-gradient-to-r from-transparent to-[rgba(255,255,255,0.8)]"
                            )}
                            onMouseEnter={() => {
                              if (!sectionHover?.visible) {
                                setSectionHover((sectionHover) => {
                                  return {
                                    course: `${deptCode} ${courseNumber}`,
                                    sectionType: sectionType,
                                    location: meetings[0]?.bldg,
                                    time: `${meetings[0]?.days} ${meetings[0]?.time}`,
                                    sectionCode: sectionCode,
                                    visible: true,
                                  };
                                });
                              }
                            }}
                            onMouseLeave={() => {
                              if (sectionHover != null) {
                                setSectionHover((sectionHover: any) => {
                                  return {
                                    course: sectionHover?.course,
                                    sectionType: sectionHover?.sectionType,
                                    location: sectionHover?.location,
                                    time: sectionHover?.time,
                                    sectionCode: sectionHover?.sectionCode,
                                    visible: false,
                                  };
                                });
                              }
                            }}
                          >
                            <button
                              onClick={() => {
                                handleSubmit(sectionCode);
                              }}
                              className="px-3 py-1 text-sm bg-blue-200 border-2 border-uciblue font-semibold rounded-xl hover:bg-uciblue hover:text-white transition ease-in-out"
                            >
                              Plan
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center py-8 gap-2 flex-col">
            <div className="text-xl text-left text-cardtitle font-bold">
              No sections found for Spring 2023
            </div>
            <button className="px-4 py-2 bg-uciblue text-white font-bold rounded-full hover:bg-cardtitle transition ease-in-out">
              Add to Wishlist?
            </button>
          </div>
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

export default Hit;
