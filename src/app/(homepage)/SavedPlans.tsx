import PlanCard from "./PlanCard";

type Props = {
  plans: object;
};

import { Circle } from "lucide-react";

const sampleCards = ["peter's schedule", "backup", "next quarter..."];

const SavedPlans = (props: Props) => {
  return (
    <div className="flex h-full w-full flex-col gap-1 rounded-2xl px-5 pt-5 text-left">
      <h2 className="text-2xl font-semibold font-title text-cardtitle">
        My Plans
      </h2>
      <div className="flex flex-col w-full gap-2 pt-2 pb-4 overflow-y-scroll scrollbar-hide">
        {sampleCards.map((title, index) => {
          return (
            <PlanCard
              title={title}
              key={index}
              cardId={index}
              units={12}
              term="Spring 2023"
            />
          );
        })}
      </div>
    </div>
  );
};
export default SavedPlans;
