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
      provider: "google"
    });
  }

  const login = async () => {
    signInWithGoogle();
  };

  useEffect(() => {
    const session = supabase.auth.getSession();
    if (session) {
      const explored = session.then((result) => {
        setUser(result.data?.session?.user);
      });
    }
  }, []);

  async function signout() {
    const { error } = await supabase.auth.signOut();

    signInWithGoogle();
  }
  return( <>{user ? (
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
              <AvatarImage src={user?.identities[0].identity_data.avatar_url} />
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
    <Button onClick={login} className="rounded-xl text-white hover:text-uciblue bg-transparent hover:bg-white p-2">Sign In</Button>
  )}
  </>
  );
};

export default UserNav;
