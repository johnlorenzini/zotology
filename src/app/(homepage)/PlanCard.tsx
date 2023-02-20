import { ArrowRight, PlusCircle } from "lucide-react";

type Props = {
  title: string;
  cardId: number;
  units: number;
  term: string;
};

const PlanCard = ({ title, cardId, units, term }: Props) => {
  return (
    <a
      href="/plan"
      className="ucigold w-full h-full items-end justify-between rounded-2xl px-5 text-left flex flex-col"
    >
      <h3 className="self-start pt-2 text-lg font-semibold md:text-xl lg:text-xl text-cardtitle">
        {title}
      </h3>
      <h4 className="self-start text-md">{term}</h4>

      <div className=" text-md pt-6 pb-2 relative flex justify-between w-full">
        <span>{units} Units</span>
        <a href="/plan">
          <ArrowRight className="text-lg text-cardtitle" />
        </a>
      </div>
    </a>
  );
};

export default PlanCard;
