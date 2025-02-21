"use client";

import { login } from "@/api/auth/authApi";
import FormSection, {
  FormData,
} from "@/components/src/dashboard-conponents/auth/formSection";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/navigation";

interface JwtPayload {
  uid: string;
  role: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: FormData) => {
      const response = await login(data.email, data.password);
      console.log(response.error);
      if (response.error) {
        toast({
          title: "Login Failed",
          description: `login failed`,
          duration: 5000,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Login Successful",
        description: "Redirecting...",
        duration: 5000,
        className: "bg-GREEN text-PRIMARY_TEXT",
      });

      Cookies.set("token", response);
      const decoded = decode(response) as JwtPayload;

      if ((decoded as JwtPayload)?.role === "admin") {
        router.push("/dashboard/admin/addNewUser");
      } else if ((decoded as JwtPayload)?.role === "teacher") {
        router.push("/dashboard/teacher/overView");
      } else if ((decoded as JwtPayload)?.role === "student") {
        router.push("/dashboard/student/home");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid role",
          duration: 5000,
          className: "bg-GREEN text-PRIMARY_TEXT",
        });
      }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-PRIMARY relative">
      <FormSection onSubmit={onSubmit} />
    </div>
  );
}
