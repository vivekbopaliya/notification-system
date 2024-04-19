"use client";

import React from "react";

import {
  Github,
  GithubIcon,
  Home,
  LinkedinIcon,
  LogIn,
  BellPlus,
  TwitterIcon,
} from "lucide-react";
import { MessageCircleIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useUser } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Profile from "./Profile";
import Image from "next/image";
import logo from "./notificationLogo.png";
const Navbar = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  const route = useRouter();
  const navbarLinks = [
    {
      label: "Home",
      icon: <Home size={23} />,
      path: "/",
    },
    {
      label: "Notification",
      icon: <BellPlus size={23} />,
      path: "/notification",
    },
    {
      label: "Profile",
      icon: <LogIn size={23} />,
      path: "user-profile/",
    },
    {
      label: "Codebase",
      icon: <Github size={23} />,
      path: "https://github.com/vivekbopaliya/notification-system",
    },
  ];
  return (
    <header className="sticky  top-0 flex h-16  gap-4 border-b bg-background px-4 md:px-6">
      <nav className=" hidden sm:flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
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
      <nav className=" sm:hidden flex ">
        <section className="flex gap-8 justify-center items-center ">
          <Link
            href={navbarLinks[0].path}
            className={`w-full ml-2 hover:text-white ${
              navbarLinks[0].path === path ? "text-white" : ""
            }`}
          >
            {navbarLinks[0].icon}
          </Link>
          <Link
            href={navbarLinks[1].path}
            className={`w-full hover:text-white ${
              navbarLinks[1].path === path ? "text-white" : ""
            }`}
          >
            {navbarLinks[1].icon}
          </Link>
        </section>
      </nav>

      <div className="flex w-full items-center gap-6 md:ml-auto md:gap-4 lg:gap-6">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative sm:flex hidden gap-6 text-white">
            <LinkedinIcon
              href="https://github.com/vivekbopaliya"
              className="w-5 h-5 cursor-pointer"
            />

            <GithubIcon
              href="https://github.com/vivekbopaliya/"
              className="w-5 h-5 cursor-pointer"
            />
            <TwitterIcon
              href="https://twitter.com/149in44"
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </form>
        {isSignedIn ? (
          <Profile />
        ) : (
          <Button onClick={() => route.push("sign-in/")}>Login </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
