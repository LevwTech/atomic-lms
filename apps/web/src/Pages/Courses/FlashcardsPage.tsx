import Sidebar from "@atomic/web-ui/SideBar/sideBar";
import InstagramStories from "@atomic/web-ui/InstagramStories/InstagramStories";
import Flashcards from "@atomic/web-ui/Flashcards/Flashcard";
import AnswerOrFlashcards from "@atomic/web-ui/AnswerOrFlashcards/AnswerOrFlashcards";
import { Button } from "@atomic/web-ui/Button/button";
import { useState } from "react";
function FlashcardsPage() {
  const [showAnswerInput, setShowAnswerInput] = useState(false);
  return (
    <div className="h-screen p-[30px] flex gap-[30px] ">
      <Sidebar
        primaryLogo="./BUE_Logo.svg"
        secondaryLogo="./miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <div className="h-full w-[80vw] rounded-[14px] flex flex-col bg-[var(--White)] gap-[25px] overflow-y-auto">
        <InstagramStories />
        <div className="h-full">
          <Flashcards
            card={{
              question: "Lorem ipsum dolor sit amet consectetur",
              answer:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio similique exercitationem doloremque nostrum amet velit voluptatum quo perferendis officiis.",
              explaination:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio similique exercitationem doloremque nostrum amet velit voluptatum quo perferendis officiis.",
            }}
          />
        </div>
        <div className="flex flex-col ">
          <AnswerOrFlashcards
            showAnswerInput={showAnswerInput}
            setShowAnswerInput={setShowAnswerInput}
          />
          <div className="flex justify-center bg-[#FFFF]   mt-[50px]  p-[20px]">
            <button
              className="hover:bg-[var(--Secondary)] "
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
            >
              {showAnswerInput ? "Check Answer" : "Next Question"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlashcardsPage;
