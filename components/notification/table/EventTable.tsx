"use client";

import React from "react";
import { CircleEllipsis, Delete, Settings, Settings2 } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  const [editOpen, setEditOpen] = React.useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = React.useState<boolean>(false);
  const [currentEdit, setCurrentEdit] =
    React.useState<NotificationTableProps | null>(null);
  const route = useRouter();

  const [event, setEvent] = React.useState(currentEdit?.event || "");
  const [description, setDescription] = React.useState(
    currentEdit?.description || ""
  );
  const [date, setDate] = React.useState(currentEdit?.date || "");

  React.useEffect(() => {
    if (currentEdit) {
      setEvent(currentEdit.event || "");
      setDescription(currentEdit.description || "");
      setDate(currentEdit.date || "");
    }
  }, [currentEdit]);

  const { mutate: handleEditEvent, isLoading: updateIsLoading } = useMutation({
    mutationFn: async () => {
      const payload = {
        id: currentEdit?.id,
        event,
        description,
        date,
      };

      await axios.patch("/api/event/update", payload);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return toast.error("You need to be login to do that!");
        }
        return toast.error("Something went wrong on server, please try again.");
      }
    },
    onSuccess: () => {
      route.refresh();
      setEditOpen(false);
      setEvent("");
      setDescription("");
      setDate("");
      return toast.success(`${currentEdit?.event} has been updated.`);
    },
  });

  const { mutate: handleDeleteEvent, isLoading: deleteIsLoading } = useMutation(
    {
      mutationFn: async () => {
        await axios.delete("/api/event/delete", {
          data: currentEdit?.id,
        });
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          if (err.response?.status === 401) {
            return toast.error("You need to be login to do that!");
          }
          return toast.error(
            "Something went wrong on server, please try again."
          );
        }
      },
      onSuccess: () => {
        route.refresh();
        setDeleteOpen(false);
        toast.success(`${currentEdit?.event} has been deleted.`);
      },
    }
  );

  return (
    <section className="sm:my-4 my-3 bg-transparent  w-full">
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className=" text-2xl">
              {" "}
              Edit <span className="text-[#0ea5e9]">{currentEdit?.event}</span>
            </DialogTitle>
            <DialogDescription className="text-sm">
              Make changes to your event here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <div className={"grid items-start mt-4 gap-7 text-white"}>
            <div className="grid gap-2">
              <Label htmlFor="event">Event Name</Label>
              <Input
                type="text"
                id="event"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Event Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Event Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <Button
              className="hover:bg-[#0ea5e9]/90 bg-[#0ea5e9] text-black"
              isLoading={updateIsLoading}
              onClick={handleEditEvent}
            >
              Save changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className=" text-2xl">
              {" "}
              Delete <span className="text-red-500">{currentEdit?.event}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-3 sm:text-base text-sm">
            Are you sure you want to delete this event? You will no longer
            receive reminders for it once it's deleted.
          </div>
          <DialogFooter className=" sm:mt-0 mt-2">
            <Button
              variant={"destructive"}
              className="sm:mt-0 mt-1"
              isLoading={deleteIsLoading}
              // @ts-ignore
              onClick={handleDeleteEvent}
            >
              Delete
            </Button>
            <DialogClose
              className={cn(buttonVariants({ variant: "secondary" }))}
            >
              Cancel
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Event</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {eventNotifications?.map((data) => {
            return (
              <TableRow key={data.id}>
                <TableCell>
                  <div className=" font-normal sm:text-base text-white text-sm">
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
                <TableCell className=" font-normal table-cell text-white ">
                  {formatDate(data.date)}
                </TableCell>
                <TableCell className="table-cell">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant={"outline"} size={"sm"}>
                        <CircleEllipsis className="text-white  w-4 h-4   " />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Edit {data.event}</DropdownMenuLabel>

                      <DropdownMenuSeparator />
                      <DropdownMenuRadioGroup className="flex flex-col justify-start text-start ">
                        <DropdownMenuRadioItem
                          value="ds"
                          onClick={() => {
                            setCurrentEdit(data);
                            setEditOpen(true);
                          }}
                          className="flex gap-3 justify-start items-start w-full"
                        >
                          <Settings2 className="w-4 h-4" />
                          <p>Update event</p>
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          onClick={() => {
                            setCurrentEdit(data);
                            setDeleteOpen(true);
                          }}
                          value="ds"
                          className="flex gap-3 w-full justify-start items-start"
                        >
                          <Delete className="w-4 h-4" /> <p>Delete event</p>
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
