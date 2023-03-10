import { ArrowRight, PlusCircle } from "lucide-react";
import { BsArrowRightShort } from "react-icons/bs";
import Link from "next/link";
import cn from "classnames";

type Props = {
  title: string;
  cardId: string | undefined | null;
  isAutoEnrolled: boolean;
};

const PlanCard = ({ title, cardId, isAutoEnrolled }: Props) => {
  return (
    <Link
      href={{
        pathname: "/plan",
        query: { id: cardId },
      }}
      className={cn(
        "py-2 w-full h-1/3 items-center rounded-xl px-4 text-left flex justify-between border-2 border-[#e8e8e5]",
        isAutoEnrolled
          ? "bg-gradient-to-r from-[rgba(255,210,0,0.7)] to-[rgba(247,183,45,0.7)]"
          : "bg-[#f9f9f8]"
      )}
    >
      <h3 className="text-md font-normal md:text-md lg:text-md text-cardtitle truncate">
        {title}
      </h3>
      <BsArrowRightShort className="text-2xl text-uciblue" />
    </Link>
  );
};

export default PlanCard;
