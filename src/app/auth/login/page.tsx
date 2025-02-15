"use client";

import { login } from "@/api/auth/authApi";
import Cookies from "js-cookie";
import { decode } from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  password: string;
}

interface JwtPayload {
  uid: string;
  role: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await login(data.email, data.password);
      Cookies.set("token", response);
      const decoded = decode(response) as JwtPayload;

      if ((decoded as JwtPayload)?.role === "admin") {
        router.push("/dashboard/admin/home");
      } else if ((decoded as JwtPayload)?.role === "teacher") {
        router.push("/dashboard/admin/home");
      } else if ((decoded as JwtPayload)?.role === "student") {
        router.push("/dashboard/admin/home");
      } else {
        setError("Invalid role");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to login. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            required
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
