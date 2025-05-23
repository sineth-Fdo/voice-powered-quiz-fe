"use client";

import Cookies from "js-cookie";
import { decode, JwtPayload } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
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
        router.push("/dashboard/admin/addNewUser");
      } else if ((decoded as JwtPayload)?.role === "teacher") {
        router.push("/dashboard/teacher/overView");
      } else if ((decoded as JwtPayload)?.role === "student") {
        router.push("/dashboard/student/overview");
      } else {
        router.push("/auth/login");
      }
    }
  }, [loading, token, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <div></div>;
}
