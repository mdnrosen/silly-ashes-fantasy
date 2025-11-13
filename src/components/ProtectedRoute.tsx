import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useLoading } from "../hooks/useLoading";
import Spinner from "../components/Spinner";
type Props = {
  children: React.ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const location = useLocation();
  const _loading = useLoading();

  if (isLoading) {
    _loading.start();
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/register" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
