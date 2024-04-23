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
    <main className=" h-full  w-full ">
      <div className="block  h-full overflow-y-auto w-full ">
        <EventTable eventNotifications={eventNotifications} />
      </div>
    </main>
  );
};

export default NotificationTable;
