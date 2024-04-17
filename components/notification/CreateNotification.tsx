"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { createEventNotificaitonType } from "@/utils/validations/create-notification";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Clapperboard } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { useUser } from "@clerk/nextjs";
import { HoverBorderGradient } from "../ui/hover-gradient-button";
import { whatsappAxios } from "@/lib/utils/whatsapp/config";
type Type = "Birthday" | "Party" | "Marraige" | "Others" | "Meeting";

const CreateNotification = () => {
  const { user } = useUser();
  const route = useRouter();
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [type, setType] = React.useState<Type>("Others");
  const [text, setText] = React.useState<string>("");
  const [date, setDate] = React.useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Converts today's date to 'YYYY-MM-DD'
  });

  const phoneNumber = user?.phoneNumbers[0].phoneNumber.slice(1);
  console.log(phoneNumber);
  const formatDate = (dateString: string) => {
    const options: { day: string; month: string } | any = {
      day: "numeric",
      month: "long",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const { mutate: handleEventSubmit, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: createEventNotificaitonType = {
        name,
        description,
        type,
        date,
        text,
        userid: phoneNumber!,
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
      setName("");
      setDescription("");
      setDate("");
      setText("");
      return toast.success("Your Notification has been set up successfully!");
    },
  });

  return (
    <div className="h-full w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="text-4xl sm:max-w-2xl w-full sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        <div className="rel bg-black flex flex-col items-center justify-start pt-6 overflow-hidden rounded-md">
          <main className="w-full py-6">
            <Tabs defaultValue="events">
              <div className="flex justify-between px-2">
                <TabsList>
                  <TabsTrigger value="events">Events </TabsTrigger>
                  <TabsTrigger value="randoms">Randoms</TabsTrigger>
                </TabsList>

                <Button
                  size="sm"
                  className="flex bg-white  justify-center items-center gap-1.5 text-sm"
                >
                  Output
                  {!isLoading && <Clapperboard className="size-3.5" />}
                </Button>
              </div>

              <TabsContent value="events" className="py-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Notification Details</CardTitle>
                    <CardDescription className="text-[#0ea5e9] ">
                      Specify the name, type and date of the event.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name*</Label>
                        <Input
                          id="name"
                          type="text"
                          className="w-full"
                          placeholder="Birthday"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          className="w-full"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="About my bestfriend's birthday"
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="type">Type*</Label>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select the Type of Event" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem
                                value="Birthday"
                                onChange={(e) => setType("Birthday")}
                              >
                                Birthday
                              </SelectItem>
                              <SelectItem
                                value="Marriage"
                                onChange={(e) => setType("Marraige")}
                              >
                                Marraige
                              </SelectItem>
                              <SelectItem
                                value="Party"
                                onChange={(e) => setType("Party")}
                              >
                                {" "}
                                Party
                              </SelectItem>
                              <SelectItem
                                value="Meeting"
                                onChange={(e) => setType("Meeting")}
                              >
                                Meeting
                              </SelectItem>
                              <SelectItem
                                value="Others"
                                onChange={(e) => setType("Others")}
                              >
                                Others
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="text">Message</Label>

                        <Input
                          id="text"
                          className="w-full"
                          value={text}
                          onChange={(e) => setText(e.target.value)}
                          placeholder="Don't forget your bsf's bday, dumbo!"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="date">Date*</Label>
                        <Input
                          id="date"
                          type="date"
                          className="w-full"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                        <Label className="text-sm text-opacity-70 text-[#0ea5e9] font-light">
                          {date && <p>You picked {formatDate(date)}</p>}
                        </Label>
                      </div>
                    </div>
                    <main className="w-full justify-center  items-end pt-4 ">
                      <div className="flex w-full justify-center text-center">
                        <HoverBorderGradient
                          aria-disabled={isLoading}
                          // @ts-ignore
                          onClick={handleEventSubmit}
                          as="button"
                          className="disabled:bg-opacity-40  dark:bg-black text-base bg-white text-black dark:text-white flex items-center space-x-2"
                        >
                          Submit
                        </HoverBorderGradient>
                      </div>
                    </main>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
};

export default CreateNotification;
