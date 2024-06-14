import { motion } from "framer-motion";
import React from "react";

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
  return (
    <>
      <motion.div
        initial={{ height: "60%" }}
        whileHover={{ height: "100%" }}
        className="bg-[var(--WDarker)] rounded-lg relative flex justify-center p-4 "
        onMouseEnter={() => setHoveredDiv(id)}
        onMouseLeave={() => setHoveredDiv(null)}
      >
        <img src={image} alt={title} />
      </motion.div>
      <motion.div className="bg-[var(--White)] rounded-b-lg flex flex-col justify-center">
        <p className="text-black ml-2 mb-1 font-poppins text-[1vw] font-bold leading-none">
          {title}
        </p>
      </motion.div>
    </>
  );
};

export default ContentComponent;
