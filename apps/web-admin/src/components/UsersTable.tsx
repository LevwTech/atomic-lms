import { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

interface TableProps {
  headers: string[];
  data: any[];
  refetch: () => void;
}

export default function UsersTable({ headers, data, refetch }: TableProps) {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [loading, setLoading] = useState(false);

  const deleteUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/users/delete-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ username: selectedUser }),
      });
      if (response.status === 200) {
        setLoading(false);
        refetch();
        setOpen(false);
        toast.success("User deleted successfully");
      }
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while deleting the user");
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
            {Object.values(item).map((value) => (
              <span className="w-full h-fit pl-4">{value}</span>
            ))}
            <span className="w-full h-fit pl-4 flex items-center gap-4 text-sm text-blue-400">
              <Link
                to={`/users/edit/${item.username}`}
                className="cursor-pointer"
              >
                Edit
              </Link>
              <p
                onClick={() => {
                  setOpen(true);
                  setSelectedUser(item.username);
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
          <p>
            Are you sure you want to delete this user{" "}
            <span className="text-blue-500">{selectedUser}</span>?
          </p>
          <div className="flex gap-4 mt-4">
            {loading ? (
              <button
                onClick={deleteUser}
                className="bg-gray-300 cursor-not-allowed transition-colors text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>
            ) : (
              <button
                onClick={deleteUser}
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
