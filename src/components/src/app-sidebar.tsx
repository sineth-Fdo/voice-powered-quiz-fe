"use client";

import Cookies from "js-cookie";
import {
  AlignHorizontalJustifyStartIcon,
  BookCheck,
  CopyPlusIcon,
  HistoryIcon,
  User,
  UserCog2Icon,
  UserPlus2,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { decode, JwtPayload } from "jsonwebtoken";
import { useEffect, useState } from "react";
import { findOneUser } from "@/api/user/userApi";

const items = [
  {
    title: "Add New User",
    url: "/dashboard/admin/addNewUser",
    icon: UserPlus2,
    roles: ["admin"],
  },
  {
    title: "Manage Users",
    url: "/dashboard/admin/manageUsers",
    icon: UserCog2Icon,
    roles: ["admin"],
  },
  {
    title: "Overview",
    url: "/dashboard/teacher/overView",
    icon: UserCog2Icon,
    roles: ["teacher"],
  },
  {
    title: "Add New Quiz",
    url: "/dashboard/teacher/createQuiz",
    icon: CopyPlusIcon,
    roles: ["teacher"],
  },
  {
    title: "My Quizzes",
    url: "/dashboard/teacher/myQuiz",
    icon: BookCheck,
    roles: ["teacher"],
  },
  {
    title: "History",
    url: "/dashboard/teacher/history",
    icon: HistoryIcon,
    roles: ["teacher"],
  },
  {
    title: "Analytics",
    url: "/dashboard/teacher/analytics",
    icon: AlignHorizontalJustifyStartIcon,
    roles: ["teacher"],
  },
];

export function AppSidebar({ role }: Readonly<{ role: string }>) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);


  const displayUser = async () => {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      const decoded = decode(accessToken) as JwtPayload;
      const userDetails = await findOneUser(decoded.uid)
      setUserName(userDetails.name);
    } else {
      router.push("/auth/login");
    }
  };

  const signOut = async () => {
    if (Cookies.get("token")) {
      Cookies.remove("token");
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    displayUser();
  }, [displayUser]);

  return (
    <Sidebar className="border-r border-[#00000009] shadow-md text-[#fff]">
      <SidebarContent className="bg-SECONDARY">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items
                .filter((item) => item.roles.includes(role))
                .map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className={`flex items-center space-x-2 p-2 rounded-md ${
                            isActive
                              ? "bg-BLUE text-PRIMARY_TEXT"
                              : "text-PRIMARY_TEXT hover:bg-PRIMARY_TEXT"
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-SECONDARY">
        <SidebarMenu className=" bg-PRIMARY rounded-lg">
          <SidebarMenuItem className=" bg-PRIMARY rounded-lg py-4 hover:bg-BLUE cursor-pointer">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className=" flex justify-around items-center ">
                  <User className="w-5 h-5" />
                  <h1>{userName}</h1>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] border bg-SECONDARY text-PRIMARY_TEXT rounded-md shadow-md"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <button 
                  className="w-full"
                  onClick={signOut} 
                  >
                  <DropdownMenuItem>
                    <span>
                      Sign out
                    </span>
                  </DropdownMenuItem>
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
