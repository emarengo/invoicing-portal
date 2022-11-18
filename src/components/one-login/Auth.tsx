import { parse } from 'query-string';
import { Navigate } from 'react-router-dom';
import useAuth from './hooks/useAuth';
import { useEffect, useState } from 'react';

const AuthPage = () => {
  const { login } = useAuth();
  const [navigate, setNavigate] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const response = parse(hash);
    if (response.error) {
      setNavigate(<Navigate state={response} to="/error" />);
    } else if (response.access_token) {
      login(response.access_token as string, Number(response.expires_in));
      setNavigate(<Navigate to="/home" />);
    } else {
      setNavigate(<Navigate state={'Unauthorized'} to="/error" />);
    }
  }, [login]);

  return navigate;
};

export default AuthPage;
