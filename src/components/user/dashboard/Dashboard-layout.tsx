"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LayoutDashboard,
  User,
  Settings,
  Menu,
  LogOut,
  SwatchBook,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const [userPath, setUserPath] = useState('');

  // Update userPath based on pathname
  useEffect(() => {
    setUserPath(pathname);
  }, [pathname]);



  // Only render sidebar if not on login or home page
  if (userPath === '/user/login' || userPath === '/user') {
    return null; // Do not render sidebar on these pages
  }

  return (
    <div
      className={`h-screen bg-white border-r shadow-md transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-64"} 
        fixed top-0 left-0 z-20 pt-20`} // offset for header
    >
      <nav className="flex flex-col gap-2 px-2">
        <Link
          href="/user/dashboard" style={{color:"#444444"}}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold  ${isActive("/user/dashboard") ? "bg-gray-200 text-blue-700" : "text-gray-700"}`}
        >
          <LayoutDashboard className="h-6 w-6" />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>
         
        <Link
          href="/user/classes" style={{color:"#444444"}}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold  ${isActive("/user/classes") ? "bg-gray-200 text-gray-700" : "text-gray-700"}`}
        >
          <SwatchBook className="h-6 w-6" />
          {!isCollapsed && <span>Classes</span>}
        </Link>

        {/* 
        <div onClick={logout} className={`flex items-center gap-2 px-3 py-2 rounded-md cp
          text-sm font-semibold ${isActive("/user/logout") ? "bg-gray-200 text-blue-600" : "text-gray-700"}`}>
          <LogOut className="h-6 w-6" />
          {!isCollapsed && <span>{sidebar_loading ? 'Logging out...' : 'Logout'}</span>}
        </div> */}

      </nav>
    </div>
  );
};

const ProfileDropdown = ({ setisLogout }: { setisLogout: (value: boolean) => void }) => {
  const router = useRouter();

  // Logout function to invalidate the session/token
  const logout = async () => {
    setisLogout(true); // Show loader

    try {
      const baseUrl = window.location.origin;
      const Path = process.env.NEXT_PUBLIC_USER_LOGOUT;
      const Url = `${baseUrl}${Path}`;

      await axios.post(Url, {}, { withCredentials: true });
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      router.push("/login"); // Redirect to login
      setisLogout(false);
    }
  };

  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" alt="User" />
          <AvatarFallback>US</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/user/profile" className="flex mb-2 items-center gap-2 cp">
            <User className="h-7 w-4  text-gray-950" /> <div className="text-gray-950">Profile</div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/user/settings" className="flex mb-2 items-center gap-2 cp">
            <Settings className="h-7 w-4 text-gray-950" /> <div className="text-gray-950">Settings</div>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout} className="flex mb-2 items-center gap-2 cp cursor-pointer">
          <LogOut className="h-7 w-4 text-gray-950" />
          <div>Logout</div>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );

}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLogout, setisLogout] = useState(false); // Add this line

  // Set initial collapse state based on screen size
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 1000);
    };

    handleResize(); // Set once on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = isCollapsed ? "4rem" : "16rem";

  return (
    <div className="flex min-h-screen bg-muted text-foreground">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} />

      {/* Main content area (with space for fixed sidebar) */}
      <div className="flex-1 flex flex-col" style={{ marginLeft: sidebarWidth, transition: 'margin-left 0.3s' }}>
        {/* Fixed Header */}
        <header className="fixed top-0 right-0 left-0 h-20 bg-background border-b shadow-sm z-10 flex items-center justify-between px-4"
          style={{ marginLeft: sidebarWidth, transition: 'margin-left 0.3s' }}>
          <div className="flex items-center gap-2">
            <button onClick={() => setIsCollapsed(!isCollapsed)}>
              <Menu className="h-8 w-8 outline-0" />
            </button>
            {/* <Image
              src="/assets/common/logo.png"
              alt="User"
              width={100}
              height={40}
              className="rounded-full object-cover"
            /> */}
          </div>
          <ProfileDropdown setisLogout={setisLogout} />
        </header>

        {/* Padding to push content below header */}
        <div className="h-20" />

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Logout Overlay Spinner */}
      {isLogout && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

    </div>
  );
};

export default DashboardLayout;
