import { AnswerLabel, Button, CollapsibleCard } from "@atomic/web-ui";
import SideBar from "@atomic/web-ui/SideBar/sideBar";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";

const TFInput = ({
  handleChange,
  value,
}: {
  handleChange: (studentAnswer: string) => void;
  value: string;
}) => (
  <div className="absolute flex flex-col items-center justify-center bottom-28 left-1/2 transform border rounded-[10px] w-[15%] -translate-x-1/2 bg-white border-[#FF3C7D]">
    <div className="flex h-10">
      <div className="flex gap-8">
        <div className="flex items-center gap-1">
          <input
            type="radio"
            id="true"
            value="true"
            name="TFanswer"
            className="form-radio h-4 w-4 text-[#11664F] transition duration-150 ease-in-out"
            checked={value === "true"}
            onChange={(e) => handleChange(e.target.value)}
          />
          <label htmlFor="true">True</label>
        </div>
        <div className="flex items-center gap-1">
          <input
            type="radio"
            id="false"
            value="false"
            name="TFanswer"
            className="form-radio h-4 w-4 text-[#11664F] transition duration-150 ease-in-out"
            onChange={(e) => handleChange(e.target.value)}
            checked={value === "false"}
          />
          <label htmlFor="false">False</label>
        </div>
      </div>
    </div>
  </div>
);

const MCQInput = ({
  options,
  handleChange,
  value,
}: {
  options: { letter: string; text: string; isCorrect: boolean }[];
  handleChange: (studentAnswer: string) => void;
  value: string;
}) => (
  <div className="absolute flex flex-col items-center justify-center bottom-28 left-1/2 transform border rounded-[10px] px-10 -translate-x-1/2 bg-white border-[#FF3C7D]">
    <div className="flex">
      <div className="flex gap-3 flex-col py-4">
        {options.map((option) => (
          <div className="flex gap-1">
            <input
              type="radio"
              id={option.letter}
              value={option.letter}
              name="MCQanswer"
              checked={value === option.letter}
              onChange={(e) => handleChange(e.target.value)}
              className="form-radio h-4 w-4 text-[#11664F] transition duration-150 ease-in-out mt-1"
            />
            <label htmlFor={option.letter}>
              {option.letter}
              {") "}
              {option.text}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FlashCardInput = ({
  handleChange,
  value,
}: {
  handleChange: (studentAnswer: string) => void;
  value: string;
}) => (
  <div className="absolute flex flex-col bottom-28 left-1/2 transform border rounded-[10px] w-[90%] -translate-x-1/2 bg-white border-[#FF3C7D]">
    <div className="flex">
      <textarea
        placeholder="Type your answer here..."
        className="w-[93%] p-[10px] focus:ring-transparent border-none bg-transparent resize-none"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
    <div className="flex justify-between px-[20px] py-[5px] bg-[#f5f5f5] rounded-b-[10px] border ">
      <p>{5}/500</p>
    </div>
  </div>
);

type Props = {};

const ExamPage: React.FC<Props> = ({}) => {
  const searchParams = new URLSearchParams(window.location.search);

  const courseId = searchParams.get("courseId");
  const numMCQ = searchParams.get("numMCQ");
  const numTF = searchParams.get("numTF");
  const numFlashCards = searchParams.get("numFlashCards");

  const [mcqQuestions, setMcqQuestions] = useState<
    {
      courseId: string;
      sectionId: string;
      attachmentId: string;
      fileName: string;
      type: string;
      question: string;
      options: { letter: string; text: string; isCorrect: boolean }[];
      explanation: string;
      pageNumber: number;
      _id: string;
      studentAnswer: string;
      isCorrect: string;
    }[]
  >([]);

  const [tfQuestions, setTfQuestions] = useState<
    {
      courseId: string;
      sectionId: string;
      attachmentId: string;
      fileName: string;
      type: string;
      question: string;
      answer: string;
      explanation: string;
      pageNumber: number;
      _id: string;
      studentAnswer: string;
      isCorrect: string;
    }[]
  >([]);

  const [flashCardQuestions, setFlashCardQuestions] = useState<
    {
      courseId: string;
      sectionId: string;
      attachmentId: string;
      fileName: string;
      type: string;
      question: string;
      answer: string;
      pageNumber: number;
      _id: string;
      studentAnswer: string;
      explanation: string;
      isCorrect: string;
      advice: string;
    }[]
  >([]);

  enum QuestionType {
    MCQ = "MCQ",
    TF = "TF",
    FLASH_CARD = "FLASH_CARD",
  }

  const [currentType, setCurrentType] = useState<QuestionType>(QuestionType.TF);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentExamIndex, setCurrentExamIndex] = useState<number>(0);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [loadingAnswers, setLoadingAnswers] = useState<boolean>(false);

  const { isLoading, data: exam } = useQuery({
    queryKey: ["exam", { courseId, numMCQ, numTF, numFlashCards }],
    queryFn: () =>
      fetch(`http://localhost:3000/ai/generate-exam`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          courseId,
          numMCQ: Number(numMCQ),
          numTF: Number(numTF),
          numFlashCards: Number(numFlashCards),
        }),
      }).then((res) => res.json()),
  });

  useEffect(() => {
    if (exam) {
      setMcqQuestions(
        exam.mcqQuestions.map((question: any) => ({
          ...question,
          studentAnswer: "",
          isCorrect: "",
        })),
      );
      setTfQuestions(
        exam.tfQuestions.map((question: any) => ({
          ...question,
          studentAnswer: "",
          isCorrect: "",
        })),
      );
      setFlashCardQuestions(
        exam.flashCardQuestions.map((question: any) => ({
          ...question,
          studentAnswer: "",
          isCorrect: "",
          explanation: "",
          advice: "",
        })),
      );
    }
  }, [exam]);

  useEffect(() => {
    if (currentType === QuestionType.TF) {
      setCurrentExamIndex(currentQuestionIndex);
    } else if (currentType === QuestionType.MCQ) {
      setCurrentExamIndex(currentQuestionIndex + tfQuestions.length);
    } else {
      setCurrentExamIndex(
        currentQuestionIndex + tfQuestions.length + mcqQuestions.length,
      );
    }
  }, [currentType, currentQuestionIndex]);

  const handleFinishExam = async () => {
    setLoadingAnswers(true);

    const flashCardAnswers = flashCardQuestions.map((question) => ({
      studentAnswer: question.studentAnswer,
      questionId: question._id,
    }));

    const res = await fetch(`http://localhost:3000/ai/answer-exam`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        courseId,
        answers: flashCardAnswers,
      }),
    }).then((res) => res.json());

    const iscorrect = res.map((ans: any) => ({
      isCorrect: ans.isCorrect,
      explanation: ans.explaination,
      advice: ans.advise,
      questionId: ans.questionId,
    }));

    setFlashCardQuestions((prev) =>
      prev.map((question) => {
        const answer = iscorrect.find(
          (ans: any) => ans.questionId === question._id,
        );

        console.log(answer);

        return {
          ...question,
          isCorrect: answer.isCorrect,
          explanation: answer.explanation,
          advice: answer.advice,
        };
      }),
    );

    // grade TF and MCQ
    const tfAnswers = tfQuestions.map((question) => ({
      ...question,
      isCorrect:
        question.answer === question.studentAnswer ? "correct" : "incorrect",
    }));

    const mcqAnswers = mcqQuestions.map((question) => ({
      ...question,
      isCorrect:
        question.options.find((option) => option.isCorrect)?.letter ===
        question.studentAnswer
          ? "correct"
          : "incorrect",
    }));

    setTfQuestions(tfAnswers);
    setMcqQuestions(mcqAnswers);
    setCurrentQuestionIndex(0);
    setCurrentType(QuestionType.TF);
    setLoadingAnswers(false);
    setShowAnswers(true);
  };

  const handleStudentAnswerChange = (studentAnswer: string) => {
    // if no answer is selected, do nothing
    if (currentType === QuestionType.MCQ) {
      setMcqQuestions((prev) =>
        prev.map((question, i) =>
          i === currentQuestionIndex
            ? { ...question, studentAnswer }
            : question,
        ),
      );
    } else if (currentType === QuestionType.TF) {
      setTfQuestions((prev) =>
        prev.map((question, i) =>
          i === currentQuestionIndex
            ? { ...question, studentAnswer }
            : question,
        ),
      );
    } else {
      setFlashCardQuestions((prev) =>
        prev.map((question, i) =>
          i === currentQuestionIndex
            ? { ...question, studentAnswer }
            : question,
        ),
      );
    }
  };

  const handleNextQuestion = () => {
    // if no answer is selected, do nothing
    const currentQuestion =
      currentType === QuestionType.TF
        ? tfQuestions[currentQuestionIndex]
        : currentType === QuestionType.MCQ
          ? mcqQuestions[currentQuestionIndex]
          : flashCardQuestions[currentQuestionIndex];

    if (currentQuestion.studentAnswer === "" && !showAnswers) {
      return;
    }
    if (currentType === QuestionType.TF) {
      if (currentQuestionIndex < tfQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentQuestionIndex(0);
        setCurrentType(QuestionType.MCQ);
      }
    } else if (currentType === QuestionType.MCQ) {
      if (currentQuestionIndex < mcqQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentQuestionIndex(0);
        setCurrentType(QuestionType.FLASH_CARD);
      }
    } else {
      if (currentQuestionIndex < flashCardQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentQuestionIndex(0);
        setCurrentType(QuestionType.TF);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentType === QuestionType.TF) {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prev) => prev - 1);
      }
    } else if (currentType === QuestionType.MCQ) {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prev) => prev - 1);
      } else if (currentQuestionIndex === 0) {
        setCurrentType(QuestionType.TF);
        setCurrentQuestionIndex(tfQuestions.length - 1);
      }
    } else {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prev) => prev - 1);
      } else if (currentQuestionIndex === 0) {
        setCurrentType(QuestionType.MCQ);
        setCurrentQuestionIndex(mcqQuestions.length - 1);
      }
    }
  };

  if (
    isLoading ||
    mcqQuestions.length === 0 ||
    tfQuestions.length === 0 ||
    flashCardQuestions.length === 0
  ) {
    return (
      <div className="h-screen p-[40px] flex justify-center items-center gap-[40px]">
        <ReactLoading type="spinningBubbles" color="#11664F" />
      </div>
    );
  }

  if (loadingAnswers) {
    return (
      <div className="h-screen p-[40px] flex flex-col justify-center items-center gap-[40px]">
        <ReactLoading type="spinningBubbles" color="#11664F" />
        <p className=" text-2xl">Grading Your Answers</p>
      </div>
    );
  }

  console.log({ tfQuestions, mcqQuestions, flashCardQuestions });

  const widthPercentage = `${(((100 / (tfQuestions.length + mcqQuestions.length + flashCardQuestions.length)) * 40) / 100).toFixed(2)}vw`;

  return (
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <SideBar
        primaryLogo="./BUE_Logo.svg"
        secondaryLogo="./miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <div className="relative h-full w-[85vw] rounded-[14px] flex flex-col bg-[#f9f9f9] overflow-auto justify-between">
        <div className="w-full h-10 items-center justify-center flex gap-3 pt-14">
          <img src="/TF.svg" className="w-7" />
          <div className="bg-[#00000006] flex gap-2 p-2 rounded">
            {tfQuestions.map((_, i) => (
              <div
                className={`${currentType === QuestionType.TF && currentQuestionIndex === i ? "bg-[#11664F]" : "bg-[#DCDCDC]"} h-2 rounded`}
                style={{ width: widthPercentage }}
              />
            ))}
          </div>
          <img src="/MCQ.svg" className="w-6" />
          <div className="bg-[#00000006] flex gap-2 p-3 rounded">
            {mcqQuestions.map((_, i) => (
              <div
                className={`${currentType === QuestionType.MCQ && currentQuestionIndex === i ? "bg-[#11664F]" : "bg-[#DCDCDC]"} h-2 rounded`}
                style={{ width: widthPercentage }}
              />
            ))}
          </div>
          <img src="/shortanswer.svg" className="w-6" />
          <div className="bg-[#00000006] flex gap-2 p-3 rounded">
            {flashCardQuestions.map((_, i) => (
              <div
                className={`${currentType === QuestionType.FLASH_CARD && currentQuestionIndex === i ? "bg-[#11664F]" : "bg-[#DCDCDC]"} h-2 rounded`}
                style={{ width: widthPercentage }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="bg-white flex flex-col w-[70%] p-10 items-center justify-center rounded-xl shadow-md gap-3">
            <p className="text-[#BCBCBC] font-poppins text-2xl font-normal leading-normal uppercase text-center">
              Question {currentExamIndex + 1}/
              {tfQuestions.length +
                mcqQuestions.length +
                flashCardQuestions.length}
            </p>
            <p className="text-[#35383F] text-center font-poppins text-2xl font-bold leading-[35px] uppercase">
              {currentType === QuestionType.TF
                ? tfQuestions[currentQuestionIndex]?.question
                : currentType === QuestionType.MCQ
                  ? mcqQuestions[currentQuestionIndex]?.question
                  : flashCardQuestions[currentQuestionIndex]?.question}
            </p>
          </div>
          {showAnswers ? (
            <div className="flex flex-col w-[75%] items-center justify-center">
              <AnswerLabel
                isCorrect={
                  currentType === QuestionType.TF
                    ? tfQuestions[currentQuestionIndex]?.isCorrect
                    : currentType === QuestionType.MCQ
                      ? mcqQuestions[currentQuestionIndex]?.isCorrect
                      : flashCardQuestions[currentQuestionIndex]?.isCorrect
                }
              />
              <CollapsibleCard
                correctAnswer={
                  currentType === QuestionType.TF
                    ? tfQuestions[currentQuestionIndex]?.answer!
                    : currentType === QuestionType.MCQ
                      ? mcqQuestions[currentQuestionIndex]?.options.find(
                          (option) => option.isCorrect,
                        )?.letter! +
                        ") " +
                        mcqQuestions[currentQuestionIndex]?.options.find(
                          (option) => option.isCorrect,
                        )?.text!
                      : flashCardQuestions[currentQuestionIndex]?.answer!
                }
                explanation={
                  currentType === QuestionType.TF
                    ? tfQuestions[currentQuestionIndex]?.explanation
                    : currentType === QuestionType.MCQ
                      ? mcqQuestions[currentQuestionIndex]?.explanation
                      : flashCardQuestions[currentQuestionIndex]?.explanation
                }
                advice={
                  currentType === QuestionType.FLASH_CARD
                    ? flashCardQuestions[currentQuestionIndex]?.advice
                    : ""
                }
                haveAdvice={currentType === QuestionType.FLASH_CARD}
              />
            </div>
          ) : null}
          {showAnswers ? null : currentType === QuestionType.TF ? (
            <TFInput
              handleChange={handleStudentAnswerChange}
              value={tfQuestions[currentQuestionIndex]?.studentAnswer}
            />
          ) : currentType === QuestionType.MCQ ? (
            <MCQInput
              options={mcqQuestions[currentQuestionIndex]?.options}
              handleChange={handleStudentAnswerChange}
              value={mcqQuestions[currentQuestionIndex]?.studentAnswer}
            />
          ) : (
            <FlashCardInput
              value={flashCardQuestions[currentQuestionIndex]?.studentAnswer}
              handleChange={handleStudentAnswerChange}
            />
          )}
        </div>
        <div className="flex justify-center bg-[#FFFF] mt-[50px]  p-[15px]">
          <button
            className="hover:bg-[var(--Secondary)] "
            style={{
              display: "flex",
              alignItems: "center",
              color: "var(--Primary)",
              height: "40px",
              fontSize: "15px",
              marginRight: "20px",
              padding: "0 20px",
              borderRadius: "10px",
            }}
            onClick={handlePreviousQuestion}
          >
            <img src="./BackButton.svg" alt="" className="mr-2" />
            Previous Question
          </button>
          {showAnswers &&
          currentExamIndex + 1 ===
            mcqQuestions.length +
              tfQuestions.length +
              flashCardQuestions.length ? null : (
            <Button
              style={{
                marginTop: "0",
                height: "40px",
                fontSize: "15px",
                fontWeight: "normal",
                display: "flex",
                alignItems: "center",
                backgroundColor: "var(--Secondary)",
                color: "var(--Primary)",
              }}
              onPress={
                currentExamIndex + 1 ===
                mcqQuestions.length +
                  tfQuestions.length +
                  flashCardQuestions.length
                  ? handleFinishExam
                  : handleNextQuestion
              }
            >
              {currentExamIndex + 1 ===
              mcqQuestions.length +
                tfQuestions.length +
                flashCardQuestions.length
                ? "Finish Exam"
                : "Next Question"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamPage;
