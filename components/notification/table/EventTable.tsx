import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Badge } from "../../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";

interface NotificationTableProps {
  id: number;
  name: string;
  event: string;
  description: string;
  status: string;
  date: string;
}
const EventTable = ({
  eventNotifications,
}: {
  eventNotifications: NotificationTableProps[] | null;
}) => {
  const formatDate = (dateString: string) => {
    const options: any = { day: "numeric", month: "long" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <Card className="my-4 bg-custom-slate-800/10 ">
      <CardHeader className="px-7 sm:text-start text-center ">
        <CardTitle>Notifications Dashboard</CardTitle>
        <CardDescription className="font-medium">
          You will be reminded 24 hr before the date.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventNotifications?.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell>
                    <div className=" font-normal sm:text-base text-sm">
                      {data.event}
                    </div>
                    <div className="hidden  font-normal sm:text-sm text-xs text-muted-foreground md:inline">
                      {data.description}
                    </div>
                  </TableCell>

                  <TableCell className="hidden sm:table-cell font-normal">
                    <Badge
                      className={`text-xs ${
                        data.status === "Completed" ? "bg-white" : ""
                      } `}
                    >
                      {data.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="table-cell font-normal">
                    {formatDate(data.date)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <div className="w-full h-full py-4 pt-7 sm:text-lg text-sm flex justify-center items-center font-light ">
          {!eventNotifications && <p>You have not created any events yet.</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventTable;
