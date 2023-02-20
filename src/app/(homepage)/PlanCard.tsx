import { ArrowRight, PlusCircle } from "lucide-react";
import Link from "next/link";

type Props = {
  title: string;
  cardId: number;
  units: number;
  term: string;
};

const PlanCard = ({ title, cardId, units, term }: Props) => {
  return (
    <div
      className="ucigold w-full h-full items-end justify-between rounded-2xl px-5 text-left flex flex-col"
    >
      <h3 className="self-start pt-2 text-lg font-medium md:text-xl lg:text-xl text-cardtitle">
        {title}
      </h3>
      <h4 className="self-start text-md text-gray-600">{term}</h4>

      <div className=" text-md pt-6 pb-2 relative flex justify-between w-full">
        <span>{units} Units</span>
        <Link href="/plan">
          <ArrowRight className="text-lg text-cardtitle" />
        </Link>
      </div>
    </div>
  );
};

export default PlanCard;
