"use client";

import React from "react";
import { Calendar } from "./ui/calendar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

import { ArrowRight } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { useMutation } from "@tanstack/react-query";
import { createEventNotificaitonType } from "@/utils/validations/create-notification";
import axios, { AxiosError } from "axios";
import { whatsappAxios } from "@/lib/utils/whatsapp/config";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CreateCalendar = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [event, setEvent] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");

  const route = useRouter();
  const { user } = useUser();

  const phoneNumber = user?.phoneNumbers[0].phoneNumber.slice(1);
  const userName = user?.firstName + " " + user?.lastName;

  const formattedDate = date.toISOString().split("T")[0];

  const formatDate = (dateString: string | Date) => {
    const options: any = { day: "numeric", month: "long" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };
  console.log(userName, event, description, formattedDate, phoneNumber);

  const { mutate: handleEventSubmit, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: createEventNotificaitonType = {
        name: userName,
        event,
        description,
        date: formattedDate,
        // @ts-ignore
        phoneNumber,
      };
      await axios.post("/api/notification/event", payload);

      await whatsappAxios.post("/", {
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "template",
        template: { name: "init", language: { code: "en" } },
      });
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
      return toast.success("Your Notification has been set up successfully!");
    },
  });

  return (
    <div className="flex flex-col  justify-center items-center pb-10 relative ">
      <section className="flex flex-col sm:pb-12 pb-8 gap-2 text-center justify-center items-center sm:mt-0 mt-72 mb- ">
        <h1 className="sm:text-4xl text-2xl text-white">
          Create Notification.
        </h1>
        <p className="text-slate-400 text-opacity-70 sm:text-sm text-xs font-light max-w-xl  ">
          How does this work? select the date below, give the name and a little
          description of the event and we will remind you before the event
          TWICE!
        </p>
      </section>

      <Calendar
        mode="single"
        selected={date}
        // @ts-ignore
        onSelect={setDate}
        className="rounded-md border w-fit"
      />

      <Drawer>
        <DrawerTrigger asChild>
          <Button className="flex gap-2 mt-5  hover:bg-[#0ea5e9]/90 bg-[#0ea5e9] text-white">
            <p>
              <span className="font-bold">{formatDate(date!)}, </span>Next
            </p>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto pt-2 pb-4 w-full max-w-md">
            <DrawerHeader>
              <DrawerTitle className="text-white  sm:text-xl text-2xl">
                Set up an Event for{" "}
                <span className="text-[#0ea5e9]">{formatDate(date!)}!</span>
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
                  onChange={(e) => setEvent(e.target.value)}
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
                className=" hover:bg-[#0ea5e9]/90 bg-[#0ea5e9] text-white"
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
      </Drawer>
    </div>
  );
};

export default CreateCalendar;
