import { Calendar, Home, Inbox, LogIn, Search, Settings } from "lucide-react";

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

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/admin/home",
    icon: Home,
    roles: ["admin"],
  },
  {
    title: "Inbox",
    url: "/dashboard/admin/about",
    icon: Inbox,
    roles: ["student"],
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
    roles: ["student"],
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
    roles: ["student"],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    roles: ["student",],
  },
  {
    title: "login",
    url: "/dashboard/admin/home",
    icon: LogIn,
    roles: ["student", "admin", "teacher"],
  },
];

export function AppSidebar({ role }: Readonly<{ role: string }>) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {items
                .filter((item) => item.roles.includes(role))
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>Username</SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
