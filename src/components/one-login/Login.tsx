import { beginAuth } from './api/oidcApi';
/**
 * Landing route, calls OpenId API
 * @returns loader spinner
 */
const LoginPage = () => {
  beginAuth();
  return <div className="spinner"></div>;
};

export default LoginPage;
