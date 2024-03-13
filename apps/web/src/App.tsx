import LoginPage from "./Pages/LoginPage/LoginPage";
import CoursesPage from "./Pages/Courses/CoursesPage";
import { Route, Routes } from "react-router-dom";
import Announcements from "./Pages/Announcements";
import Grades from "./Pages/Grades";
import SingleCoursePage from "./Pages/Courses/SingleCoursePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/grades" element={<Grades />} />
      <Route path="/courseId" element={<SingleCoursePage />} />
    </Routes>
  );
}

export default App;
