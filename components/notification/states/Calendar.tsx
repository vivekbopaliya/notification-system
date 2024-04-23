"use client";

import React from "react";
import { Calendar as ReactCalendar } from "../../ui/calendar";
import { ArrowUp } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import { useMutation } from "@tanstack/react-query";
import { createEventNotificaitonType } from "@/utils/validations/create-notification";
import axios, { AxiosError } from "axios";
import { User } from "@clerk/nextjs/server";
import { whatsappAxios } from "@/lib/utils/whatsapp/config";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface NotificationTableProps {
  id: number;
  name: string;
  description: string;
  status: string;
  date: string;
  event: string;
}

const Calendar = ({
  user,
  eventNotifications,
}: {
  user: User;
  eventNotifications: NotificationTableProps[] | null;
}) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const phoneNumber = user?.phoneNumbers[0].phoneNumber.slice(1);
  const userName = user?.firstName + " " + user?.lastName;
  const [event, setEvent] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const route = useRouter();
  const formatDateForDatabase = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const formatDateForDemonstration = (dateString: Date) => {
    const options: any = { day: "numeric", month: "long" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const { mutate: handleEventSubmit, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: createEventNotificaitonType = {
        name: userName,
        event,
        description,
        date: formatDateForDatabase(date!),

        phoneNumber,
      };
      await axios.post("/api/notification/event", payload);

      if (!eventNotifications) {
        await whatsappAxios.post("/", {
          messaging_product: "whatsapp",
          to: phoneNumber,
          type: "template",
          template: { name: "init", language: { code: "en" } },
        });
      } else {
        await whatsappAxios.post("/", {
          messaging_product: "whatsapp",
          to: phoneNumber,
          type: "text",
          text: {
            body: `Your reminder for ${event} on ${formatDateForDemonstration(
              date!
            )} has been set! 🚀 You'll receive reminders leading up to the deadline to make sure you're all set. 🕒`,
          },
        });
      }
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          route.push("/sign-up");
          return toast.error("You need to be login to do that!");
        }
        if (err.response?.status === 400) {
          return toast.error("Please fill the valid data.");
        }
        return toast.error(
          "There was an error on server side, please try again."
        );
      }
    },
    onSuccess: () => {
      setEvent("");
      setDescription("");
      setDate(new Date());
      setDrawerOpen(false);
      route.refresh();
      return toast.success("Your Notification has been set up successfully!");
    },
  });

  return (
    <section className="flex justify-center items-center flex-col sm:pb-10 pb-7">
      <ReactCalendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border w-fit"
      />

      <Drawer>
        <DrawerTrigger asChild>
          <Button
            className="flex gap-2 mt-5 sm:w-fit w-full  dark:bg-blue-700/[0.2] dark:text-blue-500 hover:bg-blue-700  sm:font-normal font-bold sm:text-sm  text-lg"
            onClick={() => setDrawerOpen(true)}
          >
            <p>
              <span className="font-bold">
                {formatDateForDemonstration(date!)},{" "}
              </span>
              Next
            </p>
            <ArrowUp className="sm:w-4 sm:h-4 w-5 h-5" />
          </Button>
        </DrawerTrigger>
        {drawerOpen && (
          <DrawerContent>
            <div className="mx-auto sm:py-0 py-2 w-full max-w-md">
              <DrawerHeader className="my-2 sm:my-0">
                <DrawerTitle className="text-white  sm:text-xl text-2xl">
                  Set up an Event for{" "}
                  <span className="text-[#0ea5e9]">
                    {formatDateForDemonstration(date!)}!
                  </span>
                </DrawerTitle>
                <DrawerDescription className="sm:text-sm text-xs">
                  Give the name and a little description of the Event.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-4 pt-6  gap-6 flex flex-col">
                <div className="grid gap-2">
                  <Label htmlFor="Name">Event Name</Label>
                  <Input
                    type="Name"
                    id="Name"
                    placeholder="Birthday"
                    className="text-white"
                    value={event}
                    onChange={(e: any) => setEvent(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="Description">Event Description</Label>
                  <Input
                    className="text-white"
                    id="Description"
                    placeholder="About my bestfriend's 19th birthday celebration."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <DrawerFooter>
                <Button
                  className=" hover:bg-[#0ea5e9]/90 bg-[#0ea5e9] text-black"
                  isLoading={isLoading}
                  // @ts-ignore
                  onClick={handleEventSubmit}
                >
                  Submit
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        )}
      </Drawer>
    </section>
  );
};

export default Calendar;
