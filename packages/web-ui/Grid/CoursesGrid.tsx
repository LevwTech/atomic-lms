import { motion } from "framer-motion";
import { CoursesCard } from "@atomic/web-ui";

interface Course {
  displayedCourses: {
    name: string;
    semester: number;
    id: string;
  }[];
  currentPage: number;
}

export function CoursesGrid({
  displayedCourses,
  currentPage,
}: Course): JSX.Element {
  return (
    <motion.div
      animate={{ x: 0, opacity: 1 }}
      className="grid grid-cols-4 gap-[20px]"
      exit={{ x: -300, opacity: 0 }}
      initial={{ x: 300, opacity: 0 }}
      key={currentPage}
      transition={{ duration: 1.2, type: "spring" }}
    >
      {displayedCourses.map((course, index) => (
        <CoursesCard
          id={course.id}
          academicDuration={course.academicDuration}
          courseName={course.name}
          img={`/Asset${index + 1}.png`}
          index={index}
          key={index}
        />
      ))}
    </motion.div>
  );
}
