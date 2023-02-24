"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "./siteConfig";
import { Button } from "@/lib/components/legacy/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/components/legacy/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/lib/components/legacy/ui/avatar";

import { supabase } from "@/lib/supabase/utils/supabase-secret";

import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

const UserNav = () => {
  const [user, setUser] = useState<any>(null);

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      console.log(error);
    }
  }

  const login = async () => {
    signInWithGoogle();
    const session = await supabase.auth.getSession();
  };

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      if (session.data.session) {
        const id = session.data.session?.user.id;
        const ucinetid = session.data.session?.user.email?.split("@")[0];
        if (id && ucinetid) {
          supabase
            .from("users")
            .select()
            .eq("id", id)
            .then((results) => {
              if (results.data?.length === 0) {
                supabase
                  .from("users")
                  .insert([{ id, ucinetid }])
                  .then((result) => {
                    console.log("success");
                  });
              }
            });
        }
        setUser(session.data?.session?.user);
      } else {
        // signInWithGoogle();
      }
    });
  }, []);

  async function signout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  }
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex gap-1 px-1 text-base hover:bg-transparent rounded-xl"
            >
              <CgProfile className="text-xl text-white" />
              <span className="items-center text-sm font-medium text-white hover:underline">
                {user ? user.email?.split("@")[0] : ""}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={24}
            className="w-[15rem] px-5 overflow-x-hidden"
          >
            <DropdownMenuLabel>
              <div className="flex flex-col items-center justify-between gap-2">
                <Avatar className="outline outline-2 outline-uciblue drop-shadow-lg">
                  <AvatarImage
                    src={user?.identities[0].identity_data.avatar_url}
                  />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
                <span className="text-uciblue">
                  {user ? user?.identities[0].identity_data.full_name : ""}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              {user ? (
                <button
                  onClick={signout}
                  className="w-full flex justify-center gap-2 cursor-pointer"
                >
                  <FiLogOut />
                  <span>{"Sign Out"}</span>
                </button>
              ) : (
                <button
                  onClick={login}
                  className="w-full flex justify-center gap-2 cursor-pointer"
                >
                  <FiLogOut />
                  <span>{"Sign In"}</span>
                </button>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button
          onClick={signInWithGoogle}
          className="rounded-xl text-white border-2 border-white hover:text-uciblue bg-transparent hover:drop-shadow-md transition ease-in-out hover:bg-white py-1 px-3 text-[0.875rem]"
        >
          Sign In
        </button>
      )}
    </>
  );
};

export default UserNav;
