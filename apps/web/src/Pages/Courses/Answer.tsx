import Sidebar from "@atomic/web-ui/SideBar/sideBar";
import { InstagramStories } from "@atomic/web-ui";
import { CollapsibleCard } from "@atomic/web-ui";
import { Button } from "@atomic/web-ui";
import { AnswerLabel } from "@atomic/web-ui";
function Answer(card: {
  question: string;
  studentAnswer: string;
  answer: string;
  explaination: string;
  advice: string;
}) {
  return (
    <>
      <div className="h-screen p-[30px] flex gap-[30px] ">
        <Sidebar
          primaryLogo="./BUE_Logo.svg"
          secondaryLogo="./miniUniLogo.svg"
          user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
        />
        <div className="h-full w-[80vw] rounded-[14px] flex flex-col bg-[var(--White)] gap-[25px] overflow-y-auto justify-around">
          <InstagramStories />
          <div className="h-full justify-between">
            <div className="flex flex-col mb-24">
              <h1 className="text-[#BCBCBC] font-poppins text-2xl font-normal leading-normal uppercase text-center">
                Question 1/30
              </h1>
              <br />
              <p className="text-[#35383F] text-center font-poppins text-2xl font-bold leading-[35px] uppercase ">
                {card.question}
              </p>
            </div>
            <div className="w-full flex justify-center ">
              <div className="flex flex-col w-full items-center">
                <AnswerLabel isCorrect="partially_correct" />
                <CollapsibleCard />
              </div>
            </div>
          </div>
          <div className="flex justify-center bg-[#FFFF]   p-[20px]">
            <button
              className="hover:bg-[var(--WDarker)] "
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
            >
              <img src="./BackButton.svg" alt="" className="mr-2" />
              Previous Question
            </button>
            <button
              className="hover:bg-[var(--SecondaryDarker)] bg-[var(--Secondary)]"
              style={{
                marginTop: "0",
                height: "40px",
                fontSize: "15px",
                fontWeight: "normal",
                display: "flex",
                alignItems: "center",
                color: "var(--Primary)",
                padding: "0 20px",
                borderRadius: "10px",
              }}
            >
              {"Next Question"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Answer;
