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
  description: string;
  type: string;
  status: string;
  date: string;
  text: string;
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
    <Card className="my-4 bg-custom-slate-800/30 overflow-y-auto">
      <CardHeader className="px-7">
        <CardTitle>Event Notifications</CardTitle>
        <CardDescription>
          You will be reminded 24 hr before the date.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {eventNotifications?.map((data) => {
              return (
                <TableRow key={data.id}>
                  <TableCell>
                    <div className="font-medium">{data.name}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {data.description}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {data.type}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge
                      className={`text-xs ${
                        data.status === "Completed" ? "bg-white" : ""
                      } `}
                    >
                      {data.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="table-cell">
                    {formatDate(data.date)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <div className="w-full h-full py-4 flex justify-center items-center font-light ">
          {!eventNotifications && <p>You do not have any notification.</p>}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventTable;
