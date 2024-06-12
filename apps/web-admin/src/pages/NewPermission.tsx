import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Table from "../components/Table";

export default function NewPermission(): JSX.Element {
  const { name } = useParams();

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
      <Header back={"/permissions"} title="New Permissions" />

      <div className="mb-10 text-xl flex items-center gap-2">
        Permission name: <p className="font-medium">{name}</p>
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
