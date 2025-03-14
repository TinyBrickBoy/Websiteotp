import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { Twitter, Github } from "lucide-react";
import { RiDiscordLine } from "react-icons/ri";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center">
            <Link
              href="https://discord.com/invite/Dpx3eK9t3z"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "hidden w-10 px-0 sm:inline-flex",
                )}
              >
                <RiDiscordLine className="size-5" />
                <span className="sr-only">Discord</span>
              </div>
            </Link>
            <Link
              href="https://x.com/@onthepixelnet"
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "hidden w-10 px-0 sm:inline-flex",
                )}
              >
                <Twitter className="size-4" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <MobileNav />
          </nav>
        </div>
      </div>
    </header>
  );
}
