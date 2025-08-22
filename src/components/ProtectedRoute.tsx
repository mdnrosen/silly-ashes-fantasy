import { Navigate, useLocation } from 'react-router-dom';

type Props = {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const location = useLocation();
    const user = true;

    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;