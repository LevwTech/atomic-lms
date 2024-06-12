import LoginPage from "./Pages/Auth/Login/Login";
import CoursesPage from "./Pages/Courses/CoursesPage";
import { Route, Routes } from "react-router-dom";
import Announcements from "./Pages/Courses/Announcements";
import Grades from "./Pages/Courses/Grades";
import SingleCoursePage from "./Pages/Courses/SingleCourse";
import ModuleContentPage from "./Pages/Courses/ModuleContent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/grades" element={<Grades />} />
      <Route path="/courses/:id" element={<SingleCoursePage />} />
      <Route path="/courseContent" element={<Announcements />} />
      <Route
        path="/courses/:courseName/lectures"
        element={<ModuleContentPage />}
      />
    </Routes>
  );
}

export default App;
