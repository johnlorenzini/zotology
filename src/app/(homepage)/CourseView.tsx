'use client'
import React from "react";
import { Schedule } from "../Schedule";

import ListView from "../ListView";
import CalendarView from "../CalendarView";

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
        <CalendarView events={sampleEvents}/>
      </div>
    </>
  );
};

export default CourseView;
