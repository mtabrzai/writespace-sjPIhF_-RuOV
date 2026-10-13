import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthProvider';
import { ROUTES } from '../constants';

/**
 * PrivateRoute component - Route guard for authenticated users
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Child components to render if authenticated
 * @param {string} [props.redirectTo=ROUTES.LOGIN] - Path to redirect to if not authenticated
 * @returns {JSX.Element}
 */
const PrivateRoute = ({ children, redirectTo = ROUTES.LOGIN }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
  redirectTo: PropTypes.string,
};

export default PrivateRoute;