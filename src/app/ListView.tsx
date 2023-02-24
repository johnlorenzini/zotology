"use client";
import { Circle } from "lucide-react";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { CourseSection } from "./siteConfig";

import cn from "classnames";

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
  var mappedEvents: Map<string, CourseData> = new Map();

  const [showDropdown, setShowDropdown] = useState("");

  events.forEach((evt) => {
    // console.log(evt);
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

        const existingSections = mappedEvents.get(courseString)?.sections ?? [];

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

  // console.log(mappedEvents);

  return (
    <div className="flex flex-col pb-6">
      <h3 className="py-2 text-2xl font-semibold text-cardtitle font-title">
        {title && "Enrolled"}
      </h3>
      {Array.from(mappedEvents)?.map((mapEntry, i) => {
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
                            <span>{meetDays}</span> <br />
                            <span>{meetTime}</span>
                          </td>

                          {/* Instructor */}
                          <td className="py-4">{instructor}</td>

                          {/* Units */}
                          <td className="py-4">{units}</td>

                          {/* Gr Type */}
                          <td className="py-4">Letter</td>

                          {/*  */}
                          <td className="py-4 px-4 justify items-center justify-center">
                            <button
                              className="flex justify-center items-center"
                              onClick={() => {
                                if (showDropdown == sectionCode) {
                                  setShowDropdown("");
                                } else {
                                  setShowDropdown(sectionCode);
                                }
                              }}
                            >
                              <BsChevronDown
                                className={cn(
                                  "text-xl",
                                  showDropdown == sectionCode
                                    ? "rotate-180"
                                    : ""
                                )}
                              />
                            </button>
                          </td>
                        </tr>
                        {/* Conditionally render description row */}
                        {showDropdown == sectionCode && (
                          <tr className="animate-appear relative z-0">
                            <td colSpan={999}>
                              <div className="grid grid-cols-[repeat(2,1fr)] justify-between">
                                <div>
                                  <h6 className="text-uciblue font-medium">Edit Class</h6>
                                  <input type="checkbox" name="editclass" className="inline-block"/>
                                  <span className="px-3">Change to P/NP</span>
                                </div>
                                <div>
                                  <h6 className="text-uciblue font-medium">Actions</h6>
                                  <input type="checkbox" name="enrollnow"/>
                                  <span className="px-3">Change to P/NP</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
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

const WaitlistView = ({ waitlist }: WaitlistProps) => {
  return (
    <div>
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
                      <th className="py-1"></th>
                      <th className="py-1">Position</th>
                      <th className="py-1">Type</th>
                      <th className="py-1">Location</th>
                      <th className="py-1">Time</th>
                      <th className="py-1">Instructor</th>
                      <th className="py-1"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="py-1">
                        <button className="w-8 h-full rounded-lg bg-[#ffd027] text-center flex py-4 px-1 items-center justify-center">
                          <Circle className="w-4" />
                        </button>
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
                      <td className="py-4 px-4 justify items-center justify-center">
                        <button className="flex justify-center items-center">
                          <BsChevronDown className="text-xl" />
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
          className="bg-[#f3f3f2] border-2 border-[#e7e7e5] px-4 py-1 rounded-md h-10 w-[9rem]"
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
    </div>
  );
};

export default ListView;
