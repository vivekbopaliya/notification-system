"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-5 bg-custom-slate-800/10 border-slate-800", className)}
      classNames={{
        months: "flex flex-col sm:flex-row sm:space-y-6  ",
        month: "space-y-4 ",
        caption:
          "flex justify-center pt-3 pb-4 relative items-center text-white",
        caption_label: "text-sm text-sm font-medium text-white",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants(),
          "sm:h-8 sm:w-8 h-6 w-6  bg-transparent p-0 "
        ),
        nav_button_previous:
          "absolute left-1 bg-white bg-opacity-100  text-white opacity-100",
        nav_button_next:
          "absolute right-1 bg-white bg-opacity-100  text-white opacity-100",
        table: "w-full border-collapse space-y-1 ",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md  w-11 font-normal sm:text-[0.9rem] text-[0.7rem]",
        row: "flex w-full mt-3",
        cell: "h-11 w-11  text-center mr-[3px] sm:text-sm text-xs p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "outline" }),
          "h-11 w-11  p-0 font-normal aria-selected:opacity-100 aria-selected:bg-[#0ea5e9] text-white"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-[#0ea3e6] text-primary-foreground    hover:text-primary-foreground focus:bg-[#0ea3e6] focus:text-white",
        day_today: "bg-custom-slate-800 text-[#0ea5e9]",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-[#0ea3e6] aria-selected:text-white",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4 text-black " />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4 text-black " />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
