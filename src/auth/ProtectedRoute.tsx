// src/auth/ProtectedRoute.tsx
import { useAuth0 } from "@auth0/auth0-react";
import LoadingIcons from "react-loading-icons";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  console.log("isLoading:", isLoading);
  console.log("isAuthenticated:", isAuthenticated);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingIcons.Puff stroke="#001f3f" strokeOpacity={0.125} height="100" width="100" />
        <span className="text-white mt-2 text-lg font-bold">Loading...</span>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
