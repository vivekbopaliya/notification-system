"use client";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-w-screen justify-center my-[5rem] px-20 mx-20 ">
      <SignUp />
    </div>
  );
}
