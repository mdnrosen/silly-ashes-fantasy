import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLoading } from "../hooks/useLoading";

type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();
  const _loading = useLoading();

  // Still loading auth state
  if (isLoading) {
    _loading.start();
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-dark-blue">Loading...</div>
      </div>
    );
  }

  // User not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/register" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
