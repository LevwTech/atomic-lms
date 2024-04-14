// import React from "react";
// import { Navigate } from "react-router-dom";
// import { ReactElement } from "react";

// function ProtectedRoute({
//   children,
// }: {
//   children: React.ReactNode | null;
// }): React.ReactNode | null {
//   const session = localStorage.getItem("session");
//   const { accessToken, role } = session
//     ? JSON.parse(session)
//     : { accessToken: null, role: null };

//   return accessToken && role === "admin" ? { children } : Navigate("/");
// }

// export default ProtectedRoute;
