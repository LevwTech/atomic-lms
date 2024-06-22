import React, { useState } from "react";
import styles from "./AnswerOrFlashcards.module.css";

const FlashCardInput = ({
  handleChange,
  value,
}: {
  handleChange: (studentAnswer: string) => void;
  value: string;
}) => (
  <div className="absolute flex flex-col bottom-48 left-1/2 transform border rounded-[10px] w-[90%] -translate-x-1/2 bg-white border-[#FF3C7D]">
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

export function AnswerOrFlashcards({
  showAnswerInput,
  setShowAnswerInput,
  value,
  setValue,
}: {
  showAnswerInput: boolean;
  setShowAnswerInput: (showAnswerInput: boolean) => void;
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <>
      {!showAnswerInput && (
        <FlashCardInput handleChange={setValue} value={value} />
      )}
      <div className="flex items-center justify-center">
        <p className="text-[#71717A] mr-3">Short Answer</p>
        <button
          className={`${styles.toggle_btn} mr-3 ${showAnswerInput ? `${styles.toggled} ` : ""}`}
          onClick={() => setShowAnswerInput(!showAnswerInput)}
        >
          <div className={styles.thumb}></div>
        </button>
        <p className="text-[#71717A]">Flashcards</p>
      </div>
    </>
  );
}
