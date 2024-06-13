import LoginPage from "./Pages/Auth/Login/Login";
import CoursesPage from "./Pages/Courses/CoursesPage";
import { Route, Routes } from "react-router-dom";
import Announcements from "./Pages/Courses/Announcements";
import Grades from "./Pages/Courses/Grades";
import SingleCoursePage from "./Pages/Courses/SingleCourse";
import ModuleContentPage from "./Pages/Courses/ModuleContent";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useEffect, useState } from "react";
import { useUserStore } from "./store/user.store";
import ReactLoading from "react-loading";

function App() {
  const [loading, setLoading] = useState(true);

  const setUser = useUserStore((state) => state.setUser);

  const getUser = async () => {
    setLoading(true);

    const user = await fetch(`http://localhost:3000/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json());

    console.log(user);

    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      getUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen p-[40px] flex justify-center items-center gap-[40px]">
        <ReactLoading type="spinningBubbles" color="#11664F" />
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <CoursesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/announcements"
        element={
          <ProtectedRoute>
            <Announcements />
          </ProtectedRoute>
        }
      />
      <Route
        path="/grades"
        element={
          <ProtectedRoute>
            <Grades />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:courseId"
        element={
          <ProtectedRoute>
            <SingleCoursePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courseContent"
        element={
          <ProtectedRoute>
            <ModuleContentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/courses/:courseId/:sectionId"
        element={
          <ProtectedRoute>
            <ModuleContentPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
