import AxiosClient from "@/lib/customAxios";
import axios from "axios";

// find all users
export const findAllUsers = async () => {
    try {
      const response = await AxiosClient.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/allUsers`);
  
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || "Something went wrong" };
      }
      return { error: "Something went wrong" };
    }
  };

  // find one user 
  export const findOneUser = async (id: string) => {
    try {
      const response = await AxiosClient.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/find/${id}`);
  
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || "Something went wrong" };
      }
      return { error: "Something went wrong" };
    }
  };

  // delete one user 
  export const deleteUser = async (id: string) => {
    try {
      const response = await AxiosClient.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/user/remove/${id}`);
  
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || "Something went wrong" };
      }
      return { error: "Something went wrong" };
    }
  };

  // update user status
  export const updateUserStatus = async (id: string, status: string) => {
    try {
      const response = await AxiosClient.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/status/${id}`,
        { status : status }
      );
  
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || "Something went wrong" };
      }
      return { error: "Something went wrong" };
    }
  };
