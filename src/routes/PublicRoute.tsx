import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/slice";
import { ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
  restricted?: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  restricted,
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();
  if (isLoggedIn && restricted) {
    return <Navigate to={location.state?.from || "/cart"} />;
  }

  return children;
};
