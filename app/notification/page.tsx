import React from "react";
import NotificationTable from "@/components/notification/NotificationTable";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { createClient } from "@/utils/supabaseClient";
// import { usePhoneNumber } from "@/utils/hook/usePhoneNumber";
// import { useUser } from "@clerk/nextjs";
const Page = async () => {
  const supabase = createClient();
  // const { user } = useUser();
  // const phoneNumber = user?.phoneNumbers[0]?.phoneNumber?.slice(1) || null;
  const eventNotifications = await supabase.from("Event").select("*");

  return (
    <div className="h-screen  w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="h-full flex gap-5">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="text-4xl flex  gap-4 sm:text-7xl font-bol,end relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
          <NotificationTable eventNotifications={eventNotifications?.data} />
          <main className="flex relative  flex-col gap-4">
            <div className=" items-center w flex gap-4 ">
              <Card className=" bg-custom-slate-800/30 rotate-1 hover:rotate-0 border border-slate-500 border-opacity-30 ease-in-out duration-300 delay-75">
                <CardHeader className="pb-3 space-y-3">
                  <CardTitle>Your Notifcations!</CardTitle>
                  <CardDescription className="max-w-lg text-balance text-sm text-[#0ea5e9] font-light leading-relaxed">
                    Dynamic Notifications Dashboard for Seamless Management and
                    Insightful Analysis.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Link
                    className={buttonVariants()}
                    href="/notification/create"
                  >
                    Create New Notification
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Page;
