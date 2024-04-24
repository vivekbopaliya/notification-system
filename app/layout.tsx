import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import Provider from "@/app/_trpc/provider";
import { cn } from "@/lib/utils";
import Navbar from "@/components/NavBar";
// @ts-expect-error
import { Analytics } from "@vercel/analytics/react";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notification System",
  description: "Create your own notifications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen  bg-[#0f172a]  text-slate-400 antialiased",
          inter.className
        )}
      >
        <Provider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ClerkProvider
              appearance={{
                baseTheme: dark,
              }}
            >
              <main className="w-screen h-screen fixed ">
                <Navbar />
                <main className="relative overflow-y-auto bg-black  w-full h-full">
                  {children}
                </main>
                <Toaster />
              </main>
            </ClerkProvider>
          </ThemeProvider>
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
