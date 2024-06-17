import SideBar from "@atomic/web-ui/SideBar/sideBar";
import { useState } from "react";

function Chatbot() {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className=" h-full flex flex-col w-[85vw] bg-[var(--White)] rounded-[13.6px] ">
      <div className="flex items-center h-[10%] border-b">
        <div className="flex justify-between items-center px-[20px] border-r h-full w-[75%] bg-[#f5f5f5]">
          <p className="text-[20px] font-medium">Room Title</p>
          <select className={`rounded py-[5px] cursor-pointer`} id="type">
            <option value="Lectures">Lectures</option>
            <option value="Sheets">Sheets</option>
            <option value="Module information">Module Information</option>
            <option value="Exams">Exams</option>
            <option value="Projects">Projects</option>
            <option value="Grades">Grades</option>
          </select>
        </div>
        <div className="flex justify-between items-center w-[25%] px-[20px]">
          <p className="text-[20px] font-medium">
            Rooms <span className="text-[#D2D2D2]">{"(9)"}</span>
          </p>
          <span>
            <img src="/threeDots.svg" />
          </span>
        </div>
      </div>
      <div className="flex h-[90%]">
        <div className="items-center flex-col relative flex justify-center h-full gap-6 border-r w-[75%] bg-[#f5f5f5]">
          <img src="/chatbotLogo.svg" />
          <p className="font-bold text-5xl">Hey there! I'm Atomic.</p>
          <p className="font-normal text-2xl text-center w-[70%]">
            Simplify your college studies with summaries, notes, and assignment
            guidance.
          </p>
          <div className="absolute flex flex-col bottom-4 left-1/2 transform border rounded-[10px] w-[90%] -translate-x-1/2 bg-white border-[#FF3C7D]">
            <div className="flex">
              <textarea
                placeholder="Ask me anything you want..."
                className="w-[93%] p-[20px] focus:ring-transparent border-none bg-transparent resize-none"
                value={inputValue}
                onChange={(e) => handleChange(e)}
              />
              <button className="w-[7%] group flex items-center justify-center">
                <img
                  className="group-hover:scale-125 transition-all"
                  src="/sendIcon.svg"
                />
              </button>
            </div>
            <div className="flex justify-between px-[20px] py-[10px] bg-[#f5f5f5] rounded-b-[10px] border ">
              <div className="flex items-center gap-1 font-medium">
                <img src="/attach.svg" />
                <p> Attach</p>
              </div>
              <p>{inputValue.length}/3000</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center w-[25%] px-[10px]"></div>
      </div>
    </div>
  );
}

export default function AiChatbot() {
  return (
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <SideBar
        primaryLogo="/BUE_Logo.svg"
        secondaryLogo="/miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <Chatbot />
    </div>
  );
}
