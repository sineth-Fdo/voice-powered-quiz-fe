import AxiosClient from "@/lib/customAxios";
import { CreateQuizStudent, FindQuizStudent } from "@/types/quizStudent/quiz-student-interface";
import axios from "axios";

// create quiz student
export const createQuiz = async (createQuizStudent: CreateQuizStudent) => {
    try {
      const response = await AxiosClient.post(
        `${process.env.NEXT_PUBLIC_API_URL}/quiz-student/create`,
        createQuizStudent
      );
  
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || "Something went wrong" };
      }
      return { error: "Something went wrong" };
    }
  };

  // find all quiz student
export const findAllQuizStudent = async (params: FindQuizStudent = {}) => {
    try {
      const queryString = new URLSearchParams(params as Record<string, string>).toString();
      const url = `${process.env.NEXT_PUBLIC_API_URL}/quiz-student/all${queryString ? `?${queryString}` : ""}`;
  
      const response = await AxiosClient.get(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data?.message || "Something went wrong" };
      }
      return { error: "Something went wrong" };
    }
  };
