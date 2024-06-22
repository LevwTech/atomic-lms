import Sidebar from "@atomic/web-ui/SideBar/sideBar";
import { AnswerLabel, CollapsibleCard, InstagramStories } from "@atomic/web-ui";
import { Flashcard } from "@atomic/web-ui";
import { AnswerOrFlashcards } from "@atomic/web-ui";
import { Button } from "@atomic/web-ui";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";

function FlashcardsPage() {
  const { courseId, sectionId, attachmentId } = useParams();
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [flashCards, setFlashCards] = useState<
    {
      _id: string;
      explanation: string;
      question: string;
      answer: string;
      pageNumber: number;
      isCorrect: string;
      advice: string;
      studentAnswer: string;
      answered: boolean;
    }[]
  >([]);
  const [checkingAnswer, setCheckingAnswer] = useState(false);

  const { isLoading, data: fetched } = useQuery({
    queryKey: ["flashCards", { courseId, sectionId, attachmentId }],
    queryFn: () =>
      fetch(`http://localhost:3000/ai/get-attachment-flashcards`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          courseId,
          sectionId,
          attachmentId,
        }),
      }).then((res) => res.json()),
  });

  useEffect(() => {
    if (fetched) {
      console.log("hereeeee");
      setFlashCards([
        ...fetched.map((card: any) => ({
          ...card,
          isCorrect: "",
          advice: "",
          studentAnswer: "",
          answered: false,
        })),
      ]);
    }
  }, [fetched]);

  const handleNextQuestion = () => {
    if (currentIndex < flashCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleGradeQuestion = async () => {
    if (flashCards[currentIndex].studentAnswer === "") return;
    setCheckingAnswer(true);
    const res = await fetch(`http://localhost:3000/ai/flashcards/answer`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        courseId,
        sectionId,
        attachmentId,
        questionId: flashCards[currentIndex]._id,
        answer: flashCards[currentIndex].studentAnswer,
      }),
    }).then((res) => res.json());

    const newFlashCards = [...flashCards];
    newFlashCards[currentIndex].isCorrect = res.isCorrect;
    newFlashCards[currentIndex].advice = res.advise;
    newFlashCards[currentIndex].answered = true;
    newFlashCards[currentIndex].explanation = res.explaination;
    setFlashCards(newFlashCards);

    setCheckingAnswer(false);
  };

  if (isLoading || flashCards.length === 0) {
    return (
      <div className="h-screen p-[40px] flex flex-col justify-center items-center gap-[40px]">
        <ReactLoading type="spinningBubbles" color="#11664F" />
      </div>
    );
  }

  console.log("flashCards", flashCards);

  return (
    <div className="h-screen p-[30px] flex gap-[30px] ">
      <Sidebar
        primaryLogo="./BUE_Logo.svg"
        secondaryLogo="./miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <div className="h-full w-[80vw] rounded-[14px] flex flex-col bg-[var(--White)] gap-[25px] overflow-y-auto">
        <InstagramStories
          questions={flashCards}
          currentQuestionNumber={currentIndex}
        />
        <div className="h-full flex items-center">
          <Flashcard
            flipped={flipped}
            setFlipped={setFlipped}
            flippable={showAnswerInput}
            card={{
              question: flashCards[currentIndex].question,
              answer: flashCards[currentIndex].answer,
              explaination: flashCards[currentIndex].explanation,
            }}
            currentIndex={currentIndex}
            numOfQuestions={flashCards.length}
          />
        </div>
        <div className="flex flex-col relative items-center justify-center">
          {flashCards[currentIndex].answered ? (
            <div className="flex flex-col gap-2 w-[70%] items-center justify-center">
              <AnswerLabel isCorrect={flashCards[currentIndex].isCorrect} />
              <CollapsibleCard
                correctAnswer={flashCards[currentIndex].answer}
                explanation={flashCards[currentIndex].explanation}
                advice={flashCards[currentIndex].advice}
                haveAdvice={true}
              />
            </div>
          ) : (
            <AnswerOrFlashcards
              value={flashCards[currentIndex].studentAnswer}
              setValue={(val: string) => {
                const newFlashCards = [...flashCards];
                newFlashCards[currentIndex].studentAnswer = val;
                setFlashCards(newFlashCards);
              }}
              showAnswerInput={showAnswerInput}
              setShowAnswerInput={(val: boolean) => {
                if (!val) setFlipped(false);
                setShowAnswerInput(val);
              }}
            />
          )}
          <div className="flex justify-center bg-[#FFFF] mt-[50px]  p-[20px] w-full">
            <button
              className="hover:bg-[var(--Secondary)]"
              onClick={handlePreviousQuestion}
              style={{
                display: "flex",
                alignItems: "center",
                color: "var(--Primary)",
                height: "40px",
                fontSize: "15px",
                marginRight: "20px",
                // backgroundColor: "var(--Secondary)",
                padding: "0 20px",
                borderRadius: "10px",
              }}
            >
              <img src="./BackButton.svg" alt="" className="mr-2" />
              Previous Question
            </button>
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
              onPress={() => {
                if (!showAnswerInput && !flashCards[currentIndex].answered) {
                  handleGradeQuestion();
                } else {
                  handleNextQuestion();
                }
              }}
            >
              {!showAnswerInput && !flashCards[currentIndex].answered ? (
                checkingAnswer ? (
                  <ReactLoading
                    type="spinningBubbles"
                    color="#11664F"
                    width={15}
                    height={15}
                  />
                ) : (
                  "Check Answer"
                )
              ) : (
                "Next Question"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashcardsPage;
