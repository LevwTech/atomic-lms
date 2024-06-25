import Layout from "../components/Layout";
import Header from "../components/Header";
import Dropdown from "../components/Dropdown";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { courseSchema } from "../components/forms/Schemas";
import { toast } from "react-toastify";
import FormInput from "../components/forms/FormInput";
import ReactLoading from "react-loading";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { useParams } from "react-router-dom";

function Prerequisite({
  options,
  name,
  isLoading,
  setQuery,
  query,
  setSelected,
  selected,
  type,
}) {
  const debounced = useDebouncedCallback(
    // function
    (value) => {
      setQuery(value);
    },
    // delay in ms
    500,
  );
  return (
    <div className="flex flex-col gap-4">
      <p>{name}</p>
      <div className="flex gap-10 w-full">
        <div className="p-4 h-96 bg-[#FAFAFA] flex flex-col gap-4 w-full">
          <p>Search</p>
          <input type="text" onChange={(e) => debounced(e.target.value)} />
          {query === "" ? (
            <div> No search results </div>
          ) : isLoading ? (
            <div className="p-10 flex justify-center items-center">
              <p>Loading...</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 overflow-auto">
              {options.length === 0 && <div>No search results</div>}
              {options.map((option) =>
                selected.find((item) => item.id === option.id) ? (
                  "No other search results"
                ) : (
                  <div className="flex justify-between bg-[#ebebeb] p-4">
                    {type === "COURSE" && (
                      <div className="flex items-center gap-4">
                        {option.name && <p>{option.name}</p>}
                        {option.code && <p> {option.code}</p>}
                      </div>
                    )}

                    {type === "USER" && (
                      <div>
                        <p>{option.firstName + " " + option.lastName}</p>
                        <p>{option.username}</p>
                        <p>{option.email}</p>
                      </div>
                    )}
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
              {type === "COURSE" && (
                <div className="flex items-center gap-4">
                  {option.name && <p>{option.name}</p>}
                  {option.code && <p> {option.code}</p>}
                </div>
              )}

              {type === "USER" && (
                <div className="flex flex-col">
                  <p>{option.firstName + " " + option.lastName}</p>
                  <p>{option.username}</p>
                  <p>{option.email}</p>
                </div>
              )}
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

export default function EditCourse(): JSX.Element {
  const { id } = useParams();

  const { isLoading: courseLoading, data: course } = useQuery({
    queryKey: ["single-course", { id }],
    queryFn: () =>
      fetch(`http://localhost:3000/course/single-course?courseId=${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).then((res) => res.json()),
  });

  const [loading, setLoading] = useState(false);
  const [parentCourse, setParentCourse] = useState(null);
  const [query, setQuery] = useState("");

  const [query_prerequisite_courses, setQuery_prerequisite_courses] =
    useState("");
  const [query_prerequisite_groups, setQuery_prerequisite_groups] =
    useState("");
  const [query_teachers, setQuery_teachers] = useState("");
  const [query_students, setQuery_students] = useState("");

  const [selected_prerequisite_courses, setSelected_prerequisite_courses] =
    useState([]);
  const [selected_prerequisite_groups, setSelected_prerequisite_groups] =
    useState([]);
  const [selected_teachers, setSelected_teachers] = useState([]);
  const [selected_students, setSelected_students] = useState([]);

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik({
      initialValues: {
        id: "",
        name: "",
        code: "",
        type: "course",
        parentCourseId: "",
        description: "",
        startDate: "",
        endDate: "",
        academicDuration: "2023/2024",
        academicYear: "semester 1",
        prerequisiteCourseIds: [],
        prerequisiteCourseGroupIds: [],
        teacherIds: [],
        studentIds: [],
        studentsUserNames: [],
        teachersUserNames: [],
        image: "",
      },
      validationSchema: courseSchema,
      onSubmit: async (values) => {
        setLoading(true);

        const res = await fetch("http://localhost:3000/course/course", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: JSON.stringify({
            ...values,
            endDate: new Date(values.endDate).toISOString().split("T")[0],
            startDate: new Date(values.startDate).toISOString().split("T")[0],
          }),
        });

        const data = await res.json();
        if (res.status === 200) {
          setLoading(false);
          toast.success("Course created successfully");
        } else {
          setLoading(false);
          toast.error(data.message);
        }
      },
    });

  const courseType = [
    {
      name: "course",
      value: "course",
    },
    {
      name: "base",
      value: "base",
    },
  ];

  const academicYear = ["2021/2022", "2022/2023", "2023/2024"];

  const semester = [
    {
      name: "Semester 1",
      value: "semester 1",
    },
    {
      name: "Semester 2",
      value: "semester 2",
    },
    {
      name: "Full year",
      value: "full year",
    },
  ];

  const { isLoading, data: courses } = useQuery({
    queryKey: ["courses", query],
    queryFn: () =>
      fetch(
        `http://localhost:3000/course/courses/search?name=${query}&isbase=true`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      ).then((res) => res.json()),
    enabled: !!query, // Ensure query is not empty
  });

  const {
    isLoading: prerequisite_courses_isLoading,
    data: prerequisite_courses,
  } = useQuery({
    queryKey: ["prerequisite_courses", query_prerequisite_courses],
    queryFn: () =>
      fetch(
        `http://localhost:3000/course/courses/search?name=${query_prerequisite_courses}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      ).then((res) => res.json()),
    enabled: !!query_prerequisite_courses, // Ensure query is not empty
  });

  const {
    isLoading: prerequisite_groups_isLoading,
    data: prerequisite_groups,
  } = useQuery({
    queryKey: ["prerequisite_groups", { query_prerequisite_groups }],
    queryFn: () =>
      fetch(
        `http://localhost:3000/course/course-group/search?name=${query_prerequisite_groups}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      ).then((res) => res.json()),
    enabled: !!query_prerequisite_groups, // Ensure query is not empty
  });

  const { isLoading: teachers_isLoading, data: teachers } = useQuery({
    queryKey: ["teachers", query_teachers],
    queryFn: () =>
      fetch(
        `http://localhost:3000/users/search?q=${query_teachers}&type=TEACHER`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      ).then((res) => res.json()),
    enabled: !!query_teachers, // Ensure query is not empty
  });

  const { isLoading: students_isLoading, data: students } = useQuery({
    queryKey: ["students", query_students],
    queryFn: () =>
      fetch(
        `http://localhost:3000/users/search?q=${query_students}&type=STUDENT`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      ).then((res) => res.json()),
    enabled: !!query_students, // Ensure query is not empty
  });

  console.log(values);

  useEffect(() => {
    if (course && !courseLoading) {
      setFieldValue("id", course.id);
      setFieldValue("name", course.name);
      setFieldValue("code", course.code);
      setFieldValue("type", course.type);
      setFieldValue("description", course.description);
      setFieldValue("startDate", course.startDate);
      setFieldValue("endDate", course.endDate);
      setFieldValue("academicDuration", course.academicDuration);
      setFieldValue("academicYear", course.academicYear);
      setFieldValue("image", course.image);
      setParentCourse(course.parentCourseId);
      setSelected_prerequisite_courses(course.__prerequisiteCourses__);
      setSelected_prerequisite_groups(course.prerequisiteCourseGroups);
      setSelected_teachers(course.__teachers__);
      setSelected_students(course.__students__);
    }

    setFieldValue("parentCourseId", parentCourse);
    setFieldValue(
      "prerequisiteCourseIds",
      selected_prerequisite_courses.map((course) => course.id),
    );
    setFieldValue(
      "prerequisiteCourseGroupIds",
      selected_prerequisite_groups.map((group) => group.id),
    );
    setFieldValue(
      "teacherIds",
      selected_teachers.map((teacher) => teacher.username),
    );
    setFieldValue(
      "studentIds",
      selected_students.map((student) => student.username),
    );
    setFieldValue(
      "studentsUserNames",
      selected_students.map((student) => student.username),
    );
    setFieldValue(
      "teachersUserNames",
      selected_teachers.map((teacher) => teacher.username),
    );
  }, [
    parentCourse,
    setFieldValue,
    course,
    setSelected_prerequisite_courses,
    setSelected_prerequisite_groups,
    setSelected_teachers,
    setSelected_students,
    selected_prerequisite_courses,
    selected_prerequisite_groups,
    selected_teachers,
    selected_students,
  ]);

  const images = [
    "https://atomic-lms.fra1.cdn.digitaloceanspaces.com/icon%20(1).png",
    "https://atomic-lms.fra1.cdn.digitaloceanspaces.com/icon%20(2).png",
    "https://atomic-lms.fra1.cdn.digitaloceanspaces.com/icon%20(3).png",
    "https://atomic-lms.fra1.cdn.digitaloceanspaces.com/icon%20(4).png",
    "https://atomic-lms.fra1.cdn.digitaloceanspaces.com/icon%20(5).png",
    "https://atomic-lms.fra1.cdn.digitaloceanspaces.com/icon%20(6).png",
    "https://atomic-lms.fra1.cdn.digitaloceanspaces.com/icon%20(7).png",
    "https://atomic-lms.fra1.cdn.digitaloceanspaces.com/icon%20(8).png",
  ];

  if (courseLoading) {
    return (
      <div className="h-screen p-[40px] flex justify-center items-center gap-[40px]">
        <ReactLoading type="spinningBubbles" color="#11664F" />
      </div>
    );
  }

  return (
    <Layout>
      <Header back={"/courses"} title="Edit Course" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex gap-4 w-full">
          <FormInput
            name="name"
            placeHolder="Course name"
            onChange={handleChange}
            value={values.name}
            error={errors.name}
            touched={touched.name}
            required
          />
          <FormInput
            name="code"
            placeHolder="Course code"
            onChange={handleChange}
            value={values.code}
            error={errors.code}
            touched={touched.code}
            required
          />
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm text-gray-600">
              type<span className="text-red-500">*</span>
            </p>
            <select
              onChange={(e) => setFieldValue("type", e.target.value)}
              className="rounded"
            >
              {courseType.map((type) => (
                <option value={type.value}>{type.name}</option>
              ))}
            </select>
          </div>
          {values.type === "course" && (
            <div className="flex flex-col gap-2 w-full">
              <p className="text-sm text-gray-600">
                Choose parent courses<span className="text-red-500">*</span>
              </p>
              <Dropdown
                options={courses?.courses}
                query={query}
                setQuery={setQuery}
                setParentCourse={setParentCourse}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
        <div className="flex gap-4 w-full">
          <FormInput
            name="startDate"
            placeHolder="Start date"
            type="date"
            onChange={handleChange}
            value={
              values.startDate === ""
                ? values.startDate
                : new Date(values.startDate).toISOString().split("T")[0]
            }
            error={errors.startDate}
            touched={touched.startDate}
            required
          />
          <FormInput
            name="endDate"
            placeHolder="End date"
            type="date"
            onChange={handleChange}
            value={
              values.endDate === ""
                ? values.endDate
                : new Date(values.endDate).toISOString().split("T")[0]
            }
            error={errors.endDate}
            touched={touched.endDate}
            required
          />
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm text-gray-600">
              Semester<span className="text-red-500">*</span>
            </p>
            <select
              onChange={(e) =>
                setFieldValue("academicDuration", e.target.value)
              }
              className=" rounded"
            >
              {semester.map((sem) => (
                <option value={sem.value}>{sem.name}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm text-gray-600">
              Academic year<span className="text-red-500">*</span>
            </p>
            <select
              onChange={(e) => setFieldValue("academicYear", e.target.value)}
              className="rounded"
            >
              {academicYear.map((year) => (
                <option value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-[50%]">
          <FormInput
            textArea
            required
            name="description"
            placeHolder="Description"
            onChange={handleChange}
            value={values.description}
            error={errors.description}
            touched={touched.description}
          />
        </div>
        <div className="flex flex-col gap-4">
          <p>Choose the course image</p>
          <div className="flex gap-4 w-full flex-wrap">
            {images.map((image) => (
              <div
                onClick={() => setFieldValue("image", image)}
                className={`w-48 cursor-pointer ${
                  values.image === image || !values.image ? null : "opacity-20"
                }`}
              >
                <img
                  src={image}
                  alt="course image"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-[70%] flex flex-col gap-8">
          <Prerequisite
            name={"Prerequisite courses"}
            options={prerequisite_courses?.courses}
            setQuery={setQuery_prerequisite_courses}
            query={query_prerequisite_courses}
            selected={selected_prerequisite_courses}
            setSelected={setSelected_prerequisite_courses}
            isLoading={prerequisite_courses_isLoading}
            type={"COURSE"}
          />
          <Prerequisite
            name={"prerequisite course groups"}
            options={prerequisite_groups?.courseGroups}
            setQuery={setQuery_prerequisite_groups}
            query={query_prerequisite_groups}
            selected={selected_prerequisite_groups}
            setSelected={setSelected_prerequisite_groups}
            isLoading={prerequisite_groups_isLoading}
            type={"COURSE"}
          />
          <Prerequisite
            name={"Teachers"}
            options={teachers}
            setQuery={setQuery_teachers}
            query={query_teachers}
            selected={selected_teachers}
            setSelected={setSelected_teachers}
            isLoading={teachers_isLoading}
            type={"USER"}
          />
          <Prerequisite
            name={"Students"}
            options={students}
            setQuery={setQuery_students}
            query={query_students}
            selected={selected_students}
            setSelected={setSelected_students}
            isLoading={students_isLoading}
            type={"USER"}
          />
        </div>
        {loading ? (
          <button
            disabled
            className="rounded cursor-not-allowed flex items-center justify-center bg-[#11664F] px-8 py-2 text-white transition h-10 w-[70%]"
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
            className="rounded bg-[#11664F] px-8 py-2 text-white transition lg:hover:bg-[#11664F]/80 h-10 w-[70%]"
          >
            Edit Course
          </button>
        )}
      </form>
    </Layout>
  );
}
