//import { Navigate, Outlet } from "react-router";
import { Navigate, Outlet } from "react-router-dom";

// export default function RoleGuard({ role }) {
//   const userRole = JSON.parse(localStorage.getItem("user"))?.role;
//   return userRole === role ? <Outlet /> : <Navigate to="/" />;
// }

interface RoleGuardProps {
  role: string;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ role }) => {
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;
  const userRole = user?.role;

  //return userRole === role ? <Outlet /> : <Navigate to="/" replace />;
  return <Outlet />;
};

export default RoleGuard;