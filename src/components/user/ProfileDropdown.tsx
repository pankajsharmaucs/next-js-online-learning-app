"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";

const ProfileDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar className="cursor-pointer">
        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
        <AvatarFallback>US</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem asChild>
        <Link href="/user/profile" className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <span>Profile</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/user/settings" className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/user/logout" className="flex items-center gap-2">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default ProfileDropdown;
