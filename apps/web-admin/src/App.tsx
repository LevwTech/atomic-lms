import { Route, Routes } from "react-router-dom";
import Courses from "./pages/Courses";
import Users from "./pages/Users";
import Permissions from "./pages/Permissions";
import Permission from "./pages/Permission";
import NewPermission from "./pages/NewPermission";
import NewUser from "./pages/NewUser";
import NewCourse from "./pages/NewCourse";
import Course from "./pages/Course";
import NewGroup from "./pages/NewGroup";
import Login from "./pages/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditUser from "./pages/EditUser";
import EditCourse from "./pages/EditCourse";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/new"
          element={
            <ProtectedRoute>
              <NewCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/groups/new"
          element={
            <ProtectedRoute>
              <NewGroup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/edit/:id"
          element={
            <ProtectedRoute>
              <EditCourse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/new"
          element={
            <ProtectedRoute>
              <NewUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/edit/:username"
          element={
            <ProtectedRoute>
              <EditUser />
            </ProtectedRoute>
          }
        />
        <Route
          path="/permissions"
          element={
            <ProtectedRoute>
              <Permissions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/permissions/new"
          element={
            <ProtectedRoute>
              <NewPermission />
            </ProtectedRoute>
          }
        />
        <Route
          path="/permissions/edit/:id"
          element={
            <ProtectedRoute>
              <Permission />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer position="bottom-center" limit={1} autoClose={2000} />
    </>
  );
}

export default App;
