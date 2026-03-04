import { Routes, Route } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { RoleRoute } from '../components/layout/RoleRoute';

import { Login } from '../features/auth/pages/Login';
import { Register } from '../features/auth/pages/Register';
import { FarmerDashboard } from '../features/farmer/pages/FarmerDashboard';
import { FarmerProducts } from '../features/farmer/pages/FarmerProducts';
import { FarmerOrders } from '../features/farmer/pages/FarmerOrders';
import { CustomerHome } from '../features/customer/pages/CustomerHome';
import { CustomerProfile } from '../features/customer/pages/CustomerProfile';
import { CustomerOrders } from '../features/customer/pages/CustomerOrders';
import { CustomerLayout } from '../components/layout/CustomerLayout';
import { LandingPage } from '../features/public/pages/LandingPage';
import { BusinessDashboard } from '../features/business/pages/BusinessDashboard';
import { BusinessProcurement } from '../features/business/pages/BusinessProcurement';
import { BusinessAnalytics } from '../features/business/pages/BusinessAnalytics';
import { AdminDashboard } from '../features/admin/pages/AdminDashboard';
import { AdminUsers } from '../features/admin/pages/AdminUsers';
import { AdminKYC } from '../features/admin/pages/AdminKYC';
import { AdminSettings } from '../features/admin/pages/AdminSettings';

export const AppRoutes = () => {
    return (
        <Routes>
            {/* Landing Page Route */}
            <Route path="/" element={<LandingPage />} />

            {/* Public / Auth Routes */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected Dashboards */}
            <Route element={<ProtectedRoute />}>
                {/* Customer Routes with custom sticky navigation */}
                <Route element={<RoleRoute allowedRoles={['Customer']} />}>
                    <Route element={<CustomerLayout />}>
                        <Route path="/customer/home" element={<CustomerHome />} />
                        <Route path="/customer/profile" element={<CustomerProfile />} />
                        <Route path="/customer/orders" element={<CustomerOrders />} />
                    </Route>
                </Route>

                {/* Shared Dashboard Layout for Farmer, Business, Admin */}
                <Route element={<DashboardLayout />}>

                    {/* Farmer Routes */}
                    <Route element={<RoleRoute allowedRoles={['Farmer', 'Bulk_Farmer']} />}>
                        <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
                        <Route path="/farmer/products" element={<FarmerProducts />} />
                        <Route path="/farmer/orders" element={<FarmerOrders />} />
                    </Route>

                    {/* Business Routes */}
                    <Route element={<RoleRoute allowedRoles={['Business']} />}>
                        <Route path="/business/dashboard" element={<BusinessDashboard />} />
                        <Route path="/business/procurement" element={<BusinessProcurement />} />
                        <Route path="/business/analytics" element={<BusinessAnalytics />} />
                    </Route>

                    {/* Admin Routes */}
                    <Route element={<RoleRoute allowedRoles={['Admin', 'Super_Admin']} />}>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/users" element={<AdminUsers />} />
                        <Route path="/admin/kyc" element={<AdminKYC />} />
                        <Route path="/admin/settings" element={<AdminSettings />} />
                    </Route>

                </Route>
            </Route>
        </Routes>
    );
};
