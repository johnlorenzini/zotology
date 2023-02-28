"use client";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { CourseSection } from "./siteConfig";
import { RiCloseCircleLine } from "react-icons/ri";
import { supabase } from "@/lib/supabase/utils/supabase-secret";
import cn from "classnames";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUserContext } from "./SectionsContext";

/* eslint-disable react/jsx-key */
type Props = {
  events: Array<any>;
  waitlist: Array<any>;
};

type EventProps = {
  events: Array<CourseSection>;
  title?: string;
};

type WaitlistProps = {
  waitlist: Array<any>;
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

export const EnrolledView = ({ events, title }: EventProps) => {
  const { courseContext, setCourseContext } = useUserContext();

  const [allEvents, setAllEvents] = useState<Map<string, CourseData>>(
    new Map()
  );

  async function handleDelete(sectionCode: string) {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("id", session.user.id);

      const sections = data?.at(0).sections;
      if (sections && sections.length > 0) {
        const newSections = sections.filter(
          (section: string) => section !== sectionCode
        );

        const newCourseContext = courseContext.filter(
          (section: CourseSection) => section.sectionCode !== sectionCode
        );

        setCourseContext(newCourseContext);

        // update user
        const { data, error } = await supabase
          .from("users")
          .update({ sections: newSections })
          .eq("id", session.user.id);

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
  const [showDropdown, setShowDropdown] = useState("");

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
    <>
    <div className="flex flex-col pb-6">
      <h3 className="py-2 text-2xl font-semibold text-cardtitle font-title">
        {title && "Enrolled"}
      </h3>
      {Array.from(allEvents)?.map((mapEntry, i) => {
        const [courseString, courseData] = mapEntry;
        // console.log(courseString, courseData);

        return (
          <div className="w-full" key={i}>
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
                  <th className="py-1">Units</th>
                  <th className="py-1">Grade</th>
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

                          {/* Units */}
                          <td className="py-4">{units}</td>

                          {/* Gr Type */}
                          <td className="py-4">Letter</td>

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
    {
      allEvents.size == 0 && (
        <div className="flex flex-col items-center justify-start ">
          <h3 className="text-2xl font-semibold text-center text-uciblue">You haven&apos;t enrolled in any courses (Yet!).</h3>
          <p className="text-center text-cardtitle">Find courses by name, number, department, instructor or 5-digit code by searching for them in the search bar above.</p>
        </div>
      )
    }
    </>
  );
};

const WaitlistView = ({ waitlist }: WaitlistProps) => {
  function playToast(){
    toast.error("This data cannot be deleted!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
  }
  return (
    <div>
      <div className="h-24 w-full text-md md:text-xl text-center px-4 flex items-center justify-center font-semibold rounded-full bg-yellow-200 border-2 border-yellow-600 mt-4 mb-2">Because no Spring 2023 courses have an active waitlist, this data is for demonstration purposes only.</div>
      <h3 className="relative py-2 text-2xl font-semibold text-cardtitle font-title">
        Waitlisted
      </h3>
      <div className="flex flex-col gap-5">
        {waitlist?.map(
          (
            {
              type,
              time,
              location,
              instructor,
              enrollment,
              capacity,
              status,
              course,
              position,
              finalDate,
              days,
            }: any,
            i: number
          ) => {
            return (
              <div className="w-full" key={i}>
                <h4 className="text-xl font-semibold">{course}</h4>
                <span className=" text-uciblue">Final: {finalDate}</span>
                <table className="w-full text-left mt-2">
                  <thead className="bg-[#e4e4e0] rounded-lg  text-semibold">
                    <tr className="text-center">
                    <th className="py-1 rounded-l-sm overflow-hidden"></th>
                      <th className="py-1">Position</th>
                      <th className="py-1">Type</th>
                      <th className="py-1">Location</th>
                      <th className="py-1">Time</th>
                      <th className="py-1">Instructor</th>
                      <th className="py-1"></th>
                    </tr>
                  </thead>
                  <tbody>
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
                      <td className="py-4 font-semibold text-uciblue text-center">
                        {position}/30
                      </td>
                      <td className="py-4 uppercase">{type}</td>
                      <td className="py-4">{location}</td>
                      <td className="py-4 ">
                        {days + " " + hourToTime(time ?? 0)}
                      </td>
                      <td className="py-4">{instructor}</td>
                      <td className="py-4 px-4 items-center justify-center">
                        <button className="flex justify-center items-center" onClick={playToast}>
                          <RiCloseCircleLine className="text-2xl text-red" />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

const ListView = ({ events, waitlist }: Props) => {
  const [showEnroll, setShowEnroll] = useState(true);

  const handleToggleView = (e: React.MouseEvent) => {
    setShowEnroll((showEnroll: boolean) => !showEnroll);
  };

  return (
    <div className="pl-5 pr-1 h-full gap-3 overflow-y-scroll gray-scrollbar">
      <div className="w-full pt-5 z-10 bg-white flex justify-between items-start">
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold text-cardtitle font-title">
            Your Courses
          </h3>
          <h4 className="text-gray-500 text-sm font-title pb-4">
            Deadline for Add/Drop: Feb 2nd, 2023 5:00PM
          </h4>
        </div>
        <button
          className="bg-[#f3f3f2] border-2 border-[#e7e7e5] px-4 py-1 rounded-md h-16 md:h-10 w-[9rem] "
          onClick={handleToggleView}
        >
          {showEnroll ? "Waitlist View" : "Enrolled View"}
        </button>
      </div>
      <hr className="min-h-[3px] mt-2 rounded-lg w-full border-none ucigold" />

      {showEnroll ? (
        <EnrolledView events={events} title={"Enrolled"} />
      ) : (
        <WaitlistView waitlist={waitlist} />
      )}
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
    </div>
  );
};

export default ListView;
