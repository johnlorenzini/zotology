import React from "react";
import { useLocalStorage } from "react-use";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../lib/components/legacy/ui/accordion";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";

import { Highlight } from "react-instantsearch-hooks-web";
import { supabase } from "@/lib/supabase/utils/supabase-secret";

import cn from "classnames";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "./SectionsContext";

import { CourseSection } from "./siteConfig"
import { useSearchParams } from "next/navigation";

type props = {
  hit: any;
};

const Hit = ({ hit }: props) => {
  const { courseContext, setCourseContext } = useUserContext();
  const [session, setSession] = useState(null);

  const searchParams = useSearchParams();

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

  function checkEnrolled(courseCode: string) {
    if (courseContext.length > 0) {
      courseContext.forEach((courseDesc: CourseSection) => {
        if (courseCode == courseDesc.sectionCode) {
          return true;
        }
      });
    }
    return false;
  }
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
        if (sections.includes(courseCode)) {
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
              autoClose: 3000,
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

  async function handleSubmit(courseCode: string) {
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
        if (!sections.includes(courseCode)) {
          // Add course description to local states
          supabase
            .from("sections")
            .select()
            .eq("sectionCode", courseCode) // ["XXXXX", "XXXXX", "XXXXX"]
            .then((result) => {
              if (result) {
                setCourseContext(courses => [...courses, result.data?.at(0)])
              }
            });

          // Update new course code on database
          sections.push(courseCode);

          const { data, error } = await supabase
            .from("users")
            .update({ id: id, ucinetid: ucinetid, sections: sections })
            .eq("id", id)
            .select();


          if (error) {
            console.log(error);
          }
          if (data) {
            toast.success("Enrolled!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              progress: undefined,
              theme: "light",
              transition: Slide,
            });
          }
        } else {
          toast.error("ERROR: You are already enrolled in this class!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "light",
            transition: Slide,
          });
        }
      }

      //   if(data){
      //     const response = await supabase
      //       .from("users")
      //       .update({sections : [...data[0].sections, courseCode]})
      //       .eq("id", session.user.id)

      //     if(response.error){
      //       console.log(response.error)
      //     }

      // }
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
    <AccordionItem className="my-2 AccordionItem" value={objectID}>
      <AccordionTrigger>
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
          <div className="pb-4 overflow-auto">
            <table className="w-full min-w-[750px]">
              <thead>
                <tr className="text-center border-b-2 border-cardtitle text-cardtitle">
                  <th className="px-1 text-center">Code</th>
                  <th className="px-1 text-center">Type</th>
                  <th className="px-1 text-center">Location</th>
                  <th className="px-1 text-center">Time</th>
                  <th className="px-1 text-center">Instructor</th>
                  <th className="px-1 text-center">Units</th>
                  <th className="px-1 text-center">Rstr</th>
                  <th className="px-1 text-center">Nor</th>
                  <th className="px-1 text-center">Req</th>
                  <th className="px-1 text-center">WL</th>
                  <th className="px-1 text-center">Enrolled</th>
                  {/* <th className="px-1 text-center"></th> */}
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
                            <Highlight
                              attribute={`sections.${i}.sectionCode`}
                              hit={hit}
                            >
                              {sectionCode}
                            </Highlight>
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
                          <td className="px-1 text-center">{units}</td>
                          <td className="px-1 text-center">{restrictions}</td>
                          <td className="px-1 text-center">
                            {numNewOnlyReserved}
                          </td>
                          <td className="px-1 text-center">{numRequested}</td>
                          <td className="px-1 text-center">{numOnWaitlist}</td>
                          <td className="px-1 text-center">
                            {numCurrentlyEnrolled.totalEnrolled} / {maxCapacity}
                          </td>
                          {/* <td>
                            <button
                              className="px-3 py-1 text-sm bg-blue-200 border-2 border-blue-700 font-bold rounded-xl hover:bg-blue-700 transition ease-in-out"
                              >
                                Plan
                              </button>
                          </td> */}
                          <td>
                            {(checkEnrolled(sectionCode) == true) ? (
                              <button
                                className="px-3 py-1 text-sm bg-rose-200 border-2 border-rose-700 font-bold rounded-xl hover:bg-rose-700 transition ease-in-out"
                                onClick={() => {
                                  handleUnenroll(sectionCode);
                                }}
                              >
                                Unenroll
                              </button>
                            ) : (
                              <button
                                className="px-3 py-1 text-sm bg-green-200 border-2 border-green-700 font-bold rounded-xl hover:bg-green-700 transition ease-in-out"
                                onClick={() => {
                                  handleSubmit(sectionCode);
                                }}
                              >
                                Enroll
                              </button>
                            )}
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
