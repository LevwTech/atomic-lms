import LoginPage from "./Pages/Auth/Login/Login";
import CoursesPage from "./Pages/Courses/CoursesPage";
import { Route, Routes } from "react-router-dom";
import Announcements from "./Pages/Courses/Announcements";
import Grades from "./Pages/Courses/Grades";
import SingleCoursePage from "./Pages/Courses/SingleCourse";
import ModuleContentPage from "./Pages/Courses/ModuleContent";
import ProtectedRoute from "./utils/ProtectedRoute";
import Uplaod from "./Pages/Courses/Upload";

function App() {
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
        path="/courses/:id"
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
        path="/courses/:id/:sectionId"
        element={
          <ProtectedRoute>
            <ModuleContentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Uplaod />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
