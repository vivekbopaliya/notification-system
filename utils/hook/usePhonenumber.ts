"use client";

import { useUser } from "@clerk/nextjs";

export const usePhonenumber = () => {
  const { user } = useUser();

  const phoneNumber = user?.phoneNumbers[0].phoneNumber.slice(1);

  return phoneNumber;
};
