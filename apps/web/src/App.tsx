import LoginPage from "./Pages/Auth/Login/Login";
import CoursesPage from "./Pages/Courses/CoursesPage";
import { Link, Route, Routes } from "react-router-dom";
import Announcements from "./Pages/Courses/Announcements";
import Grades from "./Pages/Courses/Grades";
import SingleCoursePage from "./Pages/Courses/SingleCourse";
import ModuleContentPage from "./Pages/Courses/ModuleContent";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useEffect, useState } from "react";
import { useUserStore } from "./store/user.store";
import ReactLoading from "react-loading";
import Uplaod from "./Pages/Courses/Upload";
import PdfViewerPage from "./Pages/Courses/pdfViewer";
import AiChatbot from "./Pages/Courses/AiChatbot";

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
        path="/courses/:courseId/upload"
        element={
          <ProtectedRoute>
            <Uplaod />
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
      <Route
        path="/courses/:courseId/:sectionId/:attachmentId/pdf"
        element={
          <ProtectedRoute>
            <PdfViewerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chatbot"
        element={
          <ProtectedRoute>
            <AiChatbot />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pdf"
        element={
          <ProtectedRoute>
            <PdfViewerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <div className="h-screen w-full flex flex-col justify-center items-center ">
              <p className="text-7xl font-bold"> 404</p>
              <div className="text-gray-500 flex flex-col items-center gap-5">
                Sorry, the page was not found!
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
