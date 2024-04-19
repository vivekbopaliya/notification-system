"use client";

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlights";
import { Button, buttonVariants } from "./ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SignedOut, useClerk, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  return (
    <div className="h-full w-full dark:bg-black bg-white -mt-20  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="text-6xl sm:text-7xl  font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8 sm:px-0 px-4">
        <HeroHighlight>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-4xl   sm:text-6xl font-bold text-neutral-700 dark:text-white sm:max-w-4xl w-full leading-relaxed lg:leading-snug text-center mx-auto "
          >
            Create your own <br className="sm:hidden block" />
            <Highlight className="text-black dark:text-white">
              AI-enhanced
            </Highlight>{" "}
            Event notifications.
          </motion.h1>
        </HeroHighlight>
        <p className="text-neutral-500  max-w-lg mx-auto mt-1 font-normal text-sm text-center relative z-10">
          Welcome to Notification-system, create the event and it is our
          resposibility to not let you miss the deadline.
        </p>

        <div className="flex justify-center items-center gap-3 pt-6 ">
          {!isSignedIn ? (
            <Link
              href="sign-in/"
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Login
            </Link>
          ) : (
            <Button variant={"secondary"} onClick={() => signOut()}>
              Logout
            </Button>
          )}
          <Link
            className={cn(buttonVariants(), "flex gap-1 ")}
            href={"notification/"}
          >
            <p>Get started</p>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
