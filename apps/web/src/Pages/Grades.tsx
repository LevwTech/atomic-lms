import { useState } from "react";
import Sidebar from "@atomic/web-ui/SideBar/sideBar"; // Import the sideBar component
import { SectionsHeader } from "@atomic/web-ui"; // Import the SectionsHeader component
import { GradeCardOpened, GradeCardClosed } from "@atomic/web-ui"; // Import the sideBar component

export default function Grades() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const [currentGrade, setCurrentGrade] = useState(0);

  const grades = [
    {
      name: "Human Computer",
      grade: "D",
      date: "10 Mar 2024",
      supervisor: "Dr. Ahmed",
      courseworkGrade: 55,
    },
    {
      name: "Human Computer",
      grade: "C",
      date: "10 Mar 2024",
      supervisor: "Dr. Ahmed",
      courseworkGrade: 65,
    },
    {
      name: "Human Computer",
      grade: "B",
      date: "10 Mar 2024",
      supervisor: "Dr. Ahmed",
      courseworkGrade: 75,
    },
    {
      name: "Human Computer",
      grade: "A",
      date: "10 Mar 2024",
      supervisor: "Dr. Ahmed",
      courseworkGrade: 85,
    },
  ];

  return (
    <div className="h-screen p-[30px] flex justify-between gap-[50px]">
      <Sidebar
        primaryLogo="./BUE_Logo.svg"
        secondaryLogo="./miniUniLogo.svg"
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="h-full w-[50vw] rounded-[14px] items-center flex flex-col bg-white p-[30px]">
        <SectionsHeader sectionName={"Grades"} />
        <div className="flex items-center justify-center h-full w-full gap-[60px]">
          <GradeCardClosed
            currentGrade={currentGrade === 0 ? grades.length : currentGrade}
            onClick={() =>
              setCurrentGrade(
                currentGrade === 0 ? grades.length - 1 : currentGrade - 1,
              )
            }
          />
          <GradeCardOpened
            currentGrade={currentGrade}
            name={grades[currentGrade].name}
            grade={grades[currentGrade].grade}
            supervisor={grades[currentGrade].supervisor}
            courseworkGrade={grades[currentGrade].courseworkGrade}
            date={grades[currentGrade].date}
          />
          <GradeCardClosed
            currentGrade={
              currentGrade === grades.length - 1 ? 1 : currentGrade + 2
            }
            onClick={() =>
              setCurrentGrade(
                currentGrade === grades.length - 1 ? 0 : currentGrade + 1,
              )
            }
          />
        </div>
      </div>
      <div className="bg-[var(--White)] h-full w-[30vw] rounded-[14px]"> </div>
    </div>
  );
}
