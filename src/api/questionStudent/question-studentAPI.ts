import AxiosClient from "@/lib/customAxios";
import axios from "axios";


// find all question student
export const findAllQuestionStudent = async (questionId: string, arrayType: string) => {
  try {
    const response = await AxiosClient.get(
      `${process.env.NEXT_PUBLIC_API_URL}/question-student-list/correct-incorrect/${questionId}/${arrayType}`
    );

    return response.data.count;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { error: error.response?.data?.message || "Something went wrong" };
    }
    return { error: "Something went wrong" };
  }
};