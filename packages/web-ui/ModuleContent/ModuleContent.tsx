import React, { useState, useEffect } from "react";
import { Pagination } from "../Pagination/Pagination";
import ContentComponent from "../contentComponent/ContentComponent";
import styles from "./ModuleContent.module.css";
import { useNavigate } from "react-router-dom";

interface DownloadComponentProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}
const DownloadComponentImg: React.FC<DownloadComponentProps> = (props) => (
  <svg
    fill="none"
    height={16}
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11.502.5c2.543 0 4.253 1.785 4.253 4.433v6.127c0 2.655-1.71 4.44-4.253 4.44H5c-2.542 0-4.245-1.785-4.245-4.44V4.932C.755 2.286 2.458.5 5 .5h6.502ZM8.255 4.378a.557.557 0 0 0-.563.562v4.763L5.84 7.843a.575.575 0 0 0-.397-.165.59.59 0 0 0-.398.165.566.566 0 0 0 0 .794l2.813 2.828c.21.21.585.21.795 0l2.812-2.828a.566.566 0 0 0 0-.795.575.575 0 0 0-.803 0l-1.845 1.86V4.94a.562.562 0 0 0-.562-.563Z"
      fill="current"
    />
  </svg>
);

interface SelectAllProps extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}
const SelectAllImg: React.FC<SelectAllProps> = (props) => (
  <svg
    fill="none"
    height={14}
    width={14}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.455 7.919c.881 0 1.588.713 1.588 1.6v2.13c0 .882-.707 1.6-1.588 1.6H2.342a1.596 1.596 0 0 1-1.587-1.6V9.52c0-.887.713-1.6 1.587-1.6h2.113Zm7.213 0c.875 0 1.587.713 1.587 1.6v2.13c0 .882-.712 1.6-1.587 1.6H9.555a1.592 1.592 0 0 1-1.587-1.6V9.52c0-.887.706-1.6 1.587-1.6h2.113ZM4.455.75c.881 0 1.588.719 1.588 1.6v2.131c0 .888-.707 1.6-1.588 1.6H2.342a1.592 1.592 0 0 1-1.587-1.6v-2.13c0-.882.713-1.6 1.587-1.6h2.113Zm7.213 0c.875 0 1.587.719 1.587 1.6v2.131c0 .888-.712 1.6-1.587 1.6H9.555a1.588 1.588 0 0 1-1.587-1.6v-2.13c0-.882.706-1.6 1.587-1.6h2.113Z"
      fill="current"
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
  _id: string;
  title: string;
  fileName: string;
  key: string;
  url: string;
  contentType: string;
}

const ModuleContent: React.FC<{
  type: string;
  files: Content[];
  userType: "STUDENT" | "TEACHER";
  changeSection: (sectionTitle: string) => void;
  goToUpload: () => void;
  openFile: (_id: string) => void;
}> = ({ type, files, changeSection, userType, goToUpload, openFile }) => {
  const [batchDownload, setBatchDownload] = useState(false);
  const [selectedContents, setSelectedContents] = useState<Content[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [contentType, setContentType] = useState(type);
  const itemsPerPage = 12;
  const [hoveredDiv, setHoveredDiv] = useState<number | null>(null);
  const [contents, setContents] = useState<Content[]>([]);
  useEffect(() => {
    // const newContents = Array.from({ length: 20 }, (_, index) => ({
    //   id: index + 1,
    //   title: `${contentType} ${index + 1}`,
    //   date: "10/19/2023",
    //   url: `https://example.com/${contentType.toLowerCase()}/${index + 1}`,
    //   image: `/${contentType.toLowerCase()}Icon.svg`,
    // }));
    // {
    //   console.log(`${contentType.toLowerCase()}Icon.svg`);
    // }
    setContents(files);
    setContentType(type);
  }, [contentType, files]);

  console.log(contentType);

  const numOfPages = Math.ceil(contents?.length / itemsPerPage);
  const indexOfLastContent = currentPage * itemsPerPage;
  const indexOfFirstContent = indexOfLastContent - itemsPerPage;
  const currentContents = contents?.slice(
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

  if (!contents) return null;

  return (
    <div className="flex flex-col h-full justify-between p-[30px]">
      <div className="flex flex-col">
        <div className="flex h-[75px] text-white items-center px-[15px] py-[15px] w-full rounded-[5px] justify-between bg-[var(--Primary)]">
          <select
            className={`rounded py-[5px] focus:border-none cursor-pointer bg-[var(--Primary)] `}
            id="type"
            onChange={(e) => {
              // setContentType(e.target.value);
              changeSection(e.target.value);
            }}
            value={contentType}
          >
            <option value="Lectures">Lectures</option>
            <option value="Sheets">Sheets</option>
            <option value="Module information">Module Information</option>
            <option value="Exams">Exams</option>
            <option value="Projects">Projects</option>
            <option value="Grades">Grades</option>
          </select>
          {userType === "STUDENT" && (
            <div
              className={`transition-all duration-500 ease-in-out flex ${
                batchDownload ? styles.batchDownload : styles.buttons
              }`}
            >
              {!batchDownload ? (
                <button
                  className="bg-[#F33950] mr-2 rounded-[10px] p-[10px] flex items-center"
                  onClick={handleCancelClick}
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
                    <img alt="" className="mr-2" src="/Cancel.svg" />
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
                    <p className="ml-1 text-[color:var(--Primary)]">
                      Select All
                    </p>
                  </button>
                </>
              )}
            </div>
          )}
          {userType === "TEACHER" && (
            <button
              className="bg-[#B7ED3F] text-[#11664F] px-4 py-2 rounded-md flex justify-center items-center"
              onClick={goToUpload}
            >
              <img alt="" className="mr-2" src="/uploadIcon.svg" />
              Upload
            </button>
          )}
        </div>
        <div className="h-fit mt-[30px] grid grid-cols-4 gap-[3%]">
          {currentContents?.map((content, index) =>
            batchDownload ? (
              <div
                key={index}
                className={`border-2 rounded-lg p-[8px] col-span-1 aspect-[153/142] cursor-pointer flex flex-col justify-between ${
                  selectedContents.includes(content)
                    ? `border-[var(--Primary)]`
                    : ``
                }`}
                onClick={() => {
                  selectedContents.includes(content)
                    ? handleContentRemoveFromSelected(content)
                    : handleContentAddToSelected(content);
                }}
              >
                <ContentComponent
                  date={"10/19/2023"}
                  hoveredDiv={hoveredDiv}
                  id={index}
                  image={`/${contentType.slice(0, contentType.length - 1).toLowerCase()}Icon.svg`}
                  setHoveredDiv={setHoveredDiv}
                  title={content.title}
                  url={content.url}
                />
              </div>
            ) : (
              <div
                key={index}
                className="border-2 rounded-lg p-[8px] col-span-1 aspect-[153/142] cursor-pointer flex flex-col justify-between"
                onClick={() => {
                  openFile(content._id);
                }}
              >
                <ContentComponent
                  date={"10/19/2023"}
                  hoveredDiv={hoveredDiv}
                  id={index}
                  image={`/${contentType.slice(0, contentType.length - 1).toLowerCase()}Icon.svg`}
                  setHoveredDiv={setHoveredDiv}
                  title={content.title}
                  url={content.url}
                />
              </div>
            ),
          )}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <Pagination
          currentPage={currentPage}
          endIndex={indexOfLastContent}
          numOfPages={numOfPages}
          setCurrentPage={setCurrentPage}
          totalCourses={contents.length}
        />
      </div>
    </div>
  );
};
export default ModuleContent;
