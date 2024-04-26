import React, { useState, useEffect, useRef } from "react";
import styles from "./ModuleContent.module.css";
import { motion } from "framer-motion";
import { Pagination } from "../Pagination/Pagination";
interface Lecture {
  id: number;
  title: string;
  date: string;
  url: string;
}
const ModuleContent: React.FC = () => {
  const [batchDownload, setBatchDownload] = useState(false);
  const [selectedLectures, setSelectedLectures] = useState<Lecture[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lecturesPerPage, setLecturesPerPage] = useState(0);
  const itemsPerPage = 12;
  const [hoveredDiv, setHoveredDiv] = useState<number | null>(null);
  const [lectures, setLectures] = useState<Lecture[]>(
    Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      title: `Lecture ${index + 1}`,
      date: "10/19/2023",
      url: `https://example.com/lecture/${index + 1}`,
    })),
  );

  // useEffect(() => {
  //   // Function to measure the height of a single lecture item
  //   const measureLectureHeight = () => {
  //     if (lectureRef.current) {
  //       const lectureHeight = lectureRef.current.offsetHeight;
  //       const lecturesPerPage = Math.floor(window.innerHeight / lectureHeight);
  //       setLecturesPerPage(lecturesPerPage);
  //     }
  //   };

  //   // Initial measurement
  //   measureLectureHeight();

  //   // Re-measure on window resize
  //   window.addEventListener("resize", measureLectureHeight);

  //   // Cleanup
  //   return () => {
  //     window.removeEventListener("resize", measureLectureHeight);
  //   };
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("https://api.example.com/lecture");
  //       const data: Lecture[] = await response.json();
  //       setLectures(data);
  //     } catch (error) {
  //       console.error("Failed to fetch lecture data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const endIndex = currentPage * itemsPerPage;
  //   const startIndex = endIndex - itemsPerPage;
  //   setFilteredLectures(lectures.slice(startIndex, endIndex));
  // }, [currentPage, lectures]);

  const numOfPages = Math.ceil(lectures.length / itemsPerPage);
  const indexOfLastLecture = currentPage * itemsPerPage;
  const indexOfFirstLecture = indexOfLastLecture - itemsPerPage;
  const currentLectures = lectures.slice(
    indexOfFirstLecture,
    indexOfLastLecture,
  );
  useEffect(() => {
    if (!batchDownload) {
      setSelectedLectures([]);
    }
  }, [batchDownload]);

  const handleLectureAddToSelected = (lecture: Lecture) => {
    setSelectedLectures([...selectedLectures, lecture]);
  };
  const handleLectureRemoveFromSelected = (lecture: Lecture) => {
    setSelectedLectures(selectedLectures.filter((l) => l !== lecture));
  };
  const handleLectureSelectAll = () => {
    setSelectedLectures(lectures);
  };
  const handleBatchDownloadClick = () => {
    setBatchDownload(true);
  };

  const handleCancelClick = () => {
    setBatchDownload(false);
  };

  const openLectureInNewTab = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <>
      <div className="bg-[var(--Primary)] w-[100%] h-[9%]  mt-[2%] mb-[3%] rounded flex items-center justify-between">
        <h1 className="text-[var(--White)] text-xl font-bold ml-[2vh]">
          Module Content
        </h1>
        <div
          className={`transition-all duration-500 ease-in-out ${
            batchDownload ? styles.batchDownload : styles.buttons
          }`}
        >
          {!batchDownload ? (
            <button
              className="bg-[var(--PDarker)] mr-2 rounded-[10px]"
              onClick={handleBatchDownloadClick}
            >
              <p className="text-[color:var(--White)] p-[10px]">
                Batch Download
              </p>
            </button>
          ) : (
            <>
              <button
                className="bg-[var(--PDarker)] mr-2 rounded-[10px]"
                onClick={handleCancelClick}
              >
                <p className="text-[color:var(--White)] p-[10px]">Cancel</p>
              </button>
              <button className="bg-[var(--PDarker)] mr-2 rounded-[10px]">
                <p className="text-[color:var(--White)] p-[10px]">
                  Download Selected
                </p>
              </button>
              <button
                className="bg-[var(--PDarker)] rounded-[10px] mr-2"
                onClick={() => handleLectureSelectAll()}
              >
                <p className="text-[color:var(--White)] p-[10px]">Select All</p>
              </button>
            </>
          )}
        </div>
      </div>
      {/* flex flex-wrap justify-between */}
      <div className="  grid grid-cols-4 gap-[3%]">
        {currentLectures.map((lecture) =>
          batchDownload ? (
            <div
              className={`col-span-1 aspect-[144/153] cursor-pointer border-2 rounded-lg p-[8px]
              ${selectedLectures?.includes(lecture) ? `border-[var(--Primary)]` : ``}
              `}
              // onClick={() => openLectureInNewTab(lecture.url)}
              onClick={() => {
                selectedLectures?.includes(lecture)
                  ? handleLectureRemoveFromSelected(lecture)
                  : handleLectureAddToSelected(lecture);
              }}
            >
              {/* <motion.div className=" bg-[var(--WDarker)]  rounded-lg relative flex justify-center p-[18px]">
                <img className=" " src="./LectureIcon.svg" alt="" />
              </motion.div> */}
              <motion.div
                initial={{ height: "60%" }}
                whileHover={{ height: "100%" }}
                onMouseEnter={() => setHoveredDiv(lecture.id)}
                onMouseLeave={() => setHoveredDiv(null)}
                className={`h-[60%]  rounded-lg relative flex justify-center bg-[var(--WDarker)] p-[18px]`}
              >
                <img className=" " src="./LectureIcon.svg" alt="" />
              </motion.div>
              <motion.div className="bg-[var(--White)]  rounded-b-lg flex flex-col justify-center">
                <p className="text-[#000000] ml-[8px] mb-[5px] font-poppins text-[1vw] font-bold leading-none ">
                  Lecture {lecture.id}
                </p>
                <p className="text-[#CCCCCC] ml-[8px] font-poppins text-[0.6vw] font-normal leading-none flex ">
                  <img src="./Time.svg" alt="" />
                  {hoveredDiv !== lecture.id && "10/19/2023"}
                </p>
              </motion.div>
            </div>
          ) : (
            <div
              className=" border-2 rounded-lg p-[8px]  col-span-1 aspect-[144/153] cursor-pointer"
              onClick={() => openLectureInNewTab(lecture.url)}
            >
              <motion.div
                initial={{ height: "60%" }}
                whileHover={{ height: "100%" }}
                className=" bg-[var(--WDarker)]  rounded-lg relative flex justify-center p-[18px]"
                onMouseEnter={() => setHoveredDiv(lecture.id)}
                onMouseLeave={() => setHoveredDiv(null)}
              >
                <img className=" " src="./LectureIcon.svg" alt="" />
              </motion.div>
              <motion.div className="bg-[var(--White)]  rounded-b-lg flex flex-col justify-center">
                <p className="text-[#000000] ml-[8px] mb-[5px] font-poppins text-[1vw] font-bold leading-none ">
                  Lecture {lecture.id}
                </p>
                <p className="text-[#CCCCCC] ml-[8px] font-poppins text-[0.6vw] font-normal leading-none flex ">
                  <img src="./Time.svg" alt="" />
                  {hoveredDiv !== lecture.id && "10/19/2023"}
                </p>
              </motion.div>
            </div>
          ),
        )}
      </div>
      {console.log(lecturesPerPage)}
      <div className="w-full flex justify-center absolute bottom-2 ">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numOfPages={numOfPages}
          endIndex={indexOfLastLecture}
          totalCourses={lectures.length}
        />
      </div>
    </>
  );
};

export default ModuleContent;
