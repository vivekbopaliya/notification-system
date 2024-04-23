import React from "react";

import { createClient } from "@/utils/supabaseClient";
import CreateNotification from "@/components/CreateNotification";
import { currentUser } from "@clerk/nextjs/server";
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
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
const Page = async () => {
  const supabase = createClient();

  const user = await currentUser();
  const phoneNumber = user?.phoneNumbers[0].phoneNumber.slice(1);

  const eventNotifications = await supabase
    .from("Event")
    .select("*")
    .eq("phoneNumber", phoneNumber)
    .order("createdAt", { ascending: false });
  return (
    <div className="h-screen  w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center  ">
      <div className="h-full flex gap-5 w-full">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <div className="text-4xl flex flex-col w-full sm:flex-row sm:px-0 px-4 sm:justify-center justify-start sm:items-start items-center border-white sm:text-7xl font-bold  relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 sm:py-8 sm:mt-0 mt-8 ">
          <CreateNotification eventNotifications={eventNotifications?.data} />

          <section className="sm:block hidden">
            <Sheet>
              <SheetTrigger
                asChild
                className="h-full flex items-center justify-center"
              >
                <Button
                  variant={"link"}
                  className="flex fixed h-full justify-center items-center right-4  gap-2"
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
                  <NotificationTable
                    eventNotifications={eventNotifications?.data}
                  />
                </div>

                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;
