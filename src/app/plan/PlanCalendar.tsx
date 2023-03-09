"use client";
import React, { useEffect, useState } from "react";
import { Schedule, Event } from "../Schedule";

import { parseTime } from "@/lib/section/utils/parseTime";
import { CourseSection } from "../siteConfig";

import { hashStringToColor } from "@/lib/section/utils/stringColorHash";

export interface HoverSection {
  course: string;
  sectionType: string;
  time: any;
  location: any;
  visible: boolean;
  sectionCode?: string;
}

type Props = {
  events: Array<CourseSection>;
  sectionHover: HoverSection | null;
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

const PlanCalendar = ({ events, sectionHover }: Props) => {
  let [calendarEvents, setCalendarEvents] = useState<Array<Event>>([]);

  var parsedEvents: Array<Event> = [];

  // Update section data on hover
  useEffect(() => {
    const parseNewData = async () => {
      // console.log('sectionHover', sectionHover)
      if (sectionHover != null) {
        const { sectionCode, course, sectionType, time, location, visible } =
          sectionHover;

        if (visible) {
          // show event if visible

          const { days, start, end } = parseTime(time);

          let newEvents: Array<Event> = [];

          const startGroups = start.split(":");
          const endGroups = end.split(":");

          const [startHr, startMin] = startGroups;
          const [endHr, endMin] = endGroups;

          const parsedStart = Number(startHr) + Number(startMin) / 60;
          const parsedEnd = Number(endHr) + Number(endMin) / 60;

          days.forEach((evtDay) => {
            let newEvent: Event = {
              day: evtDay,
              time: parsedStart,
              duration: parsedEnd - parsedStart,
              course: course,
              location: location,
              sectionType: sectionType,
              sectionCode: sectionCode,
              borderColor: "#888888",
              bgColor: "rgba(100, 100, 120, 0.1)",
              isPreview: true,
            };
            newEvents.push(newEvent);
          });

          setCalendarEvents((calendarEvents) => [
            ...calendarEvents,
            ...newEvents,
          ]);
        } else {
          // hide event if not visible
          const newCalendarEvents = calendarEvents.filter((evt: Event) => {
            return !evt.isPreview;
          });

          setCalendarEvents(newCalendarEvents);
        }
      }
    };
    parseNewData();
  }, [sectionHover]);

  useEffect(() => {
    events.forEach((evt) => {
      const { meetings, courseTitle, courseFull, sectionType, sectionCode } =
        evt;

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
    <div className="scrollbar-hide w-full h-[48rem] flex flex-col overflow-x-scroll">
      <div className="w-full h-full">
        <Schedule events={calendarEvents} />
      </div>
    </div>
  );
};

export default PlanCalendar;
