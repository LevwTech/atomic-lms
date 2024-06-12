import { create } from "zustand";

type CourseMaterial = {
  courseId: string;
  sections: {
    _id: string;
    title: string;
    description?: string;
  }[];
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
