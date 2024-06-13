import { create } from "zustand";

export type CourseMaterialSection = {
  _id: string;
  title: string;
  description?: string;
}[];

export type CourseMaterial = {
  courseId: string;
  sections: CourseMaterialSection;
};

interface CourseStore {
  currentCourse: CourseMaterial;
  setCurrentCourse: (course: string) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
  currentCourse: {
    courseId: "",
    sections: [],
  },
  setCurrentCourse: (course) =>
    set((state) => ({
      ...state,
      currentCourse: {
        ...state.currentCourse,
        courseId: course,
      },
    })),
}));
