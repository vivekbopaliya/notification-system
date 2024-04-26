"use client";

import React from "react";
import { ArrowRight, File, UnfoldVertical, WholeWord } from "lucide-react";

import { CalendarDays } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Calendar from "./notification/states/Calendar";
import PdfUpload from "./notification/states/PdfUpload";
import { Textbox } from "./notification/states/Textbox";
import NotificationTable from "@/components/notification/table/NotificationTable";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
interface NotificationTableProps {
  id: number;
  name: string;
  description: string;
  status: string;
  date: string;
  event: string;
}

type State = "CALENDAR" | "PDF" | "TEXT";
const CreateNotification = ({
  eventNotifications,
}: {
  eventNotifications: NotificationTableProps[] | null;
}) => {
  const [state, setState] = React.useState<State>("CALENDAR");
  const { user } = useUser();

  return (
    <div className="flex flex-col  justify-center  items-center sm:pb-10 pb-4 relative ">
      <section className="flex flex-col sm:pb-2 pb-8 gap-2 text-center ustify-center   items-center sm:mt-0   ">
        <h1 className="sm:text-4xl text-2xl text-white">
          Create Notification.
        </h1>
        <p className="text-slate-400 text-opacity-70 sm:text-sm text-xs font-light max-w-xl  ">
          Want to know how it works? Choose your registration method, name your
          event, add a brief description, and we will send you reminders before
          it starts.
        </p>
      </section>

      <section className="sm:mb-4 mb-6 sm:mt-2 mt-0   w-full flex sm:justify-center justify-between ">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              size={"sm"}
              className=" sm:w-[65%] text-white w-fit"
            >
              <UnfoldVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="sm:max-w-fit max-w-[18rem]">
            <DropdownMenuLabel>Choose a category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={state}
              //@ts-ignore
              onValueChange={setState}
              className="flex flex-col gap-2 "
            >
              <DropdownMenuRadioItem value="CALENDAR" className="flex  gap-2">
                <div className="flex items-center gap-2 justify-center ">
                  <CalendarDays className="size-7" />
                  <div className="grid gap-0.5">
                    <p>Calendar</p>
                    <p
                      className="text-xs text-slate-400 text-opacity-70"
                      data-description
                    >
                      Pick a date and create the event.
                    </p>
                  </div>
                </div>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="PDF" className="flex  gap-2">
                <div className="flex items-center justify-center gap-3 ">
                  <File className="size-7" />
                  <div className="grid gap-0.5">
                    <p>PDF</p>
                    <p
                      className="text-xs text-slate-400 text-opacity-70"
                      data-description
                    >
                      Upload a PDF and create multiple events.
                    </p>
                  </div>
                </div>
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="TEXT" className="flex gap-2">
                <div className="flex items-center  gap-3 ">
                  <WholeWord className="size-7" />
                  <div className="grid gap-0.5">
                    <p>Text</p>
                    <p
                      className="text-xs text-slate-400 text-opacity-70"
                      data-description
                    >
                      Write down the event and its details manually
                    </p>
                  </div>
                </div>
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <section className="sm:hidden block">
          <Sheet>
            <SheetTrigger
              asChild
              className="h-full flex items-center justify-center"
            >
              <Button
                variant={"secondary"}
                className="flex fixed right-4 h-fit gap-2"
              >
                <p>Dashboard</p>
                <ArrowRight className="h-5 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Notifications Dashboard</SheetTitle>
                <SheetDescription>
                  You will be reminded 24 hrs before the deadline.
                </SheetDescription>
              </SheetHeader>

              <div className="w-full h-full pt-3">
                <NotificationTable eventNotifications={eventNotifications} />
              </div>

              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </section>
      </section>
      {state === "CALENDAR" && (
        // @ts-ignore
        <Calendar user={user!} eventNotifications={eventNotifications} />
      )}
      {state === "PDF" && (
        // @ts-ignore
        <PdfUpload user={user} />
      )}
      {state === "TEXT" && (
        // @ts-ignore
        <Textbox user={user} />
      )}
    </div>
  );
};

export default CreateNotification;
