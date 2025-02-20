"use client";

import Container from "@/components/layout/container";
import { AppSidebar } from "@/components/src/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import Cookies from "js-cookie";
import { decode, JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      setToken(accessToken);
      const decoded = decode(accessToken) as JwtPayload;
      setRole(decoded.role);
    } else {
      router.push("/auth/login");
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    if (!loading && token) {
      const decoded = decode(token) as JwtPayload;
      if ((decoded as JwtPayload)?.role === "admin") {
        router.push("/dashboard/admin/addNewUser");
      } else if ((decoded as JwtPayload)?.role === "teacher") {
        router.push("/dashboard/teacher/overView");
      } else if ((decoded as JwtPayload)?.role === "student") {
        router.push("/dashboard/student/home");
      } else {
        router.push("/auth/login");
      }
    }
  }, [loading, token, router, role]);

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
