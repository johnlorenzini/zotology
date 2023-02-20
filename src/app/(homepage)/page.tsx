import ImportantDates from "./ImportantDates";
import Overview from "./Overview";
import SavedPlans from "./SavedPlans";

import { DateEvent } from "./ImportantDates";

export default function Home() {
  const dateArray: Array<DateEvent> = [
    {
      date: "Feb 5",
      event: "View Date and Time of Enrollment Window",
    },
    {
      date: "Feb 6",
      event: "Waitlist Release",
    },
    {
      date: "Feb 7",
      event: "View Date and Time of Enrollment Window",
    },
    {
      date: "Feb 30",
      event: "ur mom comes to uci",
    },
    {
      date: "Feb 5",
      event: "View Date and Time of Enrollment Window",
    },
    {
      date: "Feb 6",
      event: "Waitlist Release",
    },
    {
      date: "Feb 7",
      event: "View Date and Time of Enrollment Window",
    },
    {
      date: "Feb 30",
      event: "ur mom comes to uci",
    },
  ];

  return (
    <>
      <main className="grid grid-flow-row-dense grid-cols-3 gap-8 mx-16 font-body md:grid-cols-6 lg:grid-cols-12 ">
        <div className="col-span-3 card">
          <Overview />
        </div>
        <div className="col-span-3 card">
          <SavedPlans plans={{}} />
        </div>
        <div className="col-span-6 card">
          <ImportantDates dateArray={dateArray} />
        </div>

        <div className="col-span-3 md:col-span-6"></div>
        <span className="py-2 text-4xl font-semibold font-title text-red">
          howard says pay your fees
        </span>
        <img src="https://www.law.uci.edu/faculty/full-time/images/520x580/gillman.jpg?v=22d62e8e" />
        <span className="py-2 text-4xl font-semibold font-title text-red">
          daniel g. aldrich fan page
        </span>
        <img src="http://ucistories.lib.uci.edu/sites/ucistories/files/images/bio/Daniel%20Aldrich%20III_0.jpg" />
      </main>
    </>
  );
}
