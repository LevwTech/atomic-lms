import Layout from "../components/Layout";
import Header from "../components/Header";
import FormInput from "../components/forms/FormInput";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import { userSchema } from "../components/forms/Schemas";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { X } from "lucide-react";

export default function EditUser(): JSX.Element {
  const [loading, setLoading] = React.useState(false);
  const [permission, setPermission] = React.useState("ADMIN");
  const [signedPermissions, setSignedPermissions] = React.useState([]);

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        type: "",
        permissions: [],
        prmissionsGroupIds: [],
      },
      validationSchema: userSchema,
      onSubmit: async (values) => {
        setLoading(true);
        const res = await fetch("http://localhost:3000/users/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (res.status === 201) {
          setLoading(false);
          toast.success("User created successfully");
        } else {
          setLoading(false);
          toast.error(data.message);
        }
      },
    });

  console.log(values);

  const types = [
    {
      name: "admin",
      value: "ADMIN",
    },
    {
      name: "student",
      value: "STUDENT",
    },
    {
      name: "teacher",
      value: "TEACHER",
    },
  ];

  const adminPermissions = [
    {
      name: "create user",
      value: "CREATE_USER",
    },
    {
      name: "delete user",
      value: "DELETE_USER",
    },
    {
      name: "enroll users in course",
      value: "ENROLL_USERS_IN_COURSE",
    },
    {
      name: "add teachers in course",
      value: "ADD_TEACHERS_IN_COURSE",
    },
    {
      name: "add permissions to user",
      value: "ADD_PERMISSIONS_TO_USER",
    },
    {
      name: "remove permissions from user",
      value: "REMOVE_PERMISSIONS_FROM_USER",
    },
    {
      name: "create permissions group",
      value: "CREATE_PERMISSIONS_GROUP",
    },
    {
      name: "delete permissions group",
      value: "DELETE_PERMISSIONS_GROUP",
    },
    {
      name: "edit permissions group",
      value: "EDIT_PERMISSIONS_GROUP",
    },
    {
      name: "edit course materials",
      value: "EDIT_COURSE_MATERIALS",
    },
    {
      name: "create course",
      value: "CREATE_COURSE",
    },
    {
      name: "create base course",
      value: "CREATE_BASE_COURSE",
    },
    {
      name: "delete course",
      value: "DELETE_COURSE",
    },
    {
      name: "edit course",
      value: "EDIT_COURSE",
    },
    {
      name: "add prerequisite courses to course",
      value: "ADD_PREREQUISITE_COURSES_TO_COURSE",
    },
    {
      name: "remove prerequisite courses to course",
      value: "REMOVE_PREREQUISITE_COURSES_TO_COURSE",
    },
    {
      name: "add prerequisite course groups to course",
      value: "ADD_PREREQUISITE_COURSE_GROUPS_TO_COURSE",
    },
    {
      name: "remove prerequisite course groups to course",
      value: "REMOVE_PREREQUISITE_COURSE_GROUPS_TO_COURSE",
    },
    {
      name: "create course group",
      value: "CREATE_COURSE_GROUP",
    },
    {
      name: "delete course group",
      value: "DELETE_COURSE_GROUP",
    },
    {
      name: "edit course group",
      value: "EDIT_COURSE_GROUP",
    },
  ];

  const studentPermissions = [
    {
      name: "get course",
      value: "GET_COURSE",
    },
  ];

  const teacherPermissions = [
    {
      name: "get course",
      value: "GET_COURSE",
    },
  ];

  useEffect(() => {
    setFieldValue("permissions", signedPermissions);
  }, [signedPermissions, setFieldValue]);

  return (
    <Layout>
      <Header back={"/users"} title="New User" />
      <div className="flex gap-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-[50%]">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-2">
              <FormInput
                required
                placeHolder="First Name"
                name="firstName"
                type="text"
                onChange={handleChange}
                value={values.firstName}
                error={errors.firstName}
                touched={touched.firstName}
              />
              <FormInput
                required
                placeHolder="Last Name"
                name="lastName"
                type="text"
                onChange={handleChange}
                value={values.lastName}
                error={errors.lastName}
                touched={touched.lastName}
              />
            </div>
            <div className="flex gap-2">
              <FormInput
                required
                placeHolder="Email"
                name="email"
                type="email"
                onChange={handleChange}
                value={values.email}
                error={errors.email}
                touched={touched.email}
              />
              <FormInput
                required
                placeHolder="Username"
                name="username"
                type="text"
                onChange={handleChange}
                value={values.username}
                error={errors.username}
                touched={touched.username}
              />
              <FormInput
                required
                placeHolder="Password"
                name="password"
                type="password"
                onChange={handleChange}
                value={values.password}
                error={errors.password}
                touched={touched.password}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-2 w-[30%]">
                <p className="text-sm text-gray-600">Type</p>
                <select
                  onChange={(e) => {
                    setPermission(e.target.value);
                    setFieldValue("type", e.target.value);
                  }}
                  className="w-full rounded"
                >
                  {types.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>{" "}
              <div className="flex flex-col gap-2 w-[70%]">
                <p className="text-sm text-gray-600">Permissions</p>
                <select
                  onChange={(e) => {
                    setSignedPermissions([
                      ...signedPermissions,
                      e.target.value,
                    ]);
                  }}
                  className="w-full rounded"
                >
                  <option
                    value="disabled"
                    disabled={signedPermissions.length !== 0}
                  >
                    Select a permission
                  </option>
                  {permission === "ADMIN"
                    ? adminPermissions.map((permission) => (
                        <option key={permission.value} value={permission.value}>
                          {permission.name}
                        </option>
                      ))
                    : permission === "STUDENT"
                      ? studentPermissions.map((permission) => (
                          <option
                            key={permission.value}
                            value={permission.value}
                          >
                            {permission.name}
                          </option>
                        ))
                      : permission === "TEACHER"
                        ? teacherPermissions.map((permission) => (
                            <option
                              key={permission.value}
                              value={permission.value}
                            >
                              {permission.name}
                            </option>
                          ))
                        : null}
                </select>
              </div>
            </div>
          </div>
          {loading ? (
            <button
              disabled
              className="rounded cursor-not-allowed flex items-center justify-center bg-[#11664F] px-8 py-2 text-white transition h-10"
            >
              <ReactLoading
                type="bubbles"
                color="#ffffff"
                height={25}
                width={25}
              />
            </button>
          ) : (
            <button
              type="submit"
              onClick={handleSubmit}
              className="rounded bg-[#11664F] px-8 py-2 text-white transition lg:hover:bg-[#11664F]/80 h-10"
            >
              Create user
            </button>
          )}
        </form>
        <div className="flex flex-col gap-2 w-[50%]">
          <p className="text-sm text-gray-600">User Permissions</p>
          <div className="flex gap-2 flex-wrap">
            {signedPermissions.length === 0 && (
              <p className="text-sm">No signed permissions yet.</p>
            )}
            {signedPermissions.map((permission) => (
              <div
                key={permission}
                className="flex items-center border rounded-lg px-4 py-2 gap-4"
              >
                <p>{permission}</p>
                <button
                  onClick={() =>
                    setSignedPermissions(
                      signedPermissions.filter((p) => p !== permission),
                    )
                  }
                >
                  <X size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
