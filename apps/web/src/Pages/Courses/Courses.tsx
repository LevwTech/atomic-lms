import { useEffect, useState } from "react";
import { CoursesGrid } from "@atomic/web-ui";
import { BannerCarousal } from "@atomic/web-ui";
import { Pagination } from "@atomic/web-ui";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function CoursesPage1() {
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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || "1"),
  );

  const [type, setType] = useState<string | null>(
    searchParams.get("type") || null,
  );

  const [limit, setLimit] = useState<number>(
    parseInt(searchParams.get("limit") || "5"),
  );

  useEffect(() => {
    searchParams.set("page", page.toString());
    searchParams.set("limit", limit.toString());
    if (type) {
      searchParams.set("type", type);
    } else {
      searchParams.delete("type");
    }
    window.history.replaceState(
      null,
      "",
      `${location.pathname}?${searchParams.toString()}`,
    );
  }, [page, limit, location.pathname, searchParams, type]);

  const { isLoading, data: courses } = useQuery({
    queryKey: ["users", { page }],
    queryFn: () =>
      fetch(`http://localhost:3000/course/course?option=ENROLLED`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalCourses = courses?.courses.length;
  const numOfPages = totalCourses / 8;

  // Calculate start and end index based on currentPage
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the array to display only the relevant portion
  const displayedCourses = courses?.courses.slice(startIndex, endIndex);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
