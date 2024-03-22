import { useState } from "react";
import { CoursesGrid } from "@atomic/web-ui";
import { BannerCarousal } from "@atomic/web-ui";
import { Pagination } from "@atomic/web-ui";

export default function CoursesPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };
  const images = [
    {
      src: "/banner.png",
      alt: "banner",
    },
    {
      src: "/banner.png",
      alt: "banner",
    },
    {
      src: "/banner.png",
      alt: "banner",
    },
  ];

  const courses = [
    {
      name: "Algebra",
      semester: "1",
      id: "1",
    },
    {
      name: "Geometry",
      semester: "1",
      id: "2",
    },
    {
      name: "Math",
      semester: "1",
      id: "3",
    },
    {
      name: "Arabic",
      semester: "1",
      id: "4",
    },
    {
      name: "Physics",
      semester: "1",
      id: "5",
    },
    {
      name: "Chemistry",
      semester: "1",
      id: "6",
    },
    {
      name: "Biology",
      semester: "1",
      id: "7",
    },
    {
      name: "Embryology",
      semester: "1",
      id: "8",
    },
    {
      name: "Anatomy",
      semester: "1",
      id: "9",
    },
    {
      name: "Physiology",
      semester: "1",
      id: "10",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalCourses = courses.length;
  const numOfPages = totalCourses / 8;

  // Calculate start and end index based on currentPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the array to display only the relevant portion
  const displayedCourses = courses.slice(startIndex, endIndex);
  return (
    <div className="h-screen p-[30px] flex justify-between gap-[30px]">
      <div className="h-full w-[50vw] rounded-[14px] items-center justify-between flex flex-col bg-white p-[30px] overflow-hidden">
        <div className="flex flex-col gap-[30px]">
          <BannerCarousal images={images} />
          <CoursesGrid
            displayedCourses={displayedCourses}
            currentPage={currentPage}
          />
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numOfPages={numOfPages}
          endIndex={endIndex}
          totalCourses={totalCourses}
        />
      </div>
      <div className="bg-[var(--White)] h-full w-[30vw] rounded-[14px]"> </div>
    </div>
  );
}