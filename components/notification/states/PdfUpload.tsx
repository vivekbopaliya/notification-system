"use client";

import { whatsappAxios } from "@/lib/utils/whatsapp/config";
import { User } from "@clerk/nextjs/server";
import axios, { AxiosError } from "axios";
import React from "react";
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
import { ArrowUp, File } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardStack } from "@/components/ui/card-stack";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const PdfUpload = ({ user }: { user: User }) => {
  const [pdf, setPdf] = React.useState<Blob | null>(null);
  const route = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const phoneNumber = user?.phoneNumbers[0].phoneNumber.slice(1);
  const userName = user?.firstName + " " + user?.lastName;

  const handleFile = (e: any) => {
    const file = e.target.files[0];
    setPdf(file);
  };

  // Sending PDF to server using FormData
  const { isLoading, mutate: handleFileSubmit } = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("file", pdf!);
      formData.append("name", user?.firstName || "");
      formData.append(
        "phoneNumber",
        user?.phoneNumbers[0].phoneNumber.slice(1) || ""
      );
      const res = await axios.post("http://127.0.0.1:8000/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const whatsappreas = await whatsappAxios.post("/", {
        messaging_product: "whatsapp",
        to: phoneNumber,
        type: "text",
        text: {
          body: res,
        },
      });
      console.log(whatsappreas);
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.status === 400) {
          return toast.error(
            "Please read the rules carefully and reassure if your file follows the same structure."
          );
        }
      }
      return toast.error(
        "Something went wrong on server side, please try again."
      );
    },
    onSuccess: () => {
      route.refresh();
      setPdf(null);
      return toast.success(
        "Your PDF has been uploaded successfully and notifications have been set up."
      );
    },
  });

  function CardStackDemo() {
    return (
      <div className="h-[20rem] flex text-base items-center sm:mt-0 mt-5  justify-center w-full">
        <CardStack items={CARDS} />
      </div>
    );
  }

  const Highlight = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <span
        className={cn(
          "font-bold bg-blue-100 text-blue-700 dark:bg-blue-700/[0.2] dark:text-blue-500 px-2 py-2",
          className
        )}
      >
        {children}
      </span>
    );
  };

  const CARDS = [
    {
      id: 0,
      name: "Rule 1",
      designation: "1 off 3",
      content: (
        <p>
          Note that we only support<Highlight>PDF files</Highlight>; other file
          formats such as .excel, .doc, .ppt or any other are not compatible or
          supported. Although you can
          <Highlight>convert any file format into a PDF</Highlight> before
          uploading it here, this approach should work effectively in most
          cases.
        </p>
      ),
    },
    {
      id: 1,
      name: "Rule 3",
      designation: "3 off 3",
      content: (
        <p>
          You will receive reminders <Highlight>24 hours</Highlight> before each
          event, as well as upon successful upload of your PDF.
        </p>
      ),
    },
    {
      id: 2,
      name: "Rule 2",
      designation: "2 off 3",
      content: (
        <p>
          The column names must follow this specific format:
          <Highlight>event name, event description, and event date.</Highlight>
          These are required for proper data organization and processing.
        </p>
      ),
    },
  ];
  return (
    <div className=" flex  flex-col sm:mt-7 mt-5">
      <CardStackDemo />

      <Drawer>
        <DrawerTrigger className="sm:mt-4 mt-9">
          <Button className=" dark:bg-blue-700/[0.2] dark:text-blue-500 hover:bg-blue-700  sm:w-fit w-full   font-bold sm:text-base  text-lg">
            <p>Upload a PDF</p>
            <ArrowUp className="sm:w-4 sm:h-4 w-5 h-5 ml-2" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="flex  justify-center mx-auto item-center w-full ">
          <div className="  mx-auto sm:py-4 py-2 w-full max-w-md">
            <DrawerHeader>
              <DrawerTitle className="text-white text-lg">
                Upload a PDF
              </DrawerTitle>
              <DrawerDescription>
                Read all the rules in order to make it work effectively.
              </DrawerDescription>
            </DrawerHeader>

            <div className="flex flex-col items-center w-full justify-center  space-y-8">
              <label
                htmlFor="fileInput"
                className="cursor-pointer mt-5 mb-3 dark:bg-blue-700/[0.2] dark:text-blue-500 hover:bg-blue-700 text-  text-gray-800 py-2 px-4 rounded-md"
              >
                Choose a PDF
              </label>
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={(e) => handleFile(e)}
              />
              {pdf !== null && (
                <div className="flex items-center justify-center w-full ">
                  <span
                    className={`w-[93%] bg-black border ${
                      pdf !== null
                        ? "border-[#0ea5e9] text-white"
                        : "border-gray-300 text-white"
                    } px-4 py-2 rounded-md text-gray-800`}
                  >
                    <span
                      id="fileName"
                      className="truncate font-light flex justify-center items-center gap-2"
                    >
                      <span>
                        <File className="w-4 h-5" />
                      </span>
                      {/* @ts-ignore */}
                      {pdf !== null ? pdf?.name : "Please select a PDF."}
                    </span>
                  </span>
                </div>
              )}
            </div>

            <DrawerFooter className="w-full mt-3 ">
              <Button
                className="hover:bg-[#0ea5e9]/90 bg-[#0ea5e9] text-black"
                // @ts-ignore
                onClick={handleFileSubmit}
                isLoading={isLoading}
              >
                Submit
              </Button>
              <DrawerClose>
                <Button className="w-full " variant="outline">
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default PdfUpload;
