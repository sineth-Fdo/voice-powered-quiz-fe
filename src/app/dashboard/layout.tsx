"use client";

import Container from "@/components/layout/container";
import { AppSidebar } from "@/components/src/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import Cookies from "js-cookie";
import { decode, JwtPayload } from "jsonwebtoken";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  // Only run on client side
  useEffect(() => {
    setMounted(true);
    const accessToken = Cookies.get("token");
    if (accessToken) {
      setToken(accessToken);
      try {
        const decoded = decode(accessToken) as JwtPayload;
        setRole(decoded.role);
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/auth/login");
      }
    } else {
      router.push("/auth/login");
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (!loading && token && mounted) {
      try {
        const decoded = decode(token) as JwtPayload;
        const userRole = decoded?.role;

        const isOnRootDashboard = pathname === "/dashboard";
        const isInWrongSection =
          (userRole === "admin" && !pathname.includes("/dashboard/admin")) ||
          (userRole === "teacher" &&
            !pathname.includes("/dashboard/teacher")) ||
          (userRole === "student" && !pathname.includes("/dashboard/student"));

        if (isOnRootDashboard || isInWrongSection) {
          if (userRole === "admin") {
            router.push("/dashboard/admin/addNewUser");
          } else if (userRole === "teacher") {
            router.push("/dashboard/teacher/overView");
          } else if (userRole === "student") {
            router.push("/dashboard/student/overview");
          } else {
            router.push("/auth/login");
          }
        }
      } catch (error) {
        console.error("Error in navigation logic:", error);
        router.push("/auth/login");
      }
    }
  }, [loading, token, router, pathname, role, mounted]);

  // Show a consistent initial state during server rendering
  if (!mounted) {
    return (
      <div className="bg-PRIMARY">
        <SidebarProvider>
          <Container>{children}</Container>
          <Toaster />
        </SidebarProvider>
      </div>
    );
  }

  return (
    <div className="bg-PRIMARY">
      <SidebarProvider>
        <AppSidebar role={role || ""} />
        <SidebarTrigger />
        <Container>{children}</Container>
        <Toaster />
      </SidebarProvider>
    </div>
  );
}
