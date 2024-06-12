import { useQuery } from "@tanstack/react-query";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Table from "../components/Table";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";

export default function Users(): JSX.Element {
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

  const {
    isLoading,
    data: users,
    refetch,
  } = useQuery({
    queryKey: ["users", { page, limit, type }],
    queryFn: () =>
      fetch(
        `http://localhost:3000/users/get-all?${type !== null && `type=${type}`}&page=${page}&limit=${limit}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      ).then((res) => res.json()),
  });

  const headers = ["Name", "Username", "Email", "Type"];
  const updatedUsers = users?.users?.map((user) => ({
    name: user.firstName + " " + user.lastName,
    username: user.username,
    email: user.email,
    type: user.type,
  }));

  return (
    <Layout>
      <Header title="Users Managment" button={"users"} />
      <div className="flex items-center gap-4 mb-10">
        <p>Filter by type</p>
        <select
          onChange={(e) => {
            if (e.target.value === "ALL") {
              setType(null);
            } else {
              setType(e.target.value);
            }
            setPage(1);
          }}
          value={type || "ALL"}
          className="w-52 rounded"
        >
          <option value="ALL">All</option>
          <option value="ADMIN">Admins</option>
          <option value="STUDENT">Students</option>
          <option value="TEACHER">Teachers</option>
        </select>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-4">
            <Table headers={headers} data={updatedUsers} refetch={refetch} />
            <div className="flex items-center self-end gap-4 mb-10">
              <p>Number of Users</p>
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
              totalPages={users?.totalPages}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
