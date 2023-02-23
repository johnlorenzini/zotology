"use client";
import { Circle } from "lucide-react";
import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

/* eslint-disable react/jsx-key */
type Props = {
  events: Array<any>;
  waitlist: Array<any>;
};

type EventProps = {
  events: Array<any>;
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

const EnrolledView = ({ events }: EventProps) => {
  return (
    <div className="flex flex-col pb-6">
      <h3 className="py-2 text-2xl font-semibold text-cardtitle font-title">
        Enrolled
      </h3>
      {events?.map(
        (
          {
            type,
            time,
            location,
            instructor,
            enrollment,
            finalDate,
            capacity,
            status,
            course,
            days,
          }: any,
          i: number
        ) => {
          return (
            <div className="w-full" key={i}>
              <h4 className="text-xl font-semibold">{course}</h4>
              <span className=" text-uciblue">
                Final: Apr 1, 2023 8:00AM - 10:20AM{finalDate}
              </span>
              <table className="w-full text-left mt-2">
                <thead className="text-center">
                  <tr className="py-2 bg-uciblue text-white text-medium">
                    <th className="py-1 rounded-l-sm overflow-hidden"></th>
                    <th className="py-1">Type</th>
                    <th className="py-1">Location</th>
                    <th className="py-1">Time</th>
                    <th className="py-1">Instructor</th>
                    <th className="py-1 rounded-r-sm overflow-hidden"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="py-1">
                      <button className="rounded-lg w-8 h-full bg-[#ffd027] flex py-4 px-2 items-center justify-center">
                        <Circle className="w-4" />
                      </button>
                    </td>
                    <td className="py-4 uppercase">{type}</td>
                    <td className="py-4">{location}</td>
                    <td className="py-4 ">
                      {days + " " + hourToTime(time ?? 0)}
                    </td>
                    <td className="py-4">{instructor}</td>
                    <td className="py-4 flex justify-end">
                      <a
                        href=""
                        className="w-14 h-full rounded-lg bg-[#f3f3f2] border-2 border-[#e7e7e5] text-center flex py-4 items-center justify-center"
                      >
                        <MdKeyboardArrowDown className="w-4" />
                      </a>
                    </td>
                  </tr>
                  <tr className="hidden">
                    <td colSpan={6}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatibus voluptatem libero est labore iure autem,
                      facilis sunt, quas numquam, asperiores ex quae! Numquam
                      incidunt nostrum explicabo necessitatibus molestias veniam
                      culpa!
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        }
      )}
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
                      <td className="py-4 flex justify-end">
                        <a
                          href=""
                          className="w-14 h-full rounded-lg bg-[#f3f3f2] border-2 border-[#e7e7e5] text-center flex py-4 items-center justify-center"
                        >
                          <MdKeyboardArrowDown className="w-4" />
                        </a>
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
          className="bg-zinc-200 px-4 py-1 rounded-md h-10 w-[9rem]"
          onClick={handleToggleView}
        >
          {showEnroll ? "Waitlist View" : "Enrolled View"}
        </button>
      </div>
      <hr className="min-h-[3px] mt-2 rounded-lg w-full border-none ucigold" />

      {showEnroll ? (
        <EnrolledView events={events} />
      ) : (
        <WaitlistView waitlist={waitlist} />
      )}
    </div>
  );
};

export default ListView;
