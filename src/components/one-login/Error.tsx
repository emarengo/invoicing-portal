import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

interface PropState {
  error_description: string | null;
  error: string;
}
/**
 * @returns Error description from hash param. In any other situation redirects to login
 */
const Error = () => {
  const location = useLocation();

  if (location.state) {
    const { error_description, error } = location.state as PropState;

    if (!error_description) {
      return <Navigate to="/login" />;
    } else return errorPage(error_description, error);
  } else {
    return <Navigate to="/login" />;
  }
};

const errorPage = (error_description: string, error: string) => {
  return (
    <div>
      <div className="error">{error}</div>
      <div className="error-description">{error_description}</div>
    </div>
  );
};
export default Error;