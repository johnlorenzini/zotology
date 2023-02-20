import { Circle } from "lucide-react";

/* eslint-disable react/jsx-key */
type Props = {
    events: Array<any>
    waitlist: Array<any>
}

export const hourToTime = (hour: number) => {
    if (hour == 12) {
      return "12PM"
    } else if (hour < 12) {
      return `${hour}AM`
    } else {
      return `${hour - 12}PM`
    }
  }

const ListView = ({events, waitlist}: Props) => {
    return (
        <div className="p-5 overflow-x-scroll scrollbar-hide gap-3">
					<h3 className="relative pt-2 text-2xl font-semibold text-cardtitle font-title">
					Your Courses
					</h3>
					<h4 className="text-gray-500 text-sm font-title pb-4">Deadline for Add/Drop: Feb 2nd, 2023 5:00PM</h4>
					<hr className="h-[2px] rounded-lg w-full border-none ucigold" />
					<h3 className="relative py-2 pb-4 text-2xl font-semibold text-cardtitle font-title">
					Enrolled
					</h3>
					<div className="flex flex-col gap-5 pb-6">
						{events?.map(({type, time, location, instructor, enrollment, finalDate, capacity, status, course, days}: any) => {
							return (
								<div className="w-full">
									<h4 className="text-xl font-semibold">{course}</h4>
									<span className=" text-uciblue">Final: Apr 1, 2023 8:00AM - 10:20AM{finalDate}</span>
									<table className="w-full text-left mt-2">
										<thead className="">
											<tr className="py-2 bg-uciblue text-white text-semibold">
												<th className="py-1 rounded-l-sm overflow-hidden"></th>
												<th className="py-1">Code</th>
												<th className="py-1">Type</th>
												<th className="py-1">Location</th>
												<th className="py-1">Time</th>
												<th className="py-1">Instructor</th>
												<th className="py-1">Units</th>
												<th className="py-1 rounded-r-sm overflow-hidden"></th>
											</tr>
										</thead>
										<tbody>
										<tr className="">
											<td className="py-1"><button className="rounded-lg w-8 h-full bg-[#ffd027] flex py-4 px-2 items-center justify-center"><Circle className="w-4" /></button></td>
											<td className="py-4 text-center">12345</td>
											<td className="py-4 uppercase">{type}</td>
											<td className="py-4">{location}</td>
											<td className="py-4 ">{days + " " + hourToTime(time ?? 0)}</td>
											<td className="py-4">{instructor}</td>
											<td className="py-4">4</td>
											<td className="py-4 flex justify-end"><a href="" className="w-14 h-full rounded-lg bg-[#f3f3f2] border-2 border-[#e7e7e5] text-center flex py-4 items-center justify-center"><Circle className="w-4" /></a></td>
										</tr>
										</tbody>
									</table>
								</div>
							)
						})}
					</div>

					<hr className="h-[2px] mb-1 rounded-lg w-full border-none ucigold" />
					<h3 className="relative py-2 pb-4 text-2xl font-semibold text-cardtitle font-title">
					Waitlisted
					</h3>
					<div className="flex flex-col gap-5">
					{waitlist?.map(({type, time, location, instructor, enrollment, capacity, status, course, position, finalDate, days}: any) => {
									return (
											<div className="w-full">
													<h4 className="text-xl font-semibold">{course}</h4>
													<span className=" text-uciblue">Final: {finalDate}</span>
													<table className="w-full text-left mt-2">
															<thead className="bg-[#e4e4e0] rounded-lg  text-semibold">
																	<tr className="">
																			<th className="py-1"></th>
																			<th className="py-1">Position</th>
																			<th className="py-1">Code</th>
																			<th className="py-1">Type</th>
																			<th className="py-1">Location</th>
																			<th className="py-1">Time</th>
																			<th className="py-1">Instructor</th>
																			<th className="py-1 ">Units</th>
																			<th className="py-1"></th>
																	</tr>
															</thead>
															<tbody>
															<tr className="">
																	<td className="py-1"><button className="w-8 h-full rounded-lg bg-[#ffd027] text-center flex py-4 px-1 items-center justify-center"><Circle className="w-4" /></button></td>
																	<td className="py-4 font-semibold text-center text-uciblue">{position}</td>
																	<td className="py-4">12345</td>
																	<td className="py-4 uppercase">{type}</td>
																	<td className="py-4">{location}</td>
																	<td className="py-4 ">{days + " " + hourToTime(time ?? 0)}</td>
																	<td className="py-4">{instructor}</td>
																	<td className="py-4">4</td>
																	<td className="py-4 flex justify-end"><a href="" className="w-14 h-full rounded-lg bg-[#f3f3f2] border-2 border-[#e7e7e5] text-center flex py-4 items-center justify-center"><Circle className="w-4" /></a></td>
															</tr>
															</tbody>
													</table>
											</div>
									)
							})}

							
					</div>
        </div>
    );
};

export default ListView;