"use client";

import { supabase } from "@/lib/supabase/utils/supabase-secret";
import { BsGoogle } from "react-icons/bs";
import { useEffect, useState } from "react";

import cn from "classnames";

const WelcomeLogin = () => {
  const [user, setUser] = useState<any>(null);

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log(error);
    }
  }

  const divString = "flex flex-col items-center";

  return (
    <>
      <div className="flex items-center font-2xl min-h-[calc(100vh-60px)] py-16">
        <div className="card max-w-3xl font-title h-3/4 px-36 py-16 items-center text-center flex flex-col justify-around gap-10">
          <h1 className="text-4xl font-title font-semibold pb-2">
            Zotology welcomes you to an all new WebReg!
          </h1>

          <div className={cn(divString, "gap-3")}>
            <div className={divString}>
              <h2 className="font-semibold text-2xl pb-2">
                Integrated WebSOC + Robust Search
              </h2>
              <h3 className="font-normal text-md font-body">
                Search by course code, department, instructor, name or even
                course type. Whatever the search, Zotology responds, instantly.
              </h3>
            </div>

            <hr className="min-h-[3px] my-2 rounded-lg w-2/3 border-none ucigold" />

            <div className={divString}>
              <h2 className="font-semibold text-2xl pb-2">Schedule Planning</h2>
              <h3 className="font-normal text-md font-body">
                Make your ideal plan. Make two. Make three. So when you&apos;re
                ready to enroll, you&apos;re ready to roll.
              </h3>
            </div>

            <hr className="min-h-[3px] my-2 rounded-lg w-2/3 border-none ucigold" />

            <div className={divString}>
              <h2 className="font-semibold text-2xl pb-2">
                Works with You. Stays with You.
              </h2>
              <h3 className="font-normal text-md font-body">
                Your plans, courses and preferences, all saved to your UCI
                email. Zotology stores no personally identifying information.
              </h3>
            </div>
          </div>
          <button
            onClick={signInWithGoogle}
            className="w-64 rounded-xl flex items-center justify-around text-white bg-gradient-to-l from-[#0064a4] to-[#1b3d6d] hover:drop-shadow-md text-lg font-medium transition ease-in-out py-2 px-3 text-[0.875rem]"
          >
            <BsGoogle />
            <span>Login with Google</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default WelcomeLogin;
