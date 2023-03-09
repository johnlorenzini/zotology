"use client";
import PlanCard from "./PlanCard";
import { TbCirclePlus } from "react-icons/tb";
import { supabase } from "@/lib/supabase/utils/supabase-secret";

type Props = {
  plans: object;
};
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

const sampleCards = [
  "Current Plan",
  "Secondary Plan",
  "Last Quarter",
  "Summer Session II",
  "Fall 2024",
  "Winter 2025",
];

const SavedPlans = (props: Props) => {
  const [newPlan, setNewPlan] = useState(false);
  const [plans, setPlans] = useState<any>(null);
  const [userSession, setuserSession] = useState<any>(null);
  const [numPlans, setNumPlans] = useState(0);
  const termId = "d26e7668-b92a-4afb-a3f6-7391ec88b637";
  const [autoEnroll, setAutoEnroll, removeAutoEnroll] = useLocalStorage(
    "autoenroll",
    ""
  );

  const router = useRouter();

  async function createPlan() {
    if (userSession) {
      const name = "New Plan " + (numPlans + 1).toString();
      const userId = userSession.data.session?.user.id;
      if (userId) {
        supabase
          .from("plans")
          .insert([{ userId, name, termId }])
          .then((result: any) => {
            supabase
              .from("plans")
              .select()
              .eq("userId", userId)
              .then((result: any) => {
                const path = "/plan?id=" + result.data.at(-1).id;
                router.push(path);
              });
          });
      }
    }
  }

  useEffect(() => {
    async function loadPlans() {
      const session = await supabase.auth.getSession();
      if (session) {
        const userId = session.data.session?.user.id;
        if (userId) {
          supabase
            .from("plans")
            .select("id, name, termId, created_at, updated_at, courses")
            .eq("userId", userId)
            .then((result: any) => {
              if (result.data && result.data.length > 0) {
                setNumPlans(result.data.length);
                const planArray = result.data;

                let autoEnrolledPlan = null;

                let sortedPlans = planArray.filter((plan: any) => {
                  if (plan.id !== autoEnroll) {
                    return true;
                  }
                  autoEnrolledPlan = plan;
                  return false;
                });

                if (autoEnrolledPlan != null) {
                  setPlans([autoEnrolledPlan, ...sortedPlans]);
                } else {
                  setPlans(planArray);
                }
              }
            });
        }
      } else {
        setPlans(null);
        setNumPlans(0);
      }
      setuserSession(session);
    }
    loadPlans();
  }, [newPlan]);

  return (
    <div className="relative flex h-full w-full flex-col rounded-2xl px-5 pt-5 text-left">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold font-title text-cardtitle">
          My Plans
        </h2>
        <hr className="min-h-[3px] mt-4 rounded-lg w-full border-none ucigold" />
      </div>
      {plans && (
        <div className="flex flex-col justify-between h-full overflow-y-scroll gray-scrollbar px-2 py-4">
          <div className="flex flex-col w-full h-full gap-4">
            {plans.map(
              (plan: {
                name: string;
                id: string | number | null | undefined;
              }) => {
                return (
                  <PlanCard
                    title={plan.name}
                    key={plan.id}
                    // @ts-ignore
                    cardId={plan?.id}
                    isAutoEnrolled={plan.id === autoEnroll}
                  />
                );
              }
            )}
          </div>
        </div>
      )}
      {!plans && (
        <div className="flex flex-col h-full">
          <div className="flex flex-col items-center text-sm">
            <h2 className="text-lg font-medium mt-4 text-uciblue">
              You currently have no plans.
            </h2>
            <h3 className="text-sm text-[#706f6c]">Click to add a new plan</h3>
          </div>
          <div className="py-8 flex justify-center">
            {/* run createPlan and redirect to /plan, sending planId */}
            <a onClick={createPlan} className="cursor-pointer">
              <TbCirclePlus className="text-uciblue text-2xl" />
            </a>
          </div>
        </div>
      )}
      {plans && (
        <div className="flex items-center justify-center bg-sand1 h-24 py-4">
          <a onClick={createPlan} className="cursor-pointer">
            <TbCirclePlus className="text-uciblue text-2xl" />
          </a>
        </div>
      )}
    </div>
  );
};
export default SavedPlans;
