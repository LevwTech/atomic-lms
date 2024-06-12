import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Table from "../components/Table";
import { MoveLeft } from "lucide-react";

export default function Course(): JSX.Element {
  const { id } = useParams();

  const users = [
    {
      name: "ahmed",
      username: "ahmed239r023i",
      email: "ahmedfady@ahmed.com",
      type: "user",
    },
    {
      name: "ahmed",
      username: "ahmed239r023i",
      email: "ahmedfady@ahmed.com",
      type: "user",
    },
    {
      name: "ahmed",
      username: "ahmed239r023i",
      email: "ahmedfady@ahmed.com",
      type: "user",
    },
    {
      name: "ahmed",
      username: "ahmed239r023i",
      email: "ahmedfady@ahmed.com",
      type: "user",
    },
  ];

  const headers = Object.keys(users[0]);

  return (
    <Layout>
      <Header title="Permissions Managment" />
      <Link
        to={"/permissions"}
        className="mb-10 py-2 px-4 bg-[#f7f7f7] hover:bg-[#f1f1f1] transition-all w-fit rounded-lg flex items-center gap-2"
      >
        <MoveLeft /> Back
      </Link>
      <div className="mb-10 text-xl flex items-center gap-2">
        Permission name: <p className="font-medium">{id}</p>
      </div>
      <div className="flex items-center gap-4 mb-10">
        <p>Filter by type:</p>
        <select className="w-52 rounded">
          <option value="all">All</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <Table headers={headers} data={users} />
    </Layout>
  );
}
