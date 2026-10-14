import { Navigate, Outlet } from 'react-router-dom';

import AuthLoading from '../components/AuthLoading';
import useAuth from '../hooks/useAuth';

function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <AuthLoading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
