import React, { useState } from "react";

const CollapsibleCard: React.FC = () => {
  const [sectionStates, setSectionStates] = useState({
    section1: true,
    section2: true,
    section3: true,
  });

  const toggleCollapse = (sectionId: string) => {
    const newState: {
      section1: boolean;
      section2: boolean;
      section3: boolean;
      [key: string]: boolean;
    } = { ...sectionStates };
    newState[sectionId] = !newState[sectionId];
    for (let section in newState) {
      if (section !== sectionId) {
        newState[section] = true;
      }
    }
    setSectionStates(newState);
  };

  return (
    <>
      <div className="w-full flex flex-col items-center ">
        <button
          className={`bg-[#E9FEC9] text-[#5AA907] font-bold p-[30px] rounded-lg w-[90%] border-[#45800B] border-[1px] justify-between flex ${sectionStates.section1 ? "mb-[1%]" : "border-b-0 rounded-b-none"}`}
          onClick={() => toggleCollapse("section1")}
        >
          Correct Answer
          <img
            src="/down.svg"
            className={`${sectionStates.section1 ? "" : "scale-y-[-1]"}`}
            alt=""
          />
        </button>
        <div className=" border border-x-[#45800B] w-[90%] flex justify-center bg-[#E9FEC9] border-y-0">
          <div
            className={`${sectionStates.section1 ? "hidden" : ""} w-[95%] p-[1px] bg-[#b5ca98]  `}
          ></div>
        </div>
        <div
          className={`${sectionStates.section1 ? "hidden" : "block mb-[1%]"} bg-[#E9FEC9] w-[90%] p-[30px] transition-all duration-300 items-center text-black border-[#45800B] border-[1px] rounded-b-lg border-t-0`}
        >
          Content for Section 1
        </div>
        <button
          className={`bg-[var(--White)] text-[#71717A] font-bold p-[30px] rounded-lg w-[90%] border-[#E4E4E7] border-[1px] justify-between flex ${sectionStates.section2 ? "mb-[1%]" : "border-b-0 rounded-b-none"}`}
          onClick={() => toggleCollapse("section2")}
        >
          Explanation
          <img
            src="/downGray.svg"
            className={`${sectionStates.section2 ? "" : "scale-y-[-1]"}`}
            alt=""
          />
        </button>
        <div className=" border border-x-[#E4E4E7] w-[90%] flex justify-center bg-[var(--White)] border-y-0">
          <div
            className={`${sectionStates.section2 ? "hidden" : ""} w-[95%] p-[1px] bg-[#e4e4e7]  `}
          ></div>
        </div>
        <div
          className={`${sectionStates.section2 ? "hidden" : "block mb-[1%]"} bg-[var(--White)] w-[90%] p-[30px] transition-all duration-300 items-center text-black border-[#E4E4E7] border-[1px] rounded-b-lg border-t-0`}
        >
          Content for Section 1
        </div>
        <button
          className={`bg-[var(--White)] text-[#71717A] font-bold p-[30px] rounded-lg w-[90%] border-[#E4E4E7] border-[1px] flex  justify-between ${sectionStates.section3 ? "mb-[1%]" : "border-b-0 rounded-b-none"}`}
          onClick={() => toggleCollapse("section3")}
        >
          Advice
          <img
            src="/downGray.svg"
            className={`${sectionStates.section3 ? "" : "scale-y-[-1]"}`}
            alt=""
          />
        </button>
        <div className=" border border-x-[#E4E4E7] w-[90%] flex justify-center bg-[var(--White)] border-y-0">
          <div
            className={`${sectionStates.section3 ? "hidden" : ""} w-[95%] p-[1px] bg-[#e4e4e7]  `}
          ></div>
        </div>
        <div
          className={`${sectionStates.section3 ? "hidden" : "block mb-[1%]"} bg-[var(--White)] w-[90%] p-[30px] transition-all duration-300 items-center text-black border-[#E4E4E7] border-[1px] rounded-b-lg border-t-0`}
        >
          Content for Section 1
        </div>
      </div>
    </>
  );
};

export default CollapsibleCard;
