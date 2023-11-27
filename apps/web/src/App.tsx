import LoginPage from "./Pages/LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
function App() {
  return (
    // <Routes>
    //   <Route
    //     path="/"
    //     element={
    //       <ProtectedRoute>
    <LoginPage />
    //       </ProtectedRoute>
    //     }
    //   />
    // </Routes>
  );
}

export default App;
