// import React from 'react'
// Import the logo image

import SideBar from "@atomic/web-ui/SideBar/sideBar";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function CreateExamPage() {
  const [mcqQuestions, setMcqQuestions] = useState(5);
  const [tfQuestions, setTfQuestions] = useState(5);
  const [shortAnswer, setShortAnswer] = useState(5);

  const { courseId } = useParams();

  const navigate = useNavigate();

  const handleStartExam = () => {
    navigate(
      `/exam?courseId=${courseId}&numMCQ=${mcqQuestions}&numTF=${tfQuestions}&numFlashCards=${shortAnswer}`,
    );
  };

  return (
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <SideBar
        primaryLogo="/BUE_Logo.svg"
        secondaryLogo="/miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <div className="h-full w-[85vw] rounded-[14px] items-center justify-between flex flex-col bg-white p-[30px] gap-6">
        <div className="bg-[#F3F3F3] h-[50%] w-full flex flex-col items-center justify-center gap-4 rounded-md">
          <img src="/chatbotLogo.svg" />
          <p className="font-bold text-4xl">Generate Your Own Exams</p>
          <p className="font-normal text-xl text-center w-[70%]">
            Welcome to Atomic LMS! Generate personalized exams by choosing your
            question type, number, and timer. You'll be redirected to your exam
            page once ready. Happy studying!
          </p>
        </div>
        <div className="flex bg-[#f3f3f3] h-[50%] w-full rounded-md items-center justify-around px-10">
          <div className="bg-white flex flex-col w-[20%] p-8 rounded-md shadow-lg items-center justify-center gap-2 h-56">
            <img src="/newMCQ.svg" width={60} />
            <p className="text-2xl font-bold">MCQ QUESTIONS</p>
            <select
              id="mcqQuestions"
              className={`rounded py-[5px] cursor-pointer`}
              value={mcqQuestions}
              onChange={(e) => setMcqQuestions(Number(e.target.value))}
            >
              <option value={5}>5 Question</option>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
              <option value={20}>20 Questions</option>
              <option value={25}>25 Questions</option>
            </select>
          </div>
          <div className="bg-white flex flex-col p-8 rounded-md shadow-lg items-center justify-center gap-2 w-[20%] h-56">
            <img src="/newTF.svg" width={60} />
            <p className="text-2xl font-bold">True & False</p>
            <select
              id="tfQuestions"
              className={`rounded py-[5px] cursor-pointer`}
              value={tfQuestions}
              onChange={(e) => setTfQuestions(Number(e.target.value))}
            >
              <option value={5}>5 Question</option>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
              <option value={20}>20 Questions</option>
              <option value={25}>25 Questions</option>
            </select>
          </div>
          <div className="bg-white flex flex-col p-8 rounded-md shadow-lg items-center justify-center gap-2 w-[20%] h-56">
            <img src="/newShortAnswer.svg" width={60} />
            <p className="text-2xl font-bold">Short Answer</p>
            <select
              id="shortAnswer"
              className={`rounded py-[5px] cursor-pointer`}
              value={shortAnswer}
              onChange={(e) => setShortAnswer(Number(e.target.value))}
            >
              <option value={5}>5 Question</option>
              <option value={10}>10 Questions</option>
              <option value={15}>15 Questions</option>
              <option value={20}>20 Questions</option>
              <option value={25}>25 Questions</option>
            </select>
          </div>
          <div
            className="bg-[#75D00F] flex h-56 w-28 items-center justify-center shadow-lg rounded-md cursor-pointer"
            onClick={handleStartExam}
          >
            <img src="/startExam.svg" width={35} />
          </div>
        </div>
      </div>
    </div>
  );
}
