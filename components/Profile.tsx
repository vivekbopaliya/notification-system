import { SetUserIdServerComponent } from "@logsnag/next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

const Profile = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const phoneNumer = user?.phoneNumbers[0]?.phoneNumber?.slice(1);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="w-[2.35rem] h-[2.35rem] cursor-pointer"
      >
        <Avatar>
          <AvatarImage src={user?.imageUrl} alt="User Profile" />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56  border border-custom-slate-800  ">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="border border-custom-slate-800" />
        <DropdownMenuGroup>
          <Link href="/user-profile">
            <DropdownMenuItem className=" hover:bg-custom-slate-800/50 sm:hover:bg-custom-slate-800/50 focus:bg-red-900/30">
              <User className="mr-2 h-3 w-3" />
              <span className="text-sm ">Account Setting</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <SignOutButton>
          <DropdownMenuItem className="hover:bg-red-900/30 sm:hover:bg-red-900/30 focus:bg-red-900/30">
            <LogOut className="mr-2 h-3 w-3" />
            <span>Log out</span>
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
      <SetUserIdServerComponent userId={user?.id!} />
    </DropdownMenu>
  );
};

export default Profile;
