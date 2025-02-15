import AxiosClient from "@/lib/customAxios";
import { CheckAnswer, CreateQuestion, QuestionFindAll } from "@/types/question/question-interface";
import axios from "axios";

// create question
export const createQuestion = async (createQuestion: CreateQuestion) => {
  try {
    const response = await AxiosClient.post(
      `${process.env.NEXT_PUBLIC_API_URL}/question/create`,
      createQuestion
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// find all questions with quiz id and user id and query params
export const findAllQuestions = async (quizId: string , userId: string, params: QuestionFindAll = {}) => {
  try {
    const queryString = new URLSearchParams(params as Record<string, string>).toString();
    const url = `${process.env.NEXT_PUBLIC_API_URL}/question/find/${quizId}/${userId}${queryString ? `?${queryString}` : ""}`;

    const response = await AxiosClient.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// check the answer
export const checkAnswer = async (checkAnswer: CheckAnswer) => {
  try {
    const response = await AxiosClient.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/question/check-answer`,
      checkAnswer
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

// delete one question
export const deleteQuestion = async (id: string) => {
  try {
    const response = await AxiosClient.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/question/delete/${id}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};

