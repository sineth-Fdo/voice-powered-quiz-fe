"use client";

import { findAllQuestions } from "@/api/question/questionAPI";
import { findAllQuiz } from "@/api/quiz/quizAPI";

const Page = () => {
  function openSeparateWindow() {
    const newWindow = window.open(
      "http://localhost:3000/dashboard/admin/home",
      "_blank",

      // Optional: Set window size
      "width=screen,height=screen,scrollbars=yes,resizable=yes,"
    );

    if (newWindow) {
      setTimeout(() => {
        newWindow.close();
      }, 2000); // Close after 2 seconds
    }
  }

  const fetchAllUsers = async () => {
    try {
      const response = await findAllQuestions("67a7b7de7c48c1f0e525fccb", "67ac5ed7759af7a40233ce1e",{
        questionNumber: "3",
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-red-50">
      Home page Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Adipisci, corporis? Quod aut ipsam eius voluptate, odio perferendis eum
      dolorum, assumenda magni enim et officia incidunt cum temporibus minus
      earum nisi!
      {/* Button to open separate window */}
      <button onClick={openSeparateWindow}>Click</button>
      <br />
      <br />
      <button onClick={fetchAllUsers}>fetch all users</button>
    </div>
  );
};

export default Page;
