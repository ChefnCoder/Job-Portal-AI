import { Navigate, Outlet } from "react-router-dom"; //Outlet:	Renders the actual child route component if the user passes the checks
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute({ allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
