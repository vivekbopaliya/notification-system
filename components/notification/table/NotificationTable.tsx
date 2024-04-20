"use client";

import React from "react";
import EventTable from "./EventTable";
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
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface NotificationTableProps {
  id: number;
  name: string;
  description: string;
  status: string;
  date: string;
  event: string;
}
const NotificationTable = ({
  eventNotifications,
}: {
  eventNotifications: NotificationTableProps[] | null;
}) => {
  return (
    <main className=" h-full  sm:w-5/12 ">
      <div className="sm:block hidden h-full sm:overflow-y-auto w-full ">
        <EventTable eventNotifications={eventNotifications} />
      </div>

      <div className="sm:hidden mt-1  flex justify-center items-center ">
        <Drawer>
          <DrawerTrigger>
            <Button className="flex gap-2 rounded-full" variant={"secondary"}>
              <p>Dashboard</p>
              <ArrowUp className="w-5 h-5 " />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <EventTable eventNotifications={eventNotifications} />
          </DrawerContent>
        </Drawer>
      </div>
    </main>
  );
};

export default NotificationTable;
