import Link from "next/link";
import Image from "next/image";
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
import { Menu } from "lucide-react";

import UCILogo from "./UCILogo";

interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

interface MainNavProps {
  items?: NavItem[];
}

const Nav = ({ items }: MainNavProps) => {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden md:block">
        <div className="text-sand1">
          <UCILogo />
        </div>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="-ml-4 text-base hover:bg-transparent focus:ring-0 md:hidden"
          >
            {/* <Icons.logo className="w-4 h-4 mr-2" />{" "} */}
            <span className="font-bold">
              <Menu className="text-2xl text-white" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={24}
          className="w-[300px] overflow-x-hidden"
        >
          <DropdownMenuLabel>
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="text-uciblue">
                  <UCILogo size="small" />
                </div>
              </Link>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator style={{textDecorationColor: "white"}} />
          {items?.map(
            (item, index) =>
              item.href && (
                <DropdownMenuItem
                  className="cursor-pointer"
                  key={index}
                  asChild
                >
                  <Link href={item.href}>{item.title}</Link>
                </DropdownMenuItem>
              )
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Nav;
