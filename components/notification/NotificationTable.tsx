"use client";

import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import EventTable from "./table/EventTable";

interface NotificationTableProps {
  id: number;
  name: string;
  description: string;
  type: string;
  status: string;
  date: string;
  text: string;
}
const NotificationTable = ({
  eventNotifications,
}: {
  eventNotifications: NotificationTableProps[] | null;
}) => {
  return (
    <div className="w-full h-full overflow-y-auto">
      <EventTable eventNotifications={eventNotifications} />
    </div>
  );
};

export default NotificationTable;
