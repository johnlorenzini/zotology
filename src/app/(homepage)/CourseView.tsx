import React from "react";
import { Schedule } from "../Schedule";

import ListView from "../ListView";
import {sampleEvents, sampleWaitlist} from '../siteConfig'

type Props = {};

interface DateInfo {
  title: string;
  date: string;
}

const CourseView = (props: Props) => {
  return (
    <>
      {/* List View */}
      <div className="card col-span-12 sm:col-span-12 lg:col-span-6 h-[60rem] pr-5">
        <ListView events={sampleEvents} waitlist={sampleWaitlist} />
      </div>
      {/* Calendar View */}
      <div className="card col-span-12 sm:col-span-12 lg:col-span-6 h-[60rem] overflow-hidden">
        <div className="w-full h-full flex flex-col">
          {/* Title */}
          <div className="w-full p-5 pb-[10px] z-10 bg-white">
            <h3 className="text-2xl font-semibold text-cardtitle font-title">
              Your Schedule
            </h3>
          </div>
          {/* Calendar Wrapper */}
          <div className="w-full h-full">
            <Schedule
              events={[
                { time: 11, duration: 1.33, day: 1, course: "Writing 60" },
                { time: 11, duration: 1.33, day: 3, course: "Writing 60" },
                { time: 15, duration: 0.833, day: 0, course: "CS 171" },
                { time: 15, duration: 0.833, day: 2, course: "CS 171" },
                { time: 15, duration: 0.833, day: 4, course: "CS 171" },
                { time: 8, duration: 0.833, day: 4, course: "CS 171 Dis" },
                { time: 8, duration: 1.33, day: 1, course: "ICS 53" },
                { time: 8, duration: 1.33, day: 3, course: "ICS 53" },
                { time: 17, duration: 0.833, day: 0, course: "ICS 53 Dis" },
                { time: 18.5, duration: 0.833, day: 0, course: "ICS 53 Lab" },
                { time: 18.5, duration: 0.833, day: 2, course: "ICS 53 Lab" },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseView;
