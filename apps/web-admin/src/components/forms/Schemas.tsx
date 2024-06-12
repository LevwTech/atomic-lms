import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password is too short - should be 8 chars minimum."),
});

export const userSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  username: Yup.string().required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password is too short - should be 8 chars minimum."),
  email: Yup.string().email("Invalid email").required("Required"),
  type: Yup.string().required("Required"),
  permissions: Yup.array().required("Required"),
  prmissionsGroupIds: Yup.array(),
});

export const courseSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  code: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  startDate: Yup.date().required("Required"),
  endDate: Yup.date().required("Required"),
  academicDuration: Yup.string().required("Required"),
  academicYear: Yup.string().required("Required"),
  image: Yup.string().url(),
  prerequisiteCourseIds: Yup.array(Yup.string().uuid()),
  prerequisiteCourseGroupIds: Yup.array(Yup.string().uuid()),
  studentIds: Yup.array(Yup.string()),
  teacherIds: Yup.array(Yup.string()),
});

export const courseGroupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  courseIds: Yup.array(Yup.string().uuid()).optional(),
});
