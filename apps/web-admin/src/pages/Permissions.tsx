import Layout from "../components/Layout";
import Header from "../components/Header";
import Group from "../components/Group";

export default function Permissions(): JSX.Element {
  const permissions_group = [
    {
      id: 1,
      name: "Create",
      type: "user",
      permissions: ["Admin", "Instructor"],
    },
    {
      id: 2,
      name: "Read",
      type: "user",
      permissions: ["Admin", "Instructor", "Student"],
    },
    {
      id: 3,
      name: "Update",
      type: "user",
      permissions: ["Admin", "Instructor"],
    },
    {
      id: 4,
      name: "Delete",
      type: "user",
      permissions: ["Admin", "Instructor"],
    },
  ];

  return (
    <Layout>
      <Header title="Permissions Managment" button={"permissions"} />
      <div className="flex flex-col gap-3">
        {permissions_group.map((group) => (
          <Group group={group} />
        ))}
      </div>
    </Layout>
  );
}
