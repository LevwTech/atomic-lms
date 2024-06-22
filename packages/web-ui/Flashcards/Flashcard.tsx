import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Flashcard.module.css"; // Adjust the import according to your styles location

const flashcardVariants = {
  initial: { opacity: 0, rotateY: 90, transition: { duration: 0.5 } },
  animateFront: { opacity: 1, rotateY: 0, transition: { duration: 0.5 } },
  animateBack: { opacity: 1, rotateY: 180, transition: { duration: 0.5 } },
  exit: { opacity: 0, rotateY: -90, transition: { duration: 0.5 } },
};

export const Flashcard = ({
  card,
  flippable = true,
  flipped,
  setFlipped,
  currentIndex,
  numOfQuestions,
}: {
  card: { question: string; answer: string; explaination: string };
  flippable?: boolean;
  flipped: boolean;
  currentIndex: number;
  numOfQuestions: number;
  setFlipped: (flipped: boolean) => void;
}) => {
  console.log("card", card);
  const flashcardHeight =
    Math.ceil(Math.max(card.question.length / 45, card.answer.length / 45)) *
      50 +
    50;
  return (
    <motion.div
      className={`${styles.flashcards} relative`}
      style={{ height: `${flashcardHeight}px` }}
      initial="initial"
      animate={flipped ? "animateBack" : "animateFront"}
      variants={flashcardVariants}
      onClick={() => {
        if (flippable) setFlipped(!flipped);
      }}
    >
      <div
        className={`absolute inset-0 ${styles.backfaceHidden} ${flipped ? "hidden" : ""} p-[30px] flex flex-col items-center justify-center`}
      >
        <h1 className="text-[#BCBCBC] font-poppins text-2xl font-normal leading-normal uppercase text-center">
          Question {currentIndex + 1}/{numOfQuestions}
        </h1>
        <br />
        <p className="text-[#35383F] text-center font-poppins text-2xl font-bold leading-[35px] uppercase">
          {card.question}
        </p>
      </div>
      <div
        className={`absolute inset-0 ${styles.backfaceHidden} ${flipped && flippable ? "" : "hidden"}  p-[30px]`}
      >
        <h1
          className={`text-[#BCBCBC] font-poppins text-2xl font-normal leading-normal uppercase text-center  ${styles.mirroredText}`}
        >
          Answer
        </h1>
        <br />
        <p
          className={`text-[#35383F] text-center font-poppins text-2xl font-bold leading-[35px] uppercase ${styles.mirroredText} `}
        >
          {card.answer}
        </p>
      </div>
    </motion.div>
  );
};
