'use client'
import Link from "next/link";
import { useState } from "react";
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

import { LogOut } from "lucide-react";
import { CgProfile } from "react-icons/cg"

const UserNav = () => {
  // const [login, setLogin] = useState({});
  

  // async function signInWithGoogle() {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google',
  //   })
  // }
  // async function signout() {
  //   const { error } = await supabase.auth.signOut()
  // }

  // const { data: { user } } = await supabase.auth.getUser();
  // console.log(user)
  // if(!user) {
  //   signInWithGoogle();
  // }

   
  return(
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button
        variant="ghost"
        className="flex gap-1 p-0 text-base hover:bg-transparent"
      >
        <CgProfile className="text-xl text-white" />
        <span className="items-center text-sm font-medium text-white hover:underline">
          {siteConfig.currentUser.netID}
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
            <AvatarImage src="https://i.imgur.com/zzuZmsM.png" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <span className="text-uciblue">
            {siteConfig.currentUser.formattedName}
          </span>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <button
          className="justify-center gap-2 cursor-pointer"
        >
          <LogOut />
          <span>{"Sign Out"}</span>
        </button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
  }

export default UserNav;
