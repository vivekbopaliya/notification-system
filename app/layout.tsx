import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";
import Provider from "@/app/_trpc/provider";
import { cn } from "@/lib/utils";
import Navbar from "@/components/NavBar";
import { dark } from "@clerk/themes";
import { LogSnagProvider } from "@logsnag/next";
import TierUpgrade from "@/components/TierUpgrade";

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
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
              <div className="w-screen h-screen fixed ">
                <Navbar />
                <main className="relative overflow-y-auto bg-black  w-full h-full">
                  {children}
                </main>
              </div>
              <Toaster />
            </ThemeProvider>
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
