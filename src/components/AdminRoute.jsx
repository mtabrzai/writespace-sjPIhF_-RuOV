import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../context/AuthProvider';
import { ROUTES } from '../constants';

/**
 * AdminRoute component - Route guard for admin-only routes
 * @param {Object} props
 * @param {React.ReactNode} [props.children] - Child components to render if user is admin
 * @param {string} [props.redirectTo=ROUTES.HOME] - Path to redirect to if not admin
 * @returns {JSX.Element}
 */
const AdminRoute = ({ children, redirectTo = ROUTES.HOME }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

AdminRoute.propTypes = {
  children: PropTypes.node,
  redirectTo: PropTypes.string,
};

export default AdminRoute;