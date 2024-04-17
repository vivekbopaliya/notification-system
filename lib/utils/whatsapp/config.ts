"use client";

import axios from "axios";

export const whatsappAxios = axios.create({
  baseURL: `https://graph.facebook.com/${process.env.NEXT_PUBLIC_VERSION}/${process.env.NEXT_PUBLIC_PHONE_NUMBER_ID}/messages`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  },
});
