import React from "react";
import { Link } from "react-router-dom";

export default function Group({ group }) {
  return (
    <div className="bg-[#FAFAFA] py-6 flex items-center rounded-md px-10 justify-between text-xl">
      <p>{group.name}</p>
      <div className="flex items-center gap-4">
        <Link
          to={`/permissions/edit/${group.id}`}
          className="bg-[#ebebeb] hover:bg-[#c2c2c2] transition-all py-2 px-4 rounded"
        >
          Edit
        </Link>
        <p className="bg-[#ebebeb] hover:bg-[#c2c2c2] transition-all py-2 px-4 rounded cursor-pointer">
          Delete
        </p>
      </div>
    </div>
  );
}
