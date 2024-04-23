"use client";
import React from "react";
import { cn } from "@/utils/cn";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input-gradient";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function Textbox() {
  const [text, setText] = React.useState("");
  const { mutate: handleSubmit, isLoading } = useMutation({
    mutationFn: async () => {
      const data = await axios.post("http://127.0.0.1:8000/chat", text);
    },
  });
  return (
    <div className="max-w-md w-full sm:mt-0 mt-3 mx-auto rounded-lg md:rounded-2xl p-5 md:p-8 border bg-custom-slate-800/10 border-slate-800  ">
      <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
        Write your event
      </h2>
      <p className="text-neutral-600 text-xs max-w-sm mt-1 font-light dark:text-neutral-300">
        Please structure your event according to the provided format.
      </p>

      <section
        className="my-8 flex flex-col justify-center items-center"
        // @ts-ignore
        onSubmit={handleSubmit}
      >
        <div className="flex h-full w-full  ">
          <LabelInputContainer>
            <Input
              id="firstname"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="dark:bg-zinc-950 font-normal placeholder:text-opacity-60  placeholder:font-light flex  h-52 "
              placeholder="Event - Exam, Description - College exam begins, Date - 2nd nov"
              type="text"
            />
          </LabelInputContainer>
        </div>

        <Button
          isLoading={isLoading}
          className=" dark:bg-blue-700/[0.2] dark:text-blue-500 hover:bg-blue-800  sm:mt-7 mt-4 sm:-mb-6 -mb-5 sm:w-fit w-full   font-bold sm:text-base  text-lg"
        >
          <p>Submit</p>
          {!isLoading && <ArrowUp className="sm:w-4 sm:h-4 w-5 h-5 ml-2" />}
        </Button>
      </section>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-2 h-full text-start w-full",
        className
      )}
    >
      {children}
    </div>
  );
};
