/* eslint-disable import/no-unresolved */
import { lazy, Suspense, useState, useEffect } from 'react';
import { Outlet, Navigate, useRoutes, useNavigate } from 'react-router-dom';

import FarmerDBLayout from '../layouts/farmerdb';
import { Landing } from '../sections/landingpage';
import DashboardLayout from '../layouts/dashboard';
import { UnauthorizedView } from '../sections/error';

export const AdminPage = lazy(() => import('../pages/app'));
export const FarmerPage = lazy(() => import('../pages/farmerdb'));
export const BlogPage = lazy(() => import('../pages/blog'));
export const UserPage = lazy(() => import('../pages/user'));
export const LoginPage = lazy(() => import('../pages/login'));
export const RegisterPage = lazy(() => import('../pages/register'));
export const ProductsPage = lazy(() => import('../pages/products'));
export const Page404 = lazy(() => import('../pages/page-not-found'));
export const MarketPage = lazy(() => import('../pages/market'));

const Fallback = () => (
  <div style={{ padding: 48, textAlign: 'center', color: '#637381' }}>Loading…</div>
);

export default function Router() {
  const navigate = useNavigate();
  const [role, setRole] = useState(() => localStorage.getItem('role'));
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedRole = localStorage.getItem('role');
    const uid = localStorage.getItem('uid');
    return Boolean(uid) && storedRole && storedRole !== 'guest';
  });

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    const uid = localStorage.getItem('uid');
    setRole(storedRole);
    setIsAuthenticated(Boolean(uid) && storedRole && storedRole !== 'guest');
  }, [navigate]);

  const requireRole = (needed, page) => {
    if (isAuthenticated && role === needed) {
      return page;
    }
    if (isAuthenticated) {
      return <Navigate to="/unauthorized" replace />;
    }
    return <Navigate to="/login" replace />;
  };

  const guestOnly = (page) => {
    if (!isAuthenticated) return page;
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'farmer') return <Navigate to="/dashboard" replace />;
    return page;
  };

  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<Fallback />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'admin', element: requireRole('admin', <AdminPage />) },
        { path: 'admin/farmers', element: requireRole('admin', <UserPage />) },
      ],
    },
    {
      element: (
        <FarmerDBLayout>
          <Suspense fallback={<Fallback />}>
            <Outlet />
          </Suspense>
        </FarmerDBLayout>
      ),
      children: [
        { path: 'dashboard', element: requireRole('farmer', <FarmerPage />) },
        { path: 'dashboard/products', element: requireRole('farmer', <ProductsPage />) },
        { path: 'blog', element: requireRole('farmer', <BlogPage />) },
      ],
    },
    {
      path: 'marketplace',
      element: (
        <Suspense fallback={<Fallback />}>
          <MarketPage />
        </Suspense>
      ),
    },
    { path: '/', element: <Landing /> },
    {
      path: 'login',
      element: (
        <Suspense fallback={<Fallback />}>
          {guestOnly(<LoginPage />)}
        </Suspense>
      ),
    },
    {
      path: 'register',
      element: (
        <Suspense fallback={<Fallback />}>
          {guestOnly(<RegisterPage />)}
        </Suspense>
      ),
    },
    { path: '404', element: <Page404 /> },
    { path: 'unauthorized', element: <UnauthorizedView /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
