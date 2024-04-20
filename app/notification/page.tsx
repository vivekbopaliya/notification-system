import React from "react";

import { createClient } from "@/utils/supabaseClient";
import CreateNotification from "@/components/CreateNotification";
import { usePhonenumber } from "@/utils/hook/usePhonenumber";
import { currentUser } from "@clerk/nextjs/server";
import NotificationTable from "@/components/notification/table/NotificationTable";
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

        <div className="text-4xl flex flex-col w-full sm:flex-row sm:px-0 px-4 sm:justify-evenly justify-start sm:items-start items-center border-white sm:text-7xl font-bold  relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 sm:py-8 sm:mt-0 mt-8 ">
          <CreateNotification eventNotifications={eventNotifications?.data} />

          <NotificationTable eventNotifications={eventNotifications?.data} />
        </div>
      </div>
    </div>
  );
};

export default Page;
