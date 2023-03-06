"use client";
import React, { useEffect, useState } from "react";
import { Schedule, Event } from "./Schedule";

import { parseTime } from "@/lib/section/utils/parseTime";
import { CourseSection } from "./siteConfig";

import { hashStringToColor } from "@/lib/section/utils/stringColorHash"

type Props = {
  events: Array<CourseSection>;
};

// [
//   { time: 11, duration: 1.33, day: 1, course: "Writing 60" },
//   { time: 11, duration: 1.33, day: 3, course: "Writing 60" },
//   { time: 15, duration: 0.833, day: 0, course: "CS 171" },
//   { time: 15, duration: 0.833, day: 2, course: "CS 171" },
//   { time: 15, duration: 0.833, day: 4, course: "CS 171" },
//   { time: 8, duration: 0.833, day: 4, course: "CS 171 Dis" },
//   { time: 8, duration: 1.33, day: 1, course: "ICS 53" },
//   { time: 8, duration: 1.33, day: 3, course: "ICS 53" },
//   { time: 17, duration: 0.833, day: 0, course: "ICS 53 Dis" },
//   { time: 18.5, duration: 0.833, day: 0, course: "ICS 53 Lab" },
//   { time: 18.5, duration: 0.833, day: 2, course: "ICS 53 Lab" },
// ];

const CalendarView = ({ events }: Props) => {
  let [calendarEvents, setCalendarEvents] = useState<Array<Event>>([]);

  var parsedEvents: Array<Event> = [];

  useEffect(() => {

    events.forEach((evt) => {
      const { meetings, courseTitle, courseFull, sectionType, sectionCode } = evt;

      const location = meetings[0]?.bldg;
      const timeString = `${meetings[0]?.days} ${meetings[0]?.time}`;

      const { days, start, end } = parseTime(timeString);

      const startGroups = start.split(":");
      const endGroups = end.split(":");

      const [startHr, startMin] = startGroups;
      const [endHr, endMin] = endGroups;

      const parsedStart = Number(startHr) + Number(startMin) / 60;
      const parsedEnd = Number(endHr) + Number(endMin) / 60;

      days.forEach((evtDay) => {
        let parsedEvent: Event = {
          day: evtDay,
          time: parsedStart,
          duration: parsedEnd - parsedStart,
          course: courseFull,
          location: location,
          sectionType: sectionType,
          sectionCode: sectionCode,
          // @ts-ignore
          borderColor: hashStringToColor(courseFull),
          isPreview: false,
        };
        parsedEvents.push(parsedEvent);
      });
    });
    setCalendarEvents(parsedEvents);
  }, [events]);

  return (
    <div className="scrollbar-hide w-full h-full flex flex-col overflow-x-scroll">
      {/* Title */}
      <div className="w-full p-5 pb-[10px] z-10 bg-white">
        <h3 className="text-2xl font-semibold text-cardtitle font-title">
          Your Schedule
        </h3>
      </div>
      {/* Calendar Wrapper */}
      <div className="w-full h-full">
        <Schedule events={calendarEvents} />
      </div>
    </div>
  );
};

export default CalendarView;
