import { Navigate, Outlet } from "react-router";

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

  return userRole === role ? <Outlet /> : <Navigate to="/" replace />;
};

export default RoleGuard;