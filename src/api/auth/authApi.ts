import axios from "axios";
import AxiosClient from "../../lib/customAxios";
import { SignupData } from "@/types/auth/auth-interface";

// axios login function
export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        email: email,
        password: password,
      }
    );

    return response.data.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// axios signup function
export const signup = async (signupData: SignupData) => {
  try {
    const response = await AxiosClient.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, signupData);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};
