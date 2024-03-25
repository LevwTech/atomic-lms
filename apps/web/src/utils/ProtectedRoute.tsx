// ! to be implemented when the auth is connected to the backend

// import React from "react";
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({
//   children,
// }: {
//   children: React.ReactNode | null;
// }): React.ReactNode | null {
//   const session = localStorage.getItem("session");
//   const { accessToken, role } = session
//     ? JSON.parse(session)
//     : { accessToken: null, role: null };

//   return accessToken && role === "admin" ? { children } : Navigate({ to: "/"});
// }

// export default ProtectedRoute;
