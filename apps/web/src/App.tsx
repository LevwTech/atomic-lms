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
import Uplaod from "./Pages/Courses/Upload";
import Flashcards from "./Pages/Courses/FlashcardsPage";
import Answer from "./Pages/Courses/Answer";
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
      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Uplaod />
          </ProtectedRoute>
        }
      />
      <Route
        path="/flashcards"
        element={
          <ProtectedRoute>
            <Flashcards />
          </ProtectedRoute>
        }
      />
      <Route
        path="/answer"
        element={
          <ProtectedRoute>
            <Answer
              question="Lorem ipsum dolor sit amet consectetur"
              answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio similique exercitationem doloremque nostrum amet velit voluptatum quo perferendis officiis."
              explaination="Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius optio similique exercitationem doloremque nostrum amet velit voluptatum quo perferendis officiis." studentAnswer={""} advice={""}            />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
