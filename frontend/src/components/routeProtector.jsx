import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

function ProtectedRoute({ children }) {
  const accessToken = useSelector(
    (state) => state.auth.accessToken
  );

  const location = useLocation();

  if (!accessToken) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}

export default ProtectedRoute;