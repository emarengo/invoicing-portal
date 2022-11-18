import { Navigate } from 'react-router-dom';
import Login from '../components/one-login/Login';
import Auth from '../components/one-login/Auth';
import ErrorPage from '../components/one-login/Error';

export const loginRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/auth', element: <Auth /> },
  { path: '/error', element: <ErrorPage /> },
  { path: '*', element: <Navigate to="/login" replace /> }
];
