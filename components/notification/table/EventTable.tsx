import React from "react";
import { Delete, Settings, Settings2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Button } from "@/components/ui/button";

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

  const [hoveredRow, setHoveredRow] = React.useState<Number | null>(null);

  const handleMouseEnter = (id: Number) => {
    setHoveredRow(id);
  };

  const handleMouseLeave = () => {
    setHoveredRow(null);
  };

  return (
    <section className="sm:my-4 my-3 bg-transparent  w-full">
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
            const isHovered = hoveredRow === data.id;
            return (
              <TableRow
                key={data.id}
                onMouseEnter={() => handleMouseEnter(data.id)}
              >
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
                <TableCell
                  className=" font-normal table-cell "
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="justify-center items-center flex gap-3">
                    <p> {formatDate(data.date)}</p>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        onClick={() => handleMouseEnter(data.id)}
                      >
                        {isHovered && (
                          <Button variant={"outline"} size={"sm"}>
                            <Settings className="text-white  sm:w-4 sm:h-4 w-4 h-4  " />
                          </Button>
                        )}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Edit {data.event}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup>
                          <DropdownMenuRadioItem
                            value="ds"
                            className="flex gap-3 justify-start items-start w-full"
                          >
                            <Settings2 className="w-4 h-4" />{" "}
                            <p>Update event</p>
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem
                            value="ds"
                            className="flex gap-3 w-full justify-start items-start"
                          >
                            <Delete className="w-4 h-4" /> <p>Delete event</p>
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="w-full h-full py-4 pt-7 sm:pb-2 pb-14  sm:text-base text-sm flex justify-center items-center font-light ">
        {eventNotifications?.length === 0 && (
          <p>You have not created any events yet.</p>
        )}
      </div>
    </section>
  );
};

export default EventTable;
