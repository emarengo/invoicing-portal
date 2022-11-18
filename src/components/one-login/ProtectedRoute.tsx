import { Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { useEffect, useRef } from 'react';

interface RouteProps {
  children: JSX.Element;
  redirectTo: string;
}

/**
 * ProtectedRoute locks a route unless the authed hook is true
 *
 * @param {Component} children - Component to render when accessible
 * @param {String} redirectTo - path to redirect to when inaccessible
 */
const ProtectedRoute = ({ children, redirectTo }: RouteProps) => {
  const timerRef = useRef(0);

  const { authed, expiration, logout } = useAuth();

  useEffect(() => {
    if (authed && expiration) {
      timerRef.current = window.setTimeout(() => {
        logout();
      }, expiration - Date.now());
    }
  }, [expiration]);

  useEffect(
    () => () => {
      window.clearTimeout(timerRef.current);
    },
    []
  );

  return authed ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
