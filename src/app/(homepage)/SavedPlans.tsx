import PlanCard from "./PlanCard";
import {BsPlusCircle} from "react-icons/bs";

type Props = {
  plans: object;
};

import { Circle } from "lucide-react";

const sampleCards = ["Current Plan", "Secondary Plan", "Last Quarter", "Summer Session II", "Fall 2024", "Winter 2025"];

const SavedPlans = (props: Props) => {
  return (
    <div className="relative flex h-full w-full flex-col rounded-2xl px-5 pt-5 text-left">
      <div className="flex flex-col">  
        <h2 className="text-2xl font-semibold font-title text-cardtitle">
          My Plans
        </h2>
        <hr className="min-h-[3px] mt-4 rounded-lg w-full border-none ucigold" />
      </div>
      
      <div className="flex flex-col justify-between h-full overflow-y-scroll gray-scrollbar px-2 py-4">
        <div className="flex flex-col w-full h-full gap-4">
          {sampleCards.map((title, index) => {
            return (
              <PlanCard
                title={title}
                key={index}
                cardId={index}
              />
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-center bg-sand1 h-24 py-4">
          <a href="">
          <BsPlusCircle className="text-uciblue text-xl" />
          </a>

        </div>
    </div>
  );
};
export default SavedPlans;
