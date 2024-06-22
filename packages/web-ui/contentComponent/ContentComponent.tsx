import { motion } from "framer-motion";
import React, { useState } from "react";

export interface ContentProps {
  id: number;
  title: string;
  date: string;
  url: string;
  image: string;
  setHoveredDiv: (id: number | null) => void;
  hoveredDiv: number | null;
}

const ContentComponent: React.FC<ContentProps> = ({
  id,
  title,
  date,
  url,
  image,
  setHoveredDiv,
  hoveredDiv,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <motion.div
        initial={{ height: "80%" }}
        whileHover={{ height: "100%" }}
        className={`${id === 12345 ? (isHovered ? "bg-gradient-to-tl from-[#FFE53B] to-[#00FFFF]" : "bg-gradient-to-tl from-[#00FFFF] to-[#FFE53B]") : "bg-[var(--WDarker)]"} rounded-lg relative flex justify-center p-2`}
        onMouseEnter={() => {
          setHoveredDiv(id);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setHoveredDiv(null);
          setIsHovered(false);
        }}
      >
        <img src={image} alt={title} />
      </motion.div>
      <motion.div className="bg-[var(--White)] rounded-b-lg flex flex-col justify-center">
        <p
          className={`text-black ml-2 mb-1 font-poppins text-[1vw] font-bold leading-none mt-2 ${isHovered ? "break-words hyphens-auto" : "truncate"}`}
        >
          {title}
        </p>
      </motion.div>
    </>
  );
};

export default ContentComponent;
