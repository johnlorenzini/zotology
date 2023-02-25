"use client";
import { useEffect, useState } from "react";
import { CourseSection } from "./siteConfig";
import { RiCloseCircleLine } from "react-icons/ri";
import { supabase } from "@/lib/supabase/utils/supabase-secret";
import cn from "classnames";
import { Slide } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

type EventProps = {
  events: Array<CourseSection>;
  title?: string;
  setPlanCourses: any;
};

export const hourToTime = (hour: number) => {
  if (hour == 12) {
    return "12PM";
  } else if (hour < 12) {
    return `${hour}AM`;
  } else {
    return `${hour - 12}PM`;
  }
};

interface CourseData {
  courseTitle?: string;
  finalExam?: string;
  sections?: Array<CourseSection>;
}
const PlanList = ({ events, title, setPlanCourses }: EventProps) => {
  const [allEvents, setAllEvents] = useState<Map<string, CourseData>>(
    new Map()
  );

  async function handleEnroll(sectionCode: string) {
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
        if (!sections.includes(sectionCode)) {
          // Add course description to local states
          supabase
            .from("sections")
            .select()
            .eq("sectionCode", sectionCode) // ["XXXXX", "XXXXX", "XXXXX"]
            .then((result) => {
            });

          // Update new course code on database
          sections.push(sectionCode);

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
            handleDelete(sectionCode);
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
  }
}

  const searchParams = useSearchParams();

  async function handleDelete(sectionCode: string) {
    const planId = searchParams.get("id");

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      const { data, error } = await supabase
        .from("plans")
        .select()
        .eq("id", planId);

      const courses = data?.at(0).courses;

      if (courses && courses.length > 0) {
        // update plan locally
        const newPlanCourses = events.filter(
          (section: CourseSection) => section.sectionCode !== sectionCode
        );
          
        setPlanCourses(newPlanCourses);
          
        // update plan on database
        const newSections = courses.filter(
          (section: string) => section !== sectionCode
        );

        supabase
          .from("plans")
          .update({ id: planId, courses: newSections })
          .eq("id", planId)
          .then((result) => {
          })

        toast.success("Removed from Plan!", {
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
  const [ShowDropdown, setShowDropdown] = useState("");

  useEffect(() => {

    var mappedEvents: Map<string, CourseData> = new Map();

    events.forEach((evt) => {
      const { deptCode, courseNumber } = evt;
      let courseString = `${deptCode} ${courseNumber}`;

      if (!mappedEvents.get(courseString)) {
        // if not present, add to map
        const { courseTitle, finalExam } = evt;
        mappedEvents.set(courseString, {
          courseTitle,
          finalExam,
          sections: [evt],
        });
      } else {
        // already present, add to maps array
        if (["Lec", "Sem"].includes(evt.sectionType)) {
          const { courseTitle, finalExam } = evt;

          const existingSections =
            mappedEvents.get(courseString)?.sections ?? [];

          // always add lecture or seminar to front
          mappedEvents.set(courseString, {
            courseTitle,
            finalExam,
            sections: [evt, ...existingSections],
          });
        } else {
          mappedEvents.get(courseString)?.sections?.push(evt);
        }
      }
    });

    setAllEvents(mappedEvents);
  }, [events]);

  return (
    <div className="flex flex-col pb-6">
      <h3 className="py-2 text-2xl font-semibold text-cardtitle font-title">
        {title && "Enrolled"}
      </h3>
      {Array.from(allEvents)?.map((mapEntry, i) => {
        const [courseString, courseData] = mapEntry;

        return (
          <div className="w-full overflow-x-scroll z-0" key={i}>
            <h4 className="text-xl font-semibold">{courseString}</h4>
            <h5 className="text-lg">{courseData.courseTitle}</h5>
            <span className=" text-uciblue">Final: {courseData.finalExam}</span>
            <table className="w-full text-left mt-2 overflow-x-scroll">
              <thead className="text-center">
                <tr className="py-2 bg-uciblue text-white text-medium">
                  <th className="py-1 rounded-l-sm overflow-hidden"></th>
                  <th className="py-1">Code</th>
                  <th className="py-1">Type</th>
                  <th className="py-1">Location</th>
                  <th className="py-1">Time</th>
                  <th className="py-1">Instructor</th>
                  <th className="py-1">Capacity</th>
                  <th className="py-1 rounded-r-sm overflow-hidden"></th>
                  <th className="py-1 rounded-r-sm overflow-hidden"></th>
                </tr>
              </thead>
              <tbody>
                {courseData.sections?.map(
                  (
                    {
                      sectionType,
                      meetings,
                      instructors,
                      sectionCode,
                      units,
                      numCurrentlyEnrolled,
                      maxCapacity,
                    }: CourseSection,
                    i
                  ) => {
                    const {
                      days: meetDays,
                      time: meetTime,
                      bldg,
                    } = meetings[0];
                    const instructor = instructors[0];

                    return (
                      <>
                        <tr
                          className={cn(
                            "text-center relative z-20",
                            i % 2 == 0
                              ? "bg-zinc-100 bg-opacity-30"
                              : "bg-zinc-100"
                          )}
                        >
                          <td className="py-1 pl-1">
                            <div className="rounded-md w-1 h-10 bg-[#ffd027] flex items-center justify-center">
                              {/* <Circle className="w-4" /> */}
                            </div>
                          </td>
                          {/* Code */}
                          <td className="py-4">{sectionCode}</td>

                          {/* Type */}
                          <td className="py-4 uppercase">{sectionType}</td>

                          {/* Location */}
                          <td className="py-4">{bldg}</td>

                          {/* Time */}
                          <td className="py-4 ">
                            <span>{meetDays}</span>
                            {meetDays && <br />}
                            <span>{meetTime}</span>
                          </td>

                          {/* Instructor */}
                          <td className="py-4">{instructor}</td>

                          <td className="py-4">
                            {numCurrentlyEnrolled?.totalEnrolled}/{maxCapacity}
                          </td>

                          {/*  */}
                          <td className="p-4 items-center justify-center">
                            <button
                              className="flex justify-center items-center"
                              onClick={() => {
                                handleDelete(sectionCode);
                              }}
                            >
                              <RiCloseCircleLine className="text-2xl text-red" />
                            </button>
                          </td>
                          <td className="py-4">
                            <button
                              className="px-3 py-1 text-sm bg-green-200 border-2 border-green-700 font-bold rounded-xl hover:bg-green-700 transition ease-in-out"
                              onClick={() => {
                                handleEnroll(sectionCode);
                              }}
                            >
                              ENROLL
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
        );
      })}
    </div>
  );
};

export default PlanList;
