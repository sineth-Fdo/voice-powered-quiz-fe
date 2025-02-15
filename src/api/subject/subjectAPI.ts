import AxiosClient from "@/lib/customAxios";
import { CreateSubject, UpdateSubject } from "@/types/subject/subject-interface";
import axios from "axios";

// find All Subjects
export const findAllSubjects = async () => {
  try {
    const response = await AxiosClient.get(
      `${process.env.NEXT_PUBLIC_API_URL}/subject/findAll`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// find one Subject
export const findOneSubject = async (id: string) => {
  try {
    const response = await AxiosClient.get(
      `${process.env.NEXT_PUBLIC_API_URL}/subject/find/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// update Subject status
export const updateSubjectStatus = async (id: string, status: string) => {
  try {
    const response = await AxiosClient.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/subject/status/${id}`,
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

// update Subject
export const updateSubject = async (id: string, updateSubject: UpdateSubject) => {
  try {
    const response = await AxiosClient.put(
      `${process.env.NEXT_PUBLIC_API_URL}/subject/updateAll/${id}`,
      updateSubject
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// create subject
export const createSubject = async (createSubject: CreateSubject) => {
  try {
    const response = await AxiosClient.post(
      `${process.env.NEXT_PUBLIC_API_URL}/subject/create`,
      createSubject
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// remove subject
export const removeSubject = async (id: string) => {
  try {
    const response = await AxiosClient.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/subject/remove/${id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};