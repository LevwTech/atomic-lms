import React, { useState } from "react";
import styles from "./AnswerOrFlashcards.module.css";
function AnswerOrFlashcards({
  showAnswerInput,
  setShowAnswerInput,
}: {
  showAnswerInput: boolean;
  setShowAnswerInput: (showAnswerInput: boolean) => void;
}) {
  return (
    <>
      <textarea
        className="rounded border border-[var(--Primary)] focus:outline-none focus:outline-transparent "
        style={{
          display: showAnswerInput ? "none" : "block",
          marginBottom: "30px",
        }}
        placeholder="Type your answer here..."
      />
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

export default AnswerOrFlashcards;
