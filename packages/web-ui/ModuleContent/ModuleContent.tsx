import React, { useState, useEffect, useRef } from "react";
import styles from "./ModuleContent.module.css";
import { motion } from "framer-motion";
import { Pagination } from "../Pagination/Pagination";
import { SectionsHeader } from "../headers/SectionsHeader";
import LectureComponent from "../contentComponent/LectureComponent";
import ContentComponent from "../contentComponent/ContentComponent";

interface DownloadComponentProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}
const DownloadComponentImg: React.FC<DownloadComponentProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="current"
      d="M11.502.5c2.543 0 4.253 1.785 4.253 4.433v6.127c0 2.655-1.71 4.44-4.253 4.44H5c-2.542 0-4.245-1.785-4.245-4.44V4.932C.755 2.286 2.458.5 5 .5h6.502ZM8.255 4.378a.557.557 0 0 0-.563.562v4.763L5.84 7.843a.575.575 0 0 0-.397-.165.59.59 0 0 0-.398.165.566.566 0 0 0 0 .794l2.813 2.828c.21.21.585.21.795 0l2.812-2.828a.566.566 0 0 0 0-.795.575.575 0 0 0-.803 0l-1.845 1.86V4.94a.562.562 0 0 0-.562-.563Z"
    />
  </svg>
);

interface SelectAllProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}
const SelectAllImg: React.FC<SelectAllProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="current"
      d="M4.455 7.919c.881 0 1.588.713 1.588 1.6v2.13c0 .882-.707 1.6-1.588 1.6H2.342a1.596 1.596 0 0 1-1.587-1.6V9.52c0-.887.713-1.6 1.587-1.6h2.113Zm7.213 0c.875 0 1.587.713 1.587 1.6v2.13c0 .882-.712 1.6-1.587 1.6H9.555a1.592 1.592 0 0 1-1.587-1.6V9.52c0-.887.706-1.6 1.587-1.6h2.113ZM4.455.75c.881 0 1.588.719 1.588 1.6v2.131c0 .888-.707 1.6-1.588 1.6H2.342a1.592 1.592 0 0 1-1.587-1.6v-2.13c0-.882.713-1.6 1.587-1.6h2.113Zm7.213 0c.875 0 1.587.719 1.587 1.6v2.131c0 .888-.712 1.6-1.587 1.6H9.555a1.588 1.588 0 0 1-1.587-1.6v-2.13c0-.882.706-1.6 1.587-1.6h2.113Z"
    />
  </svg>
);

// interface Lecture {
//   id: number;
//   title: string;
//   date: string;
//   url: string;
// }
interface Content {
  id: number;
  title: string;
  date: string;
  url: string;
  image: string;
}
const ModuleContent: React.FC = () => {
  const [batchDownload, setBatchDownload] = useState(false);
  const [selectedContents, setSelectedContents] = useState<Content[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentType, setContentType] = useState("Lecture");
  const itemsPerPage = 12;
  const [hoveredDiv, setHoveredDiv] = useState<number | null>(null);
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const newContents = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      title: `${contentType} ${index + 1}`,
      date: "10/19/2023",
      url: `https://example.com/${contentType.toLowerCase()}/${index + 1}`,
      image: `/${contentType.toLowerCase()}Icon.svg`,
    }));
    {
      console.log(`${contentType.toLowerCase()}Icon.svg`);
    }
    setContents(newContents);
  }, [contentType]);

  const numOfPages = Math.ceil(contents.length / itemsPerPage);
  const indexOfLastContent = currentPage * itemsPerPage;
  const indexOfFirstContent = indexOfLastContent - itemsPerPage;
  const currentContents = contents.slice(
    indexOfFirstContent,
    indexOfLastContent,
  );

  const handleContentAddToSelected = (content: Content) => {
    setSelectedContents([...selectedContents, content]);
  };
  const handleContentRemoveFromSelected = (content: Content) => {
    setSelectedContents(selectedContents.filter((c) => c !== content));
  };
  const handleContentSelectAll = () => {
    setSelectedContents(contents);
  };
  const handleBatchDownloadClick = () => {
    setBatchDownload(true);
  };

  const handleCancelClick = () => {
    setBatchDownload(false);
  };

  const openContentInNewTab = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col h-full justify-between p-[30px]">
      <div className="flex flex-col">
        <div className="flex h-[75px] text-white items-center px-[15px] py-[15px] w-full rounded-[5px] justify-between bg-[var(--Primary)]">
          <select
            id="type"
            className={`rounded py-[5px] focus:border-none cursor-pointer bg-[var(--Primary)] `}
            onChange={(e) => setContentType(e.target.value)}
            value={contentType}
          >
            <option value="Lecture">Lectures</option>
            <option value="Tutorial">Tutorials</option>
            <option value="Exam">Exams</option>
            <option value="Project">Projects</option>
            <option value="ModuleInfo">Module Information</option>
          </select>
          <div
            className={`transition-all duration-500 ease-in-out flex ${
              batchDownload ? styles.batchDownload : styles.buttons
            }`}
          >
            {!batchDownload ? (
              <button
                className="bg-[var(--Secondary)] mr-2 rounded-[10px] flex p-[10px] items-center"
                onClick={handleBatchDownloadClick}
              >
                <DownloadComponentImg fill="var(--Primary)" />
                <p className="ml-1 text-[color:var(--Primary)]">
                  Batch Download
                </p>
              </button>
            ) : (
              <>
                <button
                  className="bg-[#F33950] mr-2 rounded-[10px] p-[10px] flex"
                  onClick={handleCancelClick}
                >
                  <img className="mr-2" src="/Cancel.svg" alt="" />
                  <p className="text-[color:var(--White)]">Cancel</p>
                </button>
                <button className="bg-[var(--White)] mr-2 rounded-[10px] flex p-[10px] items-center">
                  <DownloadComponentImg fill="var(--Primary)" />
                  <p className="ml-1 text-[color:var(--Primary)]">
                    Download Selected
                  </p>
                </button>
                <button
                  className="bg-[var(--White)] rounded-[10px] mr-2 flex p-[10px] items-center"
                  onClick={handleContentSelectAll}
                >
                  <SelectAllImg fill="var(--Primary)" />
                  <p className="ml-1 text-[color:var(--Primary)]">Select All</p>
                </button>
              </>
            )}
          </div>
        </div>
        <div className="h-fit mt-[30px] grid grid-cols-4 gap-[3%]">
          {currentContents.map((content) =>
            batchDownload ? (
              <div
                className={`border-2 rounded-lg p-[8px] col-span-1 aspect-[153/142] cursor-pointer flex flex-col justify-between ${
                  selectedContents?.includes(content)
                    ? `border-[var(--Primary)]`
                    : ``
                }`}
                onClick={() => {
                  selectedContents?.includes(content)
                    ? handleContentRemoveFromSelected(content)
                    : handleContentAddToSelected(content);
                }}
              >
                <ContentComponent
                  id={content.id}
                  title={content.title}
                  date={content.date}
                  url={content.url}
                  image={content.image}
                  setHoveredDiv={setHoveredDiv}
                  hoveredDiv={hoveredDiv}
                />
              </div>
            ) : (
              <div
                className="border-[2px] rounded-lg p-2 col-span-1 aspect-[153/142] cursor-pointer flex flex-col  flex-grow-1"
                onClick={() => openContentInNewTab(content.url)}
              >
                <ContentComponent
                  id={content.id}
                  title={content.title}
                  date={content.date}
                  url={content.url}
                  image={content.image}
                  setHoveredDiv={setHoveredDiv}
                  hoveredDiv={hoveredDiv}
                />
              </div>
            ),
          )}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numOfPages={numOfPages}
          endIndex={indexOfLastContent}
          totalCourses={contents.length}
        />
      </div>
    </div>
  );
};
export default ModuleContent;
