import { Navigate } from "react-router-dom";
import { ifUserHasPermissions } from "../app/HelperFunction";

function AuthGuard({ children, roles }) {
  let isAuthenticated = ifUserHasPermissions(roles);
  return isAuthenticated ? children : <Navigate to="/" />;
}

export default AuthGuard;
