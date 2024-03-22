import { motion } from "framer-motion";
import { CoursesCard } from "@atomic/web-ui";

interface Course {
  displayedCourses: {
    name: string;
    semester: number;
  }[];
  currentPage: number;
}

export function CoursesGrid({
  displayedCourses,
  currentPage,
}: Course): JSX.Element {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{ duration: 1.2, type: "spring" }}
      key={currentPage}
      className="grid grid-cols-4 gap-[20px]"
    >
      {displayedCourses.map((course, index) => (
        <CoursesCard
          courseName={course.name}
          img={`/Asset${index + 1}.png`}
          index={index}
          key={index}
          semester={course.semester}
        />
      ))}
    </motion.div>
  );
}
