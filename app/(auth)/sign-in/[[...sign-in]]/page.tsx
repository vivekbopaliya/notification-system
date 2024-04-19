"use client";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-w-screen justify-center my-[5rem] px-20 mx-20">
      <SignIn />
    </div>
  );
}
