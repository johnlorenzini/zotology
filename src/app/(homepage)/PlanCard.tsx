import { ArrowRight, PlusCircle } from "lucide-react";
import {BsArrowRightShort} from "react-icons/bs";
import Link from "next/link";

type Props = {
  title: string;
  cardId: string | undefined | null;
};

const PlanCard = ({ title, cardId }: Props) => {
  return (
    <Link href={{
      pathname: "/plan",
      query: { id: cardId },
    }}
      className="py-2 bg-[#f9f9f8] w-full h-1/3 items-center rounded-xl px-4 text-left flex justify-between border-2 border-[#e8e8e5]"
    >
      <h3 className="text-md font-normal md:text-md lg:text-md text-cardtitle truncate">
        {title}
      </h3> 
      <BsArrowRightShort className="text-2xl text-uciblue" />

    </Link>
  );
};

export default PlanCard;
