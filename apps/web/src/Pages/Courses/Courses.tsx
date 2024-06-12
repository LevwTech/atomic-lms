import React, { useState } from "react";
import { CoursesGrid } from "@atomic/web-ui";
import { BannerCarousal } from "@atomic/web-ui";
import { Pagination } from "@atomic/web-ui";

export default function CoursesPage1({ courses }) {
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalCourses = courses?.courses.length;
  const numOfPages = totalCourses / 8;

  // Calculate start and end index based on currentPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the array to display only the relevant portion
  const displayedCourses = courses?.courses.slice(startIndex, endIndex);

  return (
    // <div className="h-full  flex justify-between gap-[30px]">
    <div className="h-full w-[50vw] rounded-[14px] items-center justify-between flex flex-col overflow-hidden">
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
    // </div>
  );
}
