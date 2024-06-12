import Layout from "../components/Layout";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { courseGroupSchema } from "../components/forms/Schemas";
import { toast } from "react-toastify";
import FormInput from "../components/forms/FormInput";
import ReactLoading from "react-loading";

function Prerequisite({
  options,
  name,
  isLoading,
  setQuery,
  query,
  setSelected,
  selected,
}) {
  return (
    <div className="flex flex-col gap-4">
      <p>{name}</p>
      <div className="flex gap-10 w-full">
        <div className="p-4 h-96 bg-[#FAFAFA] flex flex-col gap-4 w-full">
          <p>Search</p>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query === "" ? (
            <div> No search results </div>
          ) : isLoading ? (
            <div className="p-10 flex justify-center items-center">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 overflow-auto">
              {options.courses.length === 0 && <div>No search results</div>}
              {options.courses.map((option) =>
                selected.find((item) => item.id === option.id) ? null : (
                  <div className="flex justify-between bg-[#ebebeb] p-4">
                    <p>{option.name}</p>
                    <button
                      onClick={() => {
                        setSelected([...selected, option]);
                      }}
                    >
                      add
                    </button>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
        <div className="p-4 bg-[#FAFAFA] h-96 overflow-auto flex flex-col gap-4 w-full">
          {selected.map((option) => (
            <div className="flex justify-between bg-[#ebebeb] p-4">
              <p>{option.name}</p>
              <button
                onClick={() => {
                  setSelected(selected.filter((item) => item.id !== option.id));
                }}
              >
                remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function NewGroup(): JSX.Element {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const { isLoading, data: courses } = useQuery({
    queryKey: ["courses", query],
    queryFn: () =>
      fetch(`http://localhost:3000/course/courses/search?name=${query}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
    enabled: !!query,
  });

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        courseIds: [],
      },
      validationSchema: courseGroupSchema,
      onSubmit: async (values) => {
        setLoading(true);

        const res = await fetch("http://localhost:3000/course/course-group", {
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
          toast.success("Course created successfully");
        } else {
          setLoading(false);
          toast.error(data.message);
        }
      },
    });

  useEffect(() => {
    setFieldValue(
      "courseIds",
      selected.map((course) => course.id),
    );
  }, [selected, setFieldValue]);

  return (
    <Layout>
      <Header back={"/courses"} title="New Group" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[70%]">
        <FormInput
          placeHolder="Group Name"
          name="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          touched={touched.name}
        />
        <Prerequisite
          name={"courses"}
          isLoading={isLoading}
          options={courses}
          setQuery={setQuery}
          query={query}
          selected={selected}
          setSelected={setSelected}
        />
        {loading ? (
          <button
            disabled
            className="rounded cursor-not-allowed flex items-center justify-center bg-[#11664F] px-8 py-2 text-white transition h-10 "
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
            className="rounded bg-[#11664F] px-8 py-2 text-white transition lg:hover:bg-[#11664F]/80 h-10 "
          >
            Create Course Group
          </button>
        )}
      </form>
    </Layout>
  );
}
