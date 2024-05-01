// import React from 'react'
// Import the logo image
import { SectionsHeader } from "@atomic/web-ui"; // Import the SectionsHeader component
import { SingleCourseGrid } from "@atomic/web-ui"; // Import the SectionsHeader component
import Announcements from "@atomic/web-ui/Announcements/Announcements";
import SideBar from "@atomic/web-ui/SideBar/sideBar";
import { useParams } from "react-router-dom";
// import Sidebar from "@atomic/web-ui/SideBar/sideBar";
export default function SingleCoursePage() {
  const { courseName } = useParams();

  const courseContent = [
    {
      header: "Lectures",
      img: "",
      icon: "",
    },
    {
      header: "Exams",
      img: "",
      icon: "",
    },
    {
      header: "Sheets",
      img: "/sheetsIcon.png",
      icon: "",
    },
    {
      header: "Projects",
      img: "/projectsIcon.png",
      icon: "",
    },
    {
      header: "Module information",
      img: "/infoIcon.png",
      icon: "",
    },
    {
      header: "Attendance",
      img: "/attendIcon.png",
      icon: "",
    },
    {
      header: "Announcements",
      img: "",
      icon: "",
    },
    {
      header: "Grades",
      img: "",
      icon: "",
    },
  ];

  return (
    // <div className="h-screen p-[30px] flex justify-between gap-[30px]">
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <SideBar
        primaryLogo="/BUE_Logo.svg"
        secondaryLogo="/miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      {/* <div className=" h-full w-[55vw]  rounded-[13.6px] relative"></div> */}
      <div className="h-full w-[55vw] rounded-[14px] items-center justify-between flex flex-col bg-white p-[30px]">
        <SectionsHeader sectionName={courseName} />
        <SingleCourseGrid courseContent={courseContent} />
      </div>
      <div className="bg-[var(--White)] h-full w-[30vw] rounded-[14px]">
        <Announcements />
      </div>
    </div>
  );
}
