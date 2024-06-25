import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Table from "../components/Table";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Pagination from "../components/Pagination";
import CoursesTable from "../components/CoursesTable";
import CoursesGroupsTable from "../components/CoursesGroups";

export default function Courses(): JSX.Element {
  const [selection, setSelection] = React.useState<"Courses" | "Groups">(
    "Courses",
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const [page, setPage] = useState<number>(
    parseInt(searchParams.get("page") || "1"),
  );

  const [isBase, setIsBase] = useState<string | null>(
    searchParams.get("isBase") || null,
  );

  const [limit, setLimit] = useState<number>(
    parseInt(searchParams.get("limit") || "5"),
  );

  const selectionValues = ["Courses", "Groups"];

  useEffect(() => {
    searchParams.set("page", page.toString());
    searchParams.set("limit", limit.toString());
    if (isBase && selection === "Courses") {
      searchParams.set("isBase", isBase);
    } else {
      searchParams.delete("isBase");
    }
    window.history.replaceState(
      null,
      "",
      `${location.pathname}?${searchParams.toString()}`,
    );
  }, [page, limit, location.pathname, searchParams, isBase, selection]);

  const {
    isLoading,
    data: courses,
    refetch,
  } = useQuery({
    queryKey: ["courses", { page, limit, isBase, selection }],
    queryFn: () =>
      fetch(
        `http://localhost:3000/course/${selection === "Courses" ? "courses" : "courses-group"}?${isBase !== null && `isBase=${isBase}`}&page=${page}&limit=${limit}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      ).then((res) => res.json()),
  });

  const headers = [];

  if (selection === "Courses") {
    headers.push("Name", "Code", "Start Date", "End Date");
  } else {
    headers.push("Name", "Number of Courses");
  }

  let updatesTable = [];

  if (selection === "Courses") {
    updatesTable = courses?.courses.map((course) => ({
      id: course.id,
      name: course.name,
      code: course.code,
      startDate: new Date(course.startDate).toLocaleDateString(),
      endDate: new Date(course.endDate).toLocaleDateString(),
    }));
  } else {
    updatesTable = courses?.courseGroups.map((courseGroup) => ({
      id: courseGroup.id,
      name: courseGroup.name,
      numberOfGroups: courseGroup.__courses__.length,
    }));
  }

  return (
    <Layout>
      <Header
        title="Courses Managment"
        button={selection === "Courses" ? "courses" : "groups"}
      />
      <div className="flex items-center border w-fit rounded-md mb-10">
        {selectionValues.map((value) => (
          <button
            onClick={() => setSelection(value)}
            className={`py-2 px-4 ${value === selection && "bg-[#f1f1f1]"} transition-all`}
          >
            {value}
          </button>
        ))}
      </div>
      {selection === "Courses" && (
        <div className="flex items-center gap-4 mb-10">
          <p>Filter by type:</p>
          <select
            onChange={(e) => {
              if (e.target.value === "ALL") {
                setIsBase(null);
              } else {
                setIsBase(e.target.value);
              }
              setPage(1);
            }}
            value={isBase || "ALL"}
            className="w-52 rounded"
          >
            <option value="ALL">All</option>
            <option value="true">Base</option>
            <option value="false">Course</option>
          </select>
        </div>
      )}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            {selection === "Courses" ? (
              <CoursesTable
                headers={headers}
                data={updatesTable}
                refetch={refetch}
              />
            ) : (
              <CoursesGroupsTable
                headers={headers}
                data={updatesTable}
                refetch={refetch}
              />
            )}

            <div className="flex items-center self-end gap-4 mb-10">
              <p>Number of Courses</p>
              <select
                value={limit}
                onChange={(e) => {
                  setLimit(parseInt(e.target.value));
                  setPage(1);
                }}
                className="w-52 rounded"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>

          <div className="self-center flex">
            <Pagination
              page={page}
              setPage={setPage}
              totalPages={courses?.totalPages}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
