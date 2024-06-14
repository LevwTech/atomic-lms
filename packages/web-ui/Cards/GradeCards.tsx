import { motion } from "framer-motion";
import styles from "./GradeCards.module.css";

interface GradeCardClosedProps {
  onClick: () => void;
  currentGrade: number;
}

interface GradeCardOpenedProps {
  name: string;
  grade: string;
  date: string;
  supervisor: string;
  courseworkGrade: number;
  currentGrade: number;
}

export function GradeCardClosed({
  onClick,
  currentGrade,
}: GradeCardClosedProps): JSX.Element {
  return (
    <div
      aria-hidden="true"
      className="h-[350px] w-[25%] flex flex-col items-center justify-center relative bg-[var(--White)] overflow-hidden rounded-[10px] shadow group hover:h-[400px] transition-all duration-300 ease-in-out z-0 cursor-pointer"
      onClick={onClick}
    >
      <img
        alt="Grade Card Pattern"
        className="absolute h-[350px] w-full object-cover mix-blend-multiply group-hover:h-[400px] transition-all duration-300 ease-in-out -z-10 opacity-40"
        src="/Exporting/Patterns/Grade Card.png"
      />
      <span
        className={`w-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[80px] rounded-full absolute G${currentGrade}`}
      />
      <motion.img
        key={currentGrade}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1, type: "tween" }}
        className="w-[40px] absolute h-[40px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-all duration-300 ease-in-out"
        src={`/Asset${currentGrade}.png`}
      />
    </div>
  );
}

export function GradeCardOpened({
  name,
  grade,
  date,
  supervisor,
  courseworkGrade,
  currentGrade,
}: GradeCardOpenedProps): JSX.Element {
  const gradeColors: { [key: string]: string } = {
    "A+": "#75D00F",
    A: "#75D00F",
    "A-": "#75D00F",

    "B+": "#BAC30D",
    B: "#BAC30D",
    "B-": "#BAC30D",

    "C+": "#FFB70A",
    C: "#FFB70A",
    "C-": "#FFB70A",

    "D+": "#F9782D",
    D: "#F9782D",
    "D-": "#F9782D",

    F: "#F33950",
  };

  return (
    <div className="flex flex-col gap-[10px] shadow w-[75%] overflow-hidden rounded-[10px]">
      <div className="h-[450px] w-full flex flex-col items-center justify-center gap-[10px] py-[10px] px-[30px] relative bg-[var(--White)] z-0">
        <img
          alt="Grade Card Pattern"
          className="absolute h-[450px] w-full mix-blend-multiply object-cover -z-10 opacity-40"
          src="/Exporting/Patterns/Grade Card.png"
        />
        <div className="flex relative group">
          <span className="w-[180px] h-[180px] bg-[#CCCCCC]/40 rounded-full" />
          <span
            className={`w-[140px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[140px] rounded-full absolute G${
              currentGrade + 1
            } group-hover:scale-[1.3] transition-all duration-300 ease-in-out`}
          />
          <motion.img
            key={currentGrade}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1, type: "spring", stiffness: 200,damping: 20,}}
            src={`/Asset${currentGrade + 1}.png`}
            className="w-[80px] absolute h-[80px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-[1.3] transition-all duration-300 ease-in-out"
          />
        </div>
        <div className="flex flex-col items-center capitalize">
          <motion.p
            key={currentGrade}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1, type: "tween" }}
            className={`${styles.cardTypographyHeader}`}
          >
            {name}
          </motion.p>
          <p className={`${styles.cardTypographySubHeader}`}>
            Coursework Grade
          </p>
        </div>
        <div
          className={`${styles.cardTypographyGrade} h-[50px] flex w-[200px] rounded-full items-center justify-center`}
          style={{ backgroundColor: gradeColors[grade] as string }}
        >
          <motion.p
            key={currentGrade}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1, type: "tween" }}
          >
            {grade}
          </motion.p>
        </div>
      </div>
      <div className="gap-[10px] flex flex-col px-[25px] pt-[10px] pb-[30px]">
        <div className="flex justify-between">
          <p className={`${styles.cardTypographyVariablesBold}`}>
            Coursework Grade
          </p>
          <motion.p
            key={currentGrade}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1, type: "tween" }}
            className={`${styles.cardTypographyVariables}`}
          >
            {courseworkGrade}
          </motion.p>
        </div>
        <div className="flex justify-between">
          <p className={`${styles.cardTypographyVariablesBold}`}>Date Taken</p>
          <motion.p
            key={currentGrade}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1, type: "tween" }}
            className={`${styles.cardTypographyVariables}`}
          >
            {date}
          </motion.p>
        </div>
        <div className="flex justify-between">
          <p className={`${styles.cardTypographyVariablesBold}`}>Supervisor</p>
          <motion.p
            key={currentGrade}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1, type: "tween" }}
            className={`${styles.cardTypographyVariables}`}
          >
            {supervisor}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
