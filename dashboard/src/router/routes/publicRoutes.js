import { lazy } from 'react';
const Home = lazy(() => import('../../views/Home'));
const Login = lazy(() => import('../../views/auth/Login'));
const Register = lazy(() => import('../../views/auth/Register'));
const ForgetPass = lazy(() => import('../../views/auth/ForgetPass'));
const AdminLogin = lazy(() => import('../../views/auth/AdminLogin'));
const UnAuthorized = lazy(() => import('../../views/UnAuthorized'));
const Success = lazy(() => import('../../views/Success'));

const publicRoutes = [
  {
    path: '/',
    element: <Home />,
    ability: ['admin', 'seller'],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/forgetpass',
    element: <ForgetPass />,
  },
  {
    path: '/admin/login',
    element: <AdminLogin />,
  },
  {
    path: '/unauthorized',
    element: <UnAuthorized />,
  },
  {
    path: '/success?',
    element: <Success />,
  },
];

export default publicRoutes;
