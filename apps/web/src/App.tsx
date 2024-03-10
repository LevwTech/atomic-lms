import LoginPage from "./Pages/LoginPage/LoginPage";
import CoursesPage from "./Pages/Courses/CoursesPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
function App() {
  return (
    // <Routes>
    //   <Route
    //     path="/"
    //     element={
    //       <ProtectedRoute>
    <CoursesPage />
    //       </ProtectedRoute>
    //     }
    //   />
    // </Routes>
  );
}

export default App;
