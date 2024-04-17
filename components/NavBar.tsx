"use client";

import React from "react";
import {
  Github,
  GithubIcon,
  Home,
  Linkedin,
  LinkedinIcon,
  LogIn,
  Menu,
  Package2,
  TwitterIcon,
  User2,
} from "lucide-react";
import { BellPlus } from "lucide-react";
import { MessageCircleIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Profile } from "./Profile";
import ModeToggle from "./ModeToggle";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  const navbarLinks = [
    {
      label: "Home",
      icon: <Home size={23} />,
      path: "/",
    },
    {
      label: "Dashboard",
      icon: <MessageCircleIcon size={23} />,
      path: "/notification",
    },
    {
      label: "Profile",
      icon: <LogIn size={23} />,
      path: "user-profile/",
    },
    {
      label: "Github",
      icon: <Github size={23} />,
      path: "https://github.com/vivekbopaliya/",
    },
  ];
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {navbarLinks.map((navbar) => {
          return (
            <Link
              href={navbar.path}
              key={navbar.path}
              className={`w-full hover:text-white ${
                navbar.path === path ? "text-white" : ""
              }`}
            >
              {navbar.label}
            </Link>
          );
        })}
      </nav>
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>

      <div className="flex w-full items-center gap-6 md:ml-auto md:gap-4 lg:gap-6">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative flex gap-6 text-white">
            <LinkedinIcon
              href="https://github.com/vivekbopaliya"
              className="w-5 h-5 cursor-pointer"
            />
            <GithubIcon
              href="https://github.com/vivekbopaliya"
              className="w-5 h-5 cursor-pointer"
            />

            <TwitterIcon
              href="https://twitter.com/149in44"
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </form>
        {<Profile />}
      </div>
    </header>
  );
};

export default Navbar;
