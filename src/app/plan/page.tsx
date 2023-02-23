"use client";
import { supabase } from "@/lib/supabase/utils/supabase-secret";
import { useEffect, useState } from "react";

export default function Home() {
  const [planData, setPlanData] = useState<any>(null);
  const [fetchError, setFetchError] = useState<any>(null);

  useEffect(() => {
    const fetchPlanData = async () => {
      const { data, error } = await supabase.from("buildings").select("name");
      console.log(data);
      if (error) {
        setFetchError(error);
        setPlanData(null);
        console.log("error:", error);
      }
      if (data) {
        setPlanData(data);
        setFetchError(null);
        console.log("data:", data);
      }
    };
    fetchPlanData();
  }, []);

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  }

  const login = async () => {
    signInWithGoogle();
  };

  // const authsession = supabase.auth.getSession();
  // if (authsession) {
  //     authsession.then((result) => {
  //         const userId = result.data.session?.user.id;
  //         if (userId) {
  //             supabase
  //                 .from("plans")
  //                 .select("name, termId, created_at, updated_at, courses")
  //                 .eq("userId", userId)
  //                 //.eq("name", "current")
  //                 .then((result) => setPlanData(result));
  //         }
  //     });
  // }
  return (
    <main>
      {fetchError && <div className="h-screen">{fetchError}</div>}
      {planData && (
        <div className="h-screen flex flex-col">
          {planData.map((plan: any) => (
            // eslint-disable-next-line react/jsx-key
            <div className="">
              <div className="">{plan.name}</div>
              <div className="">{plan.termId}</div>
              <div className="">{plan.userId}</div>
              <div className="">{plan.courses}</div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
