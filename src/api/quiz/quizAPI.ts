import AxiosClient from "@/lib/customAxios";
import { CreateQuiz, QuizQueryParams, UpdateQuiz, UpdateTotals } from "@/types/quiz/quiz-interface";
import axios from "axios";

//  create quiz
export const createQuiz = async (createQuiz: CreateQuiz) => {
  try {
    const response = await AxiosClient.post(
      `${process.env.NEXT_PUBLIC_API_URL}/quiz/create`,
      createQuiz
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// find one quiz
export const findOneQuiz = async (id: string) => {
  try {
    const response = await AxiosClient.get(
      `${process.env.NEXT_PUBLIC_API_URL}/quiz/find/${id}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// update quiz status
export const updateQuizStatus = async (id: string, status: string) => {
  try {
    const response = await AxiosClient.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/quiz/update-status/${id}`,
      { status: status }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// delete quiz
export const deleteQuiz = async (id: string) => {
  try {
    const response = await AxiosClient.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/quiz/delete/${id}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// update totals in quiz
export const updateTotals = async (id: string, updateTotals: UpdateTotals) => {
  try {
    const response = await AxiosClient.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/quiz/update-totals/${id}`,
      updateTotals
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// find all quiz with query params
export const findAllQuiz = async (params: QuizQueryParams = {}) => {
    try {
      const queryString = new URLSearchParams(params as Record<string, string>).toString();
      const url = `${process.env.NEXT_PUBLIC_API_URL}/quiz/all${queryString ? `?${queryString}` : ""}`;
  
      const response = await AxiosClient.get(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || "Something went wrong" };
      }
      return { error: "Something went wrong" };
    }
  };

  // update quiz
export const updateQuiz = async (id: string, updateQuiz: UpdateQuiz) => {
    try {
      const response = await AxiosClient.put(
        `${process.env.NEXT_PUBLIC_API_URL}/quiz/update/${id}`,
        updateQuiz
      );
  
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || "Something went wrong" };
      }
      return { error: "Something went wrong" };
    }
  }

  export const updateQuizPassMark = async (id: string, passMark: number) => {
    try {
      const response = await AxiosClient.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/quiz/updatePassMark/${id}`,
        { passMark }
      );
  
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || "Something went wrong" };
      }
      return { error: "Something went wrong" };
    }
  }