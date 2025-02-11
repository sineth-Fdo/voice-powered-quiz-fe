'use client';

import Container from "@/components/layout/container";
import { AppSidebar } from "@/components/src/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { decode, JwtPayload } from "jsonwebtoken";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = Cookies.get("token");
    if (accessToken) {
      setToken(accessToken);
    } else {
      router.push("/auth/login");
    }
    setLoading(false); 
  }, [router]);

  useEffect(() => {
    if (!loading && token) {
      const decoded = decode(token) as JwtPayload;
      if ((decoded as JwtPayload)?.role === "admin") {
        router.push("/admin/dashboard/pages/home");
      } else if ((decoded as JwtPayload)?.role === "teacher") {
        router.push("/dashboard/pages/home");
      } else if ((decoded as JwtPayload)?.role === "student") {
        router.push("/dashboard/pages/home");
      } else {
        router.push("/auth/login");
      }
    }
  }, [loading, token, router]);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger />
        <Container>{children}</Container>
      </SidebarProvider>
    </>
  );
}
