import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import type { UserRole } from '../../types';

interface RoleRouteProps {
    allowedRoles: UserRole[];
}

export const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
    const { user } = useAuthStore();

    if (!user || !allowedRoles.includes(user.role)) {
        // If user doesn't have the correct role, redirect them to unauthorized or their respective dashboard
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};
