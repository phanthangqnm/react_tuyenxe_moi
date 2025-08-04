// guards/AuthGuard.jsx
import { Navigate, Outlet } from "react-router";

// export default function AuthGuard() {
//   const isAuthenticated = localStorage.getItem("token") !== null;
//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
// }

const AuthGuard: React.FC = () => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthGuard;
