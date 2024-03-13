import { motion } from "framer-motion";
import { CoursesCard } from "@atomic/web-ui";

interface Course {
  displayedCourses: {
    name: string;
    semester: string;
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
          index={index}
          key={index}
          img={`/Asset${index + 1}.png`}
          courseName={course.name}
          semester={course.semester}
        />
      ))}
    </motion.div>
  );
}
