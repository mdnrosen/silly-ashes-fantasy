import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type Props = {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const auth = useAuth();
    const location = useLocation();

    // If auth context is not available, redirect to register
    if (!auth) {
        return <Navigate to="/register" replace state={{ from: location }} />;
    }

    const { user, loading } = auth;

    // Still loading auth state
    if (loading) {
        return <div>Loading...</div>; // or your loading component
    }

    // User not authenticated
    if (!user) {
        return <Navigate to="/register" replace state={{ from: location }} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;