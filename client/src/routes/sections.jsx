/* eslint-disable import/no-unresolved */
import { lazy, Suspense, useState, useEffect } from 'react';
import { Outlet, Navigate, useRoutes, useNavigate } from 'react-router-dom';
import FarmerDBLayout from '@/layouts/farmerdb/index.jsx';
import { Landing } from '@/sections/landingpage/index.js';
import DashboardLayout from '@/layouts/dashboard/index.js';
import { UnauthorizedView } from '@/sections/error/index.js';

export const AdminPage = lazy(() => import('@/pages/app.jsx'));
export const FarmerPage = lazy(() => import('@/pages/farmerdb.jsx'));
export const BlogPage = lazy(() => import('@/pages/blog.jsx'));
export const UserPage = lazy(() => import('@/pages/user.jsx'));
export const LoginPage = lazy(() => import('@/pages/login.jsx'));
export const RegisterPage = lazy(() => import('@/pages/register.jsx'));
export const ProductsPage = lazy(() => import('@/pages/products.jsx'));
export const Page404 = lazy(() => import('@/pages/page-not-found.jsx'));
export const MarketPage = lazy(() => import('@/pages/market.jsx'));
export const { Unauthorised } = lazy(() => import('@/sections/error/unauthorised.jsx'));
export const { FarmersDB } = lazy(() => import('@/sections/farmersdb/view.jsx'));

// ----------------------------------------------------------------------

export default function Router() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const role = localStorage.getItem('role');
    const uid = localStorage.getItem('uid');
    return !(role === 'guest' || uid === null);
  });
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const nrole = localStorage.getItem('role');
    const uid = localStorage.getItem('uid');
    setRole(nrole);
    setIsAuthenticated(!(nrole === 'guest' || uid === null));
  }, [navigate]);

  const unauth = (string) => {
    if (string === 'farmer'){
      const nrole = localStorage.getItem('role');
      if (nrole === string){
        return <Navigate to="/dashboard" />;
      }
      return <Navigate to="/unauthorized" />;
    }
    if (string === 'admin'){
      const nrole = localStorage.getItem('role');
      if (nrole === string){
        return <Navigate to="/admin" />;
      }
      return <Navigate to="/unauthorized" />;
    }
    return <Navigate to="/unauthorized" />;
}
  const redirection = (page) => {
    if (page === 'login'){
      if (isAuthenticated){
        if (localStorage.getItem('role') === 'admin'){
          return <Navigate to="/admin" />;
        }
        if (localStorage.getItem('role') === 'farmer'){
          return <Navigate to="/dashboard" />;
        }
      }
      return <LoginPage />;
    }
    if (page === 'register'){
      if (isAuthenticated){
        if (localStorage.getItem('role') === 'admin'){
          return <Navigate to="/admin" />;
        }
        if (localStorage.getItem('role') === 'farmer'){
          return <Navigate to="/dashboard" />;
        }
      }
      return <RegisterPage />;
    }
    return <Navigate to="/" />;
  };
  
  const refresher = () => {
  window.location.reload();
  return true;
  }

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading@.</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'admin', element: (role === 'admin' && isAuthenticated && refresher)? <AdminPage /> : unauth('admin'), index: true },
        { path: 'admin/farmers', element: (role === 'admin' && isAuthenticated && refresher) ? <UserPage /> : <Navigate to="/unauthorized" /> },
      ],
    },
    {
      element: (
        <FarmerDBLayout>
          <Suspense fallback={<div>Loading@.</div>}>
            <Outlet />
          </Suspense>
        </FarmerDBLayout>
      ),
      children: [
        { path: 'dashboard', element: (role === 'farmer' && isAuthenticated && refresher )? <FarmerPage /> : unauth('farmer'), index: true },
        { path: 'dashboard/products', element: (role === 'farmer' && isAuthenticated && refresher ) ? <ProductsPage /> : <Navigate to="/unauthorized" /> },
        { path: 'blog', element: (role === 'farmer' && isAuthenticated && refresher ) ?<BlogPage /> : <Navigate to="/unauthorized" /> },
      ],
    },
    { path: 'marketplace', element: <MarketPage /> },
    {
      path: '/',
      element: <Landing />,
    },
    {
      path: 'login',
      element: redirection('login'),
    },
    {
      path: 'register',
      element: redirection('register'),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: 'unauthorized',
      element: <UnauthorizedView />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}