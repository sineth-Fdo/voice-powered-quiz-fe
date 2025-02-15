import AxiosClient from "@/lib/customAxios";
import axios from "axios";

// create batch
export const createBatch = async ( name : string) => {
  try {
    const response = await AxiosClient.post(
      `${process.env.NEXT_PUBLIC_API_URL}/batch/create`,
        { name : name }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// find all batch
export const findAllBatch = async () => {
  try {
    const response = await AxiosClient.get(
      `${process.env.NEXT_PUBLIC_API_URL}/batch/all`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// update batch
export const updateBatch = async (id: string, name : string) => {
  try {
    const response = await AxiosClient.put(
      `${process.env.NEXT_PUBLIC_API_URL}/batch/update/${id}`,
      { name : name }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// delete batch
export const deleteBatch = async (id: string) => {
  try {
    const response = await AxiosClient.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/batch/delete/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};
