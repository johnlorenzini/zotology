import Link from "next/link";

import { siteConfig } from "./siteConfig";
import cn from "classnames";
import Nav from "./Nav";
import { Separator } from "@/lib/components/legacy/ui/separator";
import UserNav from "./UserNav";

const Header = () => {
  return (
    <header className="sticky flex justify-center font-body py-2 top-0 z-40 w-full bg-gradient-to-l from-[#0064a4] to-[#1b3d6d] drop-shadow-lg">
      <div className="container px-8 lg:px-16 flex justify-between w-full h-full">
        <Nav items={siteConfig.mainNav} />
        <div className="flex items-center justify-end flex-1 space-x-4 ">
          <nav className="flex items-center space-x-4">
            {siteConfig.mainNav?.length ? (
              <nav className="hidden gap-6 md:flex md:items-center">
                {siteConfig.mainNav?.map(
                  (item, index) =>
                    item.href && (
                      <>
                        <Link
                          key={index}
                          href={item.href}
                          className={cn(
                            "flex items-center tracking-wide text-white sm:text-sm",
                            item.disabled && "cursor-not-allowed opacity-80"
                          )}
                        >
                          {item.title}
                        </Link>
                      </>
                    )
                )}
              </nav>
            ) : null}
            <Separator
              decorative
              orientation="vertical"
              style={{ height: "1.2rem" }}
              className="hidden md:block"
            />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
