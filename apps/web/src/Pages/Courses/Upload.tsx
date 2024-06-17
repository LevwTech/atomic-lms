import { SectionsHeader } from "@atomic/web-ui";
import Announcements from "@atomic/web-ui/Announcements/Announcements";
import Sidebar from "@atomic/web-ui/SideBar/sideBar";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";

const icons = {
  Lectures: "/lectureIcon.svg",
  Sheets: "/tutorialIcon.svg",
  "Module information": "/moduleinfoIcon.svg",
  Exams: "/examIcon.svg",
  Projects: "/projectIcon.svg",
};

function SubmittingUploads({
  uploadedFiles,
  setUploadedFiles,
  selectedFile,
  setSelectedFile,
  uploadFiles,
  sections,
}) {
  return (
    <div className="flex flex-col h-full w-full bg-[#F3F3F3] justify-between rounded-[10px] p-[10px]">
      <div className="flex flex-col h-[90%] gap-4">
        {uploadedFiles.length === 0 ? (
          <div className="bg-white w-full rounded-[10px] h-[20%] flex items-center justify-center">
            No files uploaded yet
          </div>
        ) : (
          <div className="grid grid-cols-5 items-center bg-white w-full rounded-[10px] h-[20%]">
            {uploadedFiles?.map((file, index) => (
              <div
                onClick={() => {
                  setSelectedFile(index);
                }}
                className={`flex flex-col gap-[10px] p-2 ${index === selectedFile ? "" : "opacity-20"}`}
              >
                <img src={icons[uploadedFiles[selectedFile].type]} />
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setUploadedFiles((prev) => {
                const newFiles = [...prev];
                newFiles[selectedFile].title = e.target.value;
                return newFiles;
              });
            }}
            value={uploadedFiles[selectedFile]?.title || ""}
            className="border border-gray-300 rounded-[5px] px-3 py-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label>Type</label>
          <select
            onChange={(e) => {
              setUploadedFiles((prev) => {
                const newFiles = [...prev];
                newFiles[selectedFile].type = e.target.value;
                return newFiles;
              });
            }}
            value={uploadedFiles[selectedFile]?.type || ""}
            className="border border-gray-300 rounded-[5px]  px-3 py-2"
          >
            {sections.map((section) => (
              <option value={section.title}>{section.title}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={() => uploadFiles(selectedFile)}
        className="h-[10%] text-xl font-bold self-center bg-[#11664F] w-fit py-2 px-8 flex items-center justify-center hover:bg-[#11664fd7] transition-all rounded-full text-white"
      >
        Submit
      </button>
    </div>
  );
}

function UploadedFiles({ submittedFiles }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#F3F3F3] rounded-[10px] p-[10px] gap-[10px] ">
      <div className="bg-white w-full rounded-[10px] h-[20%] gap-2 flex items-center p-[10px]">
        <svg
          width="26"
          height="25"
          viewBox="0 0 26 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M10.0683 0.278573C9.39177 0.42519 8.20108 0.854666 7.42238 1.23266C0.706718 4.49249 -1.75051 12.5459 2.02343 18.9277C2.85779 20.3387 4.92831 22.4066 6.34106 23.2399C12.934 27.1287 21.3674 24.3269 24.3329 17.2625C24.6588 16.4857 24.9808 15.4483 25.0483 14.9571C25.1157 14.4658 25.174 14.4021 25.2181 13.9126C25.2181 13.9126 25.25 13.1734 25.25 12.3121C25.2146 11.4126 25.1986 11.2126 25.1659 10.9055C25.1245 10.5153 25.1078 10.5185 25.0373 10.0091C24.8576 8.71052 23.946 6.67472 22.8701 5.16901C20.0299 1.1939 14.8938 -0.768105 10.0683 0.278573ZM14.2441 10.9368L11.7077 13.4757L10.2988 12.1113C8.85983 10.7177 8.43275 10.5373 7.61034 10.9746C6.96669 11.3171 6.70542 11.7511 6.69856 12.4903C6.69307 13.0803 6.9365 13.4007 8.81769 15.2797C11.7594 18.2175 11.358 18.2909 15.6464 14.033C18.792 10.91 19.0401 10.612 19.0401 9.95648C19.0401 9.03743 18.3904 8.39791 17.4567 8.39791C16.8508 8.39791 16.5165 8.66217 14.2441 10.9368Z"
            fill="#11664F"
          />
        </svg>
        <p className="text-lg font-semibold"> Uploaded files</p>
      </div>
      <div className="flex flex-col gap-4 h-[350px] overflow-auto">
        {submittedFiles?.map((file) => (
          <div className="flex items-center justify-between px-[20px] bg-white w-full rounded-[10px] py-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center  gap-[10px]">
                <img
                  className="w-12 h-12 object-contain"
                  src={icons[file.file.type]}
                />
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">{file.file.type}</p>
                <p className="w-[100px] truncate text-sm text-gray-600">
                  {" "}
                  {file.file.title}
                </p>
              </div>
            </div>
            {file.isLoading ? (
              <div className="p-2">
                <ReactLoading
                  type="spinningBubbles"
                  height={25}
                  width={25}
                  color="#11664F"
                />
              </div>
            ) : (
              <svg
                width="26"
                height="25"
                viewBox="0 0 26 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.0683 0.278573C9.39177 0.42519 8.20108 0.854666 7.42238 1.23266C0.706718 4.49249 -1.75051 12.5459 2.02343 18.9277C2.85779 20.3387 4.92831 22.4066 6.34106 23.2399C12.934 27.1287 21.3674 24.3269 24.3329 17.2625C24.6588 16.4857 24.9808 15.4483 25.0483 14.9571C25.1157 14.4658 25.174 14.4021 25.2181 13.9126C25.2181 13.9126 25.25 13.1734 25.25 12.3121C25.2146 11.4126 25.1986 11.2126 25.1659 10.9055C25.1245 10.5153 25.1078 10.5185 25.0373 10.0091C24.8576 8.71052 23.946 6.67472 22.8701 5.16901C20.0299 1.1939 14.8938 -0.768105 10.0683 0.278573ZM14.2441 10.9368L11.7077 13.4757L10.2988 12.1113C8.85983 10.7177 8.43275 10.5373 7.61034 10.9746C6.96669 11.3171 6.70542 11.7511 6.69856 12.4903C6.69307 13.0803 6.9365 13.4007 8.81769 15.2797C11.7594 18.2175 11.358 18.2909 15.6464 14.033C18.792 10.91 19.0401 10.612 19.0401 9.95648C19.0401 9.03743 18.3904 8.39791 17.4567 8.39791C16.8508 8.39791 16.5165 8.66217 14.2441 10.9368Z"
                  fill="#11664F"
                />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function UploadWidget({ uploadedFiles, setUploadedFiles }) {
  return (
    <div className="flex h-[40%] w-full">
      <label
        htmlFor="file"
        className="border-2 gap-4 border-dashed border-[#11664f9f] flex flex-col rounded-[10px] items-center justify-center w-full h-full cursor-pointer"
      >
        <input
          type="file"
          name="file"
          id="file"
          disabled={uploadedFiles.length >= 5}
          multiple
          maxLength={5}
          className="hidden"
          onChange={(e) => {
            if (uploadedFiles.length + e.target.files.length > 5) {
              alert("You can only upload a maximum of 5 files.");
              return;
            }
            const files = [];
            for (let i = 0; i < e.target.files.length; i++) {
              files.push({
                file: e.target.files[i],
                title: e.target.files[i].name.replace(/.[^/.]+$/, ""),
                type: "Lectures",
              });
            }
            setUploadedFiles([...uploadedFiles, ...files]);
          }}
        />
        <img src="/uploadFile.svg" />
        <div className="flex flex-col items-center">
          <p className="text-xl font-semibold">Drop Your Files Here</p>
          <p className="text-sm text-gray-600">Maximum 5 files</p>
        </div>
      </label>
    </div>
  );
}

function Uplaod() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(0);
  const [submittedFiles, setSubmittedFiles] = useState([]);

  const { courseId } = useParams();

  const { isLoading: isLoadingSections, data: courseContent } = useQuery({
    queryKey: ["users", { id: courseId }],
    queryFn: () =>
      fetch(`http://localhost:3000/course-marerial/${courseId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const uploadFiles = async (selected) => {
    const file = { ...uploadedFiles[selected] };
    const fileId = Date.now();

    const sectionId = courseContent.material.sections.find(
      (section) => section.title.toLowerCase() === file.type.toLowerCase(),
    )?._id;

    setSubmittedFiles([
      ...submittedFiles,
      {
        file,
        id: fileId,
        isLoading: true,
      },
    ]);
    setUploadedFiles(uploadedFiles.filter((_, index) => index !== selected));
    const formData = new FormData();
    formData.append("title", file.title);
    formData.append("attachment", file.file);
    formData.append("type", file.type);
    const response = await fetch(
      `http://localhost:3000/course-marerial/${courseId}/section/${sectionId}/attachment`,
      {
        method: "POST",
        headers: {
          contentType: "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      },
    );
    if (response.status === 200) {
      setSubmittedFiles((prev) => {
        const newFiles = [...prev];
        const index = newFiles.findIndex((file) => file.id === fileId);
        newFiles[index].isLoading = false;
        return newFiles;
      });
    } else {
      alert("Error uploading file");
      setUploadedFiles([...uploadedFiles, file]);
    }
  };

  if (isLoadingSections) {
    return (
      <div className="h-screen p-[40px] flex justify-center items-center gap-[40px]">
        <ReactLoading type="spinningBubbles" color="#11664F" />
      </div>
    );
  }

  return (
    <div className="h-screen p-[40px] flex justify-between gap-[40px]">
      <Sidebar
        primaryLogo="/BUE_Logo.svg"
        secondaryLogo="/miniUniLogo.svg"
        user={{ name: "Abdelrahman", id: "Abdelrahman192222" }}
      />
      <div className="h-full w-[55vw] rounded-[14px] items-center flex flex-col bg-white p-[30px] gap-[30px]">
        <SectionsHeader sectionName={"Upload"} />
        <UploadWidget
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
        <div className="flex h-[60%] w-full gap-[30px]">
          <SubmittingUploads
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            uploadFiles={uploadFiles}
            submittedFiles={submittedFiles}
            sections={courseContent.material.sections}
          />
          <UploadedFiles submittedFiles={submittedFiles} />
        </div>
      </div>
      <div className="bg-[var(--White)] h-full w-[30vw] rounded-[13.6px]">
        <Announcements />
      </div>
    </div>
  );
}

export default Uplaod;
