import { motion } from "framer-motion";
import { useState } from "react";

export interface Lecture {
  id: number;
  url: string;
}

export interface LectureCardProps {
  lecture: Lecture;
  setHoveredDiv: (id: number | null) => void;
  hoveredDiv: number | null;
}
const LectureComponent: React.FC<LectureCardProps> = ({
  lecture,
  setHoveredDiv,
  hoveredDiv,
}) => {
  return (
    <>
      <motion.div
        initial={{ height: "60%" }}
        whileHover={{ height: "100%" }}
        className="bg-[var(--WDarker)] rounded-lg relative flex justify-center p-4"
        onMouseEnter={() => setHoveredDiv(lecture.id)}
        onMouseLeave={() => setHoveredDiv(null)}
      >
        <img src="/lectureIcon.svg" alt="" />
      </motion.div>
      <motion.div className="bg-[var(--White)] rounded-b-lg flex flex-col justify-center">
        <p className="text-black ml-2 mb-1 font-poppins text-[1vw] font-bold leading-none">
          Lecture {lecture.id}
        </p>
        <p className="text-[#CCCCCC] ml-2 font-poppins text-[0.6vw] font-normal leading-none flex">
          <img src="./Time.svg" alt="" />
          {hoveredDiv !== lecture.id && "10/19/2023"}
        </p>
      </motion.div>
    </>
  );
};

export default LectureComponent;
