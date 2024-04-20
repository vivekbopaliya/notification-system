"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { ListFilter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const ToggleNotification = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col  mt-10">
      <section className="flex justify-between items-center">
        <Tabs>
          <TabsList>
            <TabsTrigger value="events">Events </TabsTrigger>
            <TabsTrigger value="randoms">Randoms</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="h-7 gap-1 text-sm bg-[#f472b6] text-black"
              >
                <ListFilter className="h-3.5 w-3.5 text-black" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked className="focus:bg-[#f472b6]">
                Upcoming
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem className="focus:bg-[#f472b6]">
                Completed
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    </div>
  );
};

export default ToggleNotification;
