import { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";

interface TableProps {
  headers: string[];
  data: any[];
  refetch: () => void;
}

export default function CoursesGroupsTable({
  headers,
  data,
  refetch,
}: TableProps) {
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [loading, setLoading] = useState(false);

  const deleteCoursesGroups = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/course/course-group`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({ ids: [selectedCourseId] }),
        },
      );
      if (response.status === 200) {
        setLoading(false);
        refetch();
        setOpen(false);
        toast.success("Course deleted successfully");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while deleting the Course");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex w-full bg-[#FAFAFA] items-center border-b py-6">
        {headers.map((header, index) => (
          <span className={`w-full h-fit pl-4 ${index !== 0 && "border-l"}`}>
            {header.charAt(0).toUpperCase() + header.slice(1)}
          </span>
        ))}
        <span className="w-full h-fit border-l pl-4">Action</span>
      </div>
      <div className="flex flex-col py-2">
        {data.map((item) => (
          <div className="flex w-full items-center py-5 border-b text-sm">
            {Object.entries(item)
              .filter(([key]) => key !== "id") // Filter out the 'id' key
              .map(([key, value]) => (
                <span key={key} className="w-full h-fit pl-4">
                  {value}
                </span>
              ))}
            <span className="w-full h-fit pl-4 flex items-center gap-4 text-sm text-blue-400">
              <p className="cursor-pointer">Edit</p>
              <p
                onClick={() => {
                  setOpen(true);
                  setSelectedCourseId(item.id);
                }}
                className="cursor-pointer"
              >
                Delete
              </p>
            </span>
          </div>
        ))}
      </div>
      <Modal open={open} setOpen={setOpen} width="400px">
        <div className="flex flex-col gap-4">
          <p>Are you sure you want to delete this course group?</p>
          <div className="flex gap-4 mt-4">
            {loading ? (
              <button className="bg-gray-300 cursor-not-allowed transition-colors text-white px-4 py-2 rounded-md">
                Delete
              </button>
            ) : (
              <button
                onClick={deleteCoursesGroups}
                className="bg-red-500 hover:bg-red-600 transition-colors text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            )}
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-200 hover:bg-gray-300 transition-colors text-black px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
